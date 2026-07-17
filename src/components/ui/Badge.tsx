import { HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    
    const baseClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
    
    const variants = {
      default: "bg-white/10 text-ds-white hover:bg-white/20 border border-transparent",
      primary: "bg-ds-blue/20 text-ds-blue hover:bg-ds-blue/30 border border-ds-blue/20",
      success: "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/20",
      warning: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/20",
      danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20",
      outline: "text-ds-silver border border-white/20 hover:border-white/40",
    };

    return (
      <div 
        ref={ref}
        className={`${baseClass} ${variants[variant]} ${className}`} 
        {...props} 
      />
    );
  }
);
Badge.displayName = 'Badge';
