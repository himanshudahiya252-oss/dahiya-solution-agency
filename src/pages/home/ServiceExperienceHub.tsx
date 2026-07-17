import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  PenTool, 
  TrendingUp, 
  BarChart3, 
  Video, 
  Youtube, 
  Share2, 
  GraduationCap, 
  Zap, 
  LineChart, 
  Users,
  ChevronRight,
  X,
  ArrowRight,
  ArrowLeft,
  Activity,
  Cpu,
  Monitor,
  Maximize2
} from 'lucide-react';
import { Card, Button } from '../../components/ui';

// Import all 12 detailed components
import { WebDevExperience } from './WebDevExperience';
import { AppDevExperience } from './AppDevExperience';
import { UiUxDesign } from './UiUxDesign';
import { DigitalMarketing } from './DigitalMarketing';
import { BusinessAnalytics } from './BusinessAnalytics';
import { VideoEditingStudio } from './VideoEditingStudio';
import { YouTubeManagement } from './YouTubeManagement';
import { SocialMediaCommand } from './SocialMediaCommand';
import { EducationEcosystem } from './EducationEcosystem';
import AIAutomationStudio from './AIAutomationStudio';
import BusinessIntelligence from './BusinessIntelligence';
import CrmClientPortal from './CrmClientPortal';

// Define the shape of our interactive service list items
interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<any>;
  desc: string;
  stat: string;
  features: string[];
  component: React.ComponentType<any>;
  glowColor: string;
}

const serviceList: ServiceItem[] = [
  {
    id: 'web',
    title: 'Website Engineering',
    badge: 'Core Software',
    icon: Globe,
    desc: 'High-performance web applications built with lightning-fast layouts and SEO compliance.',
    stat: '0.24s Avg FCP',
    features: ['Enterprise Web Apps', 'Performance Optimization', 'Tailwind & React Stack'],
    component: WebDevExperience,
    glowColor: 'from-blue-500/20 to-cyan-500/10'
  },
  {
    id: 'app',
    title: 'Next-Gen App Dev',
    badge: 'Mobile Software',
    icon: Smartphone,
    desc: 'Native iOS & Android development powered by fluid cross-platform runtimes.',
    stat: '120 FPS Native',
    features: ['iOS & Android Systems', 'Offline-First Cache', 'Push Telemetry Nodes'],
    component: AppDevExperience,
    glowColor: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    id: 'uiux',
    title: 'Immersive UI/UX',
    badge: 'Creative Tech',
    icon: PenTool,
    desc: 'Bespoke design environments engineered with meticulous attention to brand story.',
    stat: '100% Customized',
    features: ['Tailored Design Systems', 'Interactive Prototypes', 'Micro-Animation Assets'],
    component: UiUxDesign,
    glowColor: 'from-purple-500/20 to-pink-500/10'
  },
  {
    id: 'marketing',
    title: 'Digital Marketing Engine',
    badge: 'Growth Systems',
    icon: TrendingUp,
    desc: 'Intelligent multi-channel campaigns designed to lock in organic search supremacy.',
    stat: '4.8x Avg ROAS',
    features: ['Conversion Engineering', 'Organic SEO Dominance', 'Algorithmic Ad Optimization'],
    component: DigitalMarketing,
    glowColor: 'from-emerald-500/20 to-blue-500/10'
  },
  {
    id: 'analytics',
    title: 'Business Analytics Labs',
    badge: 'Data Systems',
    icon: BarChart3,
    desc: 'Custom metrics engines transforming user interactions into predictive insights.',
    stat: '99.9% Precision',
    features: ['Data Pipelines', 'Visual telemetry dashboards', 'Engagement Indicators'],
    component: BusinessAnalytics,
    glowColor: 'from-indigo-500/20 to-purple-500/10'
  },
  {
    id: 'video',
    title: 'Cinematic Post-Production',
    badge: 'Creative Tech',
    icon: Video,
    desc: 'High-end post-production, motion graphics, and audio synthesis for premium brands.',
    stat: '8K Master Render',
    features: ['Bespoke Video Timelines', 'Multi-Track Sound Design', 'Precision Color Grading'],
    component: VideoEditingStudio,
    glowColor: 'from-rose-500/20 to-purple-500/10'
  },
  {
    id: 'youtube',
    title: 'YouTube Management',
    badge: 'Growth Systems',
    icon: Youtube,
    desc: 'Complete channel cultivation from algorithmic strategy to high-retention thumbnails.',
    stat: '+124% CTR Growth',
    features: ['Thumbnail Engineering', 'Audience Retention Maps', 'SEO Structured Metadata'],
    component: YouTubeManagement,
    glowColor: 'from-red-500/20 to-orange-500/10'
  },
  {
    id: 'social',
    title: 'Social Media Command',
    badge: 'Growth Systems',
    icon: Share2,
    desc: 'Dynamic audience building fueled by automated scheduling and content loops.',
    stat: 'Real-Time Feeds',
    features: ['Community Cultivation', 'Viral Analytics Node', 'Automated Content Pipeline'],
    component: SocialMediaCommand,
    glowColor: 'from-teal-500/20 to-cyan-500/10'
  },
  {
    id: 'education',
    title: 'EdTech Ecosystems',
    badge: 'Specialized Labs',
    icon: GraduationCap,
    desc: 'Intelligent training platforms featuring real-time evaluation trackers.',
    stat: '92% Passing SLA',
    features: ['AI Evaluation Engines', 'Dynamic Testing Nodes', 'Curriculum Telemetry'],
    component: EducationEcosystem,
    glowColor: 'from-amber-500/20 to-yellow-500/10'
  },
  {
    id: 'automation',
    title: 'AI Automation Lab',
    badge: 'AI Systems',
    icon: Zap,
    desc: 'Intelligent workflow automation replacing repetitive overhead with autonomous AI agents.',
    stat: '85% Cost Saved',
    features: ['Autonomous AI Agents', 'API Orchestration Systems', 'SLA Integrity Checks'],
    component: AIAutomationStudio,
    glowColor: 'from-yellow-500/20 to-orange-500/10'
  },
  {
    id: 'bi',
    title: 'Business Intelligence',
    badge: 'Data Systems',
    icon: LineChart,
    desc: 'Real-time database analysis pipelines mapping business trends automatically.',
    stat: 'Real-time ETL',
    features: ['Predictive Forecasting', 'Custom ETL Pipelines', 'Anomaly Signal Capture'],
    component: BusinessIntelligence,
    glowColor: 'from-sky-500/20 to-emerald-500/10'
  },
  {
    id: 'crm',
    title: 'CRM Client Portals',
    badge: 'Enterprise Solutions',
    icon: Users,
    desc: 'Sleek central command hubs connecting client leads and team operational nodes.',
    stat: '<12 Min SLA Res',
    features: ['Client Project Pipelines', 'Synchronized Lead Storage', 'Immersive Team Chat'],
    component: CrmClientPortal,
    glowColor: 'from-violet-500/20 to-blue-500/10'
  }
];

