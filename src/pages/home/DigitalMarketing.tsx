import { motion } from 'motion/react';
import { useState } from 'react';
import { BarChart2, PieChart, TrendingUp, Search, Mail, MessageCircle, MapPin, MousePointerClick, Lightbulb, Users, Target } from 'lucide-react';
import { Card } from '../../components/ui';

import bgImage from '../../assets/images/marketing_dashboard_1784273747900.jpg';

const marketingServices = [
  { icon: Search, title: 'Search Engine Optimization', short: 'SEO', desc: 'Rank higher and capture high-intent organic traffic.' },
  { icon: Target, title: 'Paid Advertising', short: 'PPC', desc: 'Data-driven Google & Social campaigns with high ROAS.' },
  { icon: Lightbulb, title: 'Content Marketing', short: 'Content', desc: 'Valuable content that builds authority and trust.' },
  { icon: Users, title: 'Lead Generation', short: 'Leads', desc: 'Automated funnels that capture and nurture prospects.' },
  { icon: Mail, title: 'Email Marketing', short: 'Email', desc: 'Segmented campaigns that convert subscribers.' },
  { icon: MessageCircle, title: 'WhatsApp Marketing', short: 'WhatsApp', desc: 'Direct, high-conversion conversational marketing.' },
  { icon: MapPin, title: 'Local SEO', short: 'Local', desc: 'Dominate your local market and Google Maps.' },
  { icon: MousePointerClick, title: 'Conversion Optimization', short: 'CRO', desc: 'Turn more of your existing traffic into buyers.' },
  { icon: TrendingUp, title: 'Marketing Strategy', short: 'Strategy', desc: 'Comprehensive roadmaps for sustained growth.' }
];

export function DigitalMarketing() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section className="relative bg-ds-black py-32 px-6 md:px-12 overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ds-black via-ds-black/90 to-ds-black" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Content & Services Grid */}
          <div className="flex-1 lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
                <BarChart2 size={14} className="text-ds-cyan" />
                Growth Command Center
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white leading-[1.1] mb-6">
                Predictable growth. <br/>
                <span className="text-ds-smoke">Measurable results.</span>
              </h2>
              <p className="text-lg text-ds-silver font-light leading-relaxed mb-10">
                We don't guess. We analyze, strategize, and execute data-driven marketing campaigns that acquire customers and maximize your ROI.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {marketingServices.map((service, idx) => {
                const Icon = service.icon;
                const isActive = activeService === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div 
                      onMouseEnter={() => setActiveService(idx)}
                      onMouseLeave={() => setActiveService(null)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 h-full flex flex-col items-center justify-center text-center gap-3
                        ${isActive 
                          ? 'border-ds-cyan bg-ds-cyan/10 scale-105 shadow-[0_0_20px_rgba(34,211,238,0.15)] z-10 relative' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                    >
                      <Icon size={24} className={isActive ? 'text-ds-cyan' : 'text-ds-smoke'} strokeWidth={1.5} />
                      <span className={`text-xs font-medium tracking-wide ${isActive ? 'text-ds-white' : 'text-ds-silver'}`}>
                        {service.short}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Interactive info panel that updates based on hover */}
            <div className="mt-8 h-24">
               {activeService !== null ? (
                 <motion.div
                   key={activeService}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="p-4 rounded-xl border border-ds-cyan/20 bg-ds-cyan/5 backdrop-blur-md"
                 >
                   <h4 className="text-ds-white font-medium mb-1">{marketingServices[activeService].title}</h4>
                   <p className="text-ds-smoke text-sm">{marketingServices[activeService].desc}</p>
                 </motion.div>
               ) : (
                 <div className="p-4 rounded-xl border border-white/5 bg-transparent flex items-center justify-center h-full text-ds-smoke/50 text-sm font-mono italic">
                    Hover over a service to learn more
                 </div>
               )}
            </div>

          </div>

          {/* Right: Analytics Dashboard Visuals */}
          <div className="flex-1 relative hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-ds-graphite/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
            >
               {/* Dashboard Header */}
               <div className="flex justify-between items-center pb-4 border-b border-white/5">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-ds-cyan/20 flex items-center justify-center">
                     <TrendingUp size={16} className="text-ds-cyan" />
                   </div>
                   <div>
                     <div className="text-ds-white font-medium text-sm">Campaign Performance</div>
                     <div className="text-ds-smoke text-xs">Live Demo Data</div>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <div className="w-16 h-6 rounded-md bg-white/5" />
                   <div className="w-6 h-6 rounded-md bg-white/5" />
                 </div>
               </div>
               
               {/* KPI Cards */}
               <div className="grid grid-cols-3 gap-4">
                 {[
                   { label: 'Conversion Rate', value: '4.8%', trend: '+1.2%', up: true },
                   { label: 'Cost Per Lead', value: '$12.40', trend: '-8.5%', up: true },
                   { label: 'Total Traffic', value: '124.5K', trend: '+24%', up: true }
                 ].map((kpi, i) => (
                   <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <div className="text-[10px] text-ds-smoke uppercase tracking-wider mb-2">{kpi.label}</div>
                     <div className="text-xl font-display text-ds-white mb-2">{kpi.value}</div>
                     <div className="text-xs text-green-400 bg-green-400/10 inline-block px-1.5 py-0.5 rounded-sm">{kpi.trend}</div>
                   </div>
                 ))}
               </div>
               
               {/* Main Chart Area */}
               <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                   <div className="text-sm text-ds-white font-medium">Traffic & Conversions Over Time</div>
                 </div>
                 <div className="flex-1 relative flex items-end justify-between gap-2 px-2">
                    {/* Simulated bar chart */}
                    {[40, 60, 45, 70, 65, 85, 80, 100].map((h, i) => (
                      <div key={i} className="w-full relative flex justify-center group">
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          className="w-full max-w-[24px] bg-ds-cyan/20 group-hover:bg-ds-cyan/40 rounded-t-sm transition-colors relative"
                        >
                          <motion.div 
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h * 0.6}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                             className="absolute bottom-0 inset-x-0 bg-ds-cyan rounded-t-sm"
                          />
                        </motion.div>
                      </div>
                    ))}
                 </div>
               </div>
               
               <div className="text-center">
                 <span className="text-[10px] text-ds-smoke/50 uppercase tracking-widest">Illustrative Interface Example</span>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
