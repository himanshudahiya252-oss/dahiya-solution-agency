import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  Share2, Instagram, Linkedin, Facebook, Twitter, Smartphone, Calendar as CalendarIcon, 
  MessageCircle, BarChart, PenTool, Hash, TrendingUp, Users, ArrowRight, Play, Eye, CheckCircle2
} from 'lucide-react';
import { Card, Button } from '../../components/ui';
import { useMedia } from '../../context/MediaContext';

const socialServices = [
  { icon: PenTool, title: 'Creative Design' },
  { icon: CalendarIcon, title: 'Daily Posting' },
  { icon: Smartphone, title: 'Story Management' },
  { icon: TrendingUp, title: 'Reel Strategy' },
  { icon: MessageCircle, title: 'Audience Engagement' },
  { icon: Users, title: 'Community Management' },
  { icon: BarChart, title: 'Performance Reporting' },
  { icon: Hash, title: 'Campaign Planning' },
];

const mockDraftsByDay: Record<string, { platform: 'linkedin' | 'instagram' | 'twitter', text: string, stats: string }> = {
  'Mon': { platform: 'instagram', text: '🎨 Design Philosophy in 2026: Content + Visuals + Interaction. #UX', stats: 'Engagement prediction: 8.4%' },
  'Tue': { platform: 'linkedin', text: '💼 Enterprise scalability requires robust, type-safe API gateways. Proudly engineered at Dahiya.', stats: 'Click predicted: 420+' },
  'Wed': { platform: 'twitter', text: '🚀 Building autonomous agent pipelines using Gemini and DeepMind model classes. Stays server-side.', stats: 'Impressions prediction: 12.5K' },
  'Thu': { platform: 'instagram', text: '🎥 Behind the scenes at our creative production studio. High frame rates.', stats: 'Engagement prediction: 9.1%' },
  'Fri': { platform: 'linkedin', text: '🤝 Partnering with corporate giants to automate legacy system workflows. Safe & certified.', stats: 'Shares predicted: 85+' },
};

