export { IRepository, IReadonlyRepository } from './base/IRepository';
export { BaseReadonlyRepository, QueryPredicate } from './base/BaseReadonlyRepository';

export {
  anatomyStructureRepository,
  AnatomyStructureQuery,
} from './AnatomyStructureRepository';

export {
  organInfoRepository,
  OrganInfoQuery,
} from './OrganInfoRepository';

export {
  dissectionGuideRepository,
  DissectionGuideQuery,
  GuideCategory,
  GuideDifficulty,
} from './DissectionGuideRepository';

export {
  quizQuestionRepository,
  QuizQuestionQuery,
  QuizDifficulty,
} from './QuizQuestionRepository';
