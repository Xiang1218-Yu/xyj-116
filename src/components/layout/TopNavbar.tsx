import { motion } from 'framer-motion';
import { Activity, User, HelpCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BodySystem, SYSTEM_NAMES } from '../../types';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { GlassButton } from '../ui/GlassButton';
import { cn } from '../../lib/utils';

const systemOptions: { id: BodySystem | null; label: string; icon: string }[] = [
  { id: null, label: '全部系统', icon: '🧬' },
  { id: BodySystem.SKELETAL, label: SYSTEM_NAMES[BodySystem.SKELETAL], icon: '🦴' },
  { id: BodySystem.MUSCULAR, label: SYSTEM_NAMES[BodySystem.MUSCULAR], icon: '💪' },
  { id: BodySystem.NERVOUS, label: SYSTEM_NAMES[BodySystem.NERVOUS], icon: '🧠' },
  { id: BodySystem.CIRCULATORY, label: SYSTEM_NAMES[BodySystem.CIRCULATORY], icon: '❤️' },
  { id: BodySystem.RESPIRATORY, label: SYSTEM_NAMES[BodySystem.RESPIRATORY], icon: '🫁' },
  { id: BodySystem.DIGESTIVE, label: SYSTEM_NAMES[BodySystem.DIGESTIVE], icon: '🍽️' },
  { id: BodySystem.ENDOCRINE, label: SYSTEM_NAMES[BodySystem.ENDOCRINE], icon: '🩸' },
];

export function TopNavbar() {
  const { activeSystem, setActiveSystem } = useAnatomyStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                3D解剖系统
              </h1>
              <p className="text-[10px] text-white/50 tracking-widest">VIRTUAL ANATOMY LAB</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08]">
            {systemOptions.map((system, index) => (
              <GlassButton
                key={system.id || 'all'}
                variant={activeSystem === system.id ? 'primary' : 'ghost'}
                size="sm"
                active={activeSystem === system.id}
                onClick={() => setActiveSystem(system.id)}
                className="flex items-center gap-1.5"
              >
                <span className="text-base">{system.icon}</span>
                <span className="whitespace-nowrap">{system.label}</span>
              </GlassButton>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <GlassButton variant="ghost" size="sm">
                <HelpCircle className="w-4 h-4" />
              </GlassButton>
              <GlassButton variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </GlassButton>
            </div>
            <GlassButton 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </GlassButton>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="md:hidden mt-3 p-2 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-2 gap-2">
              {systemOptions.map((system) => (
                <GlassButton
                  key={system.id || 'all'}
                  variant={activeSystem === system.id ? 'primary' : 'ghost'}
                  size="sm"
                  active={activeSystem === system.id}
                  onClick={() => {
                    setActiveSystem(system.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-center"
                >
                  <span className="text-base">{system.icon}</span>
                  <span>{system.label}</span>
                </GlassButton>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
