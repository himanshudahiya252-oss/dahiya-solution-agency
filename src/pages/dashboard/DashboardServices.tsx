import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOutletContext } from 'react-router-dom';
import { 
  Layers, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Check, 
  X, 
  Video, 
  Image as ImageIcon, 
  Search,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../../components/ui';
import { useServices, ServiceItem } from '../../context/ServiceContext';

export default function DashboardServices() {
  const { services, addService, updateService, deleteService, reorderServices } = useServices();
  const { userRole } = useOutletContext<{ userRole: 'super_admin' | 'editor' | 'analyst' }>();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('web-dev');
  const [iconName, setIconName] = useState<'Code' | 'Sparkles' | 'Target' | 'Megaphone' | 'Cpu' | 'Database' | 'Layers' | 'Shield'>('Code');
  const [image, setImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const isReadOnly = userRole === 'analyst';
  const isEditor = userRole === 'editor';

  const handleOpenEdit = (service: ServiceItem) => {
    setSelectedService(service);
    setTitle(service.title);
    setDescription(service.description);
    setCategory(service.category);
    setIconName(service.iconName);
    setImage(service.image || '');
    setVideoUrl(service.videoUrl || '');
    setFeatures(service.features || []);
    setSeoTitle(service.seoTitle || '');
    setSeoDescription(service.seoDescription || '');
    setIsEditing(true);
    setIsAdding(false);
    setFormError('');
    setFormSuccess('');
  };

  const handleOpenAdd = () => {
    setSelectedService(null);
    setTitle('');
    setDescription('');
    setCategory('web-dev');
    setIconName('Code');
    setImage('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');
    setVideoUrl('');
    setFeatures([]);
    setFeatureInput('');
    setSeoTitle('');
    setSeoDescription('');
    setIsAdding(true);
    setIsEditing(false);
    setFormError('');
    setFormSuccess('');
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feat: string) => {
    setFeatures(features.filter(f => f !== feat));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    if (!title.trim() || !description.trim()) {
      setFormError('Title and Description are required.');
      return;
    }

    const serviceData = {
      title: title.trim(),
      description: description.trim(),
      category,
      iconName,
      image: image.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
      features,
      seoTitle: seoTitle.trim() || undefined,
      seoDescription: seoDescription.trim() || undefined,
    };

    if (isEditing && selectedService) {
      updateService(selectedService.id, serviceData);
      setFormSuccess('Service updated successfully!');
      setTimeout(() => {
        setIsEditing(false);
        setSelectedService(null);
      }, 1000);
    } else {
      addService(serviceData);
      setFormSuccess('Service added successfully!');
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  };

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    if (isEditor) {
      alert('Permission Denied: Editors cannot delete services. Only Super Admins can perform this action.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this service? This cannot be undone.')) {
      deleteService(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (isReadOnly) return;
    if (index === 0) return;
    const reordered = [...services];
    const temp = reordered[index];
    reordered[index] = reordered[index - 1];
    reordered[index - 1] = temp;
    reorderServices(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (isReadOnly) return;
    if (index === services.length - 1) return;
    const reordered = [...services];
    const temp = reordered[index];
    reordered[index] = reordered[index + 1];
    reordered[index + 1] = temp;
    reorderServices(reordered);
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ds-white mb-2 flex items-center gap-3">
            <Layers className="text-ds-blue" />
            Service Management CMS
          </h1>
          <p className="text-ds-silver font-light">
            Manage your service catalogs, upload media resources, order sections, and customize metadata search indexes.
          </p>
        </div>
        {!isReadOnly && (
          <Button variant="primary" asMotion onClick={handleOpenAdd}>
            <Plus size={16} className="mr-2" /> Add Service
          </Button>
        )}
      </div>

      {/* Role Alert */}
      {isReadOnly && (
        <Card className="p-4 border-amber-500/20 bg-amber-500/5 flex items-center gap-3">
          <AlertCircle className="text-amber-500" size={18} />
          <p className="text-xs text-amber-200/80">
            <strong>Analyst Mode:</strong> Read-only privileges enabled. You can inspect service details but changes cannot be finalized.
          </p>
        </Card>
      )}
      {isEditor && (
        <Card className="p-4 border-ds-blue/20 bg-ds-blue/5 flex items-center gap-3">
          <Sparkles className="text-ds-blue" size={18} />
          <p className="text-xs text-ds-silver">
            <strong>Editor Mode:</strong> You can add and edit services. Deleting services is restricted to Super Admins.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Services Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-display text-ds-white">Service List & Order</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ds-smoke" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter services..." 
                  className="w-full bg-ds-graphite/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors placeholder:text-ds-smoke"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-xs font-mono uppercase tracking-widest text-ds-smoke">
                    <th className="py-4 px-2">Order</th>
                    <th className="py-4 px-4">Service</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Features</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredServices.map((service, index) => (
                    <tr key={service.id} className="hover:bg-white/5 transition-colors group">
                      {/* Order column */}
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-semibold text-ds-blue">{service.order}</span>
                          {!isReadOnly && (
                            <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleMoveUp(index)} 
                                disabled={index === 0}
                                className="text-ds-smoke hover:text-ds-white disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowUp size={10} />
                              </button>
                              <button 
                                onClick={() => handleMoveDown(index)} 
                                disabled={index === services.length - 1}
                                className="text-ds-smoke hover:text-ds-white disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowDown size={10} />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      {/* Service Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-ds-graphite border border-white/10 rounded-xl flex items-center justify-center text-ds-silver shrink-0">
                            <Layers size={18} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-sm text-ds-white truncate">{service.title}</div>
                            <div className="text-xs text-ds-smoke font-light line-clamp-1">{service.description}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="text-[10px] bg-ds-black/30 font-normal">
                          {service.category}
                        </Badge>
                      </td>

                      {/* Features */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs text-ds-silver">
                          {service.features?.length || 0} items
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEdit(service)}
                            className="p-2 text-ds-smoke hover:text-ds-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit size={14} />
                          </button>
                          {!isReadOnly && (
                            <button 
                              onClick={() => handleDelete(service.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredServices.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-ds-smoke text-sm font-light">
                        No services matching your search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Editor Pane */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {(isEditing || isAdding) ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="p-6 border-ds-blue/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-medium text-ds-white">
                      {isEditing ? 'Modify Service' : 'New Service Specification'}
                    </h3>
                    <button 
                      onClick={() => { setIsEditing(false); setIsAdding(false); }}
                      className="p-1 text-ds-smoke hover:text-ds-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="space-y-5">
                    {formError && (
                      <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-300 flex items-center gap-2">
                        <AlertCircle size={14} /> {formError}
                      </div>
                    )}
                    {formSuccess && (
                      <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-300 flex items-center gap-2">
                        <Check size={14} /> {formSuccess}
                      </div>
                    )}

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1.5">Service Title</label>
                      <Input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Enterprise Cyber-Defense"
                        disabled={isReadOnly}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1.5">Business Vertical</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={isReadOnly}
                        className="w-full bg-ds-graphite border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors"
                      >
                        <option value="web-dev">Web Solutions & Digital Platforms</option>
                        <option value="mobile">Mobile Application Engineering</option>
                        <option value="ai-automation">AI & Intelligent Automations</option>
                        <option value="marketing">B2B Growth & Marketing</option>
                        <option value="branding">Brand Strategy & Identity</option>
                      </select>
                    </div>

                    {/* Icon Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1.5">SaaS System Icon</label>
                      <select
                        value={iconName}
                        onChange={(e) => setIconName(e.target.value as any)}
                        disabled={isReadOnly}
                        className="w-full bg-ds-graphite border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors"
                      >
                        <option value="Code">Code Syntax (Web / App)</option>
                        <option value="Sparkles">Sparkles AI (Automation / ML)</option>
                        <option value="Target">Target (Strategy / Branding)</option>
                        <option value="Megaphone">Megaphone (Growth / Ads)</option>
                        <option value="Cpu">CPU (Embedded / Processing)</option>
                        <option value="Database">Database (Ledger / Architecture)</option>
                        <option value="Layers">Layers (Full-Stack / Multi-tier)</option>
                        <option value="Shield">Shield (Security / Protection)</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1.5">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Summarize the value and capabilities..."
                        rows={3}
                        disabled={isReadOnly}
                        className="w-full bg-ds-graphite border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors placeholder:text-ds-smoke"
                      />
                    </div>

                    {/* Media Uploads */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1.5">Cover Image (URL / Path)</label>
                        <div className="relative">
                          <Input 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            disabled={isReadOnly}
                            className="!pl-10"
                          />
                          <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ds-smoke w-4 h-4" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1.5">Video Resource (URL)</label>
                        <div className="relative">
                          <Input 
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://domain.com/asset.mp4"
                            disabled={isReadOnly}
                            className="!pl-10"
                          />
                          <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ds-smoke w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Features (Tag Pill list) */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1.5">Core Features & Benchmarks</label>
                      <div className="flex gap-2">
                        <Input 
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          placeholder="e.g. Sub-100ms API response"
                          disabled={isReadOnly}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                        />
                        <Button type="button" variant="outline" onClick={handleAddFeature} disabled={isReadOnly}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {features.map((feat, i) => (
                          <span key={i} className="text-xs bg-ds-black border border-white/10 px-2.5 py-1 rounded-lg text-ds-silver flex items-center gap-1">
                            {feat}
                            {!isReadOnly && (
                              <button type="button" onClick={() => handleRemoveFeature(feat)} className="text-red-400 hover:text-red-300">
                                <X size={10} />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SEO Config */}
                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <div className="text-xs font-mono text-ds-blue uppercase tracking-widest">Google SEO Index Configuration</div>
                      
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1">SEO Title</label>
                        <Input 
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          placeholder="Meta title override"
                          disabled={isReadOnly}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-ds-smoke mb-1">SEO Description</label>
                        <Input 
                          value={seoDescription}
                          onChange={(e) => setSeoDescription(e.target.value)}
                          placeholder="Meta description summary"
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>

                    {!isReadOnly && (
                      <Button type="submit" variant="primary" className="w-full">
                        {isEditing ? 'Save Revisions' : 'Launch New Service'}
                      </Button>
                    )}
                  </form>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-8 border-dashed border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <Layers className="text-ds-smoke/50 mb-4 animate-pulse" size={32} />
                <h4 className="text-sm font-medium text-ds-white mb-1">No Active Selection</h4>
                <p className="text-xs text-ds-smoke font-light max-w-xs">
                  Select any existing service from the panel, or add a brand new digital capability to your business catalog.
                </p>
                {!isReadOnly && (
                  <Button variant="outline" size="sm" className="mt-4" onClick={handleOpenAdd}>
                    Create Service <ChevronRight size={12} className="ml-1" />
                  </Button>
                )}
              </Card>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
