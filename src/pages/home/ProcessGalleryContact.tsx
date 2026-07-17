import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Workflow, CheckCircle2, ShieldCheck, Mail, Phone, Calendar, 
  MapPin, HelpCircle, Settings, Code, Layout, Lock, 
  Layers, Hammer, Sparkles, Send, Check, Calculator, DollarSign, Clock 
} from 'lucide-react';
import { Card, Button } from '../../components/ui';
import { useSettings } from '../../context/SettingsContext';

// Office / tech workspaces image sources
import marketingImg from '../../assets/images/marketing_dashboard_1784273747900.jpg';
import devImg from '../../assets/images/website_development_studio_1784273706424.jpg';
import editingImg from '../../assets/images/video_editing_studio_1784273767977.jpg';
import mobileImg from '../../assets/images/mobile_app_interface_1784273728384.jpg';

// Process milestones
const processPhases = [
  { id: 1, name: 'Architectural Blueprinting', desc: 'Syllabus, APIs, schema mappings and structural flows drafted to specifications.', icon: Layout },
  { id: 2, name: 'Sovereign Systems Code', desc: 'Native high-efficiency TypeScript development utilizing rigorous separation of concerns.', icon: Code },
  { id: 3, name: 'Rigorous Security Auditing', desc: 'Vulnerability indexing, pen tests, and authorization rules validation.', icon: Lock },
  { id: 4, name: 'Simulated Environment QA', desc: 'Stress testing pipelines under concurrent live browser loads.', icon: Hammer },
  { id: 5, name: 'Managed Cloud Deployment', desc: 'Seamless orchestration on high-availability container gateways.', icon: Layers },
  { id: 6, name: 'Proactive Support & Tune', desc: 'Active monitoring, logs parsing, and prompt models optimization.', icon: Settings }
];

// Workspace images for gallery
const premiumGalleryImages = [
  { src: devImg, title: 'Systems Development Studio', desc: 'Bespoke custom software and SaaS workspace' },
  { src: marketingImg, title: 'Analytics & Strategy Command', desc: 'Live SEO performance and campaigns command center' },
  { src: editingImg, title: 'Visual Arts Production Room', desc: 'High-fidelity video editing and digital marketing setups' },
  { src: mobileImg, title: 'Mobile Solutions Lab', desc: 'iOS and Android testing, optimization and validation' }
];

// FAQS (Trust Section)
const trustFaqs = [
  { q: 'How does Dahiya Solution ensure secure credentials management?', a: 'We never expose secrets to frontends. All API requests flow through isolated backend proxies with active rate limiters and strict TLS.' },
  { q: 'Can setting updates run instantly across the platform?', a: 'Yes. Our global configuration architecture utilizes persistent context hooks that synchronize system branding and signatories dynamically.' },
  { q: 'What is the typical deployment SLA for corporate websites?', a: 'Standard enterprise configurations deploy on container nodes in less than 3 weeks, passing complete automated unit assessments.' }
];

