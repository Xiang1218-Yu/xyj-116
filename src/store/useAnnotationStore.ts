import { create } from 'zustand';
import { Annotation, AnnotationColor, AnnotationPriority } from '../types';

interface AnnotationStore {
  annotations: Annotation[];
  isAnnotationMode: boolean;
  selectedAnnotationId: string | null;
  pendingAnnotationPosition: [number, number, number] | null;
  showAnnotationPanel: boolean;

  setAnnotationMode: (enabled: boolean) => void;
  setPendingAnnotationPosition: (position: [number, number, number] | null) => void;
  setSelectedAnnotationId: (id: string | null) => void;
  setShowAnnotationPanel: (show: boolean) => void;

  addAnnotation: (data: {
    position: [number, number, number];
    title: string;
    content: string;
    color: AnnotationColor;
    priority: AnnotationPriority;
    targetStructureId?: string;
  }) => void;

  updateAnnotation: (
    id: string,
    data: Partial<{
      title: string;
      content: string;
      color: AnnotationColor;
      priority: AnnotationPriority;
    }>
  ) => void;

  deleteAnnotation: (id: string) => void;

  clearPendingAnnotation: () => void;
  closeAnnotationPanel: () => void;
}

const generateId = () => `annotation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useAnnotationStore = create<AnnotationStore>((set, get) => ({
  annotations: [],
  isAnnotationMode: false,
  selectedAnnotationId: null,
  pendingAnnotationPosition: null,
  showAnnotationPanel: false,

  setAnnotationMode: (enabled) => {
    set({ 
      isAnnotationMode: enabled,
      pendingAnnotationPosition: null,
      selectedAnnotationId: null,
      showAnnotationPanel: false
    });
  },

  setPendingAnnotationPosition: (position) => {
    set({ 
      pendingAnnotationPosition: position,
      showAnnotationPanel: position !== null,
      selectedAnnotationId: null
    });
  },

  setSelectedAnnotationId: (id) => {
    set({ 
      selectedAnnotationId: id,
      showAnnotationPanel: id !== null,
      pendingAnnotationPosition: null
    });
  },

  setShowAnnotationPanel: (show) => {
    set({ showAnnotationPanel: show });
  },

  addAnnotation: (data) => {
    const now = Date.now();
    const newAnnotation: Annotation = {
      id: generateId(),
      position: data.position,
      title: data.title,
      content: data.content,
      color: data.color,
      priority: data.priority,
      createdAt: now,
      updatedAt: now,
      targetStructureId: data.targetStructureId
    };

    set((state) => ({
      annotations: [...state.annotations, newAnnotation],
      pendingAnnotationPosition: null,
      showAnnotationPanel: false,
      selectedAnnotationId: newAnnotation.id
    }));
  },

  updateAnnotation: (id, data) => {
    set((state) => ({
      annotations: state.annotations.map((ann) =>
        ann.id === id
          ? { ...ann, ...data, updatedAt: Date.now() }
          : ann
      )
    }));
  },

  deleteAnnotation: (id) => {
    set((state) => ({
      annotations: state.annotations.filter((ann) => ann.id !== id),
      selectedAnnotationId: state.selectedAnnotationId === id ? null : state.selectedAnnotationId,
      showAnnotationPanel: state.selectedAnnotationId === id ? false : state.showAnnotationPanel
    }));
  },

  clearPendingAnnotation: () => {
    set({
      pendingAnnotationPosition: null,
      showAnnotationPanel: false
    });
  },

  closeAnnotationPanel: () => {
    set({
      showAnnotationPanel: false,
      pendingAnnotationPosition: null,
      selectedAnnotationId: null
    });
  }
}));
