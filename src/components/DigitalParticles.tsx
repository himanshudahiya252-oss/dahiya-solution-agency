import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function DigitalParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 3 + 1, // 1px to 4px
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10, // 10s to 20s
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-ds-blue/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(0, 112, 243, 0.5)`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Subtle glowing lines representing connections */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-ds-blue)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-ds-blue)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-ds-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line 
          x1="10%" y1="20%" x2="40%" y2="60%" 
          stroke="url(#lineGrad)" strokeWidth="1"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          strokeDasharray="100"
        />
        <motion.line 
          x1="70%" y1="80%" x2="85%" y2="30%" 
          stroke="url(#lineGrad)" strokeWidth="1"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
          strokeDasharray="100"
        />
        <motion.line 
          x1="30%" y1="90%" x2="60%" y2="40%" 
          stroke="url(#lineGrad)" strokeWidth="1"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
          strokeDasharray="100"
        />
      </svg>
    </div>
  );
}
