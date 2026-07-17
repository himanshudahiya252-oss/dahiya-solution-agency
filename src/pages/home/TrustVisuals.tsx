import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Layers, Palette, ShieldAlert, HeartHandshake, TrendingUp } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: React.ComponentType<any>;
  glowColor: string;
}

const statsData: StatItem[] = [
  {
    label: "Digital Solutions",
    value: 99.4,
    suffix: "%",
    description: "Deployment optimization index",
    icon: Layers,
    glowColor: "rgba(59, 130, 246, 0.4)" // Blue
  },
  {
    label: "Creative Services",
    value: 48,
    suffix: "M+",
    description: "Organic campaign interactions",
    icon: Palette,
    glowColor: "rgba(168, 85, 247, 0.4)" // Purple
  },
  {
    label: "Technology Systems",
    value: 100,
    suffix: "%",
    description: "Core SLA infrastructure uptime",
    icon: ShieldAlert,
    glowColor: "rgba(6, 182, 212, 0.4)" // Cyan
  },
  {
    label: "Business Support",
    value: 12,
    suffix: " Min",
    description: "Average expert response latency",
    icon: HeartHandshake,
    glowColor: "rgba(245, 158, 11, 0.4)" // Amber
  }
];

export function TrustVisuals() {
  return (
    <section id="trust-visuals-strip" className="relative bg-ds-black border-b border-white/5 py-16 px-6 overflow-hidden z-20">
      
      {/* Absolute Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-ds-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono text-ds-blue uppercase tracking-[0.25em] font-semibold block mb-2">Verified Metrics</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ds-white tracking-tight">
              Enterprise Grade Operations
            </h2>
          </div>
          <p className="text-ds-smoke text-xs md:text-sm max-w-sm mt-2 md:mt-0 font-light leading-relaxed">
            Real-time tracking of our development platforms, active user accounts, and visual production output.
          </p>
        </div>

        {/* Dynamic Bento stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <div key={idx}>
              <StatCard stat={stat} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  const Icon = stat.icon;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // Format to 1 decimal place if it has a decimal point, otherwise integer
    if (stat.value % 1 !== 0) {
      return latest.toFixed(1);
    }
    return Math.floor(latest).toString();
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const controls = animate(count, stat.value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [stat.value, count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative p-6 bg-ds-graphite/35 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 hover:bg-ds-graphite/50 transition-all duration-300 shadow-xl"
    >
      
      {/* Glowing background radial accent on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${stat.glowColor}, transparent 40%)`
        }}
      />

      {/* Top Card Icon & Micro Spark */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <Icon size={18} className="text-ds-white" />
        </div>
        <TrendingUp size={14} className="text-ds-smoke opacity-35 group-hover:opacity-85 group-hover:text-ds-white transition-all" />
      </div>

      {/* Numeric Value Counter */}
      <div className="relative z-10 mb-1">
        <span className="text-3xl md:text-4xl font-display font-bold text-ds-white tracking-tighter">
          <motion.span>{rounded}</motion.span>{stat.suffix}
        </span>
      </div>

      {/* Title Labels */}
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-ds-white group-hover:text-ds-blue transition-colors duration-300">
          {stat.label}
        </h3>
        <p className="text-xs text-ds-smoke font-light mt-1 font-mono leading-normal">
          {stat.description}
        </p>
      </div>

      {/* Bottom glowing line indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ds-blue/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

    </motion.div>
  );
}
