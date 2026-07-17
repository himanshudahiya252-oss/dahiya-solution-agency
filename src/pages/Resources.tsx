import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  Download, 
  Bookmark, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ThumbsUp, 
  Eye, 
  Mail, 
  X, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Sparkles,
  Share2,
  Copy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog, Article, DownloadableResource } from '../context/BlogContext';

export default function ResourcesPage() {
  const { 
    articles, 
    resources, 
    bookmarkedIds, 
    toggleBookmark, 
    subscribeNewsletter, 
    downloadResource 
  } = useBlog();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'AI' | 'Web Dev' | 'Marketing' | 'Data' | 'EdTech' | 'Business'>('All');
  const [selectedType, setSelectedType] = useState<'All' | 'Guide' | 'Whitepaper' | 'Prompt Sheet' | 'Template'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Resource Download Gating Modal
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<DownloadableResource | null>(null);
  const [gateEmail, setGateEmail] = useState('');
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateCompleted, setGateCompleted] = useState(false);

  // General share state feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: ('All' | 'AI' | 'Web Dev' | 'Marketing' | 'Data' | 'EdTech' | 'Business')[] = [
    'All', 'AI', 'Web Dev', 'Marketing', 'Data', 'EdTech', 'Business'
  ];

  const resourceTypes: ('All' | 'Guide' | 'Whitepaper' | 'Prompt Sheet' | 'Template')[] = [
    'All', 'Guide', 'Whitepaper', 'Prompt Sheet', 'Template'
  ];

  // Filtering articles
  const filteredArticles = articles
    .filter(art => art.status === 'Published')
    .filter(art => {
      const matchSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'likes') return b.likes - a.likes;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  // Featured article spotlight
  const featuredArticle = articles.find(art => art.featured && art.status === 'Published') || filteredArticles[0];

  // Filtering resources
  const filteredResources = resources.filter(res => {
    const matchSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        res.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === 'All' || res.type === selectedType;
    return matchSearch && matchType;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    const success = subscribeNewsletter(newsletterEmail);
    if (success) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    } else {
      setNewsletterError('This email is already subscribed.');
    }
  };

  const handleResourceClick = (res: DownloadableResource) => {
    setActiveResource(res);
    if (res.gated) {
      setGateModalOpen(true);
      setGateCompleted(false);
      setGateEmail('');
    } else {
      // Direct download / display
      downloadResource(res.id);
      setGateModalOpen(true);
      setGateCompleted(true);
    }
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateEmail || !gateEmail.includes('@')) return;
    setGateSubmitting(true);
    
    setTimeout(() => {
      if (activeResource) {
        downloadResource(activeResource.id, gateEmail);
      }
      setGateSubmitting(false);
      setGateCompleted(true);
    }, 1000);
  };

  const copyShareLink = (id: string, slug: string) => {
    const shareUrl = `${window.location.origin}/resources/${slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-ds-black text-ds-white selection:bg-ds-blue/30 relative overflow-hidden">
      
      {/* Cinematic Ambient Background */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ds-blue/15 via-ds-black/50 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[800px] -right-[200px] w-[500px] h-[500px] bg-ds-blue/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-ds-blue" />
            <span className="text-xs font-mono uppercase tracking-widest text-ds-silver">Knowledge Ecosystem</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Insights, Innovation <br />
            <span className="bg-gradient-to-r from-ds-white via-ds-silver to-ds-smoke bg-clip-text text-transparent">
              &amp; Digital Growth
            </span>
          </h1>
          <p className="text-ds-silver text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Practical strategies, technical blueprints, and enterprise wisdom curated by Dahiya Solution’s principal engineering and marketing directors.
          </p>

          {/* Cinematic Interactive Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-ds-smoke" />
            </div>
            <input 
              type="text" 
              placeholder="Search articles, technical keywords, or resources..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ds-graphite/40 border border-white/10 rounded-full py-4.5 pl-14 pr-6 text-ds-white focus:outline-none focus:border-ds-blue/50 focus:bg-ds-graphite/60 transition-all placeholder:text-ds-smoke text-base shadow-lg backdrop-blur-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-ds-smoke hover:text-ds-white text-xs font-mono transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Featured Article Spotlight */}
        {featuredArticle && !searchQuery && selectedCategory === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-24"
          >
            <div className="text-xs font-mono text-ds-smoke uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
              Featured Insight
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-ds-graphite/30 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md overflow-hidden hover:border-white/10 transition-colors group relative">
              
              {/* Background gradient spotlight */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ds-blue/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-ds-blue/10 transition-colors" />

              {/* Cover Image */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden relative aspect-[16/10] bg-ds-graphite/40">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ds-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 text-xs font-mono tracking-widest uppercase bg-ds-black/75 border border-white/10 rounded-full backdrop-blur-sm">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              {/* Meta Data & Brief */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-ds-silver mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {featuredArticle.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {featuredArticle.readTime} min read
                    </span>
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-ds-white mb-4 group-hover:text-ds-blue transition-colors leading-tight">
                    <Link to={`/resources/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  
                  <p className="text-ds-silver font-light leading-relaxed mb-6">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                  {/* Author Card */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ds-blue/10 border border-ds-blue/30 flex items-center justify-center font-mono text-ds-white text-sm">
                      {featuredArticle.author.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ds-white">{featuredArticle.author.name}</div>
                      <div className="text-xs text-ds-smoke">{featuredArticle.author.role}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleBookmark(featuredArticle.id)}
                      className={`p-2.5 rounded-full border transition-all ${
                        bookmarkedIds.includes(featuredArticle.id) 
                          ? 'bg-ds-blue/20 border-ds-blue text-ds-blue' 
                          : 'border-white/10 hover:border-white/30 text-ds-silver hover:text-ds-white'
                      }`}
                      title={bookmarkedIds.includes(featuredArticle.id) ? 'Bookmarked' : 'Bookmark'}
                    >
                      <Bookmark size={15} />
                    </button>
                    <button 
                      onClick={() => copyShareLink(featuredArticle.id, featuredArticle.slug)}
                      className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-ds-silver hover:text-ds-white transition-all"
                      title="Copy Link"
                    >
                      {copiedId === featuredArticle.id ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Share2 size={15} />}
                    </button>
                    <Link 
                      to={`/resources/${featuredArticle.slug}`}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-ds-white text-ds-black hover:opacity-85 transition-opacity"
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Content Tabs & Toolbar */}
        <div className="mb-12 border-b border-white/5 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase border transition-all shrink-0 ${
                    selectedCategory === cat 
                      ? 'bg-ds-white text-ds-black border-ds-white' 
                      : 'bg-ds-graphite/20 border-white/5 text-ds-silver hover:border-white/20 hover:text-ds-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-ds-smoke uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-ds-graphite/40 border border-white/10 text-xs font-mono text-ds-white rounded-lg px-3 py-2 focus:outline-none focus:border-ds-blue/50"
              >
                <option value="date">Most Recent</option>
                <option value="views">Most Viewed</option>
                <option value="likes">Most Liked</option>
              </select>
            </div>

          </div>
        </div>

        {/* Primary Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art, idx) => (
                <motion.article
                  key={art.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-ds-graphite/20 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Card Thumbnail */}
                    <Link to={`/resources/${art.slug}`} className="block aspect-[16/10] bg-ds-graphite/40 overflow-hidden relative">
                      <img 
                        src={art.coverImage} 
                        alt={art.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ds-black/40 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-mono tracking-wider uppercase bg-ds-black/80 border border-white/5 rounded-full backdrop-blur-sm">
                        {art.category}
                      </span>
                    </Link>

                    {/* Metadata & Details */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[11px] font-mono text-ds-smoke mb-3">
                        <span className="flex items-center gap-1"><Calendar size={11} /> {art.publishDate}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {art.readTime} min</span>
                      </div>

                      <h3 className="font-display text-xl font-medium tracking-tight mb-3 text-ds-white leading-snug group-hover:text-ds-blue transition-colors">
                        <Link to={`/resources/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h3>

                      <p className="text-ds-silver text-sm font-light leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-6 pt-0 border-t border-white/5 mt-auto flex items-center justify-between">
                    {/* Author Circle */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-ds-graphite border border-white/10 flex items-center justify-center font-mono text-ds-silver text-xs">
                        {art.author.avatar}
                      </div>
                      <span className="text-xs text-ds-silver">{art.author.name}</span>
                    </div>

                    {/* Quick Utility Tools */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleBookmark(art.id)}
                        className={`p-1.5 rounded-full border transition-colors ${
                          bookmarkedIds.includes(art.id) 
                            ? 'bg-ds-blue/10 border-ds-blue/30 text-ds-blue' 
                            : 'border-white/5 text-ds-smoke hover:text-ds-white hover:border-white/10'
                        }`}
                      >
                        <Bookmark size={13} />
                      </button>
                      <button 
                        onClick={() => copyShareLink(art.id, art.slug)}
                        className="p-1.5 rounded-full border border-white/5 text-ds-smoke hover:text-ds-white hover:border-white/10 transition-colors"
                      >
                        {copiedId === art.id ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Share2 size={13} />}
                      </button>
                      <Link to={`/resources/${art.slug}`} className="text-xs text-ds-silver group-hover:text-ds-blue font-mono uppercase tracking-wider flex items-center gap-1 transition-colors pl-2">
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>

                </motion.article>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <BookOpen className="w-12 h-12 text-ds-smoke mx-auto mb-4" />
                <h4 className="font-display text-lg text-ds-white mb-2">No articles found</h4>
                <p className="text-ds-smoke text-sm max-w-md mx-auto">
                  We couldn’t find any articles matching your current search parameters. Try clearing the search or category filters.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Downloadable Resource Gated B2B Library */}
        <section className="mb-28 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-blue/10 border border-ds-blue/20 mb-3">
                <Sparkles size={11} className="text-ds-blue" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-ds-blue">B2B Lead Magnets</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ds-white">
                Downloadable Blueprints
              </h2>
              <p className="text-ds-silver text-sm max-w-xl font-light mt-2">
                Production-ready configuration scripts, compliance tables, and strategic checklists to fast-track your team’s development.
              </p>
            </div>

            {/* Resource Type chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide shrink-0">
              {resourceTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-1.5 rounded-lg text-[11px] font-mono tracking-widest uppercase border transition-all ${
                    selectedType === type 
                      ? 'bg-ds-blue border-ds-blue text-ds-white' 
                      : 'bg-ds-graphite/20 border-white/5 text-ds-silver hover:border-white/10 hover:text-ds-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((res, index) => (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-ds-graphite/10 border border-white/5 rounded-2xl p-6 hover:bg-ds-graphite/20 hover:border-white/15 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-[9px] font-mono tracking-widest uppercase rounded-md bg-ds-blue/10 border border-ds-blue/20 text-ds-blue">
                        {res.type}
                      </span>
                      <span className="text-[10px] font-mono text-ds-smoke uppercase">{res.fileSize}</span>
                    </div>

                    <h3 className="font-display text-lg font-medium text-ds-white mb-2 group-hover:text-ds-blue transition-colors">
                      {res.title}
                    </h3>
                    
                    <p className="text-ds-silver text-xs font-light leading-relaxed mb-6">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono text-ds-smoke uppercase">
                      {res.downloadCount} Downloads
                    </span>
                    <button
                      onClick={() => handleResourceClick(res)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ds-white hover:text-ds-blue transition-colors"
                    >
                      {res.gated ? (
                        <>
                          Unlock <Lock size={12} className="text-ds-smoke group-hover:text-ds-blue transition-colors" />
                        </>
                      ) : (
                        <>
                          Download <Download size={12} />
                        </>
                      )}
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Editorial Newsletter Subscription Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ds-graphite/40 to-ds-black border border-white/5 p-8 md:p-14 mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-ds-blue/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <Mail size={12} className="text-ds-smoke" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-ds-silver">Weekly Intelligence Briefing</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ds-white mb-3 leading-tight">
                Get B2B strategy, AI templates, and codebase walkthroughs in your inbox.
              </h2>
              <p className="text-ds-silver text-sm font-light max-w-xl">
                We share real solutions. No spam, no marketing fluff, just pure architectural deep-dives and conversion mechanics from our master developer files.
              </p>
            </div>

            <div className="lg:col-span-5">
              {!newsletterSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Enter your professional email" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-ds-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-ds-white placeholder:text-ds-smoke focus:outline-none focus:border-ds-blue/50"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-6 py-3.5 rounded-xl bg-ds-white text-ds-black hover:opacity-90 font-mono text-xs uppercase tracking-widest transition-opacity shrink-0 flex items-center justify-center gap-2"
                    >
                      Subscribe <Mail size={14} />
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="text-red-400 text-xs font-mono">{newsletterError}</p>
                  )}
                  <p className="text-[10px] font-mono text-ds-smoke uppercase text-center sm:text-left">
                    🔒 Protected by client privacy protocols. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-ds-blue/10 border border-ds-blue/20 rounded-2xl p-6 text-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-ds-blue mx-auto mb-3" />
                  <h4 className="font-display text-lg text-ds-white font-medium mb-1">Transmission Established</h4>
                  <p className="text-ds-silver text-xs font-light">
                    Your professional email has been locked into Dahiya Solution’s newsletter queue. Prepare for high-value intelligence.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

      </section>

      {/* Gated Resource / Direct Download Preview Modal */}
      <AnimatePresence>
        {gateModalOpen && activeResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ds-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-ds-graphite/95 border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setGateModalOpen(false)}
                className="absolute top-4 right-4 text-ds-smoke hover:text-ds-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="p-8">
                
                {!gateCompleted ? (
                  // GATED FORM
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-ds-blue mb-4 uppercase tracking-widest bg-ds-blue/10 border border-ds-blue/20 px-3 py-1 rounded-full">
                      <Lock size={12} /> Gated Enterprise Content
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      Unlock {activeResource.title}
                    </h3>
                    <p className="text-ds-silver text-sm font-light mb-6">
                      This high-value technical blueprint is gated for enterprise partners. Submit your professional email to instantly unlock the content and copy the source script.
                    </p>

                    <form onSubmit={handleGateSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Corporate Email Address</label>
                        <input 
                          type="email" 
                          placeholder="name@company.com" 
                          value={gateEmail}
                          onChange={(e) => setGateEmail(e.target.value)}
                          className="w-full bg-ds-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 placeholder:text-ds-smoke"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={gateSubmitting}
                        className="w-full bg-ds-white text-ds-black hover:opacity-90 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-opacity flex items-center justify-center gap-2"
                      >
                        {gateSubmitting ? 'Unlocking Safe...' : 'Access Resource Blueprint'}
                      </button>
                    </form>
                  </div>
                ) : (
                  // COMPLETED CONTENT PREVIEW (Direct Use)
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-500 mb-4 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      <CheckCircle2 size={12} /> Vault Decrypted Successfully
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      {activeResource.title}
                    </h3>
                    <p className="text-ds-silver text-sm font-light mb-4">
                      Copy the file buffer below directly for deployment inside your team’s codebase or strategy directories.
                    </p>

                    {/* File view terminal mockup */}
                    <div className="bg-ds-black/80 rounded-xl p-5 border border-white/5 mb-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                        <span className="text-xs font-mono text-ds-smoke">{activeResource.title.toLowerCase().replace(/\s+/g, '_')}_spec.txt</span>
                        <button
                          onClick={() => {
                            if (activeResource.fileContent) {
                              navigator.clipboard.writeText(activeResource.fileContent);
                              alert('Code copied to clipboard!');
                            }
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-ds-silver hover:text-ds-white transition-colors"
                        >
                          <Copy size={12} /> Copy Buffer
                        </button>
                      </div>
                      <pre className="text-xs font-mono text-emerald-400 overflow-x-auto max-h-60 leading-relaxed scrollbar-hide select-all whitespace-pre-wrap">
                        {activeResource.fileContent || '# Binary document content. File has been logged to your corporate profile.'}
                      </pre>
                    </div>

                    <button
                      onClick={() => setGateModalOpen(false)}
                      className="w-full bg-ds-graphite hover:bg-ds-graphite/80 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center"
                    >
                      Close Blueprint Vault
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
