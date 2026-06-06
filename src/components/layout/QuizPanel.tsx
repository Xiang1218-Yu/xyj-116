import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, Lightbulb, SkipForward, RotateCcw, Trophy, Target, Flame } from 'lucide-react';
import { useQuizStore } from '../../store/useQuizStore';
import { getStructureById } from '../../data/anatomyData';
import { GlassPanel } from '../ui/GlassPanel';
import { GlassButton } from '../ui/GlassButton';
import { cn } from '../../lib/utils';

const difficultyColors = {
  easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  hard: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
};

const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
};

const questionTypeLabels: Record<string, string> = {
  name: '名称题',
  description: '描述题',
  function: '功能题',
  latin: '拉丁题'
};

export function QuizPanel() {
  const {
    isQuizMode,
    currentQuestion,
    score,
    totalAnswered,
    correctAnswers,
    wrongAnswers,
    lastAnswerResult,
    showHint,
    streak,
    bestStreak,
    toggleQuizMode,
    nextQuestion,
    toggleHint,
    resetQuiz
  } = useQuizStore();

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (lastAnswerResult === 'correct') {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [lastAnswerResult]);

  const targetStructure = currentQuestion
    ? getStructureById(currentQuestion.targetStructureId)
    : null;

  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  if (!isQuizMode) {
    return (
      <motion.div
        className="fixed top-20 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 5 }}
      >
        <GlassButton
          variant="primary"
          size="lg"
          onClick={toggleQuizMode}
          className="shadow-lg shadow-cyan-500/30"
        >
          <Brain className="w-5 h-5 mr-2" />
          开始答题挑战
        </GlassButton>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <GlassPanel variant="elevated" className="w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                <Brain className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">解剖学答题挑战</h2>
                <p className="text-[11px] text-white/50">在3D模型上点击正确的结构</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {streak > 0 && (
                <motion.div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold text-orange-400">{streak}连击</span>
                </motion.div>
              )}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-500/30 border border-emerald-500/30">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">{score}分</span>
              </div>
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={toggleQuizMode}
                className="p-2"
              >
                <XCircle className="w-4 h-4" />
              </GlassButton>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-[10px] text-white/40">已答题数</p>
              <p className="text-sm font-bold text-white">{totalAnswered}</p>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-[10px] text-white/40">正确</p>
              <p className="text-sm font-bold text-emerald-400">{correctAnswers}</p>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-[10px] text-white/40">错误</p>
              <p className="text-sm font-bold text-rose-400">{wrongAnswers}</p>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
              <p className="text-[10px] text-white/40">正确率</p>
              <p className="text-sm font-bold text-cyan-400">{accuracy}%</p>
            </div>
          </div>

          {currentQuestion && (
            <motion.div
              className="relative"
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      'px-2 py-0.5 text-[9px] font-medium rounded-full border',
                      difficultyColors[currentQuestion.difficulty]
                    )}>
                      {difficultyLabels[currentQuestion.difficulty]}
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-medium rounded-full bg-white/10 text-white/60 border border-white/10">
                      {questionTypeLabels[currentQuestion.type]}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    {currentQuestion.questionText}
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {showHint && currentQuestion.hint && (
                  <motion.div
                    className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-amber-300">
                        <span className="font-medium">提示：</span>
                        {currentQuestion.hint}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {lastAnswerResult && (
                  <motion.div
                    className="mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {lastAnswerResult === 'correct' ? (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                          <div>
                            <p className="text-sm font-bold text-emerald-400">回答正确！</p>
                            <p className="text-xs text-emerald-300/70">
                              +{currentQuestion.difficulty === 'easy' ? 10 : currentQuestion.difficulty === 'medium' ? 20 : 30}分
                              {streak > 1 ? ` (连击奖励 +${5 * (streak - 1)}分)` : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30">
                        <div className="flex items-center gap-3">
                          <XCircle className="w-6 h-6 text-rose-400" />
                          <div>
                            <p className="text-sm font-bold text-rose-400">回答错误</p>
                            <p className="text-xs text-rose-300/70">
                              正确答案是：<span className="font-medium">{targetStructure?.name}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          <div className="flex gap-2 mt-4">
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={toggleHint}
              className="flex-1"
              disabled={!currentQuestion || !!lastAnswerResult}
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              {showHint ? '隐藏提示' : '显示提示'}
            </GlassButton>
            <GlassButton
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={nextQuestion}
              disabled={!currentQuestion}
            >
              <SkipForward className="w-4 h-4 mr-1" />
              下一题
            </GlassButton>
            <GlassButton
              variant="outline"
              size="sm"
              onClick={resetQuiz}
            >
              <RotateCcw className="w-4 h-4" />
            </GlassButton>
          </div>
        </GlassPanel>

        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899'][i % 4]
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    scale: 1,
                    opacity: 0
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.05,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
