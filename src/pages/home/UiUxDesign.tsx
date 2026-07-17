import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { PenTool, Target, Search, MousePointer2, Layers, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui';

import bgImage from '../../assets/images/futuristic_innovation_lab_1784271765964.jpg';

const processSteps = [
  { icon: Search, title: 'Research & Strategy', desc: 'Understanding user behavior and market gaps.' },
  { icon: Layers, title: 'Wireframing', desc: 'Structural blueprints and user journey mapping.' },
  { icon: MousePointer2, title: 'Prototyping', desc: 'Interactive models for early feedback.' },
  { icon: PenTool, title: 'UI Design', desc: 'High-fidelity visual design and design systems.' },
  { icon: CheckCircle2, title: 'Usability Testing', desc: 'Validating design choices with real users.' },
  { icon: Target, title: 'Final Handoff', desc: 'Pixel-perfect delivery to development.' }
];

export function UiUxDesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create horizontal scroll effect for the process steps
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xTransform = useTransform(scrollYProgress, [0.2, 0.8], ["10%", "-50%"]);
  
  return (
    <section ref={containerRef} className="relative bg-ds-black py-32 overflow-hidden border-y border-white/5">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ds-black via-ds-black/50 to-ds-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
            <PenTool size={14} className="text-ds-blue" />
            UI/UX Studio
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6 max-w-2xl">
            Designing digital experiences that humans love.
          </h2>
          <p className="text-lg text-ds-smoke font-light leading-relaxed max-w-xl">
            We don't just make things look pretty. We design intuitive, frictionless user journeys that drive engagement, conversion, and brand loyalty.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Process */}
      <div className="relative z-10 py-10 w-full overflow-hidden flex items-center">
        {/* Left fade out */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ds-black to-transparent z-20" />
        
        <motion.div 
          className="flex gap-6 px-12 md:px-32 w-max"
          style={{ x: xTransform }}
        >
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="w-[300px] flex-shrink-0 flex flex-col group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-ds-graphite border border-white/10 flex items-center justify-center text-ds-silver group-hover:bg-ds-blue/10 group-hover:text-ds-blue group-hover:border-ds-blue/30 transition-all duration-500">
                    <Icon size={20} />
                  </div>
                  <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1 group-hover:from-ds-blue/50 transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-display text-ds-white mb-3 group-hover:text-ds-blue transition-colors duration-300">
                  <span className="text-ds-smoke text-sm mr-2 font-mono">{String(idx + 1).padStart(2, '0')}</span>
                  {step.title}
                </h3>
                <p className="text-ds-smoke font-light text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
        
        {/* Right fade out */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ds-black to-transparent z-20" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mt-16 flex justify-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="w-full max-w-4xl aspect-[21/9] bg-ds-graphite rounded-3xl border border-white/10 overflow-hidden relative group"
         >
            {/* Abstract UI Elements representing a design file */}
            <div className="absolute inset-0 p-8 grid grid-cols-4 gap-6 opacity-40 mix-blend-screen">
              <div className="col-span-1 border-r border-white/10 pr-6 space-y-4">
                <div className="w-full h-4 bg-white/10 rounded-sm" />
                <div className="w-3/4 h-4 bg-white/5 rounded-sm" />
                <div className="w-5/6 h-4 bg-white/5 rounded-sm" />
              </div>
              <div className="col-span-2 space-y-6 flex flex-col items-center justify-center">
                 <div className="w-full max-w-md h-48 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-ds-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                   <MousePointer2 size={32} className="text-ds-blue/50 group-hover:text-ds-blue transform group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-700" />
                 </div>
              </div>
              <div className="col-span-1 border-l border-white/10 pl-6 space-y-6">
                 <div className="w-12 h-12 rounded-full bg-white/10" />
                 <div className="grid grid-cols-2 gap-2">
                   <div className="h-8 bg-white/5 rounded-sm" />
                   <div className="h-8 bg-white/5 rounded-sm" />
                   <div className="h-8 bg-white/5 rounded-sm" />
                   <div className="h-8 bg-white/5 rounded-sm" />
                 </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ds-black to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div>
                <div className="text-ds-white font-display text-xl mb-1">Design System Preview</div>
                <div className="text-ds-smoke text-sm">Interactive components & typography</div>
              </div>
            </div>
         </motion.div>
      </div>
    </section>
  );
}
