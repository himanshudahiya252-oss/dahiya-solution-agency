import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const reasons = [
  { id: 'tech', title: 'Cutting-Edge Technology', content: 'We leverage the latest frameworks, AI models, and cloud infrastructure to build scalable, high-performance digital products.' },
  { id: 'design', title: 'Premium Design', content: 'Every interface we create is crafted with cinematic precision, ensuring your brand stands out in a crowded market.' },
  { id: 'marketing', title: 'Performance Marketing', content: 'Data-driven strategies that optimize for conversion, maximizing your return on investment across all digital channels.' },
  { id: 'ai', title: 'AI Integration', content: 'We embed intelligent automation and machine learning into your workflows to save time and unlock new capabilities.' },
  { id: 'support', title: 'Dedicated Support', content: 'Our partnership doesn\'t end at launch. We provide ongoing maintenance, security updates, and strategic guidance.' },
  { id: 'scalability', title: 'Scalable Architecture', content: 'Solutions engineered to grow with your business, handling increased traffic and complexity without compromising performance.' },
  { id: 'quality', title: 'Uncompromising Quality', content: 'Rigorous testing and peer reviews ensure every line of code and every pixel meets our enterprise standards.' },
  { id: 'transparency', title: 'Total Transparency', content: 'Clear communication, predictable timelines, and no hidden fees. You always know where your project stands.' },
];

export function WhyChooseUs() {
  const [activeReason, setActiveReason] = useState<string>('tech');

  return (
    <section className="py-32 px-6 md:px-12 bg-ds-black relative overflow-hidden">
      <div className="absolute inset-0 bg-ds-graphite/30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Visuals */}
          <div className="flex-1 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
                The Dahiya Advantage
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-ds-white mb-6">
                Why Industry Leaders Choose Us
              </h2>
              <p className="text-ds-smoke text-lg font-light leading-relaxed mb-12 max-w-md">
                We don't just build websites. We engineer robust digital ecosystems designed to accelerate your business growth.
              </p>
              
              {/* Premium Visual Representation */}
              <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden glass-panel border border-white/10 p-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-ds-blue/20 to-transparent opacity-50" />
                <div className="w-full h-full rounded-2xl bg-ds-black relative overflow-hidden flex items-center justify-center group">
                   
                   {/* Animated abstract tech visual */}
                   <motion.div
                     animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                     className="absolute w-[150%] h-[150%] border-[1px] border-white/5 rounded-full"
                   />
                   <motion.div
                     animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                     transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                     className="absolute w-[100%] h-[100%] border-[1px] border-white/10 rounded-full"
                   />
                   
                   <div className="relative z-10 w-32 h-32 rounded-full bg-ds-graphite border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-shadow duration-700">
                     <div className="w-16 h-16 rounded-full bg-ds-white/5 flex items-center justify-center backdrop-blur-md">
                        <div className="w-8 h-8 rounded-full bg-ds-white/10 shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
                     </div>
                   </div>
                   
                   <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl border border-white/5 backdrop-blur-md text-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <span className="text-xs font-mono text-ds-white tracking-widest uppercase">Engineered for Excellence</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right: Interactive Accordion */}
          <div className="flex-1 pt-8 lg:pt-0">
            <div className="space-y-4">
              {reasons.map((reason, index) => {
                const isActive = activeReason === reason.id;
                
                return (
                  <motion.div
                    key={reason.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`border-b border-white/10 overflow-hidden ${isActive ? 'pb-6' : 'pb-4'}`}
                  >
                    <button
                      onClick={() => setActiveReason(isActive ? '' : reason.id)}
                      className="w-full flex items-center justify-between text-left py-4 group"
                    >
                      <span className={`text-xl font-display transition-colors duration-300 ${isActive ? 'text-ds-white' : 'text-ds-silver group-hover:text-ds-white'}`}>
                        {reason.title}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300 ${isActive ? 'border-ds-white text-ds-white bg-white/5' : 'border-white/10 text-ds-smoke group-hover:text-ds-white group-hover:border-white/30'}`}
                      >
                        <Plus size={16} />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="text-ds-smoke font-light leading-relaxed max-w-lg pt-2 pr-12">
                            {reason.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