export function SocialMediaCommand() {
  const { media } = useMedia();
  const [selectedDay, setSelectedDay] = useState<string>('Wed');

  const activeDraft = mockDraftsByDay[selectedDay];

  return (
    <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
      {/* Dynamic Background Image from global media system */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity transition-all duration-1000"
          style={{ backgroundImage: `url(${media.socialImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ds-black via-ds-black/85 to-ds-black" />
        <div className="absolute inset-0 bg-ds-blue/5 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
            <Share2 size={14} className="text-ds-blue" />
            Social Media Command Center
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6">
            Build community. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ds-blue to-purple-400 font-bold">Drive engagement.</span>
          </h2>
          <p className="text-sm md:text-base text-ds-smoke font-light leading-relaxed">
            We don't just post content. We architect social movements. Our comprehensive social media operations room manages your brand across every relevant platform.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Interactive Platform Devices (reflects selectedDay state!) */}
          <div className="flex-1 w-full flex justify-center relative perspective-1000 h-[500px]">
             
             {/* Center Main Phone (Instagram style - active when selected draft is Instagram) */}
             <motion.div 
               animate={{ y: [0, -8, 0], rotateY: [-3, 3, -3] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className={`absolute z-30 w-[240px] aspect-[9/19] bg-ds-black rounded-[32px] border-4 border-ds-graphite shadow-2xl overflow-hidden transition-all duration-500 ${
                 activeDraft.platform === 'instagram' ? 'scale-105 border-ds-blue shadow-[0_0_25px_rgba(59,130,246,0.2)]' : 'scale-95 opacity-50'
               }`}
             >
                {/* Header */}
                <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-ds-graphite/50 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                       <Instagram size={14} className="text-ds-white" />
                       <div className="w-16 h-3 bg-white/10 rounded" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10" />
                </div>
                {/* Content */}
                <div className="p-3 space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                          <div className="w-full h-full bg-ds-black rounded-full border-2 border-ds-black" />
                       </div>
                       <div>
                         <div className="w-20 h-3 bg-white/20 rounded mb-1" />
                         <span className="text-[8px] font-mono text-ds-cyan">INSTANT PREVIEW</span>
                       </div>
                    </div>
                    {/* Image Square */}
                    <div className="w-full aspect-square bg-white/5 rounded-xl border border-white/5 relative overflow-hidden flex flex-col justify-end p-3">
                       <div className="absolute inset-0 bg-gradient-to-tr from-ds-blue/20 to-purple-500/20 mix-blend-overlay" />
                       <p className="text-[10px] text-ds-white leading-normal z-10 bg-black/50 p-2 rounded-lg backdrop-blur-sm line-clamp-3">
                         {activeDraft.text}
                       </p>
                    </div>
                    <div className="flex gap-3 text-ds-smoke text-[9px] font-mono">
                       <span>❤️ 1,245 likes</span>
                       <span>💬 48 comments</span>
                    </div>
                </div>
             </motion.div>

             {/* Right Floating Device (LinkedIn style) */}
             <motion.div 
               animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className={`absolute z-20 right-4 lg:right-0 top-12 w-[220px] aspect-[9/16] bg-ds-graphite rounded-[24px] border-2 border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ${
                 activeDraft.platform === 'linkedin' ? 'scale-105 border-ds-blue opacity-100 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'scale-95 opacity-40'
               }`}
             >
                <div className="h-10 border-b border-white/10 flex items-center px-3 bg-blue-900/20">
                    <Linkedin size={14} className="text-blue-400" />
                    <div className="ml-2 w-12 h-2 bg-blue-400/30 rounded" />
                </div>
                <div className="p-3">
                    <div className="flex gap-2 mb-3">
                      <div className="w-8 h-8 rounded bg-white/10" />
                      <div className="flex-1">
                        <div className="w-full h-2 bg-white/10 rounded mb-1" />
                        <div className="w-2/3 h-2 bg-white/5 rounded" />
                      </div>
                    </div>
                    <div className="w-full min-h-[80px] bg-white/5 rounded-lg mb-2 p-2 text-[9px] text-ds-silver leading-relaxed">
                      {activeDraft.text}
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded mb-1" />
                    <div className="w-4/5 h-2 bg-white/5 rounded" />
                </div>
             </motion.div>

             {/* Left Floating Device (Twitter/X style) */}
             <motion.div 
               animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
               transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className={`absolute z-10 left-4 lg:left-0 bottom-12 w-[200px] aspect-[9/16] bg-ds-graphite rounded-[24px] border-2 border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ${
                 activeDraft.platform === 'twitter' ? 'scale-105 border-ds-blue opacity-100 shadow-[0_0_20px_rgba(59,130,246,0.25)]' : 'scale-95 opacity-40'
               }`}
             >
                <div className="h-10 border-b border-white/10 flex items-center justify-center bg-ds-black">
                    <Twitter size={14} className="text-ds-white" />
                </div>
                <div className="p-3">
                    <div className="flex gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                      <div className="flex-1">
                        <div className="w-1/2 h-2 bg-white/10 rounded mb-2" />
                        <p className="text-[9px] text-ds-silver leading-normal mb-2 bg-white/5 p-2 rounded">
                          {activeDraft.text}
                        </p>
                        <div className="w-full h-2 bg-white/5 rounded mb-1" />
                        <div className="w-3/4 h-2 bg-white/5 rounded" />
                      </div>
                    </div>
                </div>
             </motion.div>

          </div>

          {/* Right: Services & Campaign Planner */}
          <div className="flex-1 space-y-8">
             <div className="grid grid-cols-2 gap-3">
               {socialServices.map((service, idx) => {
                 const Icon = service.icon;
                 return (
                   <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.4, delay: idx * 0.05 }}
                     className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer group"
                   >
                     <div className="w-8 h-8 rounded-lg bg-ds-black flex items-center justify-center group-hover:bg-ds-blue/10 transition-colors">
                       <Icon size={14} className="text-ds-smoke group-hover:text-ds-blue transition-colors" />
                     </div>
                     <span className="text-xs text-ds-silver font-medium font-mono">{service.title}</span>
                   </motion.div>
                 )
               })}
             </div>

             {/* Interactive Live Content Calendar / Planner */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="bg-ds-graphite/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-4"
             >
                <div className="flex justify-between items-center">
                  <div className="text-xs font-mono text-ds-white font-bold flex items-center gap-1.5">
                    <CalendarIcon size={12} className="text-ds-blue" /> Campaign Planner Sandbox
                  </div>
                  <div className="text-[9px] font-mono text-ds-smoke bg-white/5 px-2.5 py-1 rounded">Interactive scheduler</div>
                </div>

                {/* Day Selectors */}
                <div className="flex gap-2">
                  {Object.keys(mockDraftsByDay).map((day) => {
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`flex-1 flex flex-col gap-2 p-2 rounded-lg border text-center transition-all ${
                          isSelected 
                            ? 'border-ds-blue/50 bg-ds-blue/10 text-ds-white font-bold' 
                            : 'border-white/5 bg-white/[0.02] text-ds-smoke hover:bg-white/[0.04] hover:text-ds-silver'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase">{day}</span>
                        <span className={`w-1.5 h-1.5 rounded-full mx-auto ${
                          isSelected ? 'bg-ds-blue animate-pulse' : 'bg-white/20'
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Sandbox Card Details */}
                <div className="bg-ds-black/40 border border-white/5 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[9px] font-mono text-ds-cyan uppercase font-bold tracking-widest">
                      {activeDraft.platform.toUpperCase()} CAMPAIGN TARGET
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
                      Approved
                    </span>
                  </div>
                  <p className="text-xs text-ds-silver font-light italic leading-relaxed">
                    "{activeDraft.text}"
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-mono text-ds-smoke pt-1">
                    <span>Forecast: {activeDraft.stats}</span>
                    <span className="text-ds-blue flex items-center gap-1">Synchronized <CheckCircle2 size={10} className="text-emerald-400" /></span>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* Global Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 w-full glass-panel border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-b from-ds-blue/5 to-transparent pointer-events-none" />
           <h2 className="font-display text-3xl md:text-5xl text-ds-white mb-6 relative z-10 font-bold">
             Ready to transform your digital presence?
           </h2>
           <p className="text-ds-smoke max-w-2xl mx-auto mb-10 relative z-10 text-sm md:text-base font-light">
             Partner with a team of experts dedicated to engineering your success across web, apps, video, and social media campaigns.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
             <a href="/contact" className="w-full sm:w-auto">
               <Button variant="primary" size="lg" className="w-full font-bold tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.3)] !bg-ds-blue hover:!bg-ds-blue/80 text-white border-none">
                 Start Your Project
               </Button>
             </a>
             <a href="/contact" className="w-full sm:w-auto">
               <Button variant="glass" size="lg" className="w-full">
                 Book a Consultation
               </Button>
             </a>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
