import { create } from 'zustand';

export type OtherOrgansMode = 'dimmed' | 'hidden' | 'normal';

interface IsolateState {
  isolatedStructureId: string | null;
  originalPosition: [number, number, number] | null;
  originalRotation: [number, number, number] | null;
  originalScale: [number, number, number] | null;
  isolatedPosition: [number, number, number];
  isolatedRotation: [number, number, number];
  isolatedScale: [number, number, number];
  otherOrgansMode: OtherOrgansMode;
  isIsolated: boolean;
  isolate: (structureId: string, position: [number, number, number], rotation: [number, number, number], scale: [number, number, number]) => void;
  reset: () => void;
  setIsolatedPosition: (position: [number, number, number]) => void;
  setIsolatedRotation: (rotation: [number, number, number]) => void;
  setIsolatedScale: (scale: [number, number, number]) => void;
  setOtherOrgansMode: (mode: OtherOrgansMode) => void;
  toggleOtherOrgansMode: () => void;
}

export const useIsolateStore = create<IsolateState>((set, get) => ({
  isolatedStructureId: null,
  originalPosition: null,
  originalRotation: null,
  originalScale: null,
  isolatedPosition: [0, 0, 0],
  isolatedRotation: [0, 0, 0],
  isolatedScale: [1, 1, 1],
  otherOrgansMode: 'dimmed',
  isIsolated: false,

  isolate: (structureId, position, rotation, scale) => {
    const scaleMultiplier = 2.5;
    const newScale: [number, number, number] = [
      scale[0] * scaleMultiplier,
      scale[1] * scaleMultiplier,
      scale[2] * scaleMultiplier,
    ];

    set({
      isolatedStructureId: structureId,
      originalPosition: [...position] as [number, number, number],
      originalRotation: [...rotation] as [number, number, number],
      originalScale: [...scale] as [number, number, number],
      isolatedPosition: [0, 0, 0],
      isolatedRotation: [0, 0, 0],
      isolatedScale: newScale,
      isIsolated: true,
    });
  },

  reset: () => {
    set({
      isolatedStructureId: null,
      originalPosition: null,
      originalRotation: null,
      originalScale: null,
      isolatedPosition: [0, 0, 0],
      isolatedRotation: [0, 0, 0],
      isolatedScale: [1, 1, 1],
      isIsolated: false,
    });
  },

  setIsolatedPosition: (position) => {
    set({ isolatedPosition: position });
  },

  setIsolatedRotation: (rotation) => {
    set({ isolatedRotation: rotation });
  },

  setIsolatedScale: (scale) => {
    set({ isolatedScale: scale });
  },

  setOtherOrgansMode: (mode) => {
    set({ otherOrgansMode: mode });
  },

  toggleOtherOrgansMode: () => {
    const modes: OtherOrgansMode[] = ['dimmed', 'hidden', 'normal'];
    const currentMode = get().otherOrgansMode;
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    set({ otherOrgansMode: modes[nextIndex] });
  },
}));

if (import.meta.env.DEV) {
  // @ts-expect-error 开发环境下暴露store到window便于调试
  window.useIsolateStore = useIsolateStore;
}
