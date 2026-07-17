import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Check, 
  X, 
  Save, 
  Sliders, 
  RotateCcw, 
  Globe, 
  Smartphone, 
  FileText, 
  BarChart3, 
  Star, 
  ShieldCheck, 
  FileCode,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio, PortfolioProject } from '../../context/PortfolioContext';
import { Card, Button } from '../../components/ui';

export default function DashboardPortfolio() {
  const { projects, addProject, updateProject, deleteProject, resetProjects } = usePortfolio();
  
  // States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  
  // Blank schema
  const blankProject: Omit<PortfolioProject, 'id'> = {
    slug: '',
    title: '',
    subtitle: '',
    category: 'website',
    subCategory: 'Corporate',
    image: '/src/assets/images/website_development_studio_1784273706424.jpg',
    websitePreviewUrl: '',
    mobilePreviewUrl: '',
    videoUrl: '',
    videoDuration: '',
    description: '',
    objective: '',
    challenge: '',
    solution: '',
    devProcess: ['Blueprint mapping', 'Interactive design', 'Fidelity benchmark'],
    techTags: ['React', 'TypeScript', 'Tailwind'],
    beforeState: {
      design: 'Outdated layouts',
      ux: 'Slow page loading speeds',
      structure: 'Poor metadata structure'
    },
    afterState: {
      design: 'Modern minimal aesthetic',
      ux: 'Sub-300ms loading speeds',
      structure: 'Structured schema and modular components'
    },
    metrics: {
      timelineWeeks: 4,
      featuresDelivered: 10,
      performanceScore: 99,
      uxScore: 98,
      customMetricName: 'Conversion boost',
      customMetricValue: '+150%'
    },
    clientName: '',
    clientCompany: '',
    clientTestimonial: '',
    clientLogoText: '',
    clientApprovalStatus: 'approved',
    seoTitle: '',
    seoDescription: '',
    seoStructuredData: '{}',
    isDraft: false,
    isFeatured: false
  };

  const [formData, setFormData] = useState<Omit<PortfolioProject, 'id'>>(blankProject);
  const [tagsInput, setTagsInput] = useState<string>('React, TypeScript, Tailwind');

  const startEdit = (project: PortfolioProject) => {
    setEditingId(project.id);
    setIsAddingNew(false);
    
    // Copy project to form (excluding id)
    const { id, ...rest } = project;
    setFormData(rest);
    setTagsInput(project.techTags.join(', '));
  };

  const startAdd = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      ...blankProject,
      slug: `custom-project-${Date.now()}`
    });
    setTagsInput('React, Tailwind, Custom App');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAddingNew(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handling nested fields
    if (name.startsWith('before.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        beforeState: { ...prev.beforeState, [field]: value }
      }));
    } else if (name.startsWith('after.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        afterState: { ...prev.afterState, [field]: value }
      }));
    } else if (name.startsWith('metrics.')) {
      const field = name.split('.')[1];
      const parsedVal = (field === 'timelineWeeks' || field === 'featuresDelivered' || field === 'performanceScore' || field === 'uxScore')
        ? Number(value)
        : value;
      setFormData(prev => ({
        ...prev,
        metrics: { ...prev.metrics, [field]: parsedVal }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tags
    const techTags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
    const finalData = {
      ...formData,
      techTags
    };

    if (isAddingNew) {
      addProject(finalData);
    } else if (editingId) {
      updateProject(editingId, finalData);
    }

    setIsSaved(true);
    setEditingId(null);
    setIsAddingNew(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this case study from the portfolio? This cannot be undone.')) {
      deleteProject(id);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all portfolio projects to default values? Any custom entries will be cleared.')) {
      resetProjects();
      setEditingId(null);
      setIsAddingNew(false);
    }
  };

  const availablePlaceholders = [
    { name: 'Website Studio', path: '/src/assets/images/website_development_studio_1784273706424.jpg' },
    { name: 'AI Hologram', path: '/src/assets/images/ai_dashboard_hologram_1784272685643.jpg' },
    { name: 'Mobile App', path: '/src/assets/images/mobile_app_interface_1784273728384.jpg' },
    { name: 'AI Workspace', path: '/src/assets/images/modern_ai_workspace_1784272666662.jpg' },
    { name: 'Digital Particles', path: '/src/assets/images/abstract_digital_particles_1784271780742.jpg' },
    { name: 'Marketing Hub', path: '/src/assets/images/marketing_dashboard_1784273747900.jpg' },
    { name: 'Semiconductor Hardware', path: '/src/assets/images/semiconductor_macro_1784272705068.jpg' },
    { name: 'Video Editing', path: '/src/assets/images/video_editing_studio_1784273767977.jpg' }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ds-white">Portfolio Content CMS</h1>
          <p className="text-ds-silver font-light">Create, edit, and orchestrate case studies, before/after parameters, real-time metrics, and custom SEO configurations.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleResetDefaults} className="flex items-center gap-1.5 font-mono text-xs">
            <RotateCcw size={14} /> Reset Defaults
          </Button>
          {!editingId && !isAddingNew && (
            <Button variant="primary" onClick={startAdd} className="flex items-center gap-1.5 !bg-ds-blue hover:!bg-ds-blue/80 font-bold font-mono text-xs shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Plus size={14} /> New Case Study
            </Button>
          )}
        </div>
      </div>

      {isSaved && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-mono"
        >
          Changes saved successfully. The changes are now active on the public works page.
        </motion.div>
      )}

      {/* Editor Panel */}
      {(editingId || isAddingNew) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Edit Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
            <Card className="p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h2 className="text-lg font-display text-ds-white font-semibold flex items-center gap-2">
                  <Edit3 size={16} className="text-ds-blue" />
                  {isAddingNew ? 'Create New Case Study' : `Edit: ${formData.title || 'Draft'}`}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="xs" onClick={cancelEdit} type="button">
                    Cancel
                  </Button>
                  <Button variant="primary" size="xs" type="submit" className="!bg-ds-blue hover:!bg-ds-blue/80">
                    <Save size={12} className="mr-1" /> Publish Case
                  </Button>
                </div>
              </div>

              {/* SECTION A: General Identity */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider">A. Core Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Project Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-blue"
                      required
                      placeholder="e.g. Megalith Corp Ecosystem"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Custom Slug / URL Path</label>
                    <input 
                      type="text" 
                      name="slug" 
                      value={formData.slug} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-blue font-mono"
                      required
                      placeholder="e.g. megalith-corporate-ecosystem"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-ds-smoke uppercase">Hero Subtitle / Highlight Sentence</label>
                  <input 
                    type="text" 
                    name="subtitle" 
                    value={formData.subtitle} 
                    onChange={handleChange}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-blue"
                    required
                    placeholder="e.g. Re-engineering corporate presence with multi-region CDN scaling"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Core Category</label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-blue"
                    >
                      <option value="website">Website (Web Platforms)</option>
                      <option value="app">Application (Mobile/SaaS)</option>
                      <option value="ai">AI Solution (Automation)</option>
                      <option value="marketing">Digital Marketing (Growth)</option>
                      <option value="creative">Creative Production (Design/Video)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Subcategory Tag</label>
                    <input 
                      type="text" 
                      name="subCategory" 
                      value={formData.subCategory} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-blue"
                      placeholder="e.g. Corporate Website, Dashboard"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION B: Media and Frame Links */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-ds-blue" />
                  B. Media & Frame Linking
                </h3>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-ds-smoke uppercase block">Cover Image / Background Asset</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availablePlaceholders.map((ph, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: ph.path }))}
                        className={`p-2 rounded-lg border text-left flex flex-col items-center justify-center gap-1.5 transition-all text-[10px] ${
                          formData.image === ph.path 
                            ? 'border-ds-blue bg-ds-blue/10 text-ds-white' 
                            : 'border-white/5 bg-ds-black hover:border-white/10 text-ds-smoke'
                        }`}
                      >
                        <img src={ph.path} alt={ph.name} className="w-12 h-8 object-cover rounded" />
                        <span className="truncate max-w-full font-mono">{ph.name}</span>
                      </button>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none mt-2"
                    placeholder="Custom image path or URL"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase flex items-center gap-1">
                      <Globe size={11} /> Website Live URL (IFrame Sandbox)
                    </label>
                    <input 
                      type="text" 
                      name="websitePreviewUrl" 
                      value={formData.websitePreviewUrl} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="https://client-preview.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase flex items-center gap-1">
                      <Smartphone size={11} /> Mobile Shell Link
                    </label>
                    <input 
                      type="text" 
                      name="mobilePreviewUrl" 
                      value={formData.mobilePreviewUrl} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="https://mobile-app-link.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Video Stream URL (.mp4 file)</label>
                    <input 
                      type="text" 
                      name="videoUrl" 
                      value={formData.videoUrl} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="https://domain.com/walkthrough.mp4"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Video Duration Label</label>
                    <input 
                      type="text" 
                      name="videoDuration" 
                      value={formData.videoDuration} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. 1:45"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: Case Story Narrative */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={14} className="text-ds-blue" />
                  C. Case Story & Narrative
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-ds-smoke uppercase">Executive Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-blue"
                    required
                    placeholder="Provide a comprehensive summary of what was engineered."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Objective</label>
                    <textarea 
                      name="objective" 
                      value={formData.objective} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      required
                      placeholder="What was the core target or SLA objective?"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">The Challenge</label>
                    <textarea 
                      name="challenge" 
                      value={formData.challenge} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      required
                      placeholder="What legacy limits or complexities did they suffer?"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">The Solution</label>
                    <textarea 
                      name="solution" 
                      value={formData.solution} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      required
                      placeholder="How did our agency resolve it elegantly?"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-ds-smoke uppercase">Tech Stack Frameworks (Comma separated)</label>
                  <input 
                    type="text" 
                    value={tagsInput} 
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none focus:border-ds-blue font-mono"
                    placeholder="e.g. React, TypeScript, Tailwind, D3.js"
                  />
                  <p className="text-[9px] font-mono text-ds-smoke">Tags will automatically render as isolated system nodes on the case page.</p>
                </div>
              </div>

              {/* SECTION D: Before/After Comparison Parameters */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders size={14} className="text-ds-blue" />
                  D. Legacy Before / Rebuilt After Variables
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before state */}
                  <div className="space-y-3 bg-red-950/10 border border-red-500/10 rounded-xl p-4">
                    <div className="text-[10px] font-mono text-red-400 uppercase font-bold">Legacy Limits (Before)</div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-ds-smoke uppercase">Design Quality</label>
                      <input 
                        type="text" 
                        name="before.design" 
                        value={formData.beforeState.design} 
                        onChange={handleChange}
                        className="w-full bg-ds-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-ds-silver"
                        placeholder="e.g. Cluttered design, misaligned grid lines"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-ds-smoke uppercase">UX & Load Speed</label>
                      <input 
                        type="text" 
                        name="before.ux" 
                        value={formData.beforeState.ux} 
                        onChange={handleChange}
                        className="w-full bg-ds-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-ds-silver"
                        placeholder="e.g. 5.4s load speed, broken mobile layouts"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-ds-smoke uppercase">Core Structure</label>
                      <input 
                        type="text" 
                        name="before.structure" 
                        value={formData.beforeState.structure} 
                        onChange={handleChange}
                        className="w-full bg-ds-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-ds-silver"
                        placeholder="e.g. Legacy server architecture, poor SEO parameters"
                      />
                    </div>
                  </div>

                  {/* After state */}
                  <div className="space-y-3 bg-emerald-950/10 border border-emerald-500/10 rounded-xl p-4">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Dahiya Solutions (After)</div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-ds-smoke uppercase">Design Quality</label>
                      <input 
                        type="text" 
                        name="after.design" 
                        value={formData.afterState.design} 
                        onChange={handleChange}
                        className="w-full bg-ds-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-ds-white"
                        placeholder="e.g. Clean high-contrast modern typography grids"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-ds-smoke uppercase">UX & Load Speed</label>
                      <input 
                        type="text" 
                        name="after.ux" 
                        value={formData.afterState.ux} 
                        onChange={handleChange}
                        className="w-full bg-ds-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-ds-white"
                        placeholder="e.g. Sub-300ms loading speeds, adaptive touch targets"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-ds-smoke uppercase">Core Structure</label>
                      <input 
                        type="text" 
                        name="after.structure" 
                        value={formData.afterState.structure} 
                        onChange={handleChange}
                        className="w-full bg-ds-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-ds-white"
                        placeholder="e.g. Optimized client-side bundles, dynamic SEO tags"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION E: Analytics & Metrics */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 size={14} className="text-ds-blue" />
                  E. Case Study Analytics & Performance
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-ds-smoke uppercase">Weeks Span</label>
                    <input 
                      type="number" 
                      name="metrics.timelineWeeks" 
                      value={formData.metrics.timelineWeeks} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-ds-smoke uppercase">Features Count</label>
                    <input 
                      type="number" 
                      name="metrics.featuresDelivered" 
                      value={formData.metrics.featuresDelivered} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-ds-smoke uppercase">Lighthouse Score</label>
                    <input 
                      type="number" 
                      name="metrics.performanceScore" 
                      value={formData.metrics.performanceScore} 
                      onChange={handleChange}
                      min={0} max={100}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-ds-smoke uppercase">Custom KPI Name</label>
                    <input 
                      type="text" 
                      name="metrics.customMetricName" 
                      value={formData.metrics.customMetricName} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. Lead conversions"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2 md:col-span-1">
                    <label className="text-[9px] font-mono text-ds-smoke uppercase">KPI Outcome Value</label>
                    <input 
                      type="text" 
                      name="metrics.customMetricValue" 
                      value={formData.metrics.customMetricValue} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. +400%"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION F: Verified Testimonial (Authenticity Protected) */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider flex items-center gap-1.5">
                  <Star size={14} className="text-ds-blue" />
                  F. Verified Client Endorsement
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Signatory/Client Name</label>
                    <input 
                      type="text" 
                      name="clientName" 
                      value={formData.clientName} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. Alexander Megalith"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Client Corporate Brand / Company</label>
                    <input 
                      type="text" 
                      name="clientCompany" 
                      value={formData.clientCompany} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. Megalith Group LLC"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Client Logo Text Tag</label>
                    <input 
                      type="text" 
                      name="clientLogoText" 
                      value={formData.clientLogoText} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. MEGALITH"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase font-bold text-ds-cyan">Client Security Status</label>
                    <select 
                      name="clientApprovalStatus" 
                      value={formData.clientApprovalStatus} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                    >
                      <option value="approved">Approved & Sign-off Completed</option>
                      <option value="draft">Draft - Client Sandbox</option>
                      <option value="pending">Pending Client Signature</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-ds-smoke uppercase">Signed Quote Text</label>
                  <textarea 
                    name="clientTestimonial" 
                    value={formData.clientTestimonial} 
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                    placeholder="Provide the exact verified testimonial signed off by the client."
                  />
                  <p className="text-[9px] font-mono text-ds-smoke">The client review panel will omit the review element automatically if these fields are left empty.</p>
                </div>
              </div>

              {/* SECTION G: Custom SEO Metadata controls */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode size={14} className="text-ds-blue" />
                  G. Case SEO Metadata & Structured Schemes
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Dynamic Browser Title (SEO)</label>
                    <input 
                      type="text" 
                      name="seoTitle" 
                      value={formData.seoTitle} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. Megalith Inc Rebuild | Dahiya Solution"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-ds-smoke uppercase">Browser Description Meta (SEO)</label>
                    <input 
                      type="text" 
                      name="seoDescription" 
                      value={formData.seoDescription} 
                      onChange={handleChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white focus:outline-none"
                      placeholder="e.g. Case study on our custom React static platform..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-ds-smoke uppercase">JSON-LD Structured Data Schema</label>
                  <textarea 
                    name="seoStructuredData" 
                    value={formData.seoStructuredData} 
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                    placeholder='{"@context": "https://schema.org", "@type": "CaseStudy", ...}'
                  />
                </div>
              </div>

              {/* SECTION H: Publish Settings */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider">H. Publishing Scope</h3>
                
                <div className="flex flex-wrap gap-6 bg-ds-black/40 border border-white/5 p-4 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input 
                      type="checkbox" 
                      name="isFeatured" 
                      checked={formData.isFeatured} 
                      onChange={handleCheckboxChange}
                      className="rounded border-white/20 bg-ds-black text-ds-blue focus:ring-0"
                    />
                    <span>FEATURE ON PORTFOLIO HEADER</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input 
                      type="checkbox" 
                      name="isDraft" 
                      checked={formData.isDraft} 
                      onChange={handleCheckboxChange}
                      className="rounded border-white/20 bg-ds-black text-ds-blue focus:ring-0"
                    />
                    <span>SAVE AS OFFLINE DRAFT (OMIT FROM LIVE SITE)</span>
                  </label>
                </div>
              </div>

              {/* Save Bar */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <Button variant="outline" size="sm" onClick={cancelEdit} type="button">
                  Cancel Changes
                </Button>
                <Button variant="primary" size="sm" type="submit" className="!bg-ds-blue hover:!bg-ds-blue/80 font-bold">
                  <Save size={14} className="mr-1.5" /> Save & Build Case Study
                </Button>
              </div>
            </Card>
          </form>

          {/* Right Live Sidebar - Visual Card Preview */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-mono text-ds-smoke uppercase tracking-wider flex items-center gap-1.5">
              <Eye size={12} className="text-ds-cyan" />
              Live Card Visualizer
            </h3>

            <div className="bg-ds-graphite/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-ds-black">
                <img 
                  src={formData.image || '/src/assets/images/website_development_studio_1784273706424.jpg'} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 text-[9px] font-mono bg-ds-black/80 text-ds-white px-2 py-0.5 rounded-full uppercase border border-white/15">
                  {formData.subCategory || 'Corporate'}
                </span>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-ds-cyan uppercase tracking-wider">
                  {formData.category === 'website' ? 'Web Platform' : 
                   formData.category === 'app' ? 'Mobile/SaaS' : 
                   formData.category === 'ai' ? 'AI Automation' : 
                   formData.category === 'marketing' ? 'Growth' : 'Creative Studio'}
                </span>
                <h4 className="text-lg font-display font-bold text-ds-white">{formData.title || 'Untitled Case Study'}</h4>
                <p className="text-xs text-ds-silver font-light line-clamp-2">{formData.subtitle || 'No highlight description defined yet.'}</p>
                
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tagsInput.split(',').slice(0, 3).map((tag, i) => (
                    tag.trim() && (
                      <span key={i} className="text-[8px] font-mono text-ds-smoke bg-white/5 px-2 py-0.5 rounded">
                        {tag.trim()}
                      </span>
                    )
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px] font-mono text-ds-smoke">
                  <span>{formData.metrics.timelineWeeks || 4} Weeks Span</span>
                  <span className="text-ds-cyan font-bold">KPI Outcome: {formData.metrics.customMetricValue || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Quick Tips Box */}
            <Card className="p-5 space-y-3 border-ds-blue/10">
              <h4 className="text-xs font-mono font-bold text-ds-white flex items-center gap-1">
                <ShieldCheck size={14} className="text-ds-cyan" /> CMS Guidelines
              </h4>
              <ul className="text-[11px] text-ds-silver space-y-2 list-disc pl-4 font-light">
                <li>All text inputs fully support JSX formatting if customized directly in file codes.</li>
                <li>Ensure URL Slugs do not contain spaces to maintain crawlable link lines.</li>
                <li>Leaving the testimonial signatory fields empty will automatically clean up page margins.</li>
              </ul>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Main CMS List View */}
      {!editingId && !isAddingNew && (
        <Card className="p-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <h2 className="text-lg font-display text-ds-white font-medium flex items-center gap-2">
              <FileText size={18} className="text-ds-blue" />
              Active Works Inventory
            </h2>
            <span className="text-xs font-mono text-ds-smoke">
              Total items: {projects.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-mono text-ds-smoke uppercase tracking-wider">
                  <th className="pb-3 font-medium">Case details</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium text-center">Featured</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                  <th className="pb-3 font-medium text-center">Approval</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {projects.map((proj) => (
                  <tr key={proj.id} className="group hover:bg-white/[0.01]">
                    {/* Title Details */}
                    <td className="py-4 pr-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-12 h-8 object-cover rounded border border-white/5"
                        />
                        <div>
                          <div className="font-display font-bold text-ds-white">{proj.title}</div>
                          <div className="text-[10px] text-ds-smoke font-mono font-light">/{proj.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 pr-3">
                      <span className="text-[10px] font-mono uppercase bg-white/5 px-2.5 py-1 rounded-md text-ds-silver">
                        {proj.category}
                      </span>
                    </td>

                    {/* Featured Status Toggle */}
                    <td className="py-4 px-2 text-center">
                      <button 
                        onClick={() => updateProject(proj.id, { isFeatured: !proj.isFeatured })}
                        className={`mx-auto w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                          proj.isFeatured 
                            ? 'bg-ds-blue/10 text-ds-blue hover:bg-ds-blue/20' 
                            : 'text-ds-smoke hover:text-ds-white'
                        }`}
                      >
                        <Star size={14} fill={proj.isFeatured ? 'currentColor' : 'none'} />
                      </button>
                    </td>

                    {/* Draft Status */}
                    <td className="py-4 px-2 text-center">
                      <button
                        onClick={() => updateProject(proj.id, { isDraft: !proj.isDraft })}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                          proj.isDraft 
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {proj.isDraft ? 'DRAFT' : 'ACTIVE'}
                      </button>
                    </td>

                    {/* Approval */}
                    <td className="py-4 px-2 text-center">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        proj.clientApprovalStatus === 'approved' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : proj.clientApprovalStatus === 'pending'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-ds-black text-ds-smoke border border-white/5'
                      }`}>
                        {proj.clientApprovalStatus.toUpperCase()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="xs"
                          onClick={() => startEdit(proj)}
                          className="!p-1.5 hover:!bg-ds-blue hover:!text-ds-white"
                          title="Edit study"
                        >
                          <Edit3 size={13} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="xs"
                          onClick={() => handleDelete(proj.id)}
                          className="!p-1.5 hover:!bg-red-500 hover:!text-ds-white hover:border-transparent"
                          title="Delete case"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
