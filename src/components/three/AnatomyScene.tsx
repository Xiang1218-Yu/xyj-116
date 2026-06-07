import { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { HumanBody } from './HumanBody';
import { Lighting } from './Lighting';
import { PostEffects } from './PostEffects';
import { AnnotationPinsGroup } from './AnnotationPin';
import { useViewStore } from '../../store/useViewStore';
import { useSelectionStore } from '../../store/useSelectionStore';
import { useSearchStore } from '../../store/useSearchStore';
import { useAnnotationStore } from '../../store/useAnnotationStore';

interface SceneControllerProps {
  autoRotate: boolean;
  cameraView: 'front' | 'side' | 'back';
  isOrthographic: boolean;
}

function AnnotationClickPlane() {
  const { camera, raycaster, mouse } = useThree();
  const planeRef = useRef<THREE.Mesh>(null);
  const { isAnnotationMode, setPendingAnnotationPosition, annotations } = useAnnotationStore();
  const previewPositionRef = useRef<[number, number, number] | null>(null);
  const previewMeshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!isAnnotationMode || !planeRef.current || !previewMeshRef.current) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planeRef.current);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      previewPositionRef.current = [point.x, point.y, point.z];
      previewMeshRef.current.position.copy(point);
      previewMeshRef.current.visible = true;
    } else {
      previewMeshRef.current.visible = false;
    }
  });

  const handleClick = (e: any) => {
    if (!isAnnotationMode) return;
    e.stopPropagation();

    if (previewPositionRef.current) {
      setPendingAnnotationPosition([...previewPositionRef.current]);
    }
  };

  if (!isAnnotationMode) return null;

  return (
    <>
      <mesh
        ref={planeRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        onClick={handleClick}
      >
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh ref={previewMeshRef} visible={false}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color="#00BCD4"
          transparent
          opacity={0.7}
        />
      </mesh>
    </>
  );
}

function SceneController({ autoRotate, cameraView, isOrthographic }: SceneControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const { isAnnotationMode, annotations, setPendingAnnotationPosition } = useAnnotationStore();

  useEffect(() => {
    if (!camera || !controlsRef.current) return;

    let targetPosition: [number, number, number] = [0, 0, 5];
    
    switch (cameraView) {
      case 'front':
        targetPosition = [0, 0, 5];
        break;
      case 'side':
        targetPosition = [5, 0, 0];
        break;
      case 'back':
        targetPosition = [0, 0, -5];
        break;
    }

    camera.position.set(...targetPosition);
    camera.lookAt(0, 0, 0);
    
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [cameraView, camera]);

  const handleCanvasClick = () => {
    if (!isAnnotationMode) {
      useSelectionStore.getState().clearSelection();
      useSearchStore.getState().clearHighlight();
    }
  };

  useEffect(() => {
    if (isAnnotationMode) {
      document.body.style.cursor = 'crosshair';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isAnnotationMode]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={15}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.9}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enablePan={false}
        onClick={handleCanvasClick}
        enableRotate={!isAnnotationMode}
        enableZoom={true}
      />
      
      <gridHelper args={[10, 10, '#1a2332', '#0f1722']} position={[0, -2.5, 0]} />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a1628" transparent opacity={0.8} />
      </mesh>

      <AnnotationClickPlane />
      
      <AnnotationPinsGroup annotations={annotations} />
    </>
  );
}

interface AnatomySceneProps {
  className?: string;
}

export function AnatomyScene({ className }: AnatomySceneProps) {
  const { autoRotate, cameraView, isOrthographic } = useViewStore();

  const handleBackgroundClick = () => {
    useSelectionStore.getState().clearSelection();
    useSearchStore.getState().clearHighlight();
  };

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      shadows
      onClick={handleBackgroundClick}
    >
      <color attach="background" args={['#0A1628']} />
      <fog attach="fog" args={['#0A1628', 8, 20]} />
      
      <Lighting autoRotate={false} />
      
      <HumanBody />
      
      <SceneController
        autoRotate={autoRotate}
        cameraView={cameraView}
        isOrthographic={isOrthographic}
      />
      
      <PostEffects bloomIntensity={1.2} />
    </Canvas>
  );
}
