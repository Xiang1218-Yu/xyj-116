import { AnatomyStructure, OrganInfo, DissectionGuide, QuizQuestion } from '../../types';
import { anatomyStructures } from '../anatomyData';
import { organInfoData, shortFunctionMap } from '../organInfoData';
import { dissectionGuides } from '../dissectionGuides';
import { quizQuestions } from '../quizData';

export interface IDataSource {
  getAnatomyStructures(): readonly AnatomyStructure[];
  getOrganInfoData(): readonly OrganInfo[];
  getDissectionGuides(): readonly DissectionGuide[];
  getQuizQuestions(): readonly QuizQuestion[];
  getShortFunctionMap(): Readonly<Record<string, string>>;
}

class StaticDataSource implements IDataSource {
  private static instance: StaticDataSource;
  private structures: readonly AnatomyStructure[];
  private organInfo: readonly OrganInfo[];
  private guides: readonly DissectionGuide[];
  private questions: readonly QuizQuestion[];
  private shortFunctions: Readonly<Record<string, string>>;

  private constructor() {
    this.structures = Object.freeze([...anatomyStructures]);
    this.organInfo = Object.freeze([...organInfoData]);
    this.guides = Object.freeze([...dissectionGuides]);
    this.questions = Object.freeze([...quizQuestions]);
    this.shortFunctions = Object.freeze({ ...shortFunctionMap });
  }

  static getInstance(): StaticDataSource {
    if (!StaticDataSource.instance) {
      StaticDataSource.instance = new StaticDataSource();
    }
    return StaticDataSource.instance;
  }

  getAnatomyStructures(): readonly AnatomyStructure[] {
    return this.structures;
  }

  getOrganInfoData(): readonly OrganInfo[] {
    return this.organInfo;
  }

  getDissectionGuides(): readonly DissectionGuide[] {
    return this.guides;
  }

  getQuizQuestions(): readonly QuizQuestion[] {
    return this.questions;
  }

  getShortFunctionMap(): Readonly<Record<string, string>> {
    return this.shortFunctions;
  }
}

export const staticDataSource = StaticDataSource.getInstance();
