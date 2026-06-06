import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AnatomyStructure, GeometryConfig } from '../../types';
import { useSelectionStore } from '../../store/useSelectionStore';
import { useQuizStore } from '../../store/useQuizStore';
import { useSearchStore } from '../../store/useSearchStore';

interface OrganProps {
  structure: AnatomyStructure;
  visible: boolean;
  opacity: number;
}

function getGeometry(type: GeometryConfig['type']): THREE.BufferGeometry {
  switch (type) {
    case 'box':
      return new THREE.BoxGeometry(1, 1, 1);
    case 'sphere':
      return new THREE.SphereGeometry(0.5, 32, 32);
    case 'capsule':
      return new THREE.CapsuleGeometry(0.5, 1, 16, 32);
    case 'cylinder':
      return new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    case 'ellipsoid':
      return new THREE.SphereGeometry(0.5, 32, 32);
    default:
      return new THREE.SphereGeometry(0.5, 32, 32);
  }
}

export function Organ({ structure, visible, opacity }: OrganProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { selectedStructureId, setSelectedStructureId, hoveredStructureId, setHoveredStructureId } = useSelectionStore();
  const { isQuizMode, currentQuestion, lastAnswerResult, lastClickedStructureId, submitAnswer, clearLastResult } = useQuizStore();
  const { highlightedStructureId, searchResults, clearHighlight } = useSearchStore();
  const [hovered, setHovered] = useState(false);
  const [flashEffect, setFlashEffect] = useState<'correct' | 'wrong' | null>(null);
  
  const isSelected = selectedStructureId === structure.id;
  const isHovered = hoveredStructureId === structure.id;
  const isTargetStructure = currentQuestion?.targetStructureId === structure.id;
  const isLastClicked = lastClickedStructureId === structure.id;
  const showCorrectHighlight = isQuizMode && lastAnswerResult === 'correct' && isLastClicked;
  const showWrongHighlight = isQuizMode && lastAnswerResult === 'wrong' && isLastClicked;
  const showTargetReveal = isQuizMode && lastAnswerResult === 'wrong' && isTargetStructure;
  const isSearchHighlighted = highlightedStructureId === structure.id;
  const isInSearchResults = searchResults.includes(structure.id);

  useEffect(() => {
    if (showCorrectHighlight) {
      setFlashEffect('correct');
      const timer = setTimeout(() => setFlashEffect(null), 2000);
      return () => clearTimeout(timer);
    } else if (showWrongHighlight) {
      setFlashEffect('wrong');
      const timer = setTimeout(() => setFlashEffect(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCorrectHighlight, showWrongHighlight]);

  const geometry = useMemo(() => getGeometry(structure.geometry.type), [structure.geometry.type]);

  const material = useMemo(() => {
    let emissiveColor = '#000000';
    let emissiveIntensity = 0;
    let baseColor = structure.geometry.color;

    if (flashEffect === 'correct' || showCorrectHighlight) {
      emissiveColor = '#10b981';
      emissiveIntensity = 0.8;
      baseColor = '#34d399';
    } else if (flashEffect === 'wrong' || showWrongHighlight) {
      emissiveColor = '#ef4444';
      emissiveIntensity = 0.8;
      baseColor = '#f87171';
    } else if (showTargetReveal) {
      emissiveColor = '#f59e0b';
      emissiveIntensity = 0.5;
    } else if (isSearchHighlighted) {
      emissiveColor = '#fbbf24';
      emissiveIntensity = 0.8;
    } else if (isInSearchResults) {
      emissiveColor = '#22c55e';
      emissiveIntensity = 0.4;
    } else if (isSelected) {
      emissiveColor = '#00bcd4';
      emissiveIntensity = 0.6;
    } else if (isHovered || hovered) {
      emissiveColor = '#1e88e5';
      emissiveIntensity = 0.3;
    }

    const mat = new THREE.MeshStandardMaterial({
      color: baseColor,
      transparent: true,
      opacity: opacity,
      roughness: 0.4,
      metalness: 0.1,
      emissive: emissiveColor,
      emissiveIntensity: emissiveIntensity,
    });
    return mat;
  }, [structure.geometry.color, opacity, isSelected, isHovered, hovered, flashEffect, showCorrectHighlight, showWrongHighlight, showTargetReveal, isSearchHighlighted, isInSearchResults]);

  useFrame((state) => {
    if (meshRef.current) {
      if (flashEffect === 'correct') {
        const bounceScale = 1 + Math.sin(state.clock.getElapsedTime() * 8) * 0.1;
        meshRef.current.scale.setScalar(bounceScale);
      } else if (flashEffect === 'wrong') {
        const shakeOffset = Math.sin(state.clock.getElapsedTime() * 20) * 0.05;
        meshRef.current.position.x = shakeOffset;
        meshRef.current.scale.setScalar(1);
      } else if (showTargetReveal) {
        const pulseScale = 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.08;
        meshRef.current.scale.setScalar(pulseScale);
      } else if (isSearchHighlighted) {
        const pulseScale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.06;
        meshRef.current.scale.setScalar(pulseScale);
        meshRef.current.position.x = 0;
      } else if (isInSearchResults) {
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2.5) * 0.02;
        meshRef.current.scale.setScalar(scale);
        meshRef.current.position.x = 0;
      } else if (isSelected || isHovered || hovered) {
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.03;
        meshRef.current.scale.setScalar(scale);
        meshRef.current.position.x = 0;
      } else {
        meshRef.current.scale.setScalar(1);
        meshRef.current.position.x = 0;
      }
    }
    
    if (groupRef.current && structure.layer === 'organ' && structure.id === 'heart' && !flashEffect && !showCorrectHighlight && !showWrongHighlight && !isSearchHighlighted) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      groupRef.current.scale.setScalar(pulse);
    }
  });

  if (!visible) return null;

  const handleClick = (e: any) => {
    e.stopPropagation();
    
    if (isQuizMode && currentQuestion && !lastAnswerResult) {
      submitAnswer(structure.id);
      return;
    }
    
    if (isQuizMode && lastAnswerResult) {
      clearLastResult();
      return;
    }
    
    if (isSearchHighlighted) {
      clearHighlight();
    }
    
    if (isSelected) {
      setSelectedStructureId(null);
    } else {
      setSelectedStructureId(structure.id);
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredStructureId(structure.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    if (hoveredStructureId === structure.id) {
      setHoveredStructureId(null);
    }
    document.body.style.cursor = 'auto';
  };

  const rotation = structure.geometry.rotation || [0, 0, 0];

  return (
    <group
      ref={groupRef}
      position={structure.geometry.position}
      rotation={rotation as [number, number, number]}
      scale={structure.geometry.scale}
    >
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      />
      {structure.geometry.type === 'ellipsoid' && (
        <mesh
          geometry={geometry}
          material={material}
          scale={[1, 0.85, 1.2]}
        />
      )}
    </group>
  );
}
