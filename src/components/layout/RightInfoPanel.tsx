import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, AlertTriangle, BookOpen, ChevronRight, User, FileText, Maximize2, Minimize2, Eye, EyeOff, Sun, Search, Filter, XCircle } from 'lucide-react';
import { useSelectionStore } from '../../store/useSelectionStore';
import {
  anatomyStructureRepository,
  organInfoRepository,
} from '../../data/repositories';
import { SYSTEM_NAMES, LAYER_NAMES, SEVERITY_COLORS, SEVERITY_NAMES, DISEASE_TYPE_NAMES, DISEASE_TYPE_COLORS, DiseaseType, Pathology } from '../../types';
import { GlassPanel } from '../ui/GlassPanel';
import { GlassButton } from '../ui/GlassButton';
import { TabSwitcher } from '../ui/TabSwitcher';
import { cn } from '../../lib/utils';
import { useIsolateStore, OtherOrgansMode } from '../../store/useIsolateStore';

export function RightInfoPanel() {
  const { selectedStructureId, clearSelection } = useSelectionStore();
  const { isIsolated, isolatedStructureId, isolate, reset: resetIsolation, otherOrgansMode, toggleOtherOrgansMode } = useIsolateStore();
  const [activeTab, setActiveTab] = useState('function');
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [diseaseTypeFilter, setDiseaseTypeFilter] = useState<DiseaseType | null>(null);
  const [caseSearchQuery, setCaseSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const structure = selectedStructureId ? anatomyStructureRepository.findById(selectedStructureId) : null;
  const organInfo = selectedStructureId ? organInfoRepository.findByStructureId(selectedStructureId) : null;

  const isCurrentIsolated = isIsolated && isolatedStructureId === selectedStructureId;

  const handleIsolate = () => {
    if (!structure) return;
    isolate(
      structure.id,
      structure.geometry.position,
      structure.geometry.rotation || [0, 0, 0],
      structure.geometry.scale
    );
  };

  const handleReset = () => {
    resetIsolation();
  };

  const handleClose = () => {
    if (isCurrentIsolated) {
      resetIsolation();
    }
    clearSelection();
  };

  const otherOrgansModeConfig: Record<OtherOrgansMode, { label: string; icon: JSX.Element }> = {
    dimmed: { label: '其他器官变暗', icon: <Sun className="w-4 h-4" /> },
    hidden: { label: '其他器官隐藏', icon: <EyeOff className="w-4 h-4" /> },
    normal: { label: '其他器官正常', icon: <Eye className="w-4 h-4" /> },
  };

  const tabs = [
    { id: 'function', label: '功能说明', icon: <Info className="w-4 h-4" /> },
    { id: 'pathology', label: '常见病变', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'cases', label: '临床案例', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const filteredPathologies = useMemo(() => {
    if (!organInfo) return [];
    return organInfo.commonPathologies.filter((pathology: Pathology) => {
      if (severityFilter && pathology.severity !== severityFilter) return false;
      if (diseaseTypeFilter && pathology.diseaseType !== diseaseTypeFilter) return false;
      return true;
    });
  }, [organInfo, severityFilter, diseaseTypeFilter]);

  const filteredCases = useMemo(() => {
    if (!organInfo) return [];
    if (!caseSearchQuery.trim()) return organInfo.clinicalCases;
    const query = caseSearchQuery.toLowerCase();
    return organInfo.clinicalCases.filter(c => 
      c.title.toLowerCase().includes(query) ||
      c.patientInfo.toLowerCase().includes(query) ||
      c.presentation.toLowerCase().includes(query) ||
      c.diagnosis.toLowerCase().includes(query) ||
      c.treatment.toLowerCase().includes(query) ||
      c.outcome.toLowerCase().includes(query)
    );
  }, [organInfo, caseSearchQuery]);

  const clearFilters = () => {
    setSeverityFilter(null);
    setDiseaseTypeFilter(null);
    setShowFilters(false);
  };

  const hasActiveFilters = severityFilter !== null || diseaseTypeFilter !== null;

  if (!selectedStructureId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-4 top-4 bottom-4 z-40 w-80 flex flex-col"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <GlassPanel variant="elevated" padding="none" className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/10 p-5 pb-3 flex-shrink-0">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: structure?.geometry.color }}
                />
                <h2 className="text-lg font-bold text-white">{structure?.name}</h2>
              </div>
              <p className="text-xs text-white/50 italic">{structure?.latinName}</p>
            </div>
            <div className="flex items-center gap-1">
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={isCurrentIsolated ? handleReset : handleIsolate}
                className="p-2"
                title={isCurrentIsolated ? '归位 (ESC)' : '分离查看'}
              >
                {isCurrentIsolated ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </GlassButton>
              {isCurrentIsolated && (
                <GlassButton
                  variant="ghost"
                  size="sm"
                  onClick={toggleOtherOrgansMode}
                  className="p-2"
                  title={otherOrgansModeConfig[otherOrgansMode].label}
                >
                  {otherOrgansModeConfig[otherOrgansMode].icon}
                </GlassButton>
              )}
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="p-2"
              >
                <X className="w-4 h-4" />
              </GlassButton>
            </div>
          </div>

          {isCurrentIsolated && (
            <div className="px-5 mb-3 flex-shrink-0">
              <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                <p className="text-xs text-cyan-400 font-medium mb-1">器官分离模式</p>
                <p className="text-[11px] text-white/60">
                  拖拽旋转 · 滚轮缩放 · ESC 归位
                </p>
              </div>
            </div>
          )}

          <TabSwitcher
            tabs={tabs}
            defaultTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-4 px-5 flex-shrink-0"
          />

          <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 min-h-0">
            {activeTab === 'function' && organInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                  <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    主要功能
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {organInfo.function}
                  </p>
                </div>

                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                  <h3 className="text-sm font-semibold text-white mb-2">结构描述</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {organInfo.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-white/[0.03] rounded-xl text-center">
                    <p className="text-[10px] text-white/50 mb-1">所属系统</p>
                    <p className="text-sm font-medium text-white">
                      {structure?.system ? SYSTEM_NAMES[structure.system] : '—'}
                    </p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-xl text-center">
                    <p className="text-[10px] text-white/50 mb-1">解剖层次</p>
                    <p className="text-sm font-medium text-white">
                      {structure?.layer ? LAYER_NAMES[structure.layer] : '—'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pathology' && organInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-white/50" />
                    <span className="text-xs text-white/50">
                      共 {organInfo.commonPathologies.length} 种病变
                      {hasActiveFilters && ` · 筛选 ${filteredPathologies.length} 种`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {hasActiveFilters && (
                      <GlassButton
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="p-1.5"
                        title="清除筛选"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                      </GlassButton>
                    )}
                    <GlassButton
                      variant={showFilters ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="p-1.5"
                      active={showFilters}
                      title="筛选条件"
                    >
                      <Filter className="w-3.5 h-3.5" />
                    </GlassButton>
                  </div>
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.05] space-y-3">
                        <div>
                          <p className="text-[10px] text-white/40 mb-1.5">严重程度</p>
                          <div className="flex flex-wrap gap-1.5">
                            <GlassButton
                              variant={severityFilter === null ? 'primary' : 'ghost'}
                              size="sm"
                              onClick={() => setSeverityFilter(null)}
                              className="px-2 py-1 text-[10px]"
                              active={severityFilter === null}
                            >
                              全部
                            </GlassButton>
                            {Object.entries(SEVERITY_NAMES).map(([value, label]) => (
                              <GlassButton
                                key={value}
                                variant={severityFilter === value ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setSeverityFilter(severityFilter === value ? null : value)}
                                className={cn(
                                  "px-2 py-1 text-[10px]",
                                  severityFilter === value && "shadow-none"
                                )}
                                active={severityFilter === value}
                              >
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full mr-1.5",
                                  value === 'mild' && 'bg-emerald-400',
                                  value === 'moderate' && 'bg-amber-400',
                                  value === 'severe' && 'bg-rose-400'
                                )} />
                                {label}
                              </GlassButton>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] text-white/40 mb-1.5">疾病类型</p>
                          <div className="flex flex-wrap gap-1.5">
                            <GlassButton
                              variant={diseaseTypeFilter === null ? 'primary' : 'ghost'}
                              size="sm"
                              onClick={() => setDiseaseTypeFilter(null)}
                              className="px-2 py-1 text-[10px]"
                              active={diseaseTypeFilter === null}
                            >
                              全部
                            </GlassButton>
                            {Object.entries(DISEASE_TYPE_NAMES).map(([value, label]) => (
                              <GlassButton
                                key={value}
                                variant={diseaseTypeFilter === value ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setDiseaseTypeFilter(diseaseTypeFilter === value ? null : value as DiseaseType)}
                                className="px-2 py-1 text-[10px]"
                                active={diseaseTypeFilter === value}
                              >
                                <span 
                                  className="w-1.5 h-1.5 rounded-full mr-1.5"
                                  style={{ backgroundColor: DISEASE_TYPE_COLORS[value as DiseaseType] }}
                                />
                                {label}
                              </GlassButton>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {filteredPathologies.map((pathology: Pathology) => (
                  <motion.div
                    key={pathology.id}
                    className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-white/10 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">{pathology.name}</h4>
                      <div className="flex gap-1">
                        <span 
                          className="px-2 py-0.5 text-[9px] font-medium rounded-full border"
                          style={{ 
                            color: DISEASE_TYPE_COLORS[pathology.diseaseType],
                            borderColor: `${DISEASE_TYPE_COLORS[pathology.diseaseType]}50`,
                            backgroundColor: `${DISEASE_TYPE_COLORS[pathology.diseaseType]}20`
                          }}
                        >
                          {DISEASE_TYPE_NAMES[pathology.diseaseType]}
                        </span>
                        <span className={cn(
                          'px-2 py-0.5 text-[9px] font-medium rounded-full border',
                          SEVERITY_COLORS[pathology.severity]
                        )}>
                          {SEVERITY_NAMES[pathology.severity]}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mb-3">{pathology.description}</p>
                    
                    <div className="mb-3">
                      <p className="text-[10px] text-white/40 mb-1">常见症状</p>
                      <div className="flex flex-wrap gap-1">
                        {pathology.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] bg-white/10 text-white/70 rounded-md"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-white/40 mb-1">治疗方案</p>
                      <p className="text-xs text-white/60">{pathology.treatment}</p>
                    </div>
                  </motion.div>
                ))}

                {filteredPathologies.length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      {hasActiveFilters ? '没有符合筛选条件的病变' : '暂无病变数据'}
                    </p>
                    {hasActiveFilters && (
                      <GlassButton
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="mt-3"
                      >
                        清除筛选条件
                      </GlassButton>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'cases' && organInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={caseSearchQuery}
                    onChange={(e) => setCaseSearchQuery(e.target.value)}
                    placeholder="搜索病例..."
                    className="w-full pl-9 pr-8 py-2 bg-white/[0.05] rounded-xl border border-white/[0.08] text-white placeholder-white/40 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                  />
                  {caseSearchQuery && (
                    <button
                      onClick={() => setCaseSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {caseSearchQuery && (
                  <p className="text-[10px] text-white/40">
                    找到 {filteredCases.length} 个相关病例
                  </p>
                )}

                {filteredCases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.id}
                    className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-cyan-500/20 transition-all cursor-pointer group"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-white">{caseItem.title}</h4>
                          <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <User className="w-3 h-3 text-white/40" />
                          <p className="text-[10px] text-white/40">{caseItem.patientInfo}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-[10px] text-cyan-400 mb-0.5">临床表现</p>
                        <p className="text-white/60 line-clamp-2">{caseItem.presentation}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-400 mb-0.5">诊断</p>
                        <p className="text-white/60 line-clamp-2">{caseItem.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-400 mb-0.5">治疗与转归</p>
                        <p className="text-white/60 line-clamp-2">{caseItem.outcome}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredCases.length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      {caseSearchQuery ? '没有找到相关病例' : '暂无临床案例'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {!organInfo && (
              <div className="text-center py-8">
                <Info className="w-8 h-8 mx-auto mb-2 text-white/30" />
                <p className="text-sm text-white/50">点击其他器官查看详细信息</p>
                <p className="text-xs text-white/30 mt-1">
                  或选择: 心脏、肺、肝脏、胃、大脑、肾脏、骨骼、肌肉
                </p>
              </div>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </AnimatePresence>
  );
}
