import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-panel p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center group ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-ds-graphite flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ds-blue/10 transition-all duration-500">
        <Icon size={28} className="text-ds-silver group-hover:text-ds-blue transition-colors" />
      </div>
      <h3 className="text-xl font-display font-medium text-ds-white mb-3">{title}</h3>
      <p className="text-sm text-ds-smoke mb-8 max-w-sm leading-relaxed">{description}</p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </motion.div>
  );
}
