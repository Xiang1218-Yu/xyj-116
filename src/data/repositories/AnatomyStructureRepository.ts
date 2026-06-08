import { BaseReadonlyRepository } from './base/BaseReadonlyRepository';
import { AnatomyStructure, AnatomyLayer, BodySystem } from '../../types';
import { staticDataSource } from '../sources/staticData';

export interface AnatomyStructureQuery {
  layer?: AnatomyLayer;
  system?: BodySystem;
  name?: string;
  latinName?: string;
}

class AnatomyStructureRepository extends BaseReadonlyRepository<
  AnatomyStructure,
  AnatomyStructureQuery
> {
  private static instance: AnatomyStructureRepository;

  private constructor() {
    super();
  }

  static getInstance(): AnatomyStructureRepository {
    if (!AnatomyStructureRepository.instance) {
      AnatomyStructureRepository.instance = new AnatomyStructureRepository();
    }
    return AnatomyStructureRepository.instance;
  }

  protected getDataSource(): readonly AnatomyStructure[] {
    return staticDataSource.getAnatomyStructures();
  }

  protected matches(
    item: AnatomyStructure,
    query: AnatomyStructureQuery
  ): boolean {
    if (query.layer !== undefined && item.layer !== query.layer) return false;
    if (query.system !== undefined && item.system !== query.system) return false;
    if (query.name !== undefined && !item.name.includes(query.name)) return false;
    if (query.latinName !== undefined && !item.latinName.includes(query.latinName)) return false;
    return true;
  }

  findByLayer(layer: AnatomyLayer): readonly AnatomyStructure[] {
    return this.findMany({ layer });
  }

  findBySystem(system: BodySystem): readonly AnatomyStructure[] {
    return this.findMany({ system });
  }

  findByName(name: string): AnatomyStructure | undefined {
    return this.findOne({ name });
  }

  findByLatinName(latinName: string): AnatomyStructure | undefined {
    return this.findOne({ latinName });
  }

  searchByName(query: string): readonly AnatomyStructure[] {
    const lowerQuery = query.toLowerCase();
    return this.getDataSource().filter(
      (s) =>
        s.name.toLowerCase().includes(lowerQuery) ||
        s.latinName.toLowerCase().includes(lowerQuery)
    );
  }
}

export const anatomyStructureRepository = AnatomyStructureRepository.getInstance();
