import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  Youtube, MonitorPlay, BarChart, Settings, Users, Video, Search, MessageSquare, 
  PenTool, LayoutDashboard, Share2, TrendingUp, Calendar as CalendarIcon, ArrowRight, 
  PlayCircle, KanbanSquare, CheckCircle2, ChevronRight, Sparkles
} from 'lucide-react';
import { Card, Button } from '../../components/ui';
import { useMedia } from '../../context/MediaContext';

const youtubeServices = [
  { icon: Settings, title: 'Channel Setup & Branding' },
  { icon: PenTool, title: 'Thumbnail Design' },
  { icon: Search, title: 'SEO & Keyword Research' },
  { icon: CalendarIcon, title: 'Content Planning' },
  { icon: Video, title: 'Video Publishing' },
  { icon: LayoutDashboard, title: 'Playlist Management' },
  { icon: Users, title: 'Audience Analysis' },
  { icon: TrendingUp, title: 'Growth Strategy' },
  { icon: MessageSquare, title: 'Community Management' },
  { icon: BarChart, title: 'Performance Reports' },
];

const pipeline = [
  { step: 'Idea', icon: Share2 },
  { step: 'Research', icon: Search },
  { step: 'Script', icon: PenTool },
  { step: 'Recording', icon: Video },
  { step: 'Editing', icon: MonitorPlay },
  { step: 'Thumbnail', icon: LayoutDashboard },
  { step: 'SEO', icon: Settings },
  { step: 'Publish', icon: Youtube },
  { step: 'Analytics', icon: BarChart },
];

// Interactive calendar items
const calendarEvents = [
  { day: 'Mon', title: 'AI Automation SaaS Pitch', time: '10:00 AM', status: 'Published', color: 'text-emerald-400 bg-emerald-500/10' },
  { day: 'Wed', title: 'TypeScript 5.8 Masterclass', time: '02:00 PM', status: 'In Production', color: 'text-ds-blue bg-ds-blue/10' },
  { day: 'Fri', title: 'Dahiya Solution Case Study', time: '05:00 PM', status: 'Scripting', color: 'text-yellow-400 bg-yellow-500/10' },
];

// Kanban planner cards
const initialKanban = [
  { id: 'k1', title: 'NextJS Core Architecture Video', stage: 'ideation', tech: 'NextJS' },
  { id: 'k2', title: 'SEO Mastery for Agencies', stage: 'scripting', tech: 'SEO' },
  { id: 'k3', title: 'Building Autonomous AI Swarms', stage: 'review', tech: 'AI Agents' },
];

