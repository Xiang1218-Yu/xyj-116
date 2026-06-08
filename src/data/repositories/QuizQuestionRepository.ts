import { BaseReadonlyRepository } from './base/BaseReadonlyRepository';
import { QuizQuestion } from '../quizData';
import { QuestionType } from '../quizData';
import { staticDataSource } from '../sources/staticData';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestionQuery {
  type?: QuestionType;
  difficulty?: QuizDifficulty;
  targetStructureId?: string;
  excludeIds?: string[];
}

class QuizQuestionRepository extends BaseReadonlyRepository<
  QuizQuestion,
  QuizQuestionQuery
> {
  private static instance: QuizQuestionRepository;

  private constructor() {
    super();
  }

  static getInstance(): QuizQuestionRepository {
    if (!QuizQuestionRepository.instance) {
      QuizQuestionRepository.instance = new QuizQuestionRepository();
    }
    return QuizQuestionRepository.instance;
  }

  protected getDataSource(): readonly QuizQuestion[] {
    return staticDataSource.getQuizQuestions();
  }

  protected matches(item: QuizQuestion, query: QuizQuestionQuery): boolean {
    if (query.type !== undefined && item.type !== query.type) return false;
    if (query.difficulty !== undefined && item.difficulty !== query.difficulty) return false;
    if (query.targetStructureId !== undefined && item.targetStructureId !== query.targetStructureId) {
      return false;
    }
    if (query.excludeIds !== undefined && query.excludeIds.includes(item.id)) return false;
    return true;
  }

  findByType(type: QuestionType): readonly QuizQuestion[] {
    return this.findMany({ type });
  }

  findByDifficulty(difficulty: QuizDifficulty): readonly QuizQuestion[] {
    return this.findMany({ difficulty });
  }

  findByTargetStructureId(structureId: string): readonly QuizQuestion[] {
    return this.findMany({ targetStructureId: structureId });
  }

  getRandom(excludeIds: string[] = []): QuizQuestion | null {
    const available = this.findMany({ excludeIds });
    if (available.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex] as QuizQuestion;
  }

  getRandomByDifficulty(difficulty: QuizDifficulty, excludeIds: string[] = []): QuizQuestion | null {
    const available = this.findMany({ difficulty, excludeIds });
    if (available.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex] as QuizQuestion;
  }

  getRandomByType(type: QuestionType, excludeIds: string[] = []): QuizQuestion | null {
    const available = this.findMany({ type, excludeIds });
    if (available.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex] as QuizQuestion;
  }

  countByDifficulty(difficulty: QuizDifficulty): number {
    return this.count({ difficulty });
  }

  countByType(type: QuestionType): number {
    return this.count({ type });
  }
}

export const quizQuestionRepository = QuizQuestionRepository.getInstance();
