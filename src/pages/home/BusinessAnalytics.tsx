import { motion } from 'motion/react';
import { LineChart, ArrowUpRight, Activity, Database, PieChart, Layers } from 'lucide-react';
import { Button } from '../../components/ui';

import bgImage from '../../assets/images/ai_dashboard_hologram_1784272685643.jpg';

export function BusinessAnalytics() {
  return (
    <section className="relative bg-ds-black py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ds-black via-ds-black/70 to-ds-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-ds-black via-transparent to-ds-black" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
            <LineChart size={14} className="text-ds-blue" />
            Executive Intelligence
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-ds-white leading-[1.1] mb-6 font-medium tracking-tight">
            See the full picture.
          </h2>
          <p className="text-lg md:text-xl text-ds-smoke font-light leading-relaxed">
            Unify your data sources into a single source of truth. We build custom business intelligence dashboards that turn complex datasets into clear, actionable executive insights.
          </p>
        </motion.div>

        {/* Abstract Data Visualization Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl group cursor-crosshair"
        >
           {/* Grid Pattern */}
           <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="dataGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-ds-blue" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#dataGrid)" />
           </svg>

           {/* Animated Data Lines */}
           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 2, ease: "easeInOut" }}
               d="M 0 250 C 100 250, 200 150, 300 180 C 400 210, 500 50, 600 100 C 700 150, 800 50, 1000 20"
               fill="none"
               stroke="rgba(59, 130, 246, 0.5)"
               strokeWidth="4"
             />
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
               d="M 0 280 C 150 280, 250 200, 350 220 C 450 240, 550 150, 650 180 C 750 210, 850 120, 1000 90"
               fill="none"
               stroke="rgba(34, 211, 238, 0.4)"
               strokeWidth="2"
             />
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
               d="M 0 200 C 100 200, 200 250, 300 220 C 400 190, 500 280, 600 250 C 700 220, 800 150, 1000 180"
               fill="none"
               stroke="rgba(255, 255, 255, 0.2)"
               strokeWidth="1"
               strokeDasharray="4 4"
             />
           </svg>

           {/* Floating Data Points */}
           <motion.div
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/4 right-1/4 bg-ds-blue/10 backdrop-blur-md border border-ds-blue/30 rounded-lg p-3 flex items-center gap-3"
           >
             <div className="w-2 h-2 rounded-full bg-ds-blue animate-pulse" />
             <div>
               <div className="text-[10px] text-ds-white/70 uppercase">Q4 Revenue Projection</div>
               <div className="text-sm font-bold text-ds-white">$2.4M <span className="text-green-400 text-xs ml-1">+18%</span></div>
             </div>
           </motion.div>

           <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-1/3 left-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center gap-3"
           >
             <Activity size={16} className="text-ds-cyan" />
             <div>
               <div className="text-[10px] text-ds-white/70 uppercase">User Engagement</div>
               <div className="text-sm font-bold text-ds-white">High</div>
             </div>
           </motion.div>
           
           <div className="absolute inset-0 bg-gradient-to-t from-ds-black to-transparent pointer-events-none opacity-80" />
           <div className="absolute bottom-6 left-0 right-0 text-center">
             <span className="text-xs text-ds-smoke/40 uppercase tracking-widest font-mono">Interactive Data Visualization Environment</span>
           </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="mt-16 flex flex-wrap justify-center gap-6"
        >
           <div className="flex items-center gap-2 text-ds-smoke">
             <Database size={16} />
             <span className="text-sm">Data Warehousing</span>
           </div>
           <div className="flex items-center gap-2 text-ds-smoke">
             <Layers size={16} />
             <span className="text-sm">ETL Pipelines</span>
           </div>
           <div className="flex items-center gap-2 text-ds-smoke">
             <PieChart size={16} />
             <span className="text-sm">Custom Dashboards</span>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
