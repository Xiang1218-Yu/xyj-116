import { create } from 'zustand';

interface SelectionState {
  selectedStructureId: string | null;
  hoveredStructureId: string | null;
  setSelectedStructureId: (id: string | null) => void;
  setHoveredStructureId: (id: string | null) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedStructureId: null,
  hoveredStructureId: null,

  setSelectedStructureId: (id: string | null) => {
    set({ selectedStructureId: id });
  },

  setHoveredStructureId: (id: string | null) => {
    set({ hoveredStructureId: id });
  },

  clearSelection: () => {
    set({ selectedStructureId: null, hoveredStructureId: null });
  }
}));

if (import.meta.env.DEV) {
  // @ts-expect-error 开发环境下暴露store到window便于调试
  window.useSelectionStore = useSelectionStore;
}
