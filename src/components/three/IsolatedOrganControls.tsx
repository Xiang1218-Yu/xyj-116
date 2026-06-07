import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useIsolateStore } from '../../store/useIsolateStore';

interface IsolatedOrganControlsProps {
  enabled: boolean;
}

export function IsolatedOrganControls({ enabled }: IsolatedOrganControlsProps) {
  const { gl } = useThree();
  const { setIsolatedRotation, setIsolatedScale, isolatedRotation, isolatedScale, isolatedStructureId, reset: resetIsolation } = useIsolateStore();
  
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const canvas = gl.domElement;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      rotationVelocity.current = { x: 0, y: 0 };
      canvas.setPointerCapture(e.pointerId);
      setIsPointerLocked(true);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !isolatedStructureId) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.current.x,
        y: e.clientY - previousMousePosition.current.y,
      };

      const rotationSpeed = 0.005;
      const newRotation: [number, number, number] = [
        isolatedRotation[0] + deltaMove.y * rotationSpeed,
        isolatedRotation[1] + deltaMove.x * rotationSpeed,
        isolatedRotation[2],
      ];

      setIsolatedRotation(newRotation);
      rotationVelocity.current = {
        x: deltaMove.y * rotationSpeed,
        y: deltaMove.x * rotationSpeed,
      };

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // 忽略释放指针捕获的错误
      }
      setIsPointerLocked(false);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isolatedStructureId) return;
      e.preventDefault();
      e.stopPropagation();

      const zoomSpeed = 0.001;
      const scaleDelta = -e.deltaY * zoomSpeed;
      const minScale = 0.5;
      const maxScale = 4;

      const currentBaseScale = useIsolateStore.getState().originalScale;
      if (!currentBaseScale) return;

      const currentScaleMultiplier = isolatedScale[0] / currentBaseScale[0];
      const newScaleMultiplier = Math.max(minScale, Math.min(maxScale, currentScaleMultiplier + scaleDelta));

      const newScale: [number, number, number] = [
        currentBaseScale[0] * newScaleMultiplier,
        currentBaseScale[1] * newScaleMultiplier,
        currentBaseScale[2] * newScaleMultiplier,
      ];

      setIsolatedScale(newScale);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isolatedStructureId) {
        resetIsolation();
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, gl, isolatedRotation, isolatedScale, isolatedStructureId, setIsolatedRotation, setIsolatedScale, resetIsolation]);

  useFrame((_, delta) => {
    if (!enabled || !isolatedStructureId || isDragging.current) return;

    const damping = 0.95;
    const threshold = 0.0001;

    if (Math.abs(rotationVelocity.current.x) > threshold || Math.abs(rotationVelocity.current.y) > threshold) {
      const newRotation: [number, number, number] = [
        isolatedRotation[0] + rotationVelocity.current.x * delta * 60,
        isolatedRotation[1] + rotationVelocity.current.y * delta * 60,
        isolatedRotation[2],
      ];

      setIsolatedRotation(newRotation);

      rotationVelocity.current.x *= damping;
      rotationVelocity.current.y *= damping;
    }
  });

  useEffect(() => {
    if (enabled) {
      document.body.style.cursor = isPointerLocked ? 'grabbing' : 'grab';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [enabled, isPointerLocked]);

  return null;
}
