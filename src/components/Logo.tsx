import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: number;
  type?: 'icon' | 'full' | 'showcase';
  animated?: boolean;
}

export default function Logo({ className = '', size = 48, type = 'full', animated = true }: LogoProps) {
  // Common Gradients & Filters
  const renderDefs = () => (
    <defs>
      {/* 3D Realistic Polished Gold Gradient */}
      <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2D4" />
        <stop offset="20%" stopColor="#F4D08B" />
        <stop offset="40%" stopColor="#DFAC6C" />
        <stop offset="60%" stopColor="#C58B49" />
        <stop offset="80%" stopColor="#A26B2E" />
        <stop offset="90%" stopColor="#DFAC6C" />
        <stop offset="100%" stopColor="#FFF2D4" />
      </linearGradient>

      {/* 3D Realistic Polished Silver/Platinum Gradient */}
      <linearGradient id="logoSilver" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="25%" stopColor="#E2E8F0" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="75%" stopColor="#475569" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>

      {/* Outer Golden Glow for Elegance */}
      <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComponentTransfer in="blur" result="glow1">
          <feFuncA type="linear" slope="0.6" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Deep Shadow Filter */}
      <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.6" />
      </filter>
    </defs>
  );

  // Separate "D" and "S" emblem SVG
  const renderEmblem = (svgSize: number) => {
    const motionProps = animated ? {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    } : {};

    return (
      <motion.svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-xl"
        {...motionProps}
      >
        {renderDefs()}
        
        {/* Glow backdrop behind logo */}
        <circle cx="100" cy="100" r="70" fill="url(#logoGold)" className="opacity-[0.03] blur-xl" />

        {/* D-shape (Gold) - Shifted Left */}
        <path
          d="M 42 45 H 85 C 120 45 138 70 138 100 C 138 130 120 155 85 155 H 42 Z"
          stroke="url(#logoGold)"
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#logoGlow)"
        />

        {/* Inner D detail lines */}
        <path
          d="M 51 54 H 85 C 110 54 126 75 126 100 C 126 125 110 146 85 146 H 51 Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          className="opacity-30"
          fill="none"
        />

        {/* S-shape (Silver) - Shifted Right */}
        <path
          d="M 178 70 C 178 48 156 38 136 38 C 116 38 104 54 104 72 C 104 92 130 102 154 112"
          stroke="url(#logoSilver)"
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#logoShadow)"
        />
        <path
          d="M 154 112 C 174 120 182 134 182 146 C 182 162 164 168 144 168 C 122 168 104 154 104 136"
          stroke="url(#logoSilver)"
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#logoShadow)"
        />

        {/* High-gloss highlights */}
        <circle cx="66" cy="38" r="1.5" fill="#FFFFFF" className="animate-pulse" />
        <circle cx="144" cy="168" r="1.5" fill="#FFFFFF" className="animate-pulse" />
      </motion.svg>
    );
  };

  if (type === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem(size)}
      </div>
    );
  }

  if (type === 'full') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        {renderEmblem(size)}
        <div className="flex flex-col text-left">
          <span className="font-display font-bold tracking-[0.16em] text-ds-white uppercase text-base sm:text-lg leading-tight">
            Dahiya Solution
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#DFAC6C] font-semibold uppercase leading-none mt-1">
            Elite Digital Agency
          </span>
        </div>
      </div>
    );
  }

  // Showcase: Full official logo artwork with central gold/silver interlocking DS,
  // circular glowing tracks, and the 8 business divisions precisely detailed.
  const serviceBubbles = [
    { label: 'BRANDING', x: 200 + 150 * Math.cos(-Math.PI * 0.75), y: 200 + 150 * Math.sin(-Math.PI * 0.75), color: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
    { label: 'UI/UX DESIGN', x: 200 + 150 * Math.cos(-Math.PI * 1.0), y: 200 + 150 * Math.sin(-Math.PI * 1.0), color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    { label: 'AI AUTOMATION', x: 200 + 150 * Math.cos(-Math.PI * 1.25), y: 200 + 150 * Math.sin(-Math.PI * 1.25), color: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
    { label: 'DIGITAL MARKETING', x: 200 + 150 * Math.cos(-Math.PI * 1.5), y: 200 + 150 * Math.sin(-Math.PI * 1.5), color: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    { label: 'SEO OPTIMIZATION', x: 200 + 150 * Math.cos(-Math.PI * 1.75), y: 200 + 150 * Math.sin(-Math.PI * 1.75), color: 'text-purple-400', glow: 'shadow-purple-500/20' },
    { label: 'MOBILE APP DEV', x: 200 + 150 * Math.cos(0), y: 200 + 150 * Math.sin(0), color: 'text-rose-400', glow: 'shadow-rose-500/20' },
    { label: 'WEB DEVELOPMENT', x: 200 + 150 * Math.cos(-Math.PI * 0.25), y: 200 + 150 * Math.sin(-Math.PI * 0.25), color: 'text-blue-400', glow: 'shadow-blue-500/20' },
    { label: 'BUSINESS ANALYST', x: 200 + 150 * Math.cos(-Math.PI * 0.5), y: 200 + 150 * Math.sin(-Math.PI * 0.5), color: 'text-amber-500', glow: 'shadow-amber-500/20' }
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center p-8 select-none ${className}`}>
      
      {/* 3D Luxury Orbital Ring Visualizer */}
      <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center">
        
        {/* Orbital circles in background */}
        <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-dashed border-white/10 pointer-events-none animate-spin" style={{ animationDuration: '90s' }} />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-16 rounded-full border border-[#DFAC6C]/20 pointer-events-none"
        />

        {/* Central emblem */}
        <div className="absolute z-10 flex flex-col items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer drop-shadow-[0_10px_40px_rgba(223,172,108,0.25)]"
          >
            {renderEmblem(size * 1.5)}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mt-5"
          >
            <h2 className="text-ds-white font-display text-xl md:text-2xl font-bold tracking-[0.2em] uppercase leading-none drop-shadow-md">
              Dahiya Solution
            </h2>
            <p className="text-[#DFAC6C] font-mono text-[9px] md:text-[10px] tracking-[0.3em] font-semibold uppercase mt-2.5 drop-shadow-md">
              Elite Digital Agency
            </p>
          </motion.div>
        </div>

        {/* Orbital Service Bubbles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 400 400">
          <g>
            {serviceBubbles.map((bubble, idx) => (
              <g key={bubble.label}>
                {/* Glowing line connector */}
                <line 
                  x1="200" 
                  y1="200" 
                  x2={bubble.x} 
                  y2={bubble.y} 
                  stroke="url(#logoGold)" 
                  className="opacity-[0.08]" 
                  strokeWidth="1.5"
                />
                
                {/* Orbital Orb Node */}
                <circle 
                  cx={bubble.x} 
                  cy={bubble.y} 
                  r="14" 
                  className="fill-ds-black/80 stroke-[#DFAC6C]/40 cursor-pointer pointer-events-auto" 
                  strokeWidth="1.5"
                />
                
                {/* Central shining core */}
                <circle 
                  cx={bubble.x} 
                  cy={bubble.y} 
                  r="5" 
                  className="fill-white"
                  filter="url(#logoGlow)"
                />

                {/* Service Label Text */}
                <text
                  x={bubble.x}
                  y={bubble.y + 28}
                  textAnchor="middle"
                  className="fill-ds-smoke font-mono text-[7.5px] font-bold tracking-widest uppercase pointer-events-auto cursor-pointer"
                >
                  {bubble.label}
                </text>
              </g>
            ))}
          </g>
        </svg>

      </div>
    </div>
  );
}