export default function ProcessGalleryContact() {
  const { settings } = useSettings();
  const [activePhase, setActivePhase] = useState(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Estimator Form State
  const [projectServiceType, setProjectServiceType] = useState('web');
  const [projectComplexity, setProjectComplexity] = useState('standard');
  const [projectAuthNeeded, setProjectAuthNeeded] = useState(false);
  const [projectDatabaseNeeded, setProjectDatabaseNeeded] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('web');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Dynamic estimate calculator
  const calculateEstimate = () => {
    let basePrice = 5000; // Base rate
    let timelineWeeks = 3;

    if (projectServiceType === 'mobile') {
      basePrice = 9500;
      timelineWeeks = 6;
    } else if (projectServiceType === 'ai') {
      basePrice = 12000;
      timelineWeeks = 5;
    } else if (projectServiceType === 'crm') {
      basePrice = 15000;
      timelineWeeks = 8;
    }

    if (projectComplexity === 'custom') {
      basePrice *= 1.5;
      timelineWeeks += 2;
    } else if (projectComplexity === 'enterprise') {
      basePrice *= 2.2;
      timelineWeeks += 4;
    }

    if (projectAuthNeeded) {
      basePrice += 2500;
      timelineWeeks += 1;
    }

    if (projectDatabaseNeeded) {
      basePrice += 4000;
      timelineWeeks += 1;
    }

    return {
      price: Math.round(basePrice).toLocaleString(),
      weeks: timelineWeeks
    };
  };

  const currentEstimate = calculateEstimate();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;
    
    setIsLoading(true);
    setError('');

    const payload = {
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      service: contactService,
      message: contactMessage,
      date: new Date().toLocaleString()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Submission failed');
      
      setIsSent(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactService('web');
      setContactMessage('');
      
      setTimeout(() => {
        setIsSent(false);
      }, 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send enquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-32">
      
      {/* 1. BUSINESS PROCESS VISUALIZATION */}
      <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
              <Workflow size={14} className="text-ds-cyan" />
              Delivery System
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-ds-white mb-6">
              Our Structured Engineering Process
            </h2>
            <p className="text-ds-smoke font-light text-base leading-relaxed">
              We eliminate ambiguity through a rigorous six-stage development pipeline that delivers category-leading systems on schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Phase List */}
            <div className="lg:col-span-5 space-y-3">
              {processPhases.map((phase) => {
                const Icon = phase.icon;
                const isActive = activePhase === phase.id;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      isActive 
                        ? 'bg-ds-cyan/10 border-ds-cyan/35 text-ds-white shadow-[0_0_15px_rgba(34,211,238,0.1)] scale-[1.02]' 
                        : 'bg-white/[0.01] border-white/5 text-ds-smoke hover:bg-white/[0.02] hover:text-ds-white'
                    }`}
                  >
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-ds-cyan' : 'opacity-55'}`}>
                      0{phase.id}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-ds-cyan text-ds-black' : 'bg-white/5 text-ds-silver'
                    }`}>
                      <Icon size={15} />
                    </div>
                    <span className="text-sm font-semibold font-display">{phase.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Right: Phase Details Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {processPhases.map((phase) => {
                  if (phase.id !== activePhase) return null;
                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="glass-panel border border-white/10 rounded-2xl p-8 md:p-12 text-center md:text-left min-h-[320px] flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-ds-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
                      
                      <div>
                        <div className="text-[10px] font-mono text-ds-cyan uppercase tracking-widest font-bold mb-4">
                          Phase Milestone 0{phase.id}
                        </div>
                        <h4 className="text-2xl font-display text-ds-white font-semibold mb-6">{phase.name}</h4>
                        <p className="text-ds-smoke text-sm leading-relaxed max-w-xl font-light">
                          {phase.desc}
                        </p>
                      </div>

                      <div className="flex gap-3 justify-center md:justify-start items-center border-t border-white/5 pt-6 mt-8 text-xs font-mono text-ds-smoke">
                        <CheckCircle2 size={14} className="text-ds-cyan" />
                        <span>Rigorous documentation and automated validation benchmarks met.</span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PREMIUM GALLERY OF TECH WORKSPACES */}
      <section className="relative bg-ds-black py-16 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-3xl md:text-5xl text-ds-white mb-4">
              Modern Tech Lab & Workspaces
            </h2>
            <p className="text-ds-smoke font-light text-sm">
              An immersive glimpse inside our specialized creative labs and code centers engineered to deliver elite results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumGalleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#0b0c0d] h-80"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ds-black via-ds-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-1/2">
                  <h4 className="text-sm font-semibold font-display text-ds-white group-hover:text-ds-cyan transition-colors">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-ds-smoke mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. TRUST SECTION (FAQs WITHOUT FAKE TESTIMONIALS) */}
      <section className="relative bg-ds-black py-16 overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ds-blue/10 border border-ds-blue/20 text-xs font-mono text-ds-blue mb-4">
              <ShieldCheck size={14} /> Corporate Security & FAQ Compliance
            </div>
            <h3 className="text-2xl md:text-3xl font-display text-ds-white mb-2">Platform Integrity FAQ</h3>
            <p className="text-xs text-ds-smoke">Transparent, objective clarifications concerning system integrations and architecture.</p>
          </div>

          <div className="space-y-4">
            {trustFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center text-sm font-semibold text-ds-white"
                  >
                    <span>{faq.q}</span>
                    <HelpCircle size={15} className={`text-ds-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 text-xs text-ds-smoke leading-relaxed font-light border-t border-white/5 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* 4. PREMIUM CONTACT EXPERIENCE & INTEGRATED CALCULATOR */}
      <section className="relative bg-ds-black py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Scope & Cost Estimator */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ds-cyan/10 border border-ds-cyan/20 text-xs font-mono text-ds-cyan">
                <Calculator size={14} /> Budget & Project Scope Estimator
              </div>
              <h3 className="text-3xl font-display text-ds-white leading-tight">
                Plan Your Integration Scope
              </h3>
              <p className="text-sm text-ds-smoke font-light leading-relaxed mb-6">
                Calculate real-time estimates for bespoke software architectures based on system requirements and complexities.
              </p>

              <div className="glass-panel border border-white/10 rounded-2xl p-6 space-y-6 bg-ds-graphite/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service type selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Service Category</label>
                    <select
                      value={projectServiceType}
                      onChange={(e) => setProjectServiceType(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                    >
                      <option value="web">Custom Web App Dev</option>
                      <option value="mobile">Premium Mobile Solution</option>
                      <option value="ai">AI Agent Integration</option>
                      <option value="crm">Bespoke CRM Workspace</option>
                    </select>
                  </div>

                  {/* Complexity level selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Engineering Tier</label>
                    <select
                      value={projectComplexity}
                      onChange={(e) => setProjectComplexity(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                    >
                      <option value="standard">Standard Execution</option>
                      <option value="custom">Custom High-Performance</option>
                      <option value="enterprise">Enterprise Boardroom Grade</option>
                    </select>
                  </div>
                </div>

                {/* Additional modules check-boxes */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Optional Core Modules</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-ds-silver">
                      <input 
                        type="checkbox" 
                        checked={projectAuthNeeded}
                        onChange={(e) => setProjectAuthNeeded(e.target.checked)}
                        className="rounded border-white/10 bg-ds-black text-ds-cyan focus:ring-0 cursor-pointer" 
                      />
                      <span>Auth & Permissions</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-ds-silver">
                      <input 
                        type="checkbox" 
                        checked={projectDatabaseNeeded}
                        onChange={(e) => setProjectDatabaseNeeded(e.target.checked)}
                        className="rounded border-white/10 bg-ds-black text-ds-cyan focus:ring-0 cursor-pointer" 
                      />
                      <span>Cloud Database Sync</span>
                    </label>
                  </div>
                </div>

                {/* Calculated Output Box */}
                <div className="p-4 bg-ds-black rounded-xl border border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ds-cyan/15 flex items-center justify-center text-ds-cyan">
                      <DollarSign size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider">Estimated Budget</div>
                      <div className="text-xl font-display font-bold text-ds-cyan mt-0.5">${currentEstimate.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ds-blue/15 flex items-center justify-center text-ds-blue">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider">Delivery SLA</div>
                      <div className="text-xl font-display font-bold text-ds-white mt-0.5">{currentEstimate.weeks} Weeks</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Contact form */}
            <div className="lg:col-span-5">
              <Card className="p-8 relative overflow-hidden bg-ds-graphite/40 border border-white/10 rounded-2xl h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-ds-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
                
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <h4 className="text-lg font-display text-ds-white font-medium border-b border-white/5 pb-2 mb-4">Start Project / Book Meeting</h4>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Alexander Vance" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="alexander@vance.com" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 00000 00000" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Service Interested</label>
                    <select
                      value={contactService}
                      onChange={(e) => setContactService(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                    >
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="ai">AI Solutions</option>
                      <option value="analytics">Business Analytics</option>
                      <option value="marketing">Digital Marketing</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider block">Message Details</label>
                    <textarea 
                      placeholder="Discuss budget scope or schedule a video briefing meeting..." 
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan transition-colors resize-none"
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <Button type="submit" variant="primary" className="w-full font-bold tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.25)] !bg-ds-cyan !text-ds-black hover:!bg-ds-cyan/80 mt-4" disabled={isLoading}>
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">Sending...</span>
                    ) : isSent ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check size={16} /> Briefing Scheduled
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send size={14} /> Schedule Consultation
                      </span>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
