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
