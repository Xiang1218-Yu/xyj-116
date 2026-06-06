import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightingProps {
  autoRotate?: boolean;
}

export function Lighting({ autoRotate = false }: LightingProps) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (autoRotate && keyLightRef.current) {
      const t = state.clock.getElapsedTime();
      keyLightRef.current.position.x = Math.cos(t * 0.2) * 5;
      keyLightRef.current.position.z = Math.sin(t * 0.2) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#88aacc" />
      
      <directionalLight
        ref={keyLightRef}
        position={[3, 5, 3]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      
      <directionalLight
        ref={rimLightRef}
        position={[-3, 2, -3]}
        intensity={0.6}
        color="#4fc3f7"
      />
      
      <directionalLight
        position={[0, -3, 0]}
        intensity={0.3}
        color="#ffffff"
      />
      
      <pointLight
        position={[0, 0, 5]}
        intensity={0.5}
        color="#00bcd4"
        distance={10}
      />
    </>
  );
}
