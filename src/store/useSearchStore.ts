import { create } from 'zustand';
import { pinyin } from 'pinyin-pro';
import {
  anatomyStructureRepository,
  organInfoRepository,
} from '../data/repositories';
import { AnatomyStructure, ClinicalCase, Pathology } from '../types';

type SearchResultType = 'structure' | 'pathology' | 'case';

interface SearchResult {
  id: string;
  type: SearchResultType;
  name: string;
  description: string;
  structureId?: string;
  structureName?: string;
  matchText: string;
}

interface SearchState {
  searchQuery: string;
  searchResults: SearchResult[];
  highlightedStructureId: string | null;
  selectedResultId: string | null;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  selectResult: (result: SearchResult) => void;
  clearHighlight: () => void;
  clearSelection: () => void;
}

const getPinyinFirstLetter = (text: string): string => {
  return pinyin(text, { pattern: 'first', toneType: 'none' }).replace(/\s/g, '').toLowerCase();
};

const getFullPinyin = (text: string): string => {
  return pinyin(text, { toneType: 'none' }).replace(/\s/g, '').toLowerCase();
};

const matchQuery = (text: string, query: string): boolean => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return false;
  
  const lowerText = text.toLowerCase();
  const pinyinFirstLetter = getPinyinFirstLetter(text);
  const fullPinyin = getFullPinyin(text);
  
  return lowerText.includes(lowerQuery) || 
         pinyinFirstLetter.includes(lowerQuery) || 
         fullPinyin.includes(lowerQuery);
};

const searchAll = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  const allStructures = anatomyStructureRepository.findAll();
  allStructures.forEach((structure: AnatomyStructure) => {
    if (matchQuery(structure.name, lowerQuery) || 
        matchQuery(structure.latinName, lowerQuery)) {
      results.push({
        id: structure.id,
        type: 'structure',
        name: structure.name,
        description: structure.latinName,
        structureId: structure.id,
        structureName: structure.name,
        matchText: structure.name,
      });
    }
  });

  const allOrganInfo = organInfoRepository.findAll();
  allOrganInfo.forEach((organInfo) => {
    const structure = anatomyStructureRepository.findById(organInfo.structureId);
    
    organInfo.commonPathologies.forEach((pathology: Pathology) => {
      if (matchQuery(pathology.name, lowerQuery) || 
          matchQuery(pathology.description, lowerQuery) ||
          pathology.symptoms.some(s => matchQuery(s, lowerQuery))) {
        results.push({
          id: pathology.id,
          type: 'pathology',
          name: pathology.name,
          description: pathology.description,
          structureId: organInfo.structureId,
          structureName: structure?.name,
          matchText: pathology.name,
        });
      }
    });

    organInfo.clinicalCases.forEach((caseItem: ClinicalCase) => {
      if (matchQuery(caseItem.title, lowerQuery) || 
          matchQuery(caseItem.patientInfo, lowerQuery) ||
          matchQuery(caseItem.presentation, lowerQuery) ||
          matchQuery(caseItem.diagnosis, lowerQuery) ||
          matchQuery(caseItem.treatment, lowerQuery) ||
          matchQuery(caseItem.outcome, lowerQuery)) {
        results.push({
          id: caseItem.id,
          type: 'case',
          name: caseItem.title,
          description: caseItem.presentation,
          structureId: organInfo.structureId,
          structureName: structure?.name,
          matchText: caseItem.title,
        });
      }
    });
  });

  return results;
};

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  searchResults: [],
  highlightedStructureId: null,
  selectedResultId: null,

  setSearchQuery: (query: string) => {
    const results = searchAll(query);
    set({
      searchQuery: query,
      searchResults: results,
      highlightedStructureId: null,
      selectedResultId: null,
    });
  },

  clearSearch: () => {
    set({
      searchQuery: '',
      searchResults: [],
      highlightedStructureId: null,
      selectedResultId: null,
    });
  },

  selectResult: (result: SearchResult) => {
    set({
      highlightedStructureId: result.structureId || null,
      selectedResultId: result.id,
      searchQuery: '',
      searchResults: [],
    });
  },

  clearHighlight: () => {
    set({ highlightedStructureId: null });
  },

  clearSelection: () => {
    set({ selectedResultId: null });
  },
}));