interface ServiceExperienceHubProps {
  activeServiceId: string | null;
  onSelectService: (id: string | null) => void;
}

export function ServiceExperienceHub({ activeServiceId, onSelectService }: ServiceExperienceHubProps) {
  const currentServiceIndex = serviceList.findIndex(s => s.id === activeServiceId);
  const currentService = currentServiceIndex !== -1 ? serviceList[currentServiceIndex] : null;

  // Track body overflow to disable background scrolling while console is active
  useEffect(() => {
    if (activeServiceId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeServiceId]);

  // Navigate through service labs inside the Command Center
  const handlePrevService = () => {
    if (currentServiceIndex !== -1) {
      const prevIdx = (currentServiceIndex - 1 + serviceList.length) % serviceList.length;
      onSelectService(serviceList[prevIdx].id);
    }
  };

  const handleNextService = () => {
    if (currentServiceIndex !== -1) {
      const nextIdx = (currentServiceIndex + 1) % serviceList.length;
      onSelectService(serviceList[nextIdx].id);
    }
  };

  return (
    <section id="service-hub-interactive" className="relative py-24 bg-ds-black border-t border-white/5 overflow-hidden z-20">
      
      {/* Background visual accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-ds-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-ds-cyan/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-white tracking-[0.15em] uppercase mb-4"
          >
            <Cpu size={12} className="text-ds-blue animate-pulse" /> Our Services Ecosystem
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-ds-white tracking-tight leading-[1.1] mb-4"
          >
            Premium Solutions & Dedicated Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-ds-smoke max-w-2xl mx-auto font-light text-sm md:text-base leading-relaxed"
          >
            We deploy specialized expertise across twelve key domains. Click on any of the service areas below to explore their full capabilities and real-time previews.
          </motion.p>
        </div>

        {/* 12 Interactive Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
              >
                <div
                  onClick={() => onSelectService(service.id)}
                  className="group relative h-full flex flex-col justify-between p-6 bg-ds-graphite/25 border border-white/5 rounded-2xl cursor-pointer hover:border-white/20 hover:bg-ds-graphite/40 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  
                  {/* Subtle Background Radial Glow */}
                  <div className={`absolute -right-12 -top-12 w-28 h-28 bg-gradient-to-br ${service.glowColor} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`} />

                  {/* Header Badge & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-ds-blue/15 transition-colors duration-500">
                        <Icon size={20} className="text-ds-white group-hover:text-ds-blue transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-mono font-medium text-ds-smoke bg-white/5 px-2.5 py-1 rounded-full border border-white/5 group-hover:border-ds-blue/20 group-hover:text-ds-white transition-colors">
                        {service.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-lg font-bold text-ds-white mb-2 group-hover:text-ds-blue transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-ds-smoke text-xs font-light leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    {/* Nested bullet highlights */}
                    <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-[11px] text-ds-smoke font-light">
                          <span className="w-1 h-1 rounded-full bg-ds-blue" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Stats & Explore button */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="font-mono text-[10px] text-ds-cyan font-bold flex items-center gap-1">
                      <Activity size={10} className="animate-pulse" /> {service.stat}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-ds-white font-bold group-hover:text-ds-blue transition-colors">
                      Explore Service <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* IMMERSIVE FULL-SCREEN COMMAND LAB LABORATORY OVERLAY */}
      <AnimatePresence>
        {activeServiceId && currentService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-ds-black/95 backdrop-blur-xl overflow-y-auto flex flex-col"
          >
            
            {/* Global Immersive Glass Header */}
            <header className="sticky top-0 z-50 w-full px-6 py-4 bg-ds-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-ds-blue rounded-full animate-ping" />
                <span className="text-xs font-mono tracking-widest text-ds-white font-semibold uppercase">
                  DAHIYA SOLUTION
                </span>
                <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="hidden md:inline-block text-[10px] font-mono text-ds-smoke tracking-wide uppercase">
                  SERVICE PROFILE: {currentService.badge}
                </span>
              </div>

              {/* Title Indicator inside Header */}
              <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold text-ds-white font-mono">
                {currentService.title} ({currentService.stat})
              </div>

              {/* Navigation and Close Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevService}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-ds-white transition-all cursor-pointer"
                  title="Previous Service"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNextService}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-ds-white transition-all cursor-pointer mr-2"
                  title="Next Service"
                >
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => onSelectService(null)}
                  className="px-4 py-2 rounded-xl bg-ds-blue hover:bg-ds-blue/80 text-white text-xs font-mono font-bold border border-ds-blue/20 shadow-lg shadow-ds-blue/10 flex items-center gap-2 cursor-pointer"
                >
                  <X size={14} /> Close Service
                </button>
              </div>

            </header>

            {/* Ambient Lighting in Overlay */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-ds-blue/10 rounded-full blur-[160px] pointer-events-none" />

            {/* Immersive Client Screen Content Viewport */}
            <div className="flex-1 w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative z-10 w-full"
                >
                  {/* Instantiates the targeted high-fidelity component completely intact */}
                  <currentService.component />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sticky Bottom Quick Bar to keep orientation seamless */}
            <footer className="w-full py-6 px-6 bg-ds-graphite/40 border-t border-white/5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between relative z-20 gap-4">
              <div className="text-[11px] font-mono text-ds-smoke text-center sm:text-left">
                Exploring Service <span className="text-ds-white font-medium font-mono">{currentServiceIndex + 1} of {serviceList.length}</span>: <span className="text-ds-cyan font-mono">{currentService.title}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider hidden md:inline-block">
                  Quick Flip Navigation
                </span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="glass" 
                    size="sm" 
                    onClick={handlePrevService} 
                    className="!rounded-full px-4 py-1.5 text-xs font-mono font-bold text-ds-white"
                  >
                    ← Previous Service
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={handleNextService} 
                    className="!rounded-full px-4 py-1.5 text-xs font-mono font-bold !bg-ds-blue"
                  >
                    Next Service →
                  </Button>
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
