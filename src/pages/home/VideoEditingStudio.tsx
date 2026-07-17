import { motion } from 'motion/react';
import { useState } from 'react';
import { Video, Film, Play, Scissors, Sliders, MonitorPlay, Maximize, PlayCircle, Layers, SplitSquareHorizontal, Sparkles } from 'lucide-react';
import { Card, Button } from '../../components/ui';

import bgImage from '../../assets/images/video_editing_studio_1784273767977.jpg';

const videoServices = [
  { icon: MonitorPlay, title: 'YouTube Editing' },
  { icon: Play, title: 'Instagram Reels' },
  { icon: Film, title: 'Corporate Videos' },
  { icon: Sparkles, title: 'Advertisement Videos' },
  { icon: PlayCircle, title: 'Short-form Content' },
  { icon: Layers, title: 'Educational Videos' },
  { icon: SplitSquareHorizontal, title: 'Product Promotions' },
  { icon: Maximize, title: 'Podcast Editing' },
  { icon: Sparkles, title: 'Motion Graphics' },
  { icon: Scissors, title: 'Visual Effects' },
];

export function VideoEditingStudio() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  return (
    <section className="relative bg-ds-black py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black via-ds-black/80 to-ds-black" />
        <div className="absolute inset-0 bg-ds-cyan/5 mix-blend-overlay" />
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
            <Film size={14} className="text-ds-cyan" />
            Cinematic Post-Production
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6">
            Engage audiences with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ds-cyan to-ds-blue">premium visual storytelling.</span>
          </h2>
          <p className="text-lg text-ds-smoke font-light leading-relaxed">
            From fast-paced social media reels to high-end corporate documentaries. Our post-production studio brings your raw footage to life with precision editing, color grading, and motion graphics.
          </p>
        </motion.div>

        {/* Interactive Editing Timeline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full bg-ds-graphite/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl mb-24 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
             <div className="flex items-center gap-3">
               <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
               </div>
               <span className="text-xs font-mono text-ds-smoke ml-4">PRO_EDIT_SEQUENCE_V2.proj</span>
             </div>
             <div className="flex items-center gap-4">
               <Sliders size={14} className="text-ds-silver" />
               <Scissors size={14} className="text-ds-silver" />
             </div>
          </div>
          
          <div className="flex flex-col gap-2 relative">
             {/* Playhead */}
             <motion.div 
               animate={{ x: ["0%", "100%", "0%"] }}
               transition={{ duration: 15, ease: "linear", repeat: Infinity }}
               className="absolute top-0 bottom-0 w-px bg-red-500 z-20 left-10"
             >
               <div className="w-3 h-3 bg-red-500 absolute -top-1 -translate-x-1/2 polygon-[50%_100%,0_0,100%_0]" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
             </motion.div>

             {/* Video Tracks */}
             <div className="flex gap-2 h-12 bg-white/[0.02] rounded-md p-1 border border-white/5">
                <div className="w-16 h-full border-r border-white/5 flex items-center justify-center text-[10px] text-ds-smoke font-mono">V2</div>
                <div className="flex-1 relative overflow-hidden flex gap-1">
                  <div className="w-1/4 h-full bg-ds-blue/40 rounded-sm border border-ds-blue/50 flex items-center px-2">
                    <span className="text-[8px] text-white/50 truncate">B-Roll_01.mp4</span>
                  </div>
                  <div className="w-1/3 h-full bg-ds-cyan/40 rounded-sm border border-ds-cyan/50 ml-12 flex items-center px-2">
                    <span className="text-[8px] text-white/50 truncate">Motion_Graphic.mov</span>
                  </div>
                </div>
             </div>
             
             <div className="flex gap-2 h-16 bg-white/[0.02] rounded-md p-1 border border-white/5">
                <div className="w-16 h-full border-r border-white/5 flex items-center justify-center text-[10px] text-ds-smoke font-mono">V1</div>
                <div className="flex-1 relative overflow-hidden flex gap-1">
                  <div className="w-1/3 h-full bg-ds-blue/20 rounded-sm border border-ds-blue/30 flex items-center px-2 relative overflow-hidden">
                     {/* Filmstrip notches simulation */}
                     <div className="absolute top-0 inset-x-0 h-1 flex justify-around opacity-20"><div className="w-1 bg-white h-1"/><div className="w-1 bg-white h-1"/><div className="w-1 bg-white h-1"/></div>
                     <span className="text-[8px] text-white/50 truncate">A-Cam_Interview.mp4</span>
                     <div className="absolute bottom-0 inset-x-0 h-1 flex justify-around opacity-20"><div className="w-1 bg-white h-1"/><div className="w-1 bg-white h-1"/><div className="w-1 bg-white h-1"/></div>
                  </div>
                  <div className="w-1/2 h-full bg-ds-blue/20 rounded-sm border border-ds-blue/30 flex items-center px-2 relative overflow-hidden">
                     <span className="text-[8px] text-white/50 truncate">A-Cam_Interview_Pt2.mp4</span>
                  </div>
                </div>
             </div>

             {/* Audio Tracks */}
             <div className="flex gap-2 h-12 bg-white/[0.02] rounded-md p-1 border border-white/5 mt-2">
                <div className="w-16 h-full border-r border-white/5 flex items-center justify-center text-[10px] text-ds-smoke font-mono">A1</div>
                <div className="flex-1 relative overflow-hidden flex gap-1">
                  <div className="w-1/3 h-full bg-green-500/20 rounded-sm border border-green-500/30 flex items-center justify-center overflow-hidden">
                     {/* Audio Waveform Simulation */}
                     <svg className="w-full h-full opacity-50" preserveAspectRatio="none" viewBox="0 0 100 10">
                       <path d="M0,5 Q5,1 10,5 T20,5 T30,5 T40,2 T50,5 T60,8 T70,5 T80,5 T90,3 T100,5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-400" />
                       <path d="M0,5 Q5,8 10,5 T20,5 T30,5 T40,7 T50,5 T60,2 T70,5 T80,5 T90,8 T100,5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-400" />
                     </svg>
                  </div>
                  <div className="w-1/2 h-full bg-green-500/20 rounded-sm border border-green-500/30 flex items-center justify-center overflow-hidden">
                     <svg className="w-full h-full opacity-50" preserveAspectRatio="none" viewBox="0 0 100 10">
                       <path d="M0,5 Q10,2 20,5 T40,5 T60,1 T80,5 T100,5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-400" />
                     </svg>
                  </div>
                </div>
             </div>
             
             <div className="flex gap-2 h-10 bg-white/[0.02] rounded-md p-1 border border-white/5">
                <div className="w-16 h-full border-r border-white/5 flex items-center justify-center text-[10px] text-ds-smoke font-mono">A2</div>
                <div className="flex-1 relative overflow-hidden flex gap-1">
                  <div className="w-full h-full bg-yellow-500/20 rounded-sm border border-yellow-500/30 flex items-center px-2">
                     <span className="text-[8px] text-yellow-200/50 truncate">Ambient_Music_Track.wav</span>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Video Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-24">
          {videoServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-ds-cyan/30 transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center gap-3 group">
                  <Icon size={24} className="text-ds-silver group-hover:text-ds-cyan transition-colors" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-ds-smoke group-hover:text-ds-white transition-colors">
                    {service.title}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Before & After / Motion Graphics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <Card className="h-full border-white/10 bg-ds-graphite/40 backdrop-blur-md overflow-hidden p-0 relative group">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-ds-black/80 rounded-full border border-white/10 text-[10px] text-ds-white font-mono uppercase tracking-widest backdrop-blur-md">
                   Color Grading
                </div>
                
                {/* Before / After Split Simulator */}
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-ds-black flex">
                  {/* Before (Left half) */}
                  <div className="w-1/2 h-full bg-[#3a444a] flex items-center justify-center border-r-2 border-white relative overflow-hidden">
                     <div className="absolute bottom-4 left-4 text-[10px] text-white/50 font-mono">RAW / LOG</div>
                     <div className="w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                  </div>
                  {/* After (Right half) */}
                  <div className="w-1/2 h-full bg-[#112233] flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-tr from-ds-blue/40 to-ds-cyan/20 mix-blend-overlay" />
                     <div className="absolute bottom-4 right-4 text-[10px] text-ds-cyan font-mono">GRADED</div>
                     <div className="w-32 h-32 rounded-full bg-ds-cyan/30 blur-2xl" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl text-ds-white mb-2">Cinematic Color Correction</h3>
                  <p className="text-ds-smoke text-sm font-light">Transform flat LOG footage into rich, cinematic visuals with professional color grading and aesthetic balancing.</p>
                </div>
             </Card>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
             <Card className="h-full border-white/10 bg-ds-graphite/40 backdrop-blur-md overflow-hidden p-0 relative group">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-ds-black/80 rounded-full border border-white/10 text-[10px] text-ds-white font-mono uppercase tracking-widest backdrop-blur-md">
                   Motion Graphics
                </div>
                
                {/* Motion Graphics Simulator */}
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-ds-black flex items-center justify-center">
                   <div className="absolute inset-0 bg-ds-blue/5" />
                   
                   <motion.div
                     animate={{ 
                       scale: [1, 1.2, 1],
                       rotate: [0, 90, 0],
                       borderRadius: ["20%", "50%", "20%"]
                     }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="w-24 h-24 border-2 border-ds-cyan flex items-center justify-center relative"
                   >
                     <motion.div
                       animate={{ rotate: [0, -180, 0] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       className="w-12 h-12 bg-ds-blue/50"
                     />
                   </motion.div>
                   
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: [0, 1, 0], y: [20, 0, -20] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                     className="absolute bottom-1/4 text-xl font-display text-ds-white tracking-widest"
                   >
                     DYNAMIC
                   </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl text-ds-white mb-2">Engaging Animations</h3>
                  <p className="text-ds-smoke text-sm font-light">Custom 2D/3D motion graphics, typography animations, and VFX that elevate your brand narrative.</p>
                </div>
             </Card>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
