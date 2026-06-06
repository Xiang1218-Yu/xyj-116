import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  children?: ReactNode;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'primary', size = 'md', active = false, children, ...props }, ref) => {
    const baseStyles = cn(
      'relative font-medium transition-all duration-200',
      'backdrop-blur-md border border-white/10',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
      'active:scale-[0.98]'
    );

    const variants = {
      primary: cn(
        'bg-gradient-to-r from-cyan-500/20 to-blue-500/20',
        'hover:from-cyan-500/30 hover:to-blue-500/30',
        'text-white',
        active && 'from-cyan-500/40 to-blue-500/40 shadow-lg shadow-cyan-500/20'
      ),
      secondary: cn(
        'bg-white/5 hover:bg-white/10',
        'text-white/80 hover:text-white'
      ),
      outline: cn(
        'bg-transparent border border-cyan-400/30',
        'text-cyan-400 hover:bg-cyan-400/10'
      ),
      ghost: cn(
        'bg-transparent border-transparent',
        'text-white/60 hover:text-white hover:bg-white/5',
        active && 'text-cyan-400'
      )
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-4 py-2 text-sm rounded-xl',
      lg: 'px-6 py-3 text-base rounded-2xl'
    };

    const MotionButton = motion.button as any;

    return (
      <MotionButton
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        {...props}
      >
        {active && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-inherit"
            layoutId="activeButtonGlow"
          />
        )}
        <span className="relative z-10">{children}</span>
      </MotionButton>
    );
  }
);

GlassButton.displayName = 'GlassButton';
