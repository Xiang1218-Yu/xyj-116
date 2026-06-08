import { BaseReadonlyRepository } from './base/BaseReadonlyRepository';
import { OrganInfo, DiseaseType, Pathology, ClinicalCase } from '../../types';
import { staticDataSource } from '../sources/staticData';

export interface OrganInfoQuery {
  structureId?: string;
  hasPathologyType?: DiseaseType;
  hasPathologySeverity?: 'mild' | 'moderate' | 'severe';
}

class OrganInfoRepository extends BaseReadonlyRepository<OrganInfo, OrganInfoQuery> {
  private static instance: OrganInfoRepository;

  private constructor() {
    super();
  }

  static getInstance(): OrganInfoRepository {
    if (!OrganInfoRepository.instance) {
      OrganInfoRepository.instance = new OrganInfoRepository();
    }
    return OrganInfoRepository.instance;
  }

  protected getDataSource(): readonly OrganInfo[] {
    return staticDataSource.getOrganInfoData();
  }

  protected matches(item: OrganInfo, query: OrganInfoQuery): boolean {
    if (query.structureId !== undefined && item.structureId !== query.structureId) {
      return false;
    }
    if (query.hasPathologyType !== undefined) {
      const hasType = item.commonPathologies.some((p) => p.diseaseType === query.hasPathologyType);
      if (!hasType) return false;
    }
    if (query.hasPathologySeverity !== undefined) {
      const hasSeverity = item.commonPathologies.some(
        (p) => p.severity === query.hasPathologySeverity
      );
      if (!hasSeverity) return false;
    }
    return true;
  }

  findByStructureId(structureId: string): OrganInfo | undefined {
    return this.findOne({ structureId });
  }

  getShortFunctionByStructureId(structureId: string): string {
    const shortFunctionMap = staticDataSource.getShortFunctionMap();
    return shortFunctionMap[structureId] || '解剖结构';
  }

  getAllPathologies(): readonly Pathology[] {
    return this.getDataSource().flatMap((info) => info.commonPathologies);
  }

  getAllClinicalCases(): readonly ClinicalCase[] {
    return this.getDataSource().flatMap((info) => info.clinicalCases);
  }

  searchPathologies(query: string): readonly Pathology[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllPathologies().filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.symptoms.some((s) => s.toLowerCase().includes(lowerQuery))
    );
  }

  searchClinicalCases(query: string): readonly ClinicalCase[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllClinicalCases().filter(
      (c) =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.patientInfo.toLowerCase().includes(lowerQuery) ||
        c.presentation.toLowerCase().includes(lowerQuery) ||
        c.diagnosis.toLowerCase().includes(lowerQuery) ||
        c.treatment.toLowerCase().includes(lowerQuery) ||
        c.outcome.toLowerCase().includes(lowerQuery)
    );
  }

  findPathologyById(pathologyId: string): Pathology | undefined {
    return this.getAllPathologies().find((p) => p.id === pathologyId);
  }

  findClinicalCaseById(caseId: string): ClinicalCase | undefined {
    return this.getAllClinicalCases().find((c) => c.id === caseId);
  }
}

export const organInfoRepository = OrganInfoRepository.getInstance();
