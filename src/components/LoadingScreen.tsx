import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-ds-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ds-blue/5 rounded-full blur-[100px]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[80px]"
        />
        {/* Simple AI Connection lines visual */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="overflow-hidden mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <Logo type="icon" size={110} />
            <div className="text-ds-white font-display text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mt-5 text-center">
              Dahiya Solution
            </div>
            <div className="text-[#DFAC6C] font-mono text-[9px] md:text-[10px] tracking-[0.3em] font-semibold uppercase mt-2.5 text-center">
              Elite Digital Agency
            </div>
          </motion.div>
        </div>
        
        <div className="w-48 md:w-64 h-px bg-ds-steel relative overflow-hidden mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-ds-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "circOut", duration: 0.2 }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-ds-smoke font-mono text-xs tracking-widest flex items-center gap-4"
        >
          <span>INITIALIZING</span>
          <span className="text-ds-white">{Math.min(progress, 100)}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
