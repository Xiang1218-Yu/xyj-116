import { create } from 'zustand';
import { DissectionGuide, DissectionStep } from '../types';
import { dissectionGuideRepository } from '../data/repositories';
import { useAnatomyStore } from './useAnatomyStore';
import { useSelectionStore } from './useSelectionStore';

interface SpeechState {
  isSpeaking: boolean;
  isEnabled: boolean;
  speechRate: number;
}

interface DissectionGuideState {
  isPanelOpen: boolean;
  selectedGuide: DissectionGuide | null;
  currentStepIndex: number;
  completedSteps: Set<string>;
  isAutoPlaying: boolean;
  autoPlayInterval: number;
  speech: SpeechState;
  setPanelOpen: (open: boolean) => void;
  selectGuide: (guideId: string) => void;
  startGuide: (guideId: string) => void;
  exitGuide: () => void;
  goToStep: (stepIndex: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleAutoPlay: () => void;
  setAutoPlayInterval: (ms: number) => void;
  markStepComplete: (stepId: string) => void;
  getCurrentStep: () => DissectionStep | null;
  getProgress: () => number;
  setSpeechEnabled: (enabled: boolean) => void;
  setSpeechRate: (rate: number) => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  applyStepToScene: (step: DissectionStep) => void;
}

const speakText = (text: string, rate: number = 1.0): Promise<void> => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    } else {
      resolve();
    }
  });
};

const stopSpeech = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const useDissectionGuideStore = create<DissectionGuideState>((set, get) => ({
  isPanelOpen: false,
  selectedGuide: null,
  currentStepIndex: 0,
  completedSteps: new Set(),
  isAutoPlaying: false,
  autoPlayInterval: 30000,
  speech: {
    isSpeaking: false,
    isEnabled: true,
    speechRate: 0.9
  },

  setPanelOpen: (open: boolean) => {
    if (!open) {
      stopSpeech();
    }
    set({ isPanelOpen: open });
  },

  selectGuide: (guideId: string) => {
    const guide = dissectionGuideRepository.findById(guideId);
    if (guide) {
      set({ selectedGuide: guide, currentStepIndex: 0, completedSteps: new Set() });
    }
  },

  startGuide: (guideId: string) => {
    const guide = dissectionGuideRepository.findById(guideId);
    if (guide) {
      set({ 
        selectedGuide: guide, 
        currentStepIndex: 0, 
        completedSteps: new Set(),
        isPanelOpen: true 
      });
      const firstStep = guide.steps[0];
      if (firstStep) {
        get().applyStepToScene(firstStep);
        if (get().speech.isEnabled) {
          get().speak(firstStep.detailedInstruction);
        }
      }
    }
  },

  exitGuide: () => {
    stopSpeech();
    set({ 
      selectedGuide: null, 
      currentStepIndex: 0, 
      completedSteps: new Set(),
      isAutoPlaying: false
    });
    useAnatomyStore.getState().resetToFull();
    useSelectionStore.getState().clearSelection();
  },

  goToStep: (stepIndex: number) => {
    const { selectedGuide } = get();
    if (!selectedGuide) return;
    if (stepIndex < 0 || stepIndex >= selectedGuide.steps.length) return;

    stopSpeech();
    const step = selectedGuide.steps[stepIndex];
    set({ currentStepIndex: stepIndex });
    get().applyStepToScene(step);
    get().markStepComplete(step.id);
    
    if (get().speech.isEnabled) {
      get().speak(step.detailedInstruction);
    }
  },

  nextStep: () => {
    const { selectedGuide, currentStepIndex } = get();
    if (!selectedGuide) return;
    if (currentStepIndex < selectedGuide.steps.length - 1) {
      get().goToStep(currentStepIndex + 1);
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      get().goToStep(currentStepIndex - 1);
    }
  },

  toggleAutoPlay: () => {
    const { isAutoPlaying } = get();
    set({ isAutoPlaying: !isAutoPlaying });
  },

  setAutoPlayInterval: (ms: number) => {
    set({ autoPlayInterval: ms });
  },

  markStepComplete: (stepId: string) => {
    set((state) => ({
      completedSteps: new Set([...state.completedSteps, stepId])
    }));
  },

  getCurrentStep: () => {
    const { selectedGuide, currentStepIndex } = get();
    if (!selectedGuide) return null;
    return selectedGuide.steps[currentStepIndex] || null;
  },

  getProgress: () => {
    const { selectedGuide, completedSteps } = get();
    if (!selectedGuide) return 0;
    return completedSteps.size / selectedGuide.steps.length;
  },

  setSpeechEnabled: (enabled: boolean) => {
    if (!enabled) {
      stopSpeech();
    }
    set((state) => ({
      speech: { ...state.speech, isEnabled: enabled, isSpeaking: false }
    }));
  },

  setSpeechRate: (rate: number) => {
    set((state) => ({
      speech: { ...state.speech, speechRate: rate }
    }));
  },

  speak: async (text: string) => {
    const { speech } = get();
    if (!speech.isEnabled) return;
    
    set((state) => ({
      speech: { ...state.speech, isSpeaking: true }
    }));
    
    await speakText(text, speech.speechRate);
    
    set((state) => ({
      speech: { ...state.speech, isSpeaking: false }
    }));
  },

  stopSpeaking: () => {
    stopSpeech();
    set((state) => ({
      speech: { ...state.speech, isSpeaking: false }
    }));
  },

  applyStepToScene: (step: DissectionStep) => {
    const anatomyStore = useAnatomyStore.getState();
    const selectionStore = useSelectionStore.getState();
    
    anatomyStore.setCurrentLayer(step.targetLayer);
    
    selectionStore.clearSelection();
    if (step.highlightStructureIds.length > 0) {
      selectionStore.setSelectedStructureId(step.highlightStructureIds[0]);
    }
  }
}));
