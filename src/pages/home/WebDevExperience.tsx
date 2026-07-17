import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  Monitor, Laptop, Tablet, Smartphone, Code, Layout, Database, Cloud, Zap, Shield, 
  ChevronRight, Globe, Layers, Cpu, Code2, PenTool, LayoutDashboard, RefreshCcw, 
  Wrench, GraduationCap, Play, Pause, RefreshCw, Eye
} from 'lucide-react';
import { Card, Button, OptimizedImage, OptimizedVideo } from '../../components/ui';
import { useMedia } from '../../context/MediaContext';

const features = [
  { icon: Globe, title: 'Business Website', desc: 'Professional online presence designed for conversion.' },
  { icon: Layout, title: 'Corporate Website', desc: 'Enterprise-grade architecture for large organizations.' },
  { icon: Monitor, title: 'Portfolio Website', desc: 'Showcase your work with stunning visual galleries.' },
  { icon: Zap, title: 'Landing Page', desc: 'High-converting pages optimized for ad campaigns.' },
  { icon: Layers, title: 'E-commerce Website', desc: 'Scalable online stores with secure checkout.' },
  { icon: GraduationCap, title: 'Educational Website', desc: 'LMS platforms for courses and institutions.' },
  { icon: Code2, title: 'Custom Web Application', desc: 'Complex workflows engineered into simple UI.' },
  { icon: LayoutDashboard, title: 'Dashboard Development', desc: 'Data visualization and admin interfaces.' },
  { icon: RefreshCcw, title: 'Website Redesign', desc: 'Modernize your outdated digital presence.' },
  { icon: Wrench, title: 'Website Maintenance', desc: 'Ongoing updates, security, and optimization.' },
];

const mockups = [
  { id: 'corporate', title: 'Corporate Portal & Live Walkthrough', desc: 'Experience our high-speed, enterprise-ready web architectures.', action: 'play' },
  { id: 'restaurant', title: 'Interactive UX Architecture', desc: 'Bespoke design language and seamless micro-interactions.', action: 'static' },
  { id: 'education', title: 'LMS Platform Demo', desc: 'Robust course management and real-time student databases.', action: 'static' }
];

