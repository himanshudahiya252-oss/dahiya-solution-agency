import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, Cpu, Zap, Share2, Workflow, MessageSquare, Play, 
  Settings2, ChevronRight, Sparkles, CheckCircle, Database, ShieldAlert 
} from 'lucide-react';
import { Card, Button, OptimizedImage } from '../../components/ui';

import bgImage from '../../assets/images/ai_dashboard_hologram_1784272685643.jpg';
import labImage from '../../assets/images/futuristic_innovation_lab_1784271765964.jpg';

// AI Services list
const aiServices = [
  {
    id: 'chatbot',
    title: 'Cognitive Conversational Agents',
    desc: 'Self-learning multi-turn chatbots powered by custom-tuned LLMs with dynamic API function-calling capabilities.',
    metrics: { velocity: 'Sub-100ms response', accuracy: '98.4% resolution rate' },
    features: ['Multi-lingual support', 'Context preservation', 'Sales & lead-gen routing'],
    icon: MessageSquare,
  },
  {
    id: 'workflows',
    title: 'Enterprise Process Automation',
    desc: 'Automating legacy system entries, report generation, and multi-department approval processes via sovereign AI agents.',
    metrics: { velocity: '12x operational speed', accuracy: 'Zero human data-entry error' },
    features: ['CRM integration', 'Autonomous scheduling', 'PDF parsing & extracting'],
    icon: Workflow,
  },
  {
    id: 'analytics',
    title: 'Predictive Neural Models',
    desc: 'Proprietary classification, forecasting, and anomaly detection neural networks tailored to business operations.',
    metrics: { velocity: 'Real-time classification', accuracy: '99.1% statistical confidence' },
    features: ['Market drift adjustment', 'Proactive risk alerts', 'Churn prediction engines'],
    icon: Cpu,
  }
];

// Interactive steps for client request flow
const workflowSteps = [
  { 
    id: 'ingestion', 
    title: 'Ingestion & Discovery', 
    desc: 'Intelligent listening bots capture customer queries and requests across omni-channels.',
    duration: '0.2s',
    status: 'Ingested'
  },
  { 
    id: 'intent', 
    title: 'Semantic Parsing', 
    desc: 'Natural language analysis parses intent, urgency indices, and core business objects.',
    duration: '0.4s',
    status: 'Analyzed'
  },
  { 
    id: 'routing', 
    title: 'Agent Task Allocation', 
    desc: 'Dahiya Solution router selects the specialized autonomous agent or micro-service.',
    duration: '0.1s',
    status: 'Routed'
  },
  { 
    id: 'execution', 
    title: 'Intelligent Execution', 
    desc: 'AI synthesizes database updates, generates responses, and updates CRMs autonomously.',
    duration: '0.8s',
    status: 'Completed'
  },
  { 
    id: 'analytics', 
    title: 'Optimization Feedback', 
    desc: 'Live optimization loop monitors performance and fine-tunes prompt models.',
    duration: 'Continuous',
    status: 'Optimized'
  }
];

