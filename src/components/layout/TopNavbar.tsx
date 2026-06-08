import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User, HelpCircle, Menu, X, Search, ChevronRight, MapPin, Tag, BookOpen, AlertTriangle, Scan, Eye, EyeOff } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { BodySystem, SYSTEM_NAMES } from '../../types';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { useAnnotationStore } from '../../store/useAnnotationStore';
import { useLabelStore } from '../../store/useLabelStore';
import { GlassButton } from '../ui/GlassButton';
import { cn } from '../../lib/utils';
import { useSearchStore } from '../../store/useSearchStore';
import { useSelectionStore } from '../../store/useSelectionStore';

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

const labelModeConfig = {
  off: { label: '关闭标签', icon: <EyeOff className="w-4 h-4" /> },
  selected: { label: '仅选中显示', icon: <Tag className="w-4 h-4" /> },
  all: { label: '全部显示', icon: <Eye className="w-4 h-4" /> },
};

const resultTypeIcons = {
  structure: <Scan className="w-4 h-4 text-cyan-400" />,
  pathology: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  case: <BookOpen className="w-4 h-4 text-emerald-400" />,
};

const resultTypeLabels = {
  structure: '器官',
  pathology: '病变',
  case: '病例',
};

export function TopNavbar() {
  const { activeSystem, setActiveSystem } = useAnatomyStore();
  const { searchQuery, searchResults, setSearchQuery, clearSearch, selectResult } = useSearchStore();
  const { isAnnotationMode, setAnnotationMode, annotations } = useAnnotationStore();
  const { showLabels, toggleLabels, setShowLabels, showLatinName, setShowLatinName } = useLabelStore();
  const { setSelectedStructureId } = useSelectionStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      const result = searchResults[selectedIndex];
      selectResult(result);
      if (result.structureId) {
        setSelectedStructureId(result.structureId);
      }
      setSearchOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      clearSearch();
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (result: typeof searchResults[0]) => {
    selectResult(result);
    if (result.structureId) {
      setSelectedStructureId(result.structureId);
    }
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

          <div ref={searchContainerRef} className="hidden md:block relative w-56 lg:w-72">
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
                placeholder="搜索器官、病变、病例..."
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
              {searchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto bg-slate-900/95 backdrop-blur-2xl rounded-xl border border-white/[0.08] shadow-2xl shadow-black/50"
                >
                  {searchResults.map((result, index) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center gap-3 text-left transition-all",
                        index === selectedIndex
                          ? "bg-cyan-500/20 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: result.type === 'structure' 
                            ? 'rgba(0, 188, 212, 0.15)' 
                            : result.type === 'pathology'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)'
                        }}
                      >
                        {resultTypeIcons[result.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium truncate">{result.name}</div>
                          <span className={cn(
                            "px-1.5 py-0.5 text-[9px] font-medium rounded-full flex-shrink-0",
                            result.type === 'structure' && 'bg-cyan-500/20 text-cyan-400',
                            result.type === 'pathology' && 'bg-amber-500/20 text-amber-400',
                            result.type === 'case' && 'bg-emerald-500/20 text-emerald-400'
                          )}>
                            {resultTypeLabels[result.type]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-white/40 truncate">
                            {result.structureName && `${result.structureName} · `}
                            {result.description.length > 30 ? result.description.slice(0, 30) + '...' : result.description}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {searchOpen && searchQuery && searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 px-4 py-3 bg-slate-900/95 backdrop-blur-2xl rounded-xl border border-white/[0.08] shadow-2xl shadow-black/50 text-center"
                >
                  <div className="text-white/50 text-sm">未找到匹配结果</div>
                  <div className="text-white/30 text-xs mt-1">支持中文、拉丁文、拼音首字母</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <GlassButton
                variant={showLabels !== 'off' ? 'primary' : 'ghost'}
                size="sm"
                onClick={toggleLabels}
                active={showLabels !== 'off'}
                className="relative flex items-center gap-1.5"
                title={labelModeConfig[showLabels].label}
              >
                {labelModeConfig[showLabels].icon}
                <span className="text-xs">标签</span>
              </GlassButton>

              <GlassButton
                variant={showLatinName ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setShowLatinName(!showLatinName)}
                active={showLatinName}
                className="flex items-center gap-1.5"
                title={showLatinName ? '隐藏拉丁文名称' : '显示拉丁文名称'}
              >
                <span className="text-xs italic">Lat</span>
              </GlassButton>

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
                  placeholder="搜索器官、病变、病例..."
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
              {searchResults.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => {
                        handleResultClick(result);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 text-left text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all"
                    >
                      <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
                        {resultTypeIcons[result.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{result.name}</div>
                        <div className="text-[10px] text-white/40">
                          {resultTypeLabels[result.type]} · {result.structureName}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <GlassButton
                variant={showLabels !== 'off' ? 'primary' : 'ghost'}
                size="sm"
                onClick={toggleLabels}
                active={showLabels !== 'off'}
                className="flex-1 flex items-center justify-center gap-1.5"
              >
                {labelModeConfig[showLabels].icon}
                <span className="text-xs">{labelModeConfig[showLabels].label}</span>
              </GlassButton>
              <GlassButton
                variant={showLatinName ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setShowLatinName(!showLatinName)}
                active={showLatinName}
                className="flex items-center justify-center"
              >
                <span className="text-xs italic">Lat</span>
              </GlassButton>
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
