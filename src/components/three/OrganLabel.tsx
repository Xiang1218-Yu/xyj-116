import { useRef } from 'react';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface OrganLabelProps {
  position: [number, number, number];
  name: string;
  latinName?: string;
  color?: string;
  scale?: number;
  showLatinName?: boolean;
  isSelected?: boolean;
}

export function OrganLabel({
  position,
  name,
  latinName,
  color = '#ffffff',
  scale = 1,
  showLatinName = false,
  isSelected = false,
}: OrganLabelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const distance = state.camera.position.distanceTo(groupRef.current.position);
      const dynamicScale = Math.max(0.02, Math.min(0.06, distance * 0.012)) * scale;
      groupRef.current.scale.setScalar(dynamicScale);
    }
  });

  const labelOffsetY = 0.15;

  return (
    <Billboard
      position={[position[0], position[1] + labelOffsetY, position[2]]}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <group ref={groupRef}>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.2, showLatinName ? 1.2 : 0.7]} />
          <meshBasicMaterial
            color={isSelected ? 'rgba(0, 188, 212, 0.35)' : 'rgba(10, 22, 40, 0.8)'}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[2.15, showLatinName ? 1.15 : 0.65]} />
          <meshBasicMaterial
            color={isSelected ? 'rgba(0, 188, 212, 0.15)' : 'rgba(15, 23, 42, 0.6)'}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        <Text
          position={[0, showLatinName ? 0.18 : 0, 0]}
          color={isSelected ? '#00BCD4' : color}
          fontSize={0.32}
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
          outlineWidth={isSelected ? 0.04 : 0.03}
          outlineColor={isSelected ? '#006064' : '#0f172a'}
        >
          {name}
        </Text>

        {showLatinName && latinName && (
          <Text
            position={[0, -0.22, 0]}
            color={isSelected ? '#4DD0E1' : 'rgba(255, 255, 255, 0.5)'}
            fontSize={0.2}
            fontStyle="italic"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#0f172a"
          >
            {latinName}
          </Text>
        )}

        <mesh position={[0, showLatinName ? 0.48 : 0.25, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={isSelected ? '#00BCD4' : color} transparent opacity={0.9} />
        </mesh>

        <lineSegments>
          <bufferGeometry
            attach="geometry"
            onUpdate={(geo) => {
              geo.setFromPoints([
                new THREE.Vector3(0, showLatinName ? 0.4 : 0.17, -0.02),
                new THREE.Vector3(0, -labelOffsetY, -0.02),
              ]);
            }}
          />
          <lineBasicMaterial
            attach="material"
            color={isSelected ? '#00BCD4' : 'rgba(255, 255, 255, 0.3)'}
            transparent
            opacity={0.6}
          />
        </lineSegments>
      </group>
    </Billboard>
  );
}