export function YouTubeManagement() {
  const { media } = useMedia();
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'calendar' | 'planner'>('analytics');
  const [kanbanCards, setKanbanCards] = useState(initialKanban);

  const moveCard = (id: string) => {
    setKanbanCards(prev => prev.map(card => {
      if (card.id === id) {
        const nextStage = 
          card.stage === 'ideation' ? 'scripting' :
          card.stage === 'scripting' ? 'review' : 'ideation';
        return { ...card, stage: nextStage };
      }
      return card;
    }));
  };

  return (
    <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
      {/* Dynamic Background Image from global media system */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${media.youtubeImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ds-black via-ds-black/90 to-ds-black/75" />
        <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          
          {/* Left: Curation Content and Features */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6 backdrop-blur-md">
                <Youtube size={14} className="text-red-500 animate-pulse" />
                YouTube Command Center
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6">
                Dominate the world's <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 font-bold">largest video platform.</span>
              </h2>
              <p className="text-sm md:text-base text-ds-silver font-light leading-relaxed mb-8">
                We handle everything from ideation and SEO to thumbnail design and publishing. Our comprehensive management turns your channel into a high-converting content engine.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {youtubeServices.slice(0, 6).map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-red-500/10 hover:bg-red-500/[0.01] transition-all"
                  >
                    <Icon size={14} className="text-red-400" />
                    <span className="text-xs text-ds-silver font-mono">{service.title}</span>
                  </motion.div>
                )
              })}
            </div>
            
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="pt-4"
            >
              <a href="/contact">
                <Button variant="primary" className="group !bg-red-600 hover:!bg-red-700 !text-white border-none shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                   Grow Your Channel <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: Immersive Interactive Dashboard (Tabbed Workspace Simulator) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 w-full"
          >
             <div className="w-full bg-ds-graphite border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Browser/Dashboard Header */}
                <div className="bg-ds-black/80 p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex items-center gap-2">
                     <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                       <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                       <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                     </div>
                     <span className="text-[10px] font-mono text-ds-smoke uppercase ml-2">Studio Planner v3.1</span>
                   </div>
                   
                   {/* Sub-tab Selectors */}
                   <div className="flex bg-white/5 p-1 rounded-xl gap-1">
                     <button
                       onClick={() => setActiveSubTab('analytics')}
                       className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                         activeSubTab === 'analytics' ? 'bg-red-600 text-white font-bold' : 'text-ds-smoke hover:text-ds-white'
                       }`}
                     >
                       Analytics
                     </button>
                     <button
                       onClick={() => setActiveSubTab('calendar')}
                       className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                         activeSubTab === 'calendar' ? 'bg-red-600 text-white font-bold' : 'text-ds-smoke hover:text-ds-white'
                       }`}
                     >
                       Calendar
                     </button>
                     <button
                       onClick={() => setActiveSubTab('planner')}
                       className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                         activeSubTab === 'planner' ? 'bg-red-600 text-white font-bold' : 'text-ds-smoke hover:text-ds-white'
                       }`}
                     >
                       Kanban Planner
                     </button>
                   </div>
                </div>
                
                {/* Dashboard Tab Content Container */}
                <div className="p-6 bg-gradient-to-b from-ds-graphite to-ds-black min-h-[300px] flex flex-col justify-between">
                   <AnimatePresence mode="wait">
                     {activeSubTab === 'analytics' && (
                       <motion.div
                         key="analytics"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="space-y-6"
                       >
                         {/* Top Stats */}
                         <div className="grid grid-cols-3 gap-4">
                           {[
                             { label: 'Subscribers', val: '+1,245', sub: 'Last 28 days' },
                             { label: 'Views', val: '142.5K', sub: 'Last 28 days' },
                             { label: 'Watch Time', val: '8.4K', sub: 'Hours' },
                           ].map((stat, i) => (
                             <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5 text-center sm:text-left">
                               <div className="text-[9px] font-mono text-ds-smoke uppercase tracking-wider mb-1">{stat.label}</div>
                               <div className="text-base font-display text-ds-white font-bold">{stat.val}</div>
                               <div className="text-[8px] font-mono text-green-400 mt-1">{stat.sub} ↗</div>
                             </div>
                           ))}
                         </div>
                         
                         {/* retention curves */}
                         <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                           <div className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-2">
                             <div className="text-[10px] font-mono text-ds-cyan uppercase tracking-widest">Active Retention Curve</div>
                             <div className="h-28 relative flex items-end">
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                   <path d="M0,100 L0,15 Q30,15 50,45 T90,75 L100,85 L100,100 Z" fill="rgba(239, 68, 68, 0.15)" />
                                   <path d="M0,15 Q30,15 50,45 T90,75 L100,85" fill="none" stroke="rgba(239, 68, 68, 0.7)" strokeWidth="2" />
                                </svg>
                             </div>
                             <div className="flex justify-between text-[8px] font-mono text-ds-smoke">
                               <span>0:00 Intro</span>
                               <span>5:00 Call to Action</span>
                               <span>10:00 Outro</span>
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )}

                     {activeSubTab === 'calendar' && (
                       <motion.div
                         key="calendar"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="space-y-4"
                       >
                         <div className="flex items-center justify-between">
                           <span className="text-xs font-mono text-ds-white font-bold flex items-center gap-1">
                             <CalendarIcon size={12} className="text-red-400" /> Upcoming Content Calendar
                           </span>
                           <span className="text-[8px] font-mono text-ds-smoke uppercase tracking-wider">August 2026</span>
                         </div>

                         <div className="space-y-2">
                           {calendarEvents.map((event, i) => (
                             <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                               <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-lg bg-ds-black border border-white/10 flex flex-col items-center justify-center shrink-0">
                                   <span className="text-[9px] font-mono text-ds-smoke uppercase tracking-wider leading-none">Day</span>
                                   <span className="text-xs font-bold text-ds-white leading-none mt-0.5">{event.day}</span>
                                 </div>
                                 <div>
                                   <h4 className="text-xs font-medium text-ds-white">{event.title}</h4>
                                   <p className="text-[10px] text-ds-smoke font-mono mt-0.5">{event.time}</p>
                                 </div>
                               </div>
                               <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${event.color}`}>
                                 {event.status}
                               </span>
                             </div>
                           ))}
                         </div>
                       </motion.div>
                     )}

                     {activeSubTab === 'planner' && (
                       <motion.div
                         key="planner"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="space-y-4"
                       >
                         <div className="flex items-center justify-between">
                           <span className="text-xs font-mono text-ds-white font-bold flex items-center gap-1">
                             <KanbanSquare size={12} className="text-red-400" /> Dynamic Workflow Sandbox
                           </span>
                           <span className="text-[9px] font-mono text-ds-smoke">Click Card to Progress Stage</span>
                         </div>

                         <div className="grid grid-cols-3 gap-3">
                           {/* Columns */}
                           {['ideation', 'scripting', 'review'].map(col => (
                             <div key={col} className="bg-ds-black/40 border border-white/5 rounded-xl p-2 min-h-[140px] flex flex-col gap-2">
                               <div className="text-[9px] font-mono text-ds-smoke uppercase tracking-widest border-b border-white/5 pb-1 mb-1 text-center font-bold">
                                 {col}
                               </div>
                               {kanbanCards.filter(c => c.stage === col).map(card => (
                                 <motion.div
                                   layoutId={card.id}
                                   key={card.id}
                                   onClick={() => moveCard(card.id)}
                                   className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/20 hover:bg-white/[0.08] cursor-pointer transition-all select-none text-left"
                                 >
                                   <h5 className="text-[10px] text-ds-white font-medium leading-snug line-clamp-2">{card.title}</h5>
                                   <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                                     <span className="text-[8px] font-mono text-ds-cyan bg-ds-cyan/10 px-1 py-0.2 rounded">
                                       {card.tech}
                                     </span>
                                     <ChevronRight size={10} className="text-ds-smoke" />
                                   </div>
                                 </motion.div>
                               ))}
                             </div>
                           ))}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[9px] font-mono text-ds-smoke">
                     <span>Node: dahiya_curation_studio_03</span>
                     <span className="flex items-center gap-1">
                       <CheckCircle2 size={10} className="text-emerald-400" /> State Synchronized
                     </span>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
        
        {/* Production Pipeline Track */}
        <div className="pt-12 border-t border-white/5">
           <div className="text-center mb-12">
             <h3 className="text-xl font-display text-ds-white mb-2">The Production Pipeline</h3>
             <p className="text-ds-smoke text-sm">Our systematic approach to predictable viral growth.</p>
           </div>
           
           <div className="relative w-full overflow-hidden flex items-center justify-center py-8">
              {/* Pipeline Track Line */}
              <div className="absolute left-0 right-0 h-px bg-white/10 top-1/2 -translate-y-1/2" />
              
              <div className="flex justify-between w-full relative z-10 overflow-x-auto pb-6 hide-scrollbar px-4">
                 {pipeline.map((item, idx) => {
                   const Icon = item.icon;
                   return (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: idx * 0.05 }}
                       className="flex flex-col items-center min-w-[80px] md:min-w-[100px] relative group"
                     >
                        <div className="w-11 h-11 rounded-full bg-ds-graphite border border-white/10 flex items-center justify-center text-ds-smoke group-hover:bg-red-500/20 group-hover:text-red-400 group-hover:border-red-500/40 transition-all duration-300 mb-4 shadow-xl">
                          <Icon size={16} />
                        </div>
                        <span className="text-[10px] font-mono font-medium text-ds-silver uppercase tracking-wider">{item.step}</span>
                        
                        {/* Connecting line */}
                        {idx < pipeline.length - 1 && (
                          <div className="absolute top-5 left-[60%] w-full h-px bg-gradient-to-r from-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                     </motion.div>
                   )
                 })}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
