import { create } from 'zustand';
import { CameraView } from '../types';

interface ViewState {
  cameraView: CameraView;
  isOrthographic: boolean;
  showLabels: boolean;
  autoRotate: boolean;
  setCameraView: (view: CameraView) => void;
  toggleOrthographic: () => void;
  toggleLabels: () => void;
  toggleAutoRotate: () => void;
  resetView: () => void;
}

export const useViewStore = create<ViewState>((set) => ({
  cameraView: 'front',
  isOrthographic: false,
  showLabels: true,
  autoRotate: false,

  setCameraView: (view: CameraView) => {
    set({ cameraView: view });
  },

  toggleOrthographic: () => {
    set((state) => ({ isOrthographic: !state.isOrthographic }));
  },

  toggleLabels: () => {
    set((state) => ({ showLabels: !state.showLabels }));
  },

  toggleAutoRotate: () => {
    set((state) => ({ autoRotate: !state.autoRotate }));
  },

  resetView: () => {
    set({
      cameraView: 'front',
      isOrthographic: false,
      showLabels: true,
      autoRotate: false
    });
  }
}));
