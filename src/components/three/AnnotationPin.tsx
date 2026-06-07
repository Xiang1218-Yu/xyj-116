import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Annotation, ANNOTATION_COLORS, AnnotationPriority } from '../../types';
import { useAnnotationStore } from '../../store/useAnnotationStore';
import { cn } from '../../lib/utils';

interface AnnotationPinProps {
  annotation: Annotation;
}

function getPriorityScale(priority: AnnotationPriority, isHovered: boolean): number {
  const baseScale = priority === 'high' ? 1.2 : priority === 'medium' ? 1.05 : 0.95;
  return baseScale * (isHovered ? 1.15 : 1);
}

function getPriorityPulseSpeed(priority: AnnotationPriority): number {
  return priority === 'high' ? 2 : priority === 'medium' ? 0 : 0;
}

export function AnnotationPin({ annotation }: AnnotationPinProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pulseRef = useRef(0);

  const { selectedAnnotationId, setSelectedAnnotationId } = useAnnotationStore();
  const isSelected = selectedAnnotationId === annotation.id;

  const color = ANNOTATION_COLORS[annotation.color];
  const baseScale = getPriorityScale(annotation.priority, isHovered || isSelected);
  const pulseSpeed = getPriorityPulseSpeed(annotation.priority);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (pulseSpeed > 0) {
      pulseRef.current += delta * pulseSpeed;
      const pulse = 1 + Math.sin(pulseRef.current) * 0.08;
      groupRef.current.scale.setScalar(baseScale * pulse);
    } else {
      groupRef.current.scale.setScalar(baseScale);
    }

    groupRef.current.position.y = annotation.position[1] + 0.02;
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedAnnotationId(annotation.id);
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = 'default';
  };

  const showLabel = isHovered || isSelected;

  return (
    <group
      ref={groupRef}
      position={[annotation.position[0], annotation.position[1] + 0.02, annotation.position[2]]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <group position={[0, 0.15, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSelected ? 0.8 : isHovered ? 0.5 : 0.2}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.04, 0.005, 0.08, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSelected ? 0.5 : isHovered ? 0.3 : 0.1}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[0, -0.11, 0]}>
          <coneGeometry args={[0.015, 0.08, 8]} />
          <meshStandardMaterial
            color="#9CA3AF"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0.03, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.3}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>
      </group>

      {showLabel && (
        <Html
          position={[0, 0.45, 0]}
          center
          zIndexRange={[100, 0]}
          distanceFactor={8}
        >
          <div
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
              'backdrop-blur-xl shadow-lg border',
              isSelected
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-100'
                : 'bg-gray-900/80 border-white/10 text-white'
            )}
            style={{ pointerEvents: 'none' }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="max-w-[120px] truncate">{annotation.title}</span>
            </div>
          </div>
        </Html>
      )}

      {annotation.priority === 'high' && (
        <mesh position={[0, 0.3, 0]}>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial
            color="#EF4444"
            transparent
            opacity={isSelected ? 0.6 : 0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

interface AnnotationPinsGroupProps {
  annotations: Annotation[];
}

export function AnnotationPinsGroup({ annotations }: AnnotationPinsGroupProps) {
  return (
    <group name="annotations">
      {annotations.map((annotation) => (
        <AnnotationPin key={annotation.id} annotation={annotation} />
      ))}
    </group>
  );
}
