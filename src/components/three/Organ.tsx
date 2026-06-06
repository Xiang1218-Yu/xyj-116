import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AnatomyStructure, GeometryConfig } from '../../types';
import { useSelectionStore } from '../../store/useSelectionStore';

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
  const [hovered, setHovered] = useState(false);
  
  const isSelected = selectedStructureId === structure.id;
  const isHovered = hoveredStructureId === structure.id;

  const geometry = useMemo(() => getGeometry(structure.geometry.type), [structure.geometry.type]);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: structure.geometry.color,
      transparent: true,
      opacity: opacity,
      roughness: 0.4,
      metalness: 0.1,
      emissive: isSelected ? '#00bcd4' : (isHovered || hovered ? '#1e88e5' : '#000000'),
      emissiveIntensity: isSelected ? 0.6 : (isHovered || hovered ? 0.3 : 0),
    });
    return mat;
  }, [structure.geometry.color, opacity, isSelected, isHovered, hovered]);

  useFrame((state) => {
    if (meshRef.current && (isSelected || isHovered || hovered)) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.03;
      meshRef.current.scale.setScalar(scale);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
    
    if (groupRef.current && structure.layer === 'organ' && structure.id === 'heart') {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      groupRef.current.scale.setScalar(pulse);
    }
  });

  if (!visible) return null;

  const handleClick = (e: any) => {
    e.stopPropagation();
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
