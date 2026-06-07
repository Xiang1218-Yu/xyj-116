import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User, HelpCircle, Menu, X, Search, ChevronRight, MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { BodySystem, SYSTEM_NAMES, AnatomyStructure } from '../../types';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { useAnnotationStore } from '../../store/useAnnotationStore';
import { GlassButton } from '../ui/GlassButton';
import { cn } from '../../lib/utils';
import { useSearchStore } from '../../store/useSearchStore';
import { getStructureById } from '../../data/anatomyData';

const systemOptions: { id: BodySystem | null; label: string; icon: string }[] = [
  { id: null, label: '全部系统', icon: '🧬' },
  { id: BodySystem.SKELETAL, label: SYSTEM_NAMES[BodySystem.SKELETAL], icon: '🦴' },
  { id: BodySystem.MUSCULAR, label: SYSTEM_NAMES[BodySystem.MUSCULAR], icon: '💪' },
  { id: BodySystem.NERVOUS, label: SYSTEM_NAMES[BodySystem.NERVOUS], icon: '🧠' },
  { id: BodySystem.CIRCULATORY, label: SYSTEM_NAMES[BodySystem.CIRCULATORY], icon: '❤️' },
  { id: BodySystem.RESPIRATORY, label: SYSTEM_NAMES[BodySystem.RESPIRATORY], icon: '🫁' },
  { id: BodySystem.DIGESTIVE, label: SYSTEM_NAMES[BodySystem.DIGESTIVE], icon: '🍽️' },
  { id: BodySystem.ENDOCRINE, label: SYSTEM_NAMES[BodySystem.ENDOCRINE], icon: '🩸' },
];

export function TopNavbar() {
  const { activeSystem, setActiveSystem } = useAnatomyStore();
  const { searchQuery, searchResults, setSearchQuery, clearSearch, selectResult } = useSearchStore();
  const { isAnnotationMode, setAnnotationMode, annotations } = useAnnotationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resultStructures = searchResults
    .map(id => getStructureById(id))
    .filter(Boolean) as AnatomyStructure[];

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < resultStructures.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : resultStructures.length - 1
      );
    } else if (e.key === 'Enter' && resultStructures.length > 0) {
      e.preventDefault();
      selectResult(resultStructures[selectedIndex].id);
      setSearchOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      clearSearch();
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (id: string) => {
    selectResult(id);
    setSearchOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                3D解剖系统
              </h1>
              <p className="text-[10px] text-white/50 tracking-widest">VIRTUAL ANATOMY LAB</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08]">
            {systemOptions.map((system, index) => (
              <GlassButton
                key={system.id || 'all'}
                variant={activeSystem === system.id ? 'primary' : 'ghost'}
                size="sm"
                active={activeSystem === system.id}
                onClick={() => setActiveSystem(system.id)}
                className="flex items-center gap-1.5"
              >
                <span className="text-base">{system.icon}</span>
                <span className="whitespace-nowrap">{system.label}</span>
              </GlassButton>
            ))}
          </div>

          <div ref={searchContainerRef} className="hidden md:block relative w-56 lg:w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="搜索器官..."
                className="w-full pl-10 pr-10 py-2 bg-white/[0.05] backdrop-blur-xl rounded-xl border border-white/[0.08] text-white placeholder-white/40 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    clearSearch();
                    inputRef.current?.blur();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <AnimatePresence>
              {searchOpen && resultStructures.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto bg-slate-900/95 backdrop-blur-2xl rounded-xl border border-white/[0.08] shadow-2xl shadow-black/50"
                >
                  {resultStructures.map((structure, index) => (
                    <button
                      key={structure.id}
                      onClick={() => handleResultClick(structure.id)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center gap-3 text-left transition-all",
                        index === selectedIndex
                          ? "bg-cyan-500/20 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: structure.geometry.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{structure.name}</div>
                        <div className="text-[10px] text-white/40 truncate">{structure.latinName}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {searchOpen && searchQuery && resultStructures.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 px-4 py-3 bg-slate-900/95 backdrop-blur-2xl rounded-xl border border-white/[0.08] shadow-2xl shadow-black/50 text-center"
                >
                  <div className="text-white/50 text-sm">未找到匹配的器官</div>
                  <div className="text-white/30 text-xs mt-1">支持中文、拉丁文、拼音首字母</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <GlassButton
                variant={isAnnotationMode ? 'primary' : 'ghost'}
                size="sm"
                active={isAnnotationMode}
                onClick={() => setAnnotationMode(!isAnnotationMode)}
                className={cn(
                  'relative flex items-center gap-1.5',
                  isAnnotationMode && 'shadow-lg shadow-pink-500/20'
                )}
              >
                <MapPin className={cn(
                  'w-4 h-4',
                  isAnnotationMode ? 'text-pink-300' : 'text-white/70'
                )} />
                <span className={cn(
                  'text-xs',
                  isAnnotationMode ? 'text-pink-200' : 'text-white/70'
                )}>
                  标注
                </span>
                {annotations.length > 0 && (
                  <span className={cn(
                    'absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center',
                    isAnnotationMode ? 'bg-pink-500 text-white' : 'bg-cyan-500 text-white'
                  )}>
                    {annotations.length}
                  </span>
                )}
              </GlassButton>
              <GlassButton variant="ghost" size="sm">
                <HelpCircle className="w-4 h-4" />
              </GlassButton>
              <GlassButton variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </GlassButton>
            </div>
            <GlassButton 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </GlassButton>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="md:hidden mt-3 p-3 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索器官..."
                  className="w-full pl-10 pr-10 py-2 bg-white/[0.05] rounded-xl border border-white/[0.08] text-white placeholder-white/40 text-sm focus:outline-none focus:border-cyan-400/50"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {resultStructures.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto">
                  {resultStructures.map((structure) => (
                    <button
                      key={structure.id}
                      onClick={() => {
                        handleResultClick(structure.id);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 text-left text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all"
                    >
                      <div 
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: structure.geometry.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{structure.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {systemOptions.map((system) => (
                <GlassButton
                  key={system.id || 'all'}
                  variant={activeSystem === system.id ? 'primary' : 'ghost'}
                  size="sm"
                  active={activeSystem === system.id}
                  onClick={() => {
                    setActiveSystem(system.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-center"
                >
                  <span className="text-base">{system.icon}</span>
                  <span>{system.label}</span>
                </GlassButton>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
