import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelectionStore } from '../../store/useSelectionStore';
import { getStructureById } from '../../data/anatomyData';
import { getShortFunctionByStructureId } from '../../data/organInfoData';
import { useIsolateStore } from '../../store/useIsolateStore';

export function OrganTooltip() {
  const { hoveredStructureId } = useSelectionStore();
  const { isIsolated } = useIsolateStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (hoveredStructureId && !isIsolated) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [hoveredStructureId, isIsolated]);

  if (!hoveredStructureId) return null;

  const structure = getStructureById(hoveredStructureId);
  if (!structure) return null;

  const shortFunction = getShortFunctionByStructureId(hoveredStructureId);
  const organColor = structure.geometry.color;

  const tooltipX = mousePosition.x + 16;
  const tooltipY = mousePosition.y + 16;

  return (
    <AnimatePresence>
      {showTooltip && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 5 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            left: tooltipX,
            top: tooltipY,
            maxWidth: '280px'
          }}
        >
          <div
            className="backdrop-blur-xl rounded-xl border shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)',
              borderColor: `${organColor}40`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${organColor}20`
            }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{
                borderColor: `${organColor}30`,
                background: `linear-gradient(90deg, ${organColor}15 0%, transparent 100%)`
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: organColor, boxShadow: `0 0 8px ${organColor}` }}
                />
                <h3 className="font-semibold text-white text-sm">{structure.name}</h3>
                <span className="text-xs text-white/40 font-mono ml-auto">{structure.latinName}</span>
              </div>
            </div>

            <div className="px-4 py-3">
              <p className="text-xs text-white/70 leading-relaxed">
                {shortFunction}
              </p>
            </div>

            <div
              className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l rounded-bl-sm"
              style={{ borderColor: `${organColor}40` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
