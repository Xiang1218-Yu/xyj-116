import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'minimal';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = cn(
      'rounded-2xl border transition-all duration-300',
      'backdrop-blur-xl',
      'shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
    );

    const variants = {
      default: cn(
        'bg-white/[0.03] border-white/[0.08]',
        'hover:bg-white/[0.05] hover:border-white/[0.12]'
      ),
      elevated: cn(
        'bg-gradient-to-br from-white/[0.06] to-white/[0.02]',
        'border-white/[0.1]',
        'shadow-[0_16px_48px_rgba(0,0,0,0.4)]'
      ),
      minimal: cn(
        'bg-transparent border-white/[0.05]',
        'hover:border-white/[0.1]'
      )
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8'
    };

    const MotionDiv = motion.div as any;

    return (
      <MotionDiv
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </MotionDiv>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
