import { create } from 'zustand';
import { pinyin } from 'pinyin-pro';
import { anatomyStructures } from '../data/anatomyData';
import { AnatomyStructure } from '../types';

interface SearchState {
  searchQuery: string;
  searchResults: string[];
  highlightedStructureId: string | null;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  selectResult: (id: string) => void;
  clearHighlight: () => void;
}

const getPinyinFirstLetter = (text: string): string => {
  return pinyin(text, { pattern: 'first', toneType: 'none' }).replace(/\s/g, '').toLowerCase();
};

const getFullPinyin = (text: string): string => {
  return pinyin(text, { toneType: 'none' }).replace(/\s/g, '').toLowerCase();
};

const searchStructures = (query: string): string[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  
  return anatomyStructures
    .filter((structure: AnatomyStructure) => {
      const nameMatch = structure.name.toLowerCase().includes(lowerQuery);
      const latinNameMatch = structure.latinName.toLowerCase().includes(lowerQuery);
      const pinyinFirstLetter = getPinyinFirstLetter(structure.name);
      const fullPinyin = getFullPinyin(structure.name);
      const pinyinMatch = pinyinFirstLetter.includes(lowerQuery) || fullPinyin.includes(lowerQuery);
      
      return nameMatch || latinNameMatch || pinyinMatch;
    })
    .map(s => s.id);
};

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  searchResults: [],
  highlightedStructureId: null,

  setSearchQuery: (query: string) => {
    const results = searchStructures(query);
    set({
      searchQuery: query,
      searchResults: results,
      highlightedStructureId: null
    });
  },

  clearSearch: () => {
    set({
      searchQuery: '',
      searchResults: [],
      highlightedStructureId: null
    });
  },

  selectResult: (id: string) => {
    set({
      highlightedStructureId: id,
      searchQuery: '',
      searchResults: []
    });
  },

  clearHighlight: () => {
    set({ highlightedStructureId: null });
  }
}));
