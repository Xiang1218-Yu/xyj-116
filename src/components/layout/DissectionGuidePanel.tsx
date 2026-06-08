import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, ChevronRight, ChevronLeft, X, Volume2, VolumeX, 
  Play, Pause, CheckCircle, Clock, AlertTriangle, Lightbulb,
  Target, Layers, ArrowRight, List
} from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { GlassButton } from '../ui/GlassButton';
import { TabSwitcher } from '../ui/TabSwitcher';
import { cn } from '../../lib/utils';
import { useDissectionGuideStore } from '../../store/useDissectionGuideStore';
import { 
  LAYER_NAMES, DIFFICULTY_NAMES, DIFFICULTY_COLORS,
  GUIDE_CATEGORY_NAMES 
} from '../../types';
import {
  anatomyStructureRepository,
  dissectionGuideRepository,
} from '../../data/repositories';

type PanelView = 'list' | 'detail' | 'guide';

export function DissectionGuidePanel() {
  const [activeTab, setActiveTab] = useState<'abdominal' | 'thoracic' | 'all'>('all');
  const [panelView, setPanelView] = useState<PanelView>('list');
  
  const {
    isPanelOpen,
    selectedGuide,
    currentStepIndex,
    completedSteps,
    speech,
    isAutoPlaying,
    setPanelOpen,
    startGuide,
    exitGuide,
    nextStep,
    prevStep,
    goToStep,
    toggleAutoPlay,
    getCurrentStep,
    getProgress,
    setSpeechEnabled,
    setSpeechRate,
    speak,
    stopSpeaking
  } = useDissectionGuideStore();

  const currentStep = getCurrentStep();
  const progress = getProgress();

  const allGuides = dissectionGuideRepository.findAll();
  const filteredGuides = activeTab === 'all' 
    ? allGuides 
    : allGuides.filter(g => g.category === activeTab);

  const handleStartGuide = useCallback((guideId: string) => {
    startGuide(guideId);
    setPanelView('guide');
  }, [startGuide]);

  const handleExitGuide = useCallback(() => {
    exitGuide();
    setPanelView('list');
  }, [exitGuide]);

  useEffect(() => {
    let autoPlayTimer: ReturnType<typeof setTimeout>;
    if (isAutoPlaying && selectedGuide) {
      autoPlayTimer = setTimeout(() => {
        if (currentStepIndex < selectedGuide.steps.length - 1) {
          nextStep();
        } else {
          toggleAutoPlay();
        }
      }, useDissectionGuideStore.getState().autoPlayInterval);
    }
    return () => clearTimeout(autoPlayTimer);
  }, [isAutoPlaying, currentStepIndex, selectedGuide, nextStep, toggleAutoPlay]);

  if (!isPanelOpen) return null;

  const getHighlightedStructureNames = (ids: string[]) => {
    return ids
      .map(id => anatomyStructureRepository.findById(id)?.name)
      .filter(Boolean)
      .join('、');
  };

  const renderListView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">解剖操作引导</h2>
            <p className="text-[11px] text-white/50">标准化流程，一步步学习</p>
          </div>
        </div>
        <button
          onClick={() => setPanelOpen(false)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      <TabSwitcher
        tabs={[
          { id: 'all', label: '全部' },
          { id: 'abdominal', label: '腹部' },
          { id: 'thoracic', label: '胸腔' }
        ]}
        defaultTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as typeof activeTab)}
        className="text-xs"
      />

      <div className="space-y-3">
        {filteredGuides.map((guide) => (
          <motion.div
            key={guide.id}
            className={cn(
              'p-4 rounded-xl cursor-pointer transition-all duration-200',
              'bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06]'
            )}
            onClick={() => {
              useDissectionGuideStore.getState().selectGuide(guide.id);
              setPanelView('detail');
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">{guide.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">{guide.title}</h3>
                  <span 
                    className="px-1.5 py-0.5 text-[9px] font-semibold rounded flex-shrink-0"
                    style={{ 
                      backgroundColor: `${DIFFICULTY_COLORS[guide.difficulty]}20`,
                      color: DIFFICULTY_COLORS[guide.difficulty]
                    }}
                  >
                    {DIFFICULTY_NAMES[guide.difficulty]}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 line-clamp-2 mb-2">
                  {guide.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.estimatedDuration}
                  </span>
                  <span className="flex items-center gap-1">
                    <List className="w-3 h-3" />
                    {guide.steps.length} 个步骤
                  </span>
                  <span>{GUIDE_CATEGORY_NAMES[guide.category]}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDetailView = () => {
    if (!selectedGuide) return null;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPanelView('list')}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedGuide.icon}</span>
              <h2 className="text-sm font-semibold text-white">{selectedGuide.title}</h2>
            </div>
          </div>
          <button
            onClick={() => setPanelOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <p className="text-[11px] text-white/70 leading-relaxed">
              {selectedGuide.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-medium text-white/60">预计时长</span>
              </div>
              <p className="text-xs text-white">{selectedGuide.estimatedDuration}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-1">
                <List className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-medium text-white/60">步骤数量</span>
              </div>
              <p className="text-xs text-white">{selectedGuide.steps.length} 步</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-semibold text-amber-300">学习目标</h4>
            </div>
            <ul className="space-y-1.5">
              {selectedGuide.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] text-amber-200/80">
                  <CheckCircle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-semibold text-blue-300">前置条件</h4>
            </div>
            <ul className="space-y-1.5">
              {selectedGuide.prerequisites.map((pre, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] text-blue-200/80">
                  <ArrowRight className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <h4 className="text-xs font-semibold text-white mb-2">操作步骤预览</h4>
            <div className="space-y-2">
              {selectedGuide.steps.map((step, idx) => (
                <div 
                  key={step.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]"
                >
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0',
                    'bg-cyan-500/20 text-cyan-400'
                  )}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-white/80 truncate">{step.title}</p>
                    <p className="text-[9px] text-white/40">
                      目标层次: {LAYER_NAMES[step.targetLayer]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <GlassButton
          variant="primary"
          size="md"
          className="w-full"
          onClick={() => handleStartGuide(selectedGuide.id)}
        >
          <Play className="w-4 h-4 mr-2" />
          开始学习
        </GlassButton>
      </div>
    );
  };

  const renderGuideView = () => {
    if (!selectedGuide || !currentStep) return null;

    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === selectedGuide.steps.length - 1;
    const highlightedNames = getHighlightedStructureNames(currentStep.highlightStructureIds);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleExitGuide}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedGuide.icon}</span>
              <h2 className="text-sm font-semibold text-white truncate">{selectedGuide.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSpeechEnabled(!speech.isEnabled)}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                speech.isEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'
              )}
              title={speech.isEnabled ? '关闭语音' : '开启语音'}
            >
              {speech.isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            {speech.isEnabled && (
              <>
                <button
                  onClick={() => speech.isSpeaking ? stopSpeaking() : speak(currentStep.detailedInstruction)}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    'bg-cyan-500/20 text-cyan-400'
                  )}
                  title={speech.isSpeaking ? '停止播报' : '重新播报'}
                >
                  {speech.isSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/50">学习进度</span>
            <span className="text-cyan-400 font-medium">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-white/40">
            <span>步骤 {currentStepIndex + 1} / {selectedGuide.steps.length}</span>
            <span>{selectedGuide.estimatedDuration}</span>
          </div>
        </div>

        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-cyan-400">{currentStep.stepNumber}</span>
              </div>
              <h3 className="text-sm font-semibold text-white">{currentStep.title}</h3>
            </div>
            <p className="text-[11px] text-white/60 mb-3">{currentStep.description}</p>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-black/20">
                <h4 className="text-[11px] font-medium text-cyan-300 mb-1.5">操作说明</h4>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  {currentStep.detailedInstruction}
                </p>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <Layers className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-white/50">当前解剖层次：</span>
                  <span className="text-[11px] font-medium text-purple-300 ml-1">
                    {LAYER_NAMES[currentStep.targetLayer]}
                  </span>
                </div>
              </div>

              {highlightedNames && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <Target className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50">重点观察：</span>
                    <span className="text-[11px] font-medium text-orange-300 ml-1">
                      {highlightedNames}
                    </span>
                  </div>
                </div>
              )}

              {currentStep.tips && currentStep.tips.length > 0 && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <h4 className="text-[11px] font-medium text-amber-300">学习要点</h4>
                  </div>
                  <ul className="space-y-1">
                    {currentStep.tips.map((tip, idx) => (
                      <li key={idx} className="text-[11px] text-amber-200/80 pl-1.5">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentStep.safetyNotes && currentStep.safetyNotes.length > 0 && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-400/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <h4 className="text-[11px] font-medium text-red-300">安全注意事项</h4>
                  </div>
                  <ul className="space-y-1">
                    {currentStep.safetyNotes.map((note, idx) => (
                      <li key={idx} className="text-[11px] text-red-200/80 pl-1.5">
                        • {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <h4 className="text-[11px] font-medium text-white/70 mb-2">步骤导航</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedGuide.steps.map((step, idx) => {
                const isCompleted = completedSteps.has(step.id);
                const isCurrent = idx === currentStepIndex;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(idx)}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-semibold transition-all',
                      isCurrent
                        ? 'bg-cyan-500 text-white'
                        : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                    )}
                  >
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <GlassButton
            variant="secondary"
            size="md"
            className="flex-1"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            上一步
          </GlassButton>
          <GlassButton
            variant="secondary"
            size="md"
            onClick={toggleAutoPlay}
            active={isAutoPlaying}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </GlassButton>
          <GlassButton
            variant="primary"
            size="md"
            className="flex-1"
            onClick={nextStep}
            disabled={isLastStep}
          >
            下一步
            <ChevronRight className="w-4 h-4 ml-1" />
          </GlassButton>
        </div>

        {speech.isEnabled && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-white/60">语音语速</span>
              <span className="text-[11px] text-cyan-400 font-medium">{speech.speechRate}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speech.speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 
                [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-400 
                [&::-moz-range-thumb]:border-0"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <GlassPanel className="w-80 max-h-[85vh] overflow-hidden" variant="elevated">
        <AnimatePresence mode="wait">
          <motion.div
            key={panelView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {panelView === 'list' && renderListView()}
            {panelView === 'detail' && renderDetailView()}
            {panelView === 'guide' && renderGuideView()}
          </motion.div>
        </AnimatePresence>
      </GlassPanel>
    </motion.div>
  );
}