export function WebDevExperience() {
  const { media } = useMedia();
  const [activeMockup, setActiveMockup] = useState(mockups[0].id);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section className="relative bg-ds-black py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Dynamic Background loaded from central Media Hub */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-luminosity">
        <OptimizedImage 
          src={media.webDevImage} 
          alt="" 
          className="absolute inset-0 transition-all duration-1000"
          aspectRatio=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black via-ds-black/85 to-ds-black" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-8 backdrop-blur-sm">
            <Code size={14} className="text-ds-blue" />
            Web Engineering Excellence
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6">
            Digital architecture that performs beautifully.
          </h2>
          <p className="text-lg text-ds-smoke font-light leading-relaxed">
            From highly converting landing pages to complex enterprise web applications, we engineer scalable, lightning-fast digital experiences that captivate users and drive business growth.
          </p>
        </motion.div>

        {/* Feature Cards Grid with Custom Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card hoverable className="p-6 h-full flex flex-col group border-white/5 bg-white/[0.02] cursor-pointer hover:border-ds-blue/40 hover:bg-ds-blue/[0.02] transition-all duration-500 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg bg-ds-graphite flex items-center justify-center mb-4 group-hover:bg-ds-blue/15 transition-all duration-500">
                    <Icon size={20} className="text-ds-silver group-hover:text-ds-blue transition-all duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-base text-ds-white mb-2 group-hover:text-ds-blue transition-all duration-300">{feature.title}</h3>
                  <p className="text-ds-smoke text-xs font-light leading-relaxed mt-auto">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Interactive Showcase & Dynamic Responsive Previews */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Responsive Devices & Video Sandbox Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1 w-full relative h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Desktop Window - Sandbox Frame */}
              <motion.div 
                animate={{ y: isPlayingVideo ? 0 : [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-10 w-full max-w-[500px] aspect-[16/10] bg-ds-graphite rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Browser Header */}
                <div className="h-7 bg-white/5 border-b border-white/10 flex items-center justify-between px-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="text-[9px] font-mono text-ds-smoke bg-white/5 px-4 py-0.5 rounded-full max-w-[180px] truncate">
                    {activeMockup === 'corporate' && isPlayingVideo ? '🔴 LIVE_WALKTHROUGH.mp4' : 'dahiyasolution.com/preview'}
                  </div>
                  <div className="w-6" />
                </div>
                
                {/* Sandbox Browser Content Area */}
                <div className="flex-1 bg-ds-black relative overflow-hidden flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeMockup === 'corporate' && isPlayingVideo ? (
                      <motion.div 
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full bg-black"
                      >
                        <OptimizedVideo 
                          src={media.webDevVideo}
                          className="w-full h-full"
                        />
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="static"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 p-4 space-y-4 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-[10px] font-mono text-ds-cyan font-bold tracking-widest uppercase">
                            {activeMockup === 'corporate' ? 'CORPORATE PLATFORM' : 
                             activeMockup === 'restaurant' ? 'INTERACTIVE PORTAL' : 'EDUCATION SYSTEM'}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        
                        <div className="space-y-2 flex-1 flex flex-col justify-center">
                          <div className="h-6 bg-white/10 rounded w-2/3" />
                          <div className="h-3 bg-white/5 rounded w-full" />
                          <div className="h-3 bg-white/5 rounded w-5/6" />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-14 bg-ds-blue/10 rounded-lg flex items-center justify-center flex-col">
                            <span className="text-xs font-bold text-ds-blue font-mono">0.24s</span>
                            <span className="text-[8px] font-mono text-ds-smoke">FCP</span>
                          </div>
                          <div className="h-14 bg-ds-cyan/10 rounded-lg flex items-center justify-center flex-col">
                            <span className="text-xs font-bold text-ds-cyan font-mono">99.8%</span>
                            <span className="text-[8px] font-mono text-ds-smoke">UPTIME</span>
                          </div>
                          <div className="h-14 bg-white/5 rounded-lg flex items-center justify-center flex-col">
                            <span className="text-xs font-bold text-ds-white font-mono">100%</span>
                            <span className="text-[8px] font-mono text-ds-smoke">SEO</span>
                          </div>
                        </div>

                        {activeMockup === 'corporate' && (
                          <button 
                            onClick={() => setIsPlayingVideo(true)}
                            className="w-full py-2 bg-ds-blue/20 hover:bg-ds-blue text-xs font-mono font-bold text-ds-white rounded-lg flex items-center justify-center gap-2 border border-ds-blue/30 transition-all"
                          >
                            <Play size={10} fill="currentColor" /> ENTER LIVE WALKTHROUGH
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Mobile Phone Device Shell */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute z-20 -right-4 md:-right-10 bottom-8 w-[130px] aspect-[9/19] bg-ds-black rounded-[24px] border-4 border-ds-graphite shadow-2xl overflow-hidden"
              >
                 <div className="absolute top-0 inset-x-0 h-4 bg-ds-graphite rounded-b-xl w-1/2 mx-auto z-10" />
                 <div className="p-3 pt-6 h-full flex flex-col justify-between">
                   <div className="space-y-2">
                     <div className="w-10 h-10 rounded-full bg-ds-blue/10 flex items-center justify-center">
                       <Smartphone size={14} className="text-ds-blue" />
                     </div>
                     <div className="h-2.5 bg-white/10 rounded w-3/4" />
                     <div className="h-1.5 bg-white/5 rounded w-full" />
                   </div>
                   
                   <div className="space-y-2">
                     <div className="h-10 bg-white/5 rounded-lg" />
                     <div className="h-10 bg-ds-blue/15 rounded-lg border border-ds-blue/20" />
                   </div>
                 </div>
              </motion.div>
              
              {/* Tablet Device Shell */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute z-0 -left-4 md:-left-10 top-12 w-[190px] aspect-[3/4] bg-ds-graphite rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col opacity-50"
              >
                 <div className="flex-1 bg-ds-black p-3 flex flex-col gap-3 justify-between">
                    <div className="w-full h-16 bg-white/5 rounded-lg" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 bg-white/5 rounded-lg" />
                      <div className="h-12 bg-white/5 rounded-lg" />
                    </div>
                 </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Interactive Mockup Selector and Narrative */}
          <div className="flex-1">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-display text-ds-white mb-6"
            >
              Omnichannel Responsive Perfection
            </motion.h3>
            
            <p className="text-sm text-ds-silver font-light leading-relaxed mb-8">
              Explore custom system configurations or watch high-fidelity product previews showcasing swift API queries, buttery-smooth animations, and dynamic loading behaviors.
            </p>

            <div className="space-y-4 mb-8">
              {mockups.map((mockup, idx) => (
                <motion.div 
                  key={mockup.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    setActiveMockup(mockup.id);
                    if (mockup.id !== 'corporate') {
                      setIsPlayingVideo(false);
                    }
                  }}
                  className={`p-4 rounded-xl border ${activeMockup === mockup.id ? 'border-ds-blue/50 bg-ds-blue/5' : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'} cursor-pointer transition-all flex items-center justify-between group`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeMockup === mockup.id ? 'bg-ds-blue' : 'bg-white/20'}`} />
                      <span className={`font-medium font-display text-sm ${activeMockup === mockup.id ? 'text-ds-white' : 'text-ds-smoke'}`}>{mockup.title}</span>
                      {mockup.action === 'play' && (
                        <span className="text-[8px] font-mono text-ds-cyan bg-ds-cyan/10 px-1.5 py-0.5 rounded uppercase">walkthrough</span>
                      )}
                    </div>
                    <p className="text-[11px] text-ds-smoke font-light mt-1 pl-4 group-hover:text-ds-silver transition-colors">{mockup.desc}</p>
                  </div>
                  <ChevronRight size={16} className={activeMockup === mockup.id ? 'text-ds-blue' : 'text-ds-smoke opacity-0 group-hover:opacity-100'} />
                </motion.div>
              ))}
            </div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <a href="/portfolio" className="inline-flex items-center">
                 <Button variant="primary" className="group !bg-ds-blue hover:!bg-ds-blue/80 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                   View Development Portfolio <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
