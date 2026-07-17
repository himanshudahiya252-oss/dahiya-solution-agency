import { motion } from 'motion/react';
import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  centered?: boolean;
}

export default function Section({
  id,
  className = '',
  label,
  title,
  description,
  children,
  centered = false,
}: SectionProps) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 ${className}`}>
      <div className={`max-w-7xl mx-auto ${centered ? 'text-center' : ''}`}>
        <div className={`mb-16 md:mb-24 ${centered ? 'flex flex-col items-center' : ''}`}>
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-ds-steel bg-ds-graphite/50 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ds-silver" />
              <span className="text-[10px] font-mono text-ds-silver uppercase tracking-[0.2em]">{label}</span>
            </motion.div>
          )}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-ds-white leading-[1.1] mb-6"
          >
            {title}
          </motion.h2>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-ds-smoke max-w-2xl font-light leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
