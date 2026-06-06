import { motion } from 'framer-motion';
import { Layers, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { AnatomyLayer, ANATOMY_LAYER_ORDER, LAYER_NAMES } from '../../types';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { GlassPanel } from '../ui/GlassPanel';
import { GlassButton } from '../ui/GlassButton';
import { cn } from '../../lib/utils';

const layerIcons: Record<AnatomyLayer, string> = {
  [AnatomyLayer.SKIN]: '🧴',
  [AnatomyLayer.FAT]: '🟡',
  [AnatomyLayer.MUSCLE]: '💪',
  [AnatomyLayer.ORGAN]: '❤️',
  [AnatomyLayer.SKELETON]: '🦴',
};

const layerDescriptions: Record<AnatomyLayer, string> = {
  [AnatomyLayer.SKIN]: '最外层，保护身体免受外界伤害',
  [AnatomyLayer.FAT]: '储存能量，维持体温',
  [AnatomyLayer.MUSCLE]: '产生运动，维持姿势',
  [AnatomyLayer.ORGAN]: '内部器官，执行生理功能',
  [AnatomyLayer.SKELETON]: '支撑结构，保护内脏',
};

export function LeftControlPanel() {
  const { currentLayer, layerProgress, setCurrentLayer, peelLayer, restoreLayer, resetToFull, isLayerVisible } = useAnatomyStore();

  const currentIndex = ANATOMY_LAYER_ORDER.indexOf(currentLayer);

  return (
    <motion.div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
    >
      <GlassPanel className="w-64" variant="elevated">
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">解剖层次控制</h2>
              <p className="text-[11px] text-white/50">逐层深入了解人体结构</p>
            </div>
          </div>

          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${layerProgress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex gap-2">
            <GlassButton
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={restoreLayer}
              disabled={currentIndex === 0}
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              恢复
            </GlassButton>
            <GlassButton
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={peelLayer}
              disabled={currentIndex === ANATOMY_LAYER_ORDER.length - 1}
            >
              剥离
              <ChevronDown className="w-4 h-4 ml-1" />
            </GlassButton>
          </div>

          <div className="space-y-2">
            {ANATOMY_LAYER_ORDER.map((layer, index) => {
              const isVisible = isLayerVisible(layer);
              const isCurrent = currentLayer === layer;

              return (
                <motion.div
                  key={layer}
                  className={cn(
                    'p-3 rounded-xl cursor-pointer transition-all duration-200',
                    isCurrent
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30'
                      : 'bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06]',
                    !isVisible && 'opacity-40'
                  )}
                  onClick={() => setCurrentLayer(layer)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-lg',
                      isCurrent ? 'bg-cyan-500/20' : 'bg-white/10'
                    )}>
                      {layerIcons[layer]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white truncate">
                          {LAYER_NAMES[layer]}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 text-[9px] font-semibold text-cyan-400 bg-cyan-500/20 rounded">
                            当前
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/50 truncate">
                        {layerDescriptions[layer]}
                      </p>
                    </div>
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      isVisible ? 'bg-emerald-400' : 'bg-white/20'
                    )} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <GlassButton
            variant="outline"
            size="sm"
            className="w-full"
            onClick={resetToFull}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重置为完整人体
          </GlassButton>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
