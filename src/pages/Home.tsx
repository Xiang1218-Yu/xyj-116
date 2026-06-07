import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Layers, Info, MapPin } from 'lucide-react';
import { AnatomyScene } from '../components/three/AnatomyScene';
import { TopNavbar } from '../components/layout/TopNavbar';
import { LeftControlPanel } from '../components/layout/LeftControlPanel';
import { RightInfoPanel } from '../components/layout/RightInfoPanel';
import { ViewControls } from '../components/layout/ViewControls';
import { QuizPanel } from '../components/layout/QuizPanel';
import { AnnotationPanel } from '../components/layout/AnnotationPanel';
import { useSelectionStore } from '../store/useSelectionStore';
import { useQuizStore } from '../store/useQuizStore';
import { useState, useEffect } from 'react';

export default function Home() {
  const { selectedStructureId } = useSelectionStore();
  const { isQuizMode } = useQuizStore();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A1628]">
      <div className="gradient-mesh" />
      <div className="noise-overlay" />
      
      <AnatomyScene className="absolute inset-0 z-0" />
      
      <TopNavbar />
      <LeftControlPanel />
      <RightInfoPanel />
      <ViewControls />
      <QuizPanel />
      <AnnotationPanel />
      
      {showWelcome && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <div className="text-center">
            <motion.h1 
              className="text-5xl font-bold text-white mb-4 display-font"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              3D虚拟解剖系统
            </motion.h1>
            <motion.p 
              className="text-xl text-white/60"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              探索人体的奥秘
            </motion.p>
          </div>
        </motion.div>
      )}
      
      <AnimatePresence>
        {!isQuizMode && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 4.5 }}
          >
            <div className="glass px-6 py-3 rounded-full flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MousePointer2 className="w-4 h-4 text-cyan-400" />
                <span>鼠标拖动旋转</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>左侧控制解剖层次</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>点击结构查看详情</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>顶部按钮添加标注笔记</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isQuizMode && (
          <motion.div
            className="absolute top-24 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedStructureId ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass px-4 py-2 rounded-xl text-xs text-white/50 text-center max-w-lg">
              💡 提示：点击任意器官查看详情 · 点击顶部「标注」按钮在模型上添加学习笔记，支持颜色分类和重要程度标记
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
