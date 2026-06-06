import { create } from 'zustand';
import { AnatomyLayer, ANATOMY_LAYER_ORDER, BodySystem } from '../types';

interface AnatomyState {
  currentLayer: AnatomyLayer;
  activeSystem: BodySystem | null;
  layerProgress: number;
  setCurrentLayer: (layer: AnatomyLayer) => void;
  setActiveSystem: (system: BodySystem | null) => void;
  peelLayer: () => void;
  restoreLayer: () => void;
  resetToFull: () => void;
  isLayerVisible: (layer: AnatomyLayer) => boolean;
}

export const useAnatomyStore = create<AnatomyState>((set, get) => ({
  currentLayer: AnatomyLayer.SKIN,
  activeSystem: null,
  layerProgress: 0,

  setCurrentLayer: (layer: AnatomyLayer) => {
    const layerIndex = ANATOMY_LAYER_ORDER.indexOf(layer);
    set({ 
      currentLayer: layer,
      layerProgress: layerIndex / (ANATOMY_LAYER_ORDER.length - 1)
    });
  },

  setActiveSystem: (system: BodySystem | null) => {
    set({ activeSystem: system });
  },

  peelLayer: () => {
    const { currentLayer } = get();
    const currentIndex = ANATOMY_LAYER_ORDER.indexOf(currentLayer);
    if (currentIndex < ANATOMY_LAYER_ORDER.length - 1) {
      const nextLayer = ANATOMY_LAYER_ORDER[currentIndex + 1];
      get().setCurrentLayer(nextLayer);
    }
  },

  restoreLayer: () => {
    const { currentLayer } = get();
    const currentIndex = ANATOMY_LAYER_ORDER.indexOf(currentLayer);
    if (currentIndex > 0) {
      const prevLayer = ANATOMY_LAYER_ORDER[currentIndex - 1];
      get().setCurrentLayer(prevLayer);
    }
  },

  resetToFull: () => {
    get().setCurrentLayer(AnatomyLayer.SKIN);
    set({ activeSystem: null });
  },

  isLayerVisible: (layer: AnatomyLayer) => {
    const { currentLayer } = get();
    const currentIndex = ANATOMY_LAYER_ORDER.indexOf(currentLayer);
    const layerIndex = ANATOMY_LAYER_ORDER.indexOf(layer);
    return layerIndex >= currentIndex;
  }
}));
