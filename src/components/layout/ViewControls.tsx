import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, RotateCcw, Maximize2, Move, ChevronUp, ChevronDown } from 'lucide-react';
import { useViewStore } from '../../store/useViewStore';
import { GlassButton } from '../ui/GlassButton';

const viewOptions = [
  { id: 'front' as const, label: '正面', icon: '👁️' },
  { id: 'side' as const, label: '侧面', icon: '👁️‍🗨️' },
  { id: 'back' as const, label: '背面', icon: '👀' },
];

export function ViewControls() {
  const { 
    cameraView, 
    isOrthographic, 
    autoRotate, 
    showLabels,
    setCameraView, 
    toggleOrthographic, 
    toggleAutoRotate,
    toggleLabels,
    resetView 
  } = useViewStore();
  
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="fixed right-4 bottom-4 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3 space-y-2"
            >
              <p className="text-[10px] text-white/40 font-medium mb-2 px-1">视角切换</p>
              <div className="grid grid-cols-3 gap-1">
                {viewOptions.map((view) => (
                  <GlassButton
                    key={view.id}
                    variant={cameraView === view.id ? 'primary' : 'ghost'}
                    size="sm"
                    active={cameraView === view.id}
                    onClick={() => setCameraView(view.id)}
                    className="flex flex-col items-center gap-1 py-2"
                  >
                    <span className="text-lg">{view.icon}</span>
                    <span className="text-[10px]">{view.label}</span>
                  </GlassButton>
                ))}
              </div>

              <div className="border-t border-white/10 my-2" />

              <div className="space-y-1">
                <p className="text-[10px] text-white/40 font-medium px-1">显示选项</p>
                <div className="grid grid-cols-2 gap-1">
                  <GlassButton
                    variant={autoRotate ? 'primary' : 'ghost'}
                    size="sm"
                    active={autoRotate}
                    onClick={toggleAutoRotate}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Move className="w-3.5 h-3.5" />
                    <span className="text-xs">自动旋转</span>
                  </GlassButton>
                  <GlassButton
                    variant={isOrthographic ? 'primary' : 'ghost'}
                    size="sm"
                    active={isOrthographic}
                    onClick={toggleOrthographic}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-xs">正交视图</span>
                  </GlassButton>
                  <GlassButton
                    variant={showLabels ? 'primary' : 'ghost'}
                    size="sm"
                    active={showLabels}
                    onClick={toggleLabels}
                    className="flex items-center justify-center gap-1.5 col-span-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="text-xs">显示标签</span>
                  </GlassButton>
                </div>
              </div>

              <div className="border-t border-white/10 my-2" />

              <GlassButton
                variant="outline"
                size="sm"
                className="w-full"
                onClick={resetView}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                重置视图
              </GlassButton>
            </motion.div>
          )}
        </AnimatePresence>

        <GlassButton
          variant="secondary"
          size="lg"
          onClick={() => setExpanded(!expanded)}
          className="w-12 h-12 p-0 flex items-center justify-center rounded-full shadow-lg shadow-cyan-500/20"
        >
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </motion.div>
        </GlassButton>
      </div>
    </motion.div>
  );
}
