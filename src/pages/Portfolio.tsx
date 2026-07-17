import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  Video, 
  Clock, 
  Sparkles, 
  Cpu, 
  Globe, 
  Smartphone, 
  CheckCircle, 
  X, 
  Maximize2, 
  Sliders, 
  BarChart3, 
  MessageSquare, 
  Lock, 
  Search,
  Eye,
  Settings
} from 'lucide-react';
import { usePortfolio, PortfolioProject } from '../context/PortfolioContext';
import { useSettings } from '../context/SettingsContext';

export default function PortfolioPage() {
  const { projects } = usePortfolio();
  const { settings } = useSettings();
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Dynamic SEO Structured Data Integration
  useEffect(() => {
    // Update Document Meta dynamically based on selection
    if (selectedProject) {
      document.title = `${selectedProject.seoTitle || selectedProject.title} | ${settings.businessName}`;
      
      // Inject Structured Data Schema
      let schemaScript = document.getElementById('ds-portfolio-schema') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'ds-portfolio-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = selectedProject.seoStructuredData || JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CaseStudy",
        "name": selectedProject.title,
        "description": selectedProject.subtitle,
        "image": selectedProject.image,
        "publisher": {
          "@type": "Organization",
          "name": settings.businessName
        }
      });
    } else {
      document.title = `Works Portfolio | ${settings.businessName} - World-Class Digital Agency`;
      const schemaScript = document.getElementById('ds-portfolio-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    }
  }, [selectedProject, settings]);

  // Categories definition
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'website', label: 'Websites' },
    { id: 'app', label: 'Applications' },
    { id: 'ai', label: 'AI Solutions' },
    { id: 'marketing', label: 'Digital Marketing' },
    { id: 'creative', label: 'Creative' }
  ];

  // Filter projects by category and search query
  const filteredProjects = projects.filter(project => {
    if (project.isDraft) return false;
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.techTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle Before/After slider dragging
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isSliding) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <div className="bg-ds-black min-h-screen relative overflow-hidden text-ds-white">
      {/* Decorative Cinematic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
      
      {/* Floating Ambient Glows */}
      <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-ds-blue/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-ds-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. PREMIUM PORTFOLIO HERO */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-ds-blue animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-ds-silver uppercase">PREMIUM CASE STUDIES</span>
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
              Selected <span className="text-ds-smoke block md:inline font-light italic">Works.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-ds-silver font-light leading-relaxed max-w-2xl">
              A meticulously curated showcase of custom engineering, immersive designs, and highly scalable system integrations crafted by <span className="text-ds-white font-semibold">{settings.businessName}</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-3.5 text-ds-smoke w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search stacks, frameworks, titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-ds-graphite border border-white/5 hover:border-white/10 focus:border-ds-blue rounded-xl pl-11 pr-4 py-3 text-sm text-ds-white focus:outline-none transition-all placeholder:text-ds-smoke"
                />
              </div>
            </div>
          </div>

          {/* Cinematic floating screens mockup - pure CSS architecture to avoid heavy asset loads */}
          <div className="lg:col-span-5 hidden lg:block relative h-[380px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Backing screen */}
              <div className="absolute top-4 left-6 w-[80%] h-[220px] bg-ds-graphite/40 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md transform -rotate-6">
                <div className="flex gap-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                </div>
                <div className="w-full h-2 bg-white/5 rounded mb-2" />
                <div className="w-2/3 h-2 bg-white/5 rounded mb-4" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 bg-ds-blue/10 rounded" />
                  <div className="h-16 bg-white/5 rounded" />
                  <div className="h-16 bg-white/5 rounded" />
                </div>
              </div>

              {/* Main screen */}
              <div className="absolute top-12 right-2 w-[85%] h-[240px] bg-ds-graphite border border-white/15 rounded-2xl p-5 shadow-2xl backdrop-blur-lg transform rotate-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[9px] font-mono text-ds-cyan bg-ds-cyan/10 px-2 py-0.5 rounded-full">DAHIYA LIVE PREVIEW</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                  <div className="h-2 bg-white/5 rounded w-full" />
                  <div className="h-2 bg-white/5 rounded w-5/6" />
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="h-20 bg-ds-cyan/10 border border-ds-cyan/20 rounded-xl flex items-center justify-center flex-col">
                      <span className="text-xl font-bold text-ds-cyan">99%</span>
                      <span className="text-[8px] font-mono text-ds-smoke">PERFORMANCE</span>
                    </div>
                    <div className="h-20 bg-ds-blue/10 border border-ds-blue/20 rounded-xl flex items-center justify-center flex-col">
                      <span className="text-xl font-bold text-ds-blue">0.2s</span>
                      <span className="text-[8px] font-mono text-ds-smoke">SLA LATENCY</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER SYSTEM */}
      <section className="px-6 max-w-7xl mx-auto mb-16 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/5 pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 relative ${
                  activeCategory === cat.id 
                    ? 'text-ds-white bg-white/5 border border-white/10' 
                    : 'text-ds-smoke hover:text-ds-white border border-transparent'
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.span 
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ds-blue"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="text-xs font-mono text-ds-smoke">
            Showing <span className="text-ds-white font-bold">{filteredProjects.length}</span> of <span className="text-ds-silver">{projects.filter(p => !p.isDraft).length}</span> projects
          </div>
        </div>

        {/* 3. INTERACTIVE SHOWCASE MASONRY GRID */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-ds-graphite/20 border border-white/5 rounded-3xl p-8">
            <Sliders className="mx-auto w-10 h-10 text-ds-smoke mb-4" />
            <p className="text-ds-silver font-light text-lg mb-2">No projects match your search criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
              className="text-xs font-mono text-ds-blue hover:underline"
            >
              Reset active filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group cursor-pointer bg-ds-graphite/40 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex flex-col h-full"
              >
                {/* Image Frame */}
                <div className="relative aspect-video overflow-hidden bg-ds-black">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Top-Right Badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="text-[9px] font-mono tracking-widest text-ds-white bg-ds-black/80 border border-white/15 px-2.5 py-1 rounded-full uppercase">
                      {project.subCategory}
                    </span>
                  </div>

                  {/* Overlaid details on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ds-black via-ds-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-ds-cyan font-bold">
                      <Eye className="w-4 h-4" /> VIEW IMMERSIVE CASE STUDY
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-ds-smoke uppercase block mb-1.5">
                      {project.category === 'website' ? 'Web Platform' : 
                       project.category === 'app' ? 'Mobile/SaaS Application' : 
                       project.category === 'ai' ? 'Artificial Intelligence' : 
                       project.category === 'marketing' ? 'Growth Marketing' : 'Creative Design'}
                    </span>
                    <h3 className="text-xl font-display font-bold text-ds-white group-hover:text-ds-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-ds-silver font-light mt-2 line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Tech tag list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techTags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono text-ds-smoke bg-white/5 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                      {project.techTags.length > 3 && (
                        <span className="text-[9px] font-mono text-ds-smoke bg-white/5 px-2 py-0.5 rounded-md">
                          +{project.techTags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-ds-silver">
                        <Clock className="w-3.5 h-3.5 text-ds-blue" />
                        <span>{project.metrics.timelineWeeks} Weeks</span>
                      </div>
                      <span className="text-ds-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore Case <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 4. IMMERSIVE CASE STUDY OVERLAY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ds-black/90 backdrop-blur-xl overflow-y-auto"
          >
            {/* Modal Box */}
            <div className="min-h-screen py-12 px-4 md:px-12 flex items-center justify-center">
              <motion.div
                layoutId={`card-${selectedProject.id}`}
                className="w-full max-w-5xl bg-ds-graphite/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10"
              >
                {/* Absolute sticky close button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-ds-black/80 hover:bg-ds-black border border-white/10 flex items-center justify-center text-ds-white hover:text-red-400 hover:border-red-500/20 transition-all z-50"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Hero Header Area of Case Study */}
                <div className="relative h-[250px] md:h-[400px] overflow-hidden bg-ds-black">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-65"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ds-graphite via-ds-graphite/40 to-transparent" />
                  
                  {/* Hero Information */}
                  <div className="absolute bottom-8 left-8 right-8 text-left">
                    <span className="text-xs font-mono tracking-widest text-ds-cyan uppercase block mb-2 font-bold">
                      {selectedProject.subCategory}
                    </span>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-ds-white mb-2 leading-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="text-sm md:text-lg text-ds-silver font-light max-w-3xl">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                </div>

                {/* Immersive Case Details Body */}
                <div className="p-6 md:p-12 space-y-12">
                  {/* Performance Showcase Ribbon */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-ds-black/40 border border-white/5 rounded-2xl p-6 text-center">
                    <div>
                      <div className="text-2xl md:text-3xl font-display font-bold text-ds-blue">
                        {selectedProject.metrics.timelineWeeks}w
                      </div>
                      <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider mt-1">Timeline</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-display font-bold text-ds-cyan">
                        {selectedProject.metrics.performanceScore}%
                      </div>
                      <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider mt-1">Lighthouse Score</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-display font-bold text-ds-white">
                        {selectedProject.metrics.featuresDelivered}
                      </div>
                      <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider mt-1">Key Features</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-display font-bold text-emerald-400">
                        {selectedProject.metrics.customMetricValue}
                      </div>
                      <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider mt-1">{selectedProject.metrics.customMetricName}</div>
                    </div>
                  </div>

                  {/* Objective & Narrative */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                      <div>
                        <h4 className="text-xs font-mono tracking-widest text-ds-smoke uppercase mb-2">Executive Summary</h4>
                        <p className="text-ds-silver font-light leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                          <h5 className="text-xs font-mono font-bold text-ds-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> THE CHALLENGE
                          </h5>
                          <p className="text-xs text-ds-silver font-light leading-relaxed">
                            {selectedProject.challenge}
                          </p>
                        </div>
                        <div className="bg-ds-blue/5 rounded-xl p-5 border border-ds-blue/15">
                          <h5 className="text-xs font-mono font-bold text-ds-cyan uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-ds-cyan" /> THE SOLUTION
                          </h5>
                          <p className="text-xs text-ds-silver font-light leading-relaxed">
                            {selectedProject.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tech details sidebar */}
                    <div className="lg:col-span-4 space-y-6 bg-ds-black/30 border border-white/5 rounded-2xl p-6">
                      <div>
                        <h4 className="text-xs font-mono tracking-widest text-ds-smoke uppercase mb-3 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-ds-blue" /> TECH STACK INTERACTIVES
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.techTags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-mono text-ds-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Direct Previews */}
                      <div className="space-y-3 pt-2">
                        {selectedProject.websitePreviewUrl && (
                          <a 
                            href={selectedProject.websitePreviewUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs font-mono text-ds-cyan hover:text-ds-cyan/80 bg-ds-cyan/5 hover:bg-ds-cyan/10 border border-ds-cyan/20 px-4 py-2.5 rounded-xl transition-all"
                          >
                            <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> LIVE PREVIEW FRAME</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {selectedProject.mobilePreviewUrl && (
                          <a 
                            href={selectedProject.mobilePreviewUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs font-mono text-ds-blue hover:text-ds-blue/80 bg-ds-blue/5 hover:bg-ds-blue/10 border border-ds-blue/20 px-4 py-2.5 rounded-xl transition-all"
                          >
                            <span className="flex items-center gap-2"><Smartphone className="w-3.5 h-3.5" /> MOBILE SHELL PREVIEW</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 5. INTERACTIVE BEFORE/AFTER SLIDER MODULE */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-mono tracking-widest text-ds-smoke uppercase flex items-center gap-1.5 mb-1">
                        <Sliders className="w-4 h-4 text-ds-blue" /> Legacy Platform Comparison
                      </h4>
                      <p className="text-xs text-ds-silver font-light">
                        Slide the handle to compare structural legacy performance variables against Dahiya Solution outcomes.
                      </p>
                    </div>

                    <div 
                      ref={sliderRef}
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleTouchMove}
                      onMouseDown={() => setIsSliding(true)}
                      onMouseUp={() => setIsSliding(false)}
                      onMouseLeave={() => setIsSliding(false)}
                      onTouchStart={() => setIsSliding(true)}
                      onTouchEnd={() => setIsSliding(false)}
                      className="h-[300px] relative rounded-2xl overflow-hidden border border-white/10 bg-ds-black select-none cursor-ew-resize"
                    >
                      {/* Left Side: Legacy (Before) */}
                      <div className="absolute inset-0 bg-red-950/20 p-8 flex flex-col justify-center space-y-4 pr-[50%]">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-[9px] font-mono uppercase tracking-wider w-fit">
                          Legacy (Before)
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] font-mono text-ds-smoke block uppercase">VISUAL DESIGN</span>
                            <span className="text-xs text-ds-silver font-light">{selectedProject.beforeState.design}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-ds-smoke block uppercase">UX & SPEED</span>
                            <span className="text-xs text-ds-silver font-light">{selectedProject.beforeState.ux}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-ds-smoke block uppercase">METADATA STRUCTURE</span>
                            <span className="text-xs text-ds-silver font-light">{selectedProject.beforeState.structure}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Rebuilt (After) - Clipped dynamically based on sliderPosition */}
                      <div 
                        className="absolute inset-0 bg-ds-graphite p-8 flex flex-col justify-center space-y-4 pl-[50%] overflow-hidden transition-all duration-75"
                        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                      >
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-ds-cyan/10 border border-ds-cyan/20 text-ds-cyan rounded-full text-[9px] font-mono uppercase tracking-wider w-fit">
                          Rebuilt (After)
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] font-mono text-ds-smoke block uppercase">VISUAL DESIGN</span>
                            <span className="text-xs text-ds-white font-medium">{selectedProject.afterState.design}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-ds-smoke block uppercase">UX & SPEED</span>
                            <span className="text-xs text-ds-white font-medium">{selectedProject.afterState.ux}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-ds-smoke block uppercase">METADATA STRUCTURE</span>
                            <span className="text-xs text-ds-white font-medium">{selectedProject.afterState.structure}</span>
                          </div>
                        </div>
                      </div>

                      {/* Sliding Handle Bar */}
                      <div 
                        className="absolute top-0 bottom-0 w-[2px] bg-ds-blue/80 cursor-ew-resize z-20 flex items-center justify-center"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="w-8 h-8 rounded-full bg-ds-blue border-2 border-ds-white flex items-center justify-center text-ds-white shadow-lg pointer-events-none transform -translate-x-1/2">
                          <Sliders className="w-3.5 h-3.5 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 6. IMMERSIVE VIDEO SHOWCASE EMBED (If videoUrl exists) */}
                  {selectedProject.videoUrl && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono tracking-widest text-ds-smoke uppercase flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-ds-blue animate-pulse" /> Cinematic Video Walkthrough
                      </h4>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 bg-ds-black relative">
                        <video 
                          controls
                          className="w-full h-full object-cover"
                          poster={selectedProject.image}
                        >
                          <source src={selectedProject.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  )}

                  {/* Developmental Process List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono tracking-widest text-ds-smoke uppercase">
                      Engineering Process & Milestones
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {selectedProject.devProcess.map((step, idx) => (
                        <div key={idx} className="bg-ds-black/20 border border-white/5 p-4 rounded-xl flex flex-col justify-between h-full space-y-3">
                          <span className="text-xs font-mono text-ds-smoke bg-white/5 w-6 h-6 rounded-full flex items-center justify-center font-bold">
                            0{idx + 1}
                          </span>
                          <p className="text-xs text-ds-silver font-light leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 7. AUTHENTIC CLIENT EXPERIENCE (Testimonial section - only when real data exists) */}
                  {selectedProject.clientTestimonial && selectedProject.clientName && (
                    <div className="border-t border-white/5 pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-3">
                        <div className="text-xs font-mono text-ds-smoke uppercase tracking-wider mb-2">Verified Feedback</div>
                        <div className="text-lg font-display font-bold text-ds-white">
                          {selectedProject.clientLogoText || selectedProject.clientCompany}
                        </div>
                        <div className="text-xs text-ds-silver font-light mt-1">
                          Approved Portfolio Case
                        </div>
                      </div>
                      <div className="md:col-span-9 bg-ds-black/40 border border-white/5 rounded-2xl p-6 relative">
                        <MessageSquare className="absolute right-6 top-6 w-12 h-12 text-white/5" />
                        <blockquote className="text-sm md:text-base text-ds-silver italic font-light leading-relaxed">
                          "{selectedProject.clientTestimonial}"
                        </blockquote>
                        <div className="mt-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-ds-white font-mono font-bold">
                            {selectedProject.clientName}
                          </span>
                          <span className="text-xs text-ds-smoke">
                            — {selectedProject.clientCompany}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Call to action inside modal */}
                  <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-ds-smoke font-mono">
                      * Security Disclaimer: Sensitive server-side APIs and confidential database schemas are omitted from visual screens.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-mono text-ds-white hover:bg-white/5 transition-colors"
                      >
                        Back to Portfolio
                      </button>
                      <a 
                        href="/contact"
                        className="px-6 py-2.5 rounded-xl bg-ds-blue hover:bg-ds-blue/80 text-xs font-mono font-bold text-ds-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-1"
                      >
                        Engage {settings.businessName} <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
