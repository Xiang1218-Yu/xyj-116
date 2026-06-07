import { motion } from 'framer-motion';
import { Layers, ChevronDown, ChevronUp, RotateCcw, MapPin } from 'lucide-react';
import { AnatomyLayer, ANATOMY_LAYER_ORDER, LAYER_NAMES, ANNOTATION_COLORS } from '../../types';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { useAnnotationStore } from '../../store/useAnnotationStore';
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
  const { isAnnotationMode, setAnnotationMode, annotations, setSelectedAnnotationId } = useAnnotationStore();

  const currentIndex = ANATOMY_LAYER_ORDER.indexOf(currentLayer);

  return (
    <motion.div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
    >
      <GlassPanel className="w-64 max-h-[80vh] overflow-y-auto" variant="elevated">
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200',
              isAnnotationMode
                ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30'
                : 'bg-gradient-to-br from-pink-500/20 to-purple-500/20'
            )}>
              <MapPin className={cn(
                'w-5 h-5 transition-colors duration-200',
                isAnnotationMode ? 'text-pink-400' : 'text-pink-300/70'
              )} />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-white">标注笔记</h2>
              <p className="text-[11px] text-white/50">
                {annotations.length > 0
                  ? `已有 ${annotations.length} 个标注笔记`
                  : '在3D模型上添加学习笔记'}
              </p>
            </div>
          </div>

          <GlassButton
            variant={isAnnotationMode ? 'primary' : 'secondary'}
            size="sm"
            className="w-full"
            active={isAnnotationMode}
            onClick={() => setAnnotationMode(!isAnnotationMode)}
          >
            <MapPin className="w-4 h-4 mr-2" />
            {isAnnotationMode ? '✓ 标注模式已开启' : '开启标注模式'}
          </GlassButton>

          {isAnnotationMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-xl bg-pink-500/10 border border-pink-400/20"
            >
              <p className="text-[11px] text-pink-200 leading-relaxed">
                💡 <span className="font-medium">操作提示：</span>点击模型任意位置添加图钉，写下你的学习笔记。
              </p>
            </motion.div>
          )}

          {annotations.length > 0 && (
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {annotations.slice().reverse().map((ann) => (
                <motion.button
                  key={ann.id}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-all text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAnnotationId(ann.id)}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ANNOTATION_COLORS[ann.color] }}
                  />
                  <span className="text-xs text-white/80 truncate flex-1">
                    {ann.title}
                  </span>
                  {ann.priority === 'high' && (
                    <span className="px-1 py-0.5 text-[9px] font-semibold text-red-400 bg-red-500/20 rounded flex-shrink-0">
                      重要
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 pb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">解剖层次控制</h3>
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

            <div className="flex gap-2 mt-3">
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

            <div className="space-y-2 mt-3">
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
              className="w-full mt-3"
              onClick={resetToFull}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置为完整人体
            </GlassButton>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
