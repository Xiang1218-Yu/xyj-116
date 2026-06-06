import { anatomyStructures } from './anatomyData';
import { getOrganInfoByStructureId } from './organInfoData';

export type QuestionType = 'name' | 'description' | 'function' | 'latin';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  targetStructureId: string;
  questionText: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const generateQuestions = (): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];

  anatomyStructures.forEach((structure, index) => {
    const organInfo = getOrganInfoByStructureId(structure.id);

    questions.push({
      id: `q-name-${structure.id}`,
      type: 'name',
      targetStructureId: structure.id,
      questionText: `请在3D模型上点击：${structure.name}`,
      hint: `所属系统：${structure.system}`,
      difficulty: 'easy'
    });

    questions.push({
      id: `q-latin-${structure.id}`,
      type: 'latin',
      targetStructureId: structure.id,
      questionText: `请在3D模型上点击拉丁名为 "${structure.latinName}" 的结构`,
      hint: `中文名称：${structure.name}`,
      difficulty: 'hard'
    });

    if (organInfo) {
      questions.push({
        id: `q-function-${structure.id}`,
        type: 'function',
        targetStructureId: structure.id,
        questionText: `请点击具有以下功能的器官：${organInfo.function.substring(0, 80)}...`,
        hint: `该器官位于${structure.layer}层`,
        difficulty: 'medium'
      });

      questions.push({
        id: `q-desc-${structure.id}`,
        type: 'description',
        targetStructureId: structure.id,
        questionText: `请点击以下描述对应的结构：${organInfo.description.substring(0, 80)}...`,
        hint: `该结构属于${structure.system}系统`,
        difficulty: 'medium'
      });
    }
  });

  return questions;
};

export const quizQuestions = generateQuestions();

export const getRandomQuestion = (excludeIds: string[] = []): QuizQuestion | null => {
  const availableQuestions = quizQuestions.filter(q => !excludeIds.includes(q.id));
  if (availableQuestions.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion[] => {
  return quizQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByType = (type: QuestionType): QuizQuestion[] => {
  return quizQuestions.filter(q => q.type === type);
};
