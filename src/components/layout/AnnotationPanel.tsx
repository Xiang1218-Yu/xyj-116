import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Edit3, Flag, Hash, Clock } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { GlassButton } from '../ui/GlassButton';
import { useAnnotationStore } from '../../store/useAnnotationStore';
import {
  AnnotationColor,
  AnnotationPriority,
  ANNOTATION_COLORS,
  ANNOTATION_COLOR_NAMES,
  ANNOTATION_PRIORITY_NAMES
} from '../../types';
import { cn } from '../../lib/utils';

const COLOR_OPTIONS: AnnotationColor[] = ['red', 'yellow', 'green', 'blue', 'purple'];
const PRIORITY_OPTIONS: AnnotationPriority[] = ['low', 'medium', 'high'];

export function AnnotationPanel() {
  const {
    showAnnotationPanel,
    pendingAnnotationPosition,
    selectedAnnotationId,
    annotations,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    closeAnnotationPanel
  } = useAnnotationStore();

  const selectedAnnotation = annotations.find((a) => a.id === selectedAnnotationId);
  const isEditing = !!selectedAnnotation;
  const isCreating = !!pendingAnnotationPosition;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<AnnotationColor>('blue');
  const [priority, setPriority] = useState<AnnotationPriority>('medium');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (selectedAnnotation) {
      setTitle(selectedAnnotation.title);
      setContent(selectedAnnotation.content);
      setColor(selectedAnnotation.color);
      setPriority(selectedAnnotation.priority);
      setIsEditMode(false);
    } else if (pendingAnnotationPosition) {
      setTitle('');
      setContent('');
      setColor('blue');
      setPriority('medium');
      setIsEditMode(true);
    }
  }, [selectedAnnotation, pendingAnnotationPosition]);

  const handleSave = () => {
    if (!title.trim()) return;

    if (isCreating && pendingAnnotationPosition) {
      addAnnotation({
        position: pendingAnnotationPosition,
        title: title.trim(),
        content: content.trim(),
        color,
        priority
      });
    } else if (isEditing && selectedAnnotationId) {
      updateAnnotation(selectedAnnotationId, {
        title: title.trim(),
        content: content.trim(),
        color,
        priority
      });
      setIsEditMode(false);
    }
  };

  const handleDelete = () => {
    if (selectedAnnotationId) {
      deleteAnnotation(selectedAnnotationId);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityIcon = (p: AnnotationPriority) => {
    switch (p) {
      case 'high':
        return <Flag className="w-3.5 h-3.5 text-red-400" />;
      case 'medium':
        return <Flag className="w-3.5 h-3.5 text-yellow-400" />;
      case 'low':
        return <Flag className="w-3.5 h-3.5 text-green-400" />;
    }
  };

  if (!showAnnotationPanel) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.25 }}
        className="absolute top-20 right-4 w-80 z-30"
      >
        <GlassPanel variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              {isCreating ? '新建标注' : isEditMode ? '编辑标注' : '标注详情'}
            </h3>
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={closeAnnotationPanel}
              className="p-1.5"
            >
              <X className="w-4 h-4" />
            </GlassButton>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                标题
              </label>
              {isEditMode ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="输入标注标题..."
                  maxLength={50}
                  className={cn(
                    'w-full px-3 py-2 text-sm rounded-xl',
                    'bg-white/5 border border-white/10',
                    'text-white placeholder-white/40',
                    'focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30',
                    'transition-all duration-200'
                  )}
                />
              ) : (
                <div className="px-3 py-2 text-white text-sm rounded-xl bg-white/5 border border-white/10">
                  {title}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                笔记内容
              </label>
              {isEditMode ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="写下你的学习笔记..."
                  rows={5}
                  maxLength={500}
                  className={cn(
                    'w-full px-3 py-2 text-sm rounded-xl resize-none',
                    'bg-white/5 border border-white/10',
                    'text-white placeholder-white/40',
                    'focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30',
                    'transition-all duration-200'
                  )}
                />
              ) : (
                <div className="px-3 py-2 text-white/80 text-sm rounded-xl bg-white/5 border border-white/10 min-h-[100px] whitespace-pre-wrap">
                  {content || <span className="text-white/40">暂无笔记内容</span>}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                颜色分类
              </label>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => isEditMode && setColor(c)}
                    disabled={!isEditMode}
                    className={cn(
                      'w-9 h-9 rounded-xl border-2 transition-all duration-200',
                      'flex items-center justify-center',
                      color === c
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent hover:scale-105',
                      !isEditMode && 'cursor-default'
                    )}
                    style={{ backgroundColor: ANNOTATION_COLORS[c] }}
                    title={ANNOTATION_COLOR_NAMES[c]}
                  >
                    {color === c && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                重要程度
              </label>
              <div className="flex gap-2">
                {PRIORITY_OPTIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => isEditMode && setPriority(p)}
                    disabled={!isEditMode}
                    className={cn(
                      'flex-1 px-3 py-2 text-xs font-medium rounded-xl border transition-all duration-200',
                      'flex items-center justify-center gap-1.5',
                      priority === p
                        ? cn(
                            'border-white/30 bg-white/10',
                            p === 'high' && 'border-red-400/50 bg-red-500/10 text-red-200',
                            p === 'medium' && 'border-yellow-400/50 bg-yellow-500/10 text-yellow-200',
                            p === 'low' && 'border-green-400/50 bg-green-500/10 text-green-200'
                          )
                        : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10',
                      !isEditMode && 'cursor-default'
                    )}
                  >
                    {getPriorityIcon(p)}
                    {ANNOTATION_PRIORITY_NAMES[p]}
                  </button>
                ))}
              </div>
            </div>

            {!isCreating && selectedAnnotation && (
              <div className="flex items-center gap-2 text-xs text-white/40 pt-2 border-t border-white/10">
                <Clock className="w-3.5 h-3.5" />
                <span>创建于 {formatDate(selectedAnnotation.createdAt)}</span>
                {selectedAnnotation.updatedAt !== selectedAnnotation.createdAt && (
                  <span className="ml-1">· 更新于 {formatDate(selectedAnnotation.updatedAt)}</span>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-5">
            {isEditMode ? (
              <>
                <GlassButton
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    if (isCreating) {
                      closeAnnotationPanel();
                    } else {
                      setIsEditMode(false);
                    }
                  }}
                >
                  取消
                </GlassButton>
                <GlassButton
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={handleSave}
                  disabled={!title.trim()}
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  保存
                </GlassButton>
              </>
            ) : (
              <>
                <GlassButton
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4 mr-1.5 text-red-400" />
                  删除
                </GlassButton>
                <GlassButton
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={() => setIsEditMode(true)}
                >
                  <Edit3 className="w-4 h-4 mr-1.5" />
                  编辑
                </GlassButton>
              </>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </AnimatePresence>
  );
}