export default function AIAutomationStudio() {
  const [activeService, setActiveService] = useState('chatbot');
  const [activeStepIdx, setActiveStepIdx] = useState(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Simulation runner
  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIdx(0);
    setSimLogs(['[SYSTEM] Initializing client-intent pipeline simulation...', '[SYSTEM] Ingesting mock inquiry: "Requesting custom corporate onboarding plan."']);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < workflowSteps.length) {
        setActiveStepIdx(currentStep);
        const logs = [
          `[PIPELINE] Transitioned to step ${currentStep + 1}: ${workflowSteps[currentStep].title}`,
          `[AGENTS] Executing sub-routines (latency: ${workflowSteps[currentStep].duration})`,
          `[STATE] Success - State synchronized: ${workflowSteps[currentStep].status}`
        ];
        setSimLogs((prev) => [...prev, ...logs]);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setActiveStepIdx(-1);
        setSimLogs((prev) => [...prev, '[SYSTEM] Simulation concluded successfully. Enterprise system state is green.']);
      }
    }, 2500);
  };

  return (
    <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <OptimizedImage 
          src={bgImage} 
          alt="" 
          className="absolute inset-0"
          aspectRatio=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black via-ds-black/85 to-ds-black" />
        <div className="absolute inset-0 bg-ds-blue/5 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Module Title */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
              <Bot size={14} className="text-ds-blue" />
              Sovereign AI Engineering
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white tracking-tight leading-[1.1]">
              AI Automation Studio
            </h2>
          </div>
          <p className="text-lg text-ds-smoke font-light leading-relaxed max-w-xl">
            We engineer intelligent workflows and autonomous multi-agent networks that completely replace fragile manually-driven corporate tasks.
          </p>
        </div>

        {/* 1. AI SERVICES INTERACTIVE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-ds-silver mb-4">Core Automation Capabilities</h3>
            <div className="flex flex-col gap-3">
              {aiServices.map((service) => {
                const Icon = service.icon;
                const isActive = activeService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      isActive 
                        ? 'bg-ds-blue/15 border-ds-blue/40 text-ds-white shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                        : 'bg-white/[0.01] border-white/5 text-ds-smoke hover:bg-white/[0.03] hover:text-ds-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-ds-blue text-ds-white' : 'bg-white/5 text-ds-silver'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium font-display">{service.title}</h4>
                      <p className="text-xs opacity-70 mt-1 line-clamp-1">{service.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {aiServices.map((service) => {
                if (service.id !== activeService) return null;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="glass-panel border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden"
                  >
                    {/* Visual hologram overlay background */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-ds-blue/5 rounded-full filter blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-ds-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                      <div>
                        <span className="text-xs font-mono text-ds-blue uppercase tracking-widest block mb-2">Service Highlight</span>
                        <h4 className="text-2xl font-display text-ds-white font-semibold mb-4">{service.title}</h4>
                        <p className="text-ds-smoke text-sm leading-relaxed max-w-xl">{service.desc}</p>
                      </div>

                      {/* Performance metrics dashboard box */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 shrink-0 flex flex-col justify-center text-center md:text-left min-w-[180px]">
                        <div className="text-[10px] font-mono text-ds-cyan uppercase tracking-wider mb-2">Performance SLA</div>
                        <div className="text-sm font-semibold text-ds-white font-mono">{service.metrics.velocity}</div>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="text-xs text-ds-smoke font-mono">{service.metrics.accuracy}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                      <div className="space-y-4">
                        <h5 className="text-xs font-mono uppercase tracking-wider text-ds-white">Key Capabilities</h5>
                        <ul className="space-y-3">
                          {service.features.map((feat, index) => (
                            <li key={index} className="flex items-center gap-3 text-xs text-ds-smoke">
                              <CheckCircle size={14} className="text-ds-blue shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive mock blueprint visualization card */}
                      <div className="relative h-40 rounded-xl overflow-hidden border border-white/5 bg-ds-black/40 p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-ds-silver uppercase tracking-wider">Agent Pipeline Blueprint</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        
                        {/* Animated waveform visualizer */}
                        <div className="h-12 flex items-end gap-1 px-4">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                height: [
                                  `${Math.max(10, (i * 7) % 100)}%`, 
                                  `${Math.max(10, (i * 23) % 100)}%`, 
                                  `${Math.max(10, (i * 37) % 100)}%`
                                ] 
                              }}
                              transition={{ 
                                duration: 1.5 + (i * 0.05), 
                                repeat: Infinity, 
                                repeatType: 'reverse' 
                              }}
                              className="w-full bg-ds-blue/40 rounded-t-sm"
                            />
                          ))}
                        </div>

                        <div className="flex justify-between text-[8px] font-mono text-ds-smoke">
                          <span>0.00ms Input</span>
                          <span>Internal Processing</span>
                          <span>99.8% Conf. Output</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* 2. AUTOMATION WORKFLOW TIMELINE SIMULATOR */}
        <div className="glass-panel border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ds-blue via-ds-cyan to-ds-blue" />
          
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-display text-ds-white mb-2">Live Automation Simulator</h3>
              <p className="text-sm text-ds-smoke font-light max-w-xl">
                Observe how an enterprise client request is analyzed, routed, executed, and fed back into our optimization system in milliseconds.
              </p>
            </div>
            <Button 
              variant="primary" 
              onClick={startSimulation}
              disabled={isSimulating}
              className="font-bold tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.3)] !bg-ds-blue hover:!bg-ds-blue/80 text-ds-white self-start lg:self-center"
            >
              {isSimulating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running Automation Flow
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Play size={14} fill="currentColor" />
                  Trigger Simulation Pipeline
                </div>
              )}
            </Button>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12 relative">
            {/* Horizontal timeline bar for desktop */}
            <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-white/5 z-0" />
            
            {workflowSteps.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const isPast = activeStepIdx > idx;
              return (
                <div key={step.id} className="relative z-10 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    {/* Node marker */}
                    <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'border-ds-blue bg-ds-blue text-ds-white scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                        : isPast 
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' 
                        : 'border-white/10 bg-ds-graphite text-ds-silver'
                    }`}>
                      {isPast ? (
                        <CheckCircle size={20} />
                      ) : (
                        <span className="font-mono text-sm font-bold">0{idx + 1}</span>
                      )}
                    </div>

                    <div>
                      <h4 className={`text-sm font-medium transition-colors ${
                        isActive ? 'text-ds-blue font-bold' : isPast ? 'text-emerald-400' : 'text-ds-white'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-ds-smoke mt-1 leading-relaxed hidden md:block">
                        {step.desc}
                      </p>
                      <div className="mt-2 flex items-center gap-2 justify-center md:justify-start">
                        <span className="text-[10px] font-mono opacity-50">SLA: {step.duration}</span>
                        {isActive && (
                          <span className="text-[9px] font-mono text-ds-blue bg-ds-blue/15 px-1.5 py-0.5 rounded uppercase animate-pulse">
                            Processing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Console Logger logs terminal output */}
          <div className="bg-ds-black border border-white/5 rounded-xl p-5 font-mono text-xs text-ds-silver h-48 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-3 right-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ds-blue animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-ds-smoke">Simulation Console</span>
            </div>
            
            <div className="space-y-1.5 overflow-y-auto flex-1 pr-4 select-all scrollbar-hide">
              {simLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={
                    log.includes('[SYSTEM]') ? 'text-ds-cyan font-bold' : 
                    log.includes('[SUCCESS]') || log.includes('State synchronized') ? 'text-emerald-400' : 'text-ds-silver'
                  }
                >
                  {log}
                </div>
              ))}
              {simLogs.length === 0 && (
                <div className="text-ds-smoke italic text-center py-12">
                  Console idle. Press "Trigger Simulation Pipeline" to execute the routing sequence.
                </div>
              )}
            </div>

            <div className="border-t border-white/5 pt-3 mt-3 flex justify-between text-[9px] text-ds-smoke select-none">
              <span>Host: dahiya_solution_agents_node_01</span>
              <span>Status: {isSimulating ? 'Simulating' : 'Ready'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
