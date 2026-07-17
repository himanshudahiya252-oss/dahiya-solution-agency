import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOutletContext } from 'react-router-dom';
import { 
  Save, RefreshCw, Building2, User, FileSignature, Mail, Phone, 
  MapPin, Check, Image as ImageIcon, Video as VideoIcon, Sparkles, Sliders, Globe, Smartphone, Play, Code2,
  AlertCircle
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useMedia, MediaLibrary } from '../../context/MediaContext';
import { Card, Button } from '../../components/ui';

export default function DashboardSettings() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { media, updateMedia, resetMedia } = useMedia();

  const { userRole } = useOutletContext<{ userRole: 'super_admin' | 'editor' | 'analyst' }>() || { userRole: 'super_admin' };
  const isReadOnly = userRole !== 'super_admin';

  const [activeTab, setActiveTab] = useState<'general' | 'media'>('general');
  const [generalData, setGeneralData] = useState({ ...settings });
  const [mediaData, setMediaData] = useState({ ...media });
  const [isSaved, setIsSaved] = useState(false);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMediaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) {
      alert('Unauthorized: You must be a Super Admin to save changes.');
      return;
    }
    updateSettings(generalData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) {
      alert('Unauthorized: You must be a Super Admin to replace media files.');
      return;
    }
    updateMedia(mediaData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (isReadOnly) {
      alert('Unauthorized: System reset is restricted to Super Admins.');
      return;
    }
    if (window.confirm('Are you sure you want to reset ALL settings and media links to default?')) {
      resetSettings();
      resetMedia();
      setGeneralData({
        businessName: 'Dahiya Solution',
        businessLogoText: 'DAHIYA SOLUTION',
        ceoName: 'Sahil Dahiya',
        ceoDesignation: 'Authorized CEO',
        certificateSignatoryName: 'Sahil Dahiya',
        certificateSignatoryDesignation: 'CEO',
        contactEmail: 'contact@dahiyasolution.com',
        contactPhone: '+91 99999 99999',
        contactAddress: 'Dahiya Mansion, New Delhi, India'
      });
      setMediaData({
        techStudioBg: '/src/assets/images/website_development_studio_1784273706424.jpg',
        creativeStudioBg: '/src/assets/images/video_editing_studio_1784273767977.jpg',
        marketingCommandBg: '/src/assets/images/marketing_dashboard_1784273747900.jpg',
        webDevImage: '/src/assets/images/website_development_studio_1784273706424.jpg',
        webDevVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        appDevImage: '/src/assets/images/mobile_app_interface_1784273728384.jpg',
        appDevVideo: 'https://www.w3schools.com/html/movie.mp4',
        uiUxImage: '/src/assets/images/futuristic_innovation_lab_1784271765964.jpg',
        uiUxVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        marketingImage: '/src/assets/images/marketing_dashboard_1784273747900.jpg',
        marketingVideo: 'https://www.w3schools.com/html/movie.mp4',
        analyticsImage: '/src/assets/images/ai_visualization_screens_1784271794578.jpg',
        analyticsVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        videoImage: '/src/assets/images/video_editing_studio_1784273767977.jpg',
        videoVideo: 'https://www.w3schools.com/html/movie.mp4',
        youtubeImage: '/src/assets/images/modern_ai_workspace_1784272666662.jpg',
        youtubeVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        socialImage: '/src/assets/images/abstract_digital_particles_1784271780742.jpg',
        socialVideo: 'https://www.w3schools.com/html/movie.mp4',
        educationImage: '/src/assets/images/ai_education_platform_1784273786221.jpg',
        educationVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        aiImage: '/src/assets/images/ai_dashboard_hologram_1784272685643.jpg',
        aiVideo: 'https://www.w3schools.com/html/movie.mp4',
        biImage: '/src/assets/images/semiconductor_macro_1784272705068.jpg',
        biVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        crmImage: '/src/assets/images/marketing_dashboard_1784273747900.jpg',
        crmVideo: 'https://www.w3schools.com/html/movie.mp4'
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const availableImages = [
    { name: 'Website Studio', path: '/src/assets/images/website_development_studio_1784273706424.jpg' },
    { name: 'AI Hologram', path: '/src/assets/images/ai_dashboard_hologram_1784272685643.jpg' },
    { name: 'Mobile App', path: '/src/assets/images/mobile_app_interface_1784273728384.jpg' },
    { name: 'AI Workspace', path: '/src/assets/images/modern_ai_workspace_1784272666662.jpg' },
    { name: 'Digital Particles', path: '/src/assets/images/abstract_digital_particles_1784271780742.jpg' },
    { name: 'Marketing Hub', path: '/src/assets/images/marketing_dashboard_1784273747900.jpg' },
    { name: 'Semiconductor Hardware', path: '/src/assets/images/semiconductor_macro_1784272705068.jpg' },
    { name: 'Video Editing', path: '/src/assets/images/video_editing_studio_1784273767977.jpg' },
    { name: 'Futuristic Lab', path: '/src/assets/images/futuristic_innovation_lab_1784271765964.jpg' },
    { name: 'AI Education', path: '/src/assets/images/ai_education_platform_1784273786221.jpg' },
    { name: 'AI Visualization', path: '/src/assets/images/ai_visualization_screens_1784271794578.jpg' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ds-white mb-2">Global System Settings</h1>
          <p className="text-ds-silver font-light">Configure business profiles, brand identities, assessment credentials, and atmospheric media library links.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-2 self-start font-mono text-xs">
          <RefreshCw size={14} /> Reset System Defaults
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-2">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-6 py-3 font-mono text-xs tracking-wider uppercase border-b-2 transition-all ${
            activeTab === 'general'
              ? 'border-ds-blue text-ds-white bg-white/[0.02]'
              : 'border-transparent text-ds-smoke hover:text-ds-silver'
          }`}
        >
          General & Branding Settings
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`px-6 py-3 font-mono text-xs tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'media'
              ? 'border-ds-blue text-ds-white bg-white/[0.02]'
              : 'border-transparent text-ds-smoke hover:text-ds-silver'
          }`}
        >
          <ImageIcon size={14} /> Global Media Library
        </button>
      </div>

      {isReadOnly && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/5 border border-amber-500/20 text-amber-200 p-4 rounded-xl text-xs flex items-center gap-3"
        >
          <AlertCircle className="text-amber-500 shrink-0" size={18} />
          <p className="leading-relaxed">
            <strong>Read-Only Mode [{userRole.replace('_', ' ').toUpperCase()}]:</strong> You do not have permissions to modify branding settings or replace media assets. Please authenticate as Super Admin to make adjustments.
          </p>
        </motion.div>
      )}

      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-mono"
        >
          Settings updated successfully! Changes are instantly distributed to all client sections.
        </motion.div>
      )}

      {/* Active Tab Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'general' ? (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <form onSubmit={handleGeneralSubmit} className="space-y-6">
              {/* Card 1: Branding and Profile */}
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-ds-blue/10 flex items-center justify-center text-ds-blue">
                    <Building2 size={16} />
                  </div>
                  <h2 className="text-lg font-display text-ds-white font-medium">Business Profile & Branding</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={generalData.businessName}
                      onChange={handleGeneralChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">Logo Branding Text</label>
                    <input
                      type="text"
                      name="businessLogoText"
                      value={generalData.businessLogoText}
                      onChange={handleGeneralChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">CEO Name</label>
                    <input
                      type="text"
                      name="ceoName"
                      value={generalData.ceoName}
                      onChange={handleGeneralChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">CEO Designation</label>
                    <input
                      type="text"
                      name="ceoDesignation"
                      value={generalData.ceoDesignation}
                      onChange={handleGeneralChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue transition-colors"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Card 2: Certificate System Signatory */}
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-ds-cyan/10 flex items-center justify-center text-ds-cyan">
                    <FileSignature size={16} />
                  </div>
                  <h2 className="text-lg font-display text-ds-white font-medium">Certificate Authority & Signatory</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">Signatory Name</label>
                    <input
                      type="text"
                      name="certificateSignatoryName"
                      value={generalData.certificateSignatoryName}
                      onChange={handleGeneralChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">Signatory Title/Designation</label>
                    <input
                      type="text"
                      name="certificateSignatoryDesignation"
                      value={generalData.certificateSignatoryDesignation}
                      onChange={handleGeneralChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-cyan transition-colors"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Card 3: Contact Details */}
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Mail size={16} />
                  </div>
                  <h2 className="text-lg font-display text-ds-white font-medium">Contact Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">Contact Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 text-ds-smoke w-4 h-4" />
                      <input
                        type="email"
                        name="contactEmail"
                        value={generalData.contactEmail}
                        onChange={handleGeneralChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-ds-white focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">Contact Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 text-ds-smoke w-4 h-4" />
                      <input
                        type="text"
                        name="contactPhone"
                        value={generalData.contactPhone}
                        onChange={handleGeneralChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-ds-white focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-xs font-mono text-ds-smoke uppercase tracking-wider">Office Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 text-ds-smoke w-4 h-4" />
                      <input
                        type="text"
                        name="contactAddress"
                        value={generalData.contactAddress}
                        onChange={handleGeneralChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-ds-white focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Save Bar */}
              <div className="flex items-center justify-between p-4 bg-ds-graphite border border-white/5 rounded-2xl">
                <p className="text-xs text-ds-smoke">
                  * Setting modifications will instantly reflect across the homepage, certificate builder, and client interfaces.
                </p>
                <Button variant="primary" type="submit" className="flex items-center gap-2 !bg-ds-blue hover:!bg-ds-blue/80 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {isSaved ? <Check size={16} /> : <Save size={16} />} Save Branding
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="media"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <form onSubmit={handleMediaSubmit} className="space-y-6">
              {/* Cinematic Backgrounds */}
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-ds-blue/10 flex items-center justify-center text-ds-blue">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h2 className="text-lg font-display text-ds-white font-medium">Cinematic Background Architecture</h2>
                    <p className="text-xs text-ds-smoke">Map background textures to creative workstations or command centers.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Tech Studio */}
                  <div className="space-y-3 p-4 bg-ds-black/40 border border-white/5 rounded-xl">
                    <h3 className="text-xs font-mono text-ds-cyan uppercase tracking-wider">1. Technology Studio</h3>
                    <p className="text-[10px] text-ds-smoke">Background for developers working, web development, code screens.</p>
                    <input
                      type="text"
                      name="techStudioBg"
                      value={mediaData.techStudioBg}
                      onChange={handleMediaChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none focus:border-ds-blue"
                      placeholder="/src/assets/images/..."
                    />
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/5 bg-ds-black">
                      <img src={mediaData.techStudioBg} alt="Tech background" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Creative Studio */}
                  <div className="space-y-3 p-4 bg-ds-black/40 border border-white/5 rounded-xl">
                    <h3 className="text-xs font-mono text-purple-400 uppercase tracking-wider">2. Creative Studio</h3>
                    <p className="text-[10px] text-ds-smoke">Background for media editors, video production workspace, UI/UX screens.</p>
                    <input
                      type="text"
                      name="creativeStudioBg"
                      value={mediaData.creativeStudioBg}
                      onChange={handleMediaChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none focus:border-ds-blue"
                      placeholder="/src/assets/images/..."
                    />
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/5 bg-ds-black">
                      <img src={mediaData.creativeStudioBg} alt="Creative background" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Marketing Command */}
                  <div className="space-y-3 p-4 bg-ds-black/40 border border-white/5 rounded-xl">
                    <h3 className="text-xs font-mono text-pink-400 uppercase tracking-wider">3. Marketing Command Center</h3>
                    <p className="text-[10px] text-ds-smoke">Background for dashboards, analytical charts, marketing pipelines.</p>
                    <input
                      type="text"
                      name="marketingCommandBg"
                      value={mediaData.marketingCommandBg}
                      onChange={handleMediaChange}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none focus:border-ds-blue"
                      placeholder="/src/assets/images/..."
                    />
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/5 bg-ds-black">
                      <img src={mediaData.marketingCommandBg} alt="Marketing background" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Visuals Overhaul */}
              <Card className="p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-ds-cyan/10 flex items-center justify-center text-ds-cyan">
                    <Sliders size={16} />
                  </div>
                  <div>
                    <h2 className="text-lg font-display text-ds-white font-medium">Homepage Services Showcase Media</h2>
                    <p className="text-xs text-ds-smoke">Replace illustrative screenshots and walkthrough videos for each core service.</p>
                  </div>
                </div>

                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                  {/* Web & App Engineering */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-white/5 pb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <Code2 size={13} className="text-ds-blue" /> Web Development Showcase Image
                      </label>
                      <input
                        type="text"
                        name="webDevImage"
                        value={mediaData.webDevImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                      <label className="text-xs font-mono text-ds-smoke uppercase block">Walkthrough Video URL</label>
                      <input
                        type="text"
                        name="webDevVideo"
                        value={mediaData.webDevVideo}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <Smartphone size={13} className="text-ds-cyan" /> App Development Showcase Image
                      </label>
                      <input
                        type="text"
                        name="appDevImage"
                        value={mediaData.appDevImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                      <label className="text-xs font-mono text-ds-smoke uppercase block">Walkthrough Video URL</label>
                      <input
                        type="text"
                        name="appDevVideo"
                        value={mediaData.appDevVideo}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* UI/UX & Marketing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-white/5 pb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <ImageIcon size={13} className="text-purple-400" /> UI/UX Design Image
                      </label>
                      <input
                        type="text"
                        name="uiUxImage"
                        value={mediaData.uiUxImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                      <label className="text-xs font-mono text-ds-smoke uppercase block">Demo Video URL</label>
                      <input
                        type="text"
                        name="uiUxVideo"
                        value={mediaData.uiUxVideo}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <Globe size={13} className="text-pink-400" /> Digital Marketing Image
                      </label>
                      <input
                        type="text"
                        name="marketingImage"
                        value={mediaData.marketingImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                      <label className="text-xs font-mono text-ds-smoke uppercase block">Campaign Video URL</label>
                      <input
                        type="text"
                        name="marketingVideo"
                        value={mediaData.marketingVideo}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* AI & Analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-white/5 pb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <Sparkles size={13} className="text-ds-blue" /> AI Automation Showcase Image
                      </label>
                      <input
                        type="text"
                        name="aiImage"
                        value={mediaData.aiImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <Sliders size={13} className="text-emerald-400" /> Business Analytics Image
                      </label>
                      <input
                        type="text"
                        name="analyticsImage"
                        value={mediaData.analyticsImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* YouTube Management & Social Media */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-white/5 pb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <Play size={13} className="text-red-500" /> YouTube Management Showcase Image
                      </label>
                      <input
                        type="text"
                        name="youtubeImage"
                        value={mediaData.youtubeImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-ds-white uppercase flex items-center gap-1">
                        <Smartphone size={13} className="text-ds-blue" /> Social Command Showcase Image
                      </label>
                      <input
                        type="text"
                        name="socialImage"
                        value={mediaData.socialImage}
                        onChange={handleMediaChange}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-3 py-2 text-xs text-ds-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Suggestions Panel */}
              <Card className="p-8 space-y-4">
                <h3 className="text-xs font-mono text-ds-white uppercase tracking-wider">Available Local Image Presets</h3>
                <p className="text-xs text-ds-smoke font-light">Copy any path below and paste it into any image field above to switch styling atmospheres instantly:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                  {availableImages.map((img, i) => (
                    <div key={i} className="bg-ds-black p-2 border border-white/5 rounded-lg flex flex-col items-center">
                      <img src={img.path} alt={img.name} className="w-full aspect-video object-cover rounded mb-2" />
                      <span className="text-[10px] font-mono text-ds-silver truncate max-w-full block">{img.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(img.path);
                          alert(`Copied path: ${img.path}`);
                        }}
                        className="text-[9px] font-mono text-ds-blue mt-1 hover:underline hover:text-ds-cyan"
                      >
                        Copy Path URL
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Save Bar */}
              <div className="flex items-center justify-between p-4 bg-ds-graphite border border-white/5 rounded-2xl">
                <p className="text-xs text-ds-smoke font-mono">
                  * Media modifications are dynamically loaded into cinematic heroes and workspace illustrations across the application.
                </p>
                <Button variant="primary" type="submit" className="flex items-center gap-2 !bg-ds-blue hover:!bg-ds-blue/80 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {isSaved ? <Check size={16} /> : <Save size={16} />} Save Media Setup
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
