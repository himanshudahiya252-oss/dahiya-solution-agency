import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Smartphone, CheckCircle, ChevronRight, Zap, Target, Shield, Layers, Play, Eye } from 'lucide-react';
import { Card, Button, OptimizedImage } from '../../components/ui';
import { useMedia } from '../../context/MediaContext';

const features = [
  "Business & Enterprise Apps",
  "Booking & Scheduling Systems",
  "Educational & LMS Platforms",
  "Customer Portals & Dashboards",
  "Productivity & Workflow Tools",
  "Analytics & Data Visualization"
];

export function AppDevExperience() {
  const { media } = useMedia();
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  return (
    <section className="relative bg-ds-black py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Centralized Media Context Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-luminosity">
        <OptimizedImage 
          src={media.appDevImage} 
          alt="" 
          className="absolute inset-0 transition-all duration-1000"
          aspectRatio=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ds-black via-ds-black/85 to-ds-black" />
      </div>
      
      {/* Abstract floating elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <motion.div
           animate={{ y: [0, -40, 0], opacity: [0.1, 0.25, 0.1] }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -right-20 top-40 w-96 h-96 bg-ds-blue/20 rounded-full blur-[100px]"
         />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Interactive Phone Mockup with Embedded Demo Walkthrough */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1 w-full flex justify-center relative perspective-1000"
          >
             <motion.div
               animate={{ rotateY: isDemoRunning ? 0 : [-3, 3, -3], rotateX: isDemoRunning ? 0 : [3, -3, 3] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="w-[290px] aspect-[9/19] bg-ds-black rounded-[40px] border-[8px] border-ds-graphite shadow-2xl relative overflow-hidden"
               style={{ transformStyle: 'preserve-3d' }}
             >
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-ds-graphite rounded-b-2xl w-1/2 mx-auto z-20" />
                
                {/* App Screen Content */}
                <div className="absolute inset-0 p-6 pt-12 flex flex-col justify-between">
                   <AnimatePresence mode="wait">
                     {isDemoRunning ? (
                       <motion.div 
                         key="demo-video"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 w-full h-full bg-black"
                       >
                         <video 
                           src={media.appDevVideo}
                           autoPlay 
                           loop 
                           muted 
                           controls
                           className="w-full h-full object-cover"
                         />
                       </motion.div>
                     ) : (
                       <motion.div 
                         key="app-ui"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className="h-full flex flex-col justify-between"
                       >
                         <div className="space-y-4">
                           <div className="flex justify-between items-center">
                             <div className="w-10 h-10 rounded-full bg-ds-blue/10 flex items-center justify-center">
                               <Smartphone size={18} className="text-ds-blue" />
                             </div>
                             <span className="text-[8px] font-mono text-ds-cyan bg-ds-cyan/10 px-2 py-0.5 rounded-full">v2.4 SECURE</span>
                           </div>
                           
                           <div className="space-y-2">
                             <div className="w-3/4 h-5 bg-white/10 rounded-md" />
                             <div className="w-1/2 h-3 bg-white/5 rounded-md" />
                           </div>
                           
                           <div className="grid grid-cols-2 gap-3 pt-2">
                             <div className="aspect-square bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center p-3">
                               <Zap size={16} className="text-ds-blue mb-1" />
                               <span className="text-[8px] font-mono text-ds-smoke text-center">SPEED</span>
                             </div>
                             <div className="aspect-square bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center p-3">
                               <Shield size={16} className="text-ds-cyan mb-1" />
                               <span className="text-[8px] font-mono text-ds-smoke text-center">CIPHER</span>
                             </div>
                           </div>
                         </div>
                         
                         <div className="space-y-4">
                           {/* Quick Action Trigger */}
                           <button 
                             onClick={() => setIsDemoRunning(true)}
                             className="w-full py-2.5 bg-ds-blue hover:bg-ds-blue/90 text-[10px] font-mono font-bold text-ds-white rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
                           >
                             <Play size={10} fill="currentColor" /> WALKTHROUGH DEMO
                           </button>

                           {/* Bottom Nav */}
                           <div className="h-12 bg-ds-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-around px-2">
                             <div className="w-6 h-6 rounded-full bg-ds-blue/20" />
                             <div className="w-6 h-6 rounded-full bg-white/5" />
                             <div className="w-6 h-6 rounded-full bg-white/5" />
                           </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
                
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-10 mix-blend-overlay pointer-events-none" />
             </motion.div>
             
             {/* Floating App Cards */}
             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -right-6 top-1/4 z-30"
             >
                <Card className="p-3 bg-ds-black/80 backdrop-blur-md border-white/10 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
                    <Zap size={14} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-[9px] text-ds-smoke uppercase tracking-wider font-mono">Core Velocity</div>
                    <div className="text-xs font-bold text-ds-white">60fps Render</div>
                  </div>
                </Card>
             </motion.div>
             
             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute -left-10 bottom-1/4 z-30"
             >
                <Card className="p-3 bg-ds-black/80 backdrop-blur-md border-white/10 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/15 flex items-center justify-center">
                    <Shield size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[9px] text-ds-smoke uppercase tracking-wider font-mono">Biometrics</div>
                    <div className="text-xs font-bold text-ds-white">FaceID Encrypted</div>
                  </div>
                </Card>
             </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
                <Smartphone size={14} className="text-ds-blue" />
                Mobile Engineering
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6">
                Native performance. <br/>
                <span className="text-ds-smoke font-light italic">Global reach.</span>
              </h2>
              <p className="text-lg text-ds-silver font-light leading-relaxed mb-10 max-w-xl">
                We engineer scalable, high-performance mobile applications that deliver native experiences across iOS and Android. From consumer apps to complex enterprise tools, we bring your vision to every pocket.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <CheckCircle size={18} className="text-ds-blue group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-ds-smoke group-hover:text-ds-white transition-colors text-sm font-light">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="flex flex-col sm:flex-row gap-4"
            >
               {isDemoRunning && (
                 <Button 
                   onClick={() => setIsDemoRunning(false)}
                   variant="outline" 
                   size="lg" 
                   className="font-mono text-xs"
                 >
                   Reset Device Screen
                 </Button>
               )}
               <a href="/contact">
                 <Button variant="outline" size="lg" className="group">
                   Discuss App Project <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </a>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
