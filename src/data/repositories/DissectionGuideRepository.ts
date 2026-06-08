import { BaseReadonlyRepository } from './base/BaseReadonlyRepository';
import { DissectionGuide, DissectionStep, AnatomyLayer } from '../../types';
import { staticDataSource } from '../sources/staticData';

export type GuideCategory = 'abdominal' | 'thoracic' | 'other';
export type GuideDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface DissectionGuideQuery {
  category?: GuideCategory;
  difficulty?: GuideDifficulty;
  title?: string;
  targetLayer?: AnatomyLayer;
}

class DissectionGuideRepository extends BaseReadonlyRepository<
  DissectionGuide,
  DissectionGuideQuery
> {
  private static instance: DissectionGuideRepository;

  private constructor() {
    super();
  }

  static getInstance(): DissectionGuideRepository {
    if (!DissectionGuideRepository.instance) {
      DissectionGuideRepository.instance = new DissectionGuideRepository();
    }
    return DissectionGuideRepository.instance;
  }

  protected getDataSource(): readonly DissectionGuide[] {
    return staticDataSource.getDissectionGuides();
  }

  protected matches(item: DissectionGuide, query: DissectionGuideQuery): boolean {
    if (query.category !== undefined && item.category !== query.category) return false;
    if (query.difficulty !== undefined && item.difficulty !== query.difficulty) return false;
    if (query.title !== undefined && !item.title.includes(query.title)) return false;
    if (query.targetLayer !== undefined) {
      const hasTargetLayer = item.steps.some((step) => step.targetLayer === query.targetLayer);
      if (!hasTargetLayer) return false;
    }
    return true;
  }

  findByCategory(category: GuideCategory): readonly DissectionGuide[] {
    return this.findMany({ category });
  }

  findByDifficulty(difficulty: GuideDifficulty): readonly DissectionGuide[] {
    return this.findMany({ difficulty });
  }

  findByTargetLayer(layer: AnatomyLayer): readonly DissectionGuide[] {
    return this.findMany({ targetLayer: layer });
  }

  getStepById(guideId: string, stepId: string): DissectionStep | undefined {
    const guide = this.findById(guideId);
    if (!guide) return undefined;
    return guide.steps.find((s) => s.id === stepId);
  }

  getStepByNumber(guideId: string, stepNumber: number): DissectionStep | undefined {
    const guide = this.findById(guideId);
    if (!guide) return undefined;
    return guide.steps.find((s) => s.stepNumber === stepNumber);
  }

  searchGuides(query: string): readonly DissectionGuide[] {
    const lowerQuery = query.toLowerCase();
    return this.getDataSource().filter(
      (g) =>
        g.title.toLowerCase().includes(lowerQuery) ||
        g.description.toLowerCase().includes(lowerQuery) ||
        g.learningObjectives.some((o) => o.toLowerCase().includes(lowerQuery))
    );
  }

  getAllSteps(): readonly DissectionStep[] {
    return this.getDataSource().flatMap((g) => g.steps);
  }
}

export const dissectionGuideRepository = DissectionGuideRepository.getInstance();
