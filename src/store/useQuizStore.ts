import { create } from 'zustand';
import { QuizQuestion, getRandomQuestion } from '../data/quizData';

export type AnswerResult = 'correct' | 'wrong' | null;

interface QuizState {
  isQuizMode: boolean;
  currentQuestion: QuizQuestion | null;
  score: number;
  totalAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  lastAnswerResult: AnswerResult;
  lastClickedStructureId: string | null;
  showHint: boolean;
  answeredQuestionIds: string[];
  streak: number;
  bestStreak: number;

  toggleQuizMode: () => void;
  startQuiz: () => void;
  endQuiz: () => void;
  nextQuestion: () => void;
  submitAnswer: (structureId: string) => boolean;
  toggleHint: () => void;
  resetQuiz: () => void;
  clearLastResult: () => void;
}

const SCORE_MAP = {
  easy: 10,
  medium: 20,
  hard: 30
};

const STREAK_BONUS = 5;

export const useQuizStore = create<QuizState>((set, get) => ({
  isQuizMode: false,
  currentQuestion: null,
  score: 0,
  totalAnswered: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  lastAnswerResult: null,
  lastClickedStructureId: null,
  showHint: false,
  answeredQuestionIds: [],
  streak: 0,
  bestStreak: 0,

  toggleQuizMode: () => {
    const { isQuizMode } = get();
    if (isQuizMode) {
      get().endQuiz();
    } else {
      get().startQuiz();
    }
  },

  startQuiz: () => {
    set({
      isQuizMode: true,
      score: 0,
      totalAnswered: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      lastAnswerResult: null,
      lastClickedStructureId: null,
      showHint: false,
      answeredQuestionIds: [],
      streak: 0
    });
    get().nextQuestion();
  },

  endQuiz: () => {
    set({
      isQuizMode: false,
      currentQuestion: null,
      lastAnswerResult: null,
      lastClickedStructureId: null,
      showHint: false
    });
  },

  nextQuestion: () => {
    const { answeredQuestionIds } = get();
    const nextQ = getRandomQuestion(answeredQuestionIds);
    
    set({
      currentQuestion: nextQ,
      lastAnswerResult: null,
      lastClickedStructureId: null,
      showHint: false
    });
  },

  submitAnswer: (structureId: string): boolean => {
    const { currentQuestion, score, streak, bestStreak, correctAnswers, wrongAnswers, totalAnswered, answeredQuestionIds } = get();
    
    if (!currentQuestion) return false;

    const isCorrect = structureId === currentQuestion.targetStructureId;
    const newStreak = isCorrect ? streak + 1 : 0;
    const streakBonus = isCorrect && newStreak > 1 ? STREAK_BONUS * (newStreak - 1) : 0;
    const baseScore = isCorrect ? SCORE_MAP[currentQuestion.difficulty] : 0;
    const newScore = score + baseScore + streakBonus;

    set({
      lastAnswerResult: isCorrect ? 'correct' : 'wrong',
      lastClickedStructureId: structureId,
      totalAnswered: totalAnswered + 1,
      correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
      wrongAnswers: isCorrect ? wrongAnswers : wrongAnswers + 1,
      score: newScore,
      streak: newStreak,
      bestStreak: Math.max(bestStreak, newStreak),
      answeredQuestionIds: [...answeredQuestionIds, currentQuestion.id]
    });

    return isCorrect;
  },

  toggleHint: () => {
    set((state) => ({ showHint: !state.showHint }));
  },

  resetQuiz: () => {
    set({
      score: 0,
      totalAnswered: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      lastAnswerResult: null,
      lastClickedStructureId: null,
      showHint: false,
      answeredQuestionIds: [],
      streak: 0,
      bestStreak: 0
    });
    get().nextQuestion();
  },

  clearLastResult: () => {
    set({
      lastAnswerResult: null,
      lastClickedStructureId: null
    });
  }
}));
