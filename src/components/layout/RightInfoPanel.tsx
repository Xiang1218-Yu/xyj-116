import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, AlertTriangle, BookOpen, ChevronRight, User, FileText } from 'lucide-react';
import { useSelectionStore } from '../../store/useSelectionStore';
import { getStructureById } from '../../data/anatomyData';
import { getOrganInfoByStructureId } from '../../data/organInfoData';
import { SYSTEM_NAMES, LAYER_NAMES } from '../../types';
import { GlassPanel } from '../ui/GlassPanel';
import { GlassButton } from '../ui/GlassButton';
import { TabSwitcher } from '../ui/TabSwitcher';
import { cn } from '../../lib/utils';

const severityColors = {
  mild: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  severe: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
};

const severityLabels = {
  mild: '轻度',
  moderate: '中度',
  severe: '重度'
};

export function RightInfoPanel() {
  const { selectedStructureId, clearSelection } = useSelectionStore();
  const [activeTab, setActiveTab] = useState('function');

  const structure = selectedStructureId ? getStructureById(selectedStructureId) : null;
  const organInfo = selectedStructureId ? getOrganInfoByStructureId(selectedStructureId) : null;

  const tabs = [
    { id: 'function', label: '功能说明', icon: <Info className="w-4 h-4" /> },
    { id: 'pathology', label: '常见病变', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'cases', label: '临床案例', icon: <BookOpen className="w-4 h-4" /> },
  ];

  if (!selectedStructureId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-80"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <GlassPanel variant="elevated" className="max-h-[80vh] overflow-hidden flex flex-col">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/10">
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
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="p-2"
            >
              <X className="w-4 h-4" />
            </GlassButton>
          </div>

          <TabSwitcher
            tabs={tabs}
            defaultTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-4"
          />

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
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
                {organInfo.commonPathologies.map((pathology) => (
                  <motion.div
                    key={pathology.id}
                    className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-white/10 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">{pathology.name}</h4>
                      <span className={cn(
                        'px-2 py-0.5 text-[10px] font-medium rounded-full border',
                        severityColors[pathology.severity]
                      )}>
                        {severityLabels[pathology.severity]}
                      </span>
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

                {organInfo.commonPathologies.length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">暂无病变数据</p>
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
                {organInfo.clinicalCases.map((caseItem, index) => (
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

                {organInfo.clinicalCases.length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">暂无临床案例</p>
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
