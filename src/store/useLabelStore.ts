import { create } from 'zustand';

type LabelMode = 'off' | 'selected' | 'all';

interface LabelState {
  showLabels: LabelMode;
  labelScale: number;
  showLatinName: boolean;
  toggleLabels: () => void;
  setShowLabels: (mode: LabelMode) => void;
  setLabelScale: (scale: number) => void;
  setShowLatinName: (show: boolean) => void;
}

export const useLabelStore = create<LabelState>((set, get) => ({
  showLabels: 'selected',
  labelScale: 1,
  showLatinName: false,

  toggleLabels: () => {
    const current = get().showLabels;
    if (current === 'off') set({ showLabels: 'selected' });
    else if (current === 'selected') set({ showLabels: 'all' });
    else set({ showLabels: 'off' });
  },

  setShowLabels: (mode) => set({ showLabels: mode }),
  setLabelScale: (scale) => set({ labelScale: scale }),
  setShowLatinName: (show) => set({ showLatinName: show }),
}));
