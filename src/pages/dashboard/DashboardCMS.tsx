import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Eye, 
  ThumbsUp, 
  Bookmark, 
  Download, 
  BarChart3, 
  Mail, 
  CheckCircle2, 
  X, 
  Save, 
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  Copy
} from 'lucide-react';
import { useBlog, Article, DownloadableResource } from '../../context/BlogContext';

export default function DashboardCMS() {
  const { 
    articles, 
    resources, 
    newsletters, 
    addArticle, 
    updateArticle, 
    deleteArticle,
    resetBlog
  } = useBlog();

  // Navigation tabs inside CMS
  const [activeTab, setActiveTab] = useState<'articles' | 'resources' | 'subscribers'>('articles');
  const [searchQuery, setSearchQuery] = useState('');

  // Article Form State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState<'AI' | 'Web Dev' | 'Marketing' | 'Data' | 'EdTech' | 'Business'>('AI');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artTags, setArtTags] = useState('');
  const [artCoverImage, setArtCoverImage] = useState('');
  const [artReadTime, setArtReadTime] = useState(5);
  const [artKeyTakeaways, setArtKeyTakeaways] = useState('');
  const [artTimeToImplement, setArtTimeToImplement] = useState('');
  const [artRoiEstimation, setArtRoiEstimation] = useState('');
  const [artStatus, setArtStatus] = useState<'Published' | 'Draft' | 'Scheduled'>('Published');
  const [artSeoTitle, setArtSeoTitle] = useState('');
  const [artSeoDesc, setArtSeoDesc] = useState('');

  // AI Assistant Workspace State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOption, setAiOption] = useState<'outline' | 'headline' | 'meta' | 'key_takeaways'>('outline');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // General Analytics Calculations
  const totalViews = articles.reduce((acc, art) => acc + art.views, 0);
  const totalLikes = articles.reduce((acc, art) => acc + art.likes, 0);
  const totalBookmarks = articles.reduce((acc, art) => acc + art.bookmarks, 0);
  const totalDownloads = resources.reduce((acc, res) => acc + res.downloadCount, 0);

  // Filter lists
  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    res.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubscribers = newsletters.filter(email => 
    email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trigger Gemini API Assistant
  const handleAiGeneration = async () => {
    if (!aiPrompt.trim()) {
      setAiError('Please enter a description or topic first.');
      return;
    }
    setAiLoading(true);
    setAiError('');
    setAiResponse('');

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, option: aiOption })
      });

      const data = await response.json();
      if (response.ok) {
        setAiResponse(data.result);
      } else {
        setAiError(data.error || 'Failed to generate content.');
      }
    } catch (e: any) {
      setAiError(e.message || 'Error occurred connecting to the assistant pipeline.');
    } finally {
      setAiLoading(false);
    }
  };

  const applyAiOutputToEditor = () => {
    if (!aiResponse) return;
    if (aiOption === 'outline') {
      setArtContent(prev => prev + `\n\n<h3>Proposed Article Outline</h3>\n<pre>${aiResponse}</pre>\n`);
    } else if (aiOption === 'headline') {
      setArtTitle(aiResponse.split('\n')[0]?.replace(/^\d+\.\s*/, '') || aiResponse);
    } else if (aiOption === 'meta') {
      setArtSeoDesc(aiResponse.slice(0, 150));
    } else if (aiOption === 'key_takeaways') {
      setArtKeyTakeaways(aiResponse);
    }
  };

  // Article Modal Operations
  const openArticleModal = (art?: Article) => {
    if (art) {
      setEditingArticle(art);
      setArtTitle(art.title);
      setArtCategory(art.category);
      setArtSummary(art.summary);
      setArtContent(art.content);
      setArtTags(art.tags.join(', '));
      setArtCoverImage(art.coverImage);
      setArtReadTime(art.readTime);
      setArtKeyTakeaways(art.keyTakeaways.join('\n'));
      setArtTimeToImplement(art.timeToImplement);
      setArtRoiEstimation(art.roiEstimation);
      setArtStatus(art.status);
      setArtSeoTitle(art.seoTitle);
      setArtSeoDesc(art.seoDesc);
    } else {
      setEditingArticle(null);
      setArtTitle('');
      setArtCategory('AI');
      setArtSummary('');
      setArtContent('');
      setArtTags('');
      setArtCoverImage('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80');
      setArtReadTime(5);
      setArtKeyTakeaways('');
      setArtTimeToImplement('1 Week');
      setArtRoiEstimation('');
      setArtStatus('Published');
      setArtSeoTitle('');
      setArtSeoDesc('');
    }
    setIsArticleModalOpen(true);
  };

  const handleArticleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = artTags.split(',').map(t => t.trim()).filter(t => t);
    const takeawaysArray = artKeyTakeaways.split('\n').map(t => t.trim()).filter(t => t);
    
    const slug = artTitle.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const articlePayload = {
      title: artTitle,
      slug,
      summary: artSummary,
      content: artContent,
      category: artCategory,
      tags: tagsArray,
      featured: editingArticle ? editingArticle.featured : false,
      coverImage: artCoverImage,
      readTime: artReadTime,
      author: editingArticle ? editingArticle.author : { name: 'Sahil Dahiya', role: 'Principal Tech Director', avatar: 'SD' },
      publishDate: editingArticle ? editingArticle.publishDate : new Date().toISOString().split('T')[0],
      seoTitle: artSeoTitle || artTitle,
      seoDesc: artSeoDesc || artSummary,
      keyTakeaways: takeawaysArray,
      timeToImplement: artTimeToImplement,
      roiEstimation: artRoiEstimation,
      status: artStatus,
    };

    if (editingArticle) {
      updateArticle(editingArticle.id, articlePayload);
    } else {
      addArticle(articlePayload);
    }

    setIsArticleModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-ds-white">
            Knowledge Hub CMS
          </h1>
          <p className="text-ds-silver text-sm mt-1">
            Orchestrate articles, downloadable assets, newsletter subscribers, and leverage real-time server-side Gemini intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => resetBlog()}
            className="px-4 py-2 text-xs font-mono border border-white/10 hover:border-white/20 hover:bg-white/5 text-ds-silver hover:text-ds-white rounded-xl transition-all"
          >
            Reset Master Seeds
          </button>
          
          <button
            onClick={() => openArticleModal()}
            className="px-5 py-2.5 rounded-xl bg-ds-white text-ds-black hover:opacity-90 font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-opacity"
          >
            Create Insight <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-ds-graphite/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider">Total Article Reads</div>
            <div className="text-3xl font-mono font-bold mt-2 text-ds-white">{totalViews}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ds-blue/10 flex items-center justify-center text-ds-blue">
            <Eye size={22} />
          </div>
        </div>

        <div className="bg-ds-graphite/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider">Total Article Likes</div>
            <div className="text-3xl font-mono font-bold mt-2 text-ds-white">{totalLikes}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ds-blue/10 flex items-center justify-center text-ds-blue">
            <ThumbsUp size={22} />
          </div>
        </div>

        <div className="bg-ds-graphite/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider">Saves &amp; Bookmarks</div>
            <div className="text-3xl font-mono font-bold mt-2 text-ds-white">{totalBookmarks}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ds-blue/10 flex items-center justify-center text-ds-blue">
            <Bookmark size={22} />
          </div>
        </div>

        <div className="bg-ds-graphite/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider">Asset Downloads</div>
            <div className="text-3xl font-mono font-bold mt-2 text-ds-white">{totalDownloads}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ds-blue/10 flex items-center justify-center text-ds-blue">
            <Download size={22} />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side Toolbar & Tables, Right Side Gemini Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Content Management Panel */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sub Navigation */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                  activeTab === 'articles' 
                    ? 'bg-white/5 border border-white/10 text-ds-white' 
                    : 'text-ds-silver hover:text-ds-white'
                }`}
              >
                Articles ({articles.length})
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                  activeTab === 'resources' 
                    ? 'bg-white/5 border border-white/10 text-ds-white' 
                    : 'text-ds-silver hover:text-ds-white'
                }`}
              >
                Blueprints ({resources.length})
              </button>
              <button
                onClick={() => setActiveTab('subscribers')}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                  activeTab === 'subscribers' 
                    ? 'bg-white/5 border border-white/10 text-ds-white' 
                    : 'text-ds-silver hover:text-ds-white'
                }`}
              >
                Subscribers ({newsletters.length})
              </button>
            </div>

            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ds-smoke" />
              <input
                type="text"
                placeholder="Filter current view..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ds-black border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs text-ds-white placeholder:text-ds-smoke focus:outline-none focus:border-ds-blue/40"
              />
            </div>
          </div>

          {/* ACTIVE TAB: ARTICLES */}
          {activeTab === 'articles' && (
            <div className="bg-ds-graphite/20 border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-ds-black/30 font-mono text-[10px] uppercase text-ds-smoke tracking-widest">
                    <th className="p-4">Insight Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Engagement</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredArticles.map(art => (
                    <tr key={art.id} className="hover:bg-white/20 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-ds-white leading-tight">{art.title}</div>
                        <div className="text-xs text-ds-smoke mt-1 font-mono">{art.publishDate}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-ds-blue/10 border border-ds-blue/20 rounded text-ds-blue">
                          {art.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 text-xs font-mono text-ds-silver">
                          <span className="flex items-center gap-1"><Eye size={12} /> {art.views}</span>
                          <span className="flex items-center gap-1"><ThumbsUp size={12} /> {art.likes}</span>
                          <span className="flex items-center gap-1"><Bookmark size={12} /> {art.bookmarks}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-mono uppercase ${
                          art.status === 'Published' ? 'text-emerald-400' : 'text-ds-smoke'
                        }`}>
                          ● {art.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openArticleModal(art)}
                            className="p-1.5 rounded bg-white/5 border border-white/10 text-ds-silver hover:text-ds-white hover:border-white/20 transition-colors"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => deleteArticle(art.id)}
                            className="p-1.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredArticles.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-ds-smoke font-mono text-xs">
                        No articles match search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ACTIVE TAB: RESOURCES */}
          {activeTab === 'resources' && (
            <div className="bg-ds-graphite/20 border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-ds-black/30 font-mono text-[10px] uppercase text-ds-smoke tracking-widest">
                    <th className="p-4">Blueprint Title</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">File Size</th>
                    <th className="p-4">Downloads</th>
                    <th className="p-4 text-right">Gate Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredResources.map(res => (
                    <tr key={res.id} className="hover:bg-white/20 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-ds-white leading-tight">{res.title}</div>
                        <div className="text-xs text-ds-smoke mt-1">{res.description.slice(0, 50)}...</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-white/5 border border-white/10 rounded text-ds-silver">
                          {res.type}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs text-ds-silver">{res.fileSize}</td>
                      <td className="p-4 font-mono text-xs text-ds-white">{res.downloadCount}</td>
                      <td className="p-4 text-right">
                        <span className={`text-[10px] font-mono uppercase ${
                          res.gated ? 'text-ds-blue' : 'text-emerald-400'
                        }`}>
                          {res.gated ? '🔒 Gated' : '🔓 Public'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredResources.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-ds-smoke font-mono text-xs">
                        No downloadable blueprints found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ACTIVE TAB: SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="bg-ds-graphite/20 border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-4 bg-ds-black/30 border-b border-white/5 flex justify-between items-center">
                <span className="text-xs font-mono text-ds-silver">B2B Newsletter Contacts List</span>
                <span className="text-[10px] font-mono text-ds-smoke uppercase">Compliance Validated</span>
              </div>
              <ul className="divide-y divide-white/5 max-h-96 overflow-y-auto">
                {filteredSubscribers.map((email, idx) => (
                  <li key={idx} className="p-4 flex items-center justify-between text-sm hover:bg-white/5 transition-colors">
                    <span className="font-mono text-ds-white">{email}</span>
                    <span className="text-[10px] font-mono text-emerald-400">● Active</span>
                  </li>
                ))}
                {filteredSubscribers.length === 0 && (
                  <li className="p-8 text-center text-ds-smoke font-mono text-xs">
                    No subscribers found in current directory.
                  </li>
                )}
              </ul>
            </div>
          )}

        </div>

        {/* Gemini Server-Side AI Workspace Sidebar */}
        <div className="lg:col-span-4 bg-ds-graphite/20 border border-white/5 p-6 rounded-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ds-blue/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-2">
            <Sparkles className="text-ds-blue" size={18} />
            <h3 className="font-display text-sm font-semibold text-ds-white uppercase tracking-widest">
              AI Content Assistant
            </h3>
          </div>

          <p className="text-ds-silver text-xs font-light leading-relaxed">
            Coaches and assists administrators with outline generating, headline optimization, keywords auditing, and key takeaway generation using Gemini 3.5.
          </p>

          <div className="space-y-4">
            
            {/* Action Selectors */}
            <div>
              <label className="block text-[10px] font-mono text-ds-smoke uppercase mb-2">Select Assistance Node</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAiOption('outline')}
                  className={`py-2 px-3 text-left text-xs font-mono rounded-lg border transition-all ${
                    aiOption === 'outline' 
                      ? 'bg-ds-blue/15 border-ds-blue text-ds-blue' 
                      : 'border-white/5 hover:border-white/10 text-ds-silver'
                  }`}
                >
                  Generate Outline
                </button>
                <button
                  type="button"
                  onClick={() => setAiOption('headline')}
                  className={`py-2 px-3 text-left text-xs font-mono rounded-lg border transition-all ${
                    aiOption === 'headline' 
                      ? 'bg-ds-blue/15 border-ds-blue text-ds-blue' 
                      : 'border-white/5 hover:border-white/10 text-ds-silver'
                  }`}
                >
                  Catchy Headlines
                </button>
                <button
                  type="button"
                  onClick={() => setAiOption('meta')}
                  className={`py-2 px-3 text-left text-xs font-mono rounded-lg border transition-all ${
                    aiOption === 'meta' 
                      ? 'bg-ds-blue/15 border-ds-blue text-ds-blue' 
                      : 'border-white/5 hover:border-white/10 text-ds-silver'
                  }`}
                >
                  SEO Meta
                </button>
                <button
                  type="button"
                  onClick={() => setAiOption('key_takeaways')}
                  className={`py-2 px-3 text-left text-xs font-mono rounded-lg border transition-all ${
                    aiOption === 'key_takeaways' 
                      ? 'bg-ds-blue/15 border-ds-blue text-ds-blue' 
                      : 'border-white/5 hover:border-white/10 text-ds-silver'
                  }`}
                >
                  Takeaway Bullet
                </button>
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-[10px] font-mono text-ds-smoke uppercase mb-2">Topic or Article Summary</label>
              <textarea
                placeholder="Provide a draft title, target topic description, or rough summary..."
                rows={4}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full bg-ds-black border border-white/10 rounded-xl p-3 text-xs text-ds-white focus:outline-none focus:border-ds-blue/40 placeholder:text-ds-smoke resize-none"
              />
            </div>

            <button
              onClick={handleAiGeneration}
              disabled={aiLoading}
              className="w-full bg-ds-white text-ds-black hover:opacity-90 py-3 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-opacity flex items-center justify-center gap-2"
            >
              {aiLoading ? 'Processing Query...' : 'Engage Gemini Assistant'} <Sparkles size={12} />
            </button>

            {/* Error view */}
            {aiError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-400 font-mono">
                <AlertCircle size={14} className="shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {/* AI Assistant Output View */}
            {aiResponse && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-ds-smoke uppercase">Assistant Output</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiResponse);
                      alert('Assistant output copied!');
                    }}
                    className="text-[10px] font-mono text-ds-silver hover:text-ds-white flex items-center gap-1"
                  >
                    <Copy size={11} /> Copy
                  </button>
                </div>

                <div className="bg-ds-black/50 p-4 border border-white/5 rounded-xl max-h-72 overflow-y-auto">
                  <pre className="text-xs font-mono text-ds-silver leading-relaxed whitespace-pre-wrap select-all">
                    {aiResponse}
                  </pre>
                </div>

                {isArticleModalOpen && (
                  <button
                    onClick={applyAiOutputToEditor}
                    className="w-full bg-ds-blue text-ds-white hover:bg-ds-blue/80 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Apply to Active Editor Form
                  </button>
                )}
              </motion.div>
            )}

          </div>

        </div>

      </div>

      {/* RICH ARTICLE CRU MODAL EDITOR */}
      <AnimatePresence>
        {isArticleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ds-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-ds-graphite border border-white/10 rounded-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsArticleModalOpen(false)}
                className="absolute top-5 right-5 text-ds-smoke hover:text-ds-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="p-6 border-b border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-ds-blue uppercase tracking-widest bg-ds-blue/10 border border-ds-blue/20 px-3 py-1 rounded-full mb-2">
                  <FileText size={12} /> Master Editor
                </div>
                <h3 className="font-display text-2xl font-bold">
                  {editingArticle ? 'Configure Case Insight' : 'Publish New Content Insight'}
                </h3>
              </div>

              {/* Form Content body (Scrollable) */}
              <form onSubmit={handleArticleSave} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* Core Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Article Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Architecting Scalable AI Micro-agent Clusters" 
                      value={artTitle}
                      onChange={(e) => setArtTitle(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/40 placeholder:text-ds-smoke"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Channel Category</label>
                    <select
                      value={artCategory}
                      onChange={(e: any) => setArtCategory(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3.5 text-sm text-ds-white focus:outline-none focus:border-ds-blue/40"
                    >
                      <option value="AI">AI</option>
                      <option value="Web Dev">Web Dev</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Data">Data</option>
                      <option value="EdTech">EdTech</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                </div>

                {/* Sub Metadata Summary */}
                <div>
                  <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Insight Brief Summary</label>
                  <input 
                    type="text" 
                    placeholder="Short description for cards & search queries..." 
                    value={artSummary}
                    onChange={(e) => setArtSummary(e.target.value)}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/40 placeholder:text-ds-smoke"
                    required
                  />
                </div>

                {/* Main Content Area (HTML/Markdown support) */}
                <div>
                  <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Article Content Body (HTML supported)</label>
                  <textarea 
                    placeholder="Write or paste your master content. HTML tags such as <h2>, <p>, <ul>, and <code> can be parsed easily." 
                    rows={10}
                    value={artContent}
                    onChange={(e) => setArtContent(e.target.value)}
                    className="w-full bg-ds-black border border-white/10 rounded-xl p-4 text-sm text-ds-white font-mono focus:outline-none focus:border-ds-blue/40"
                    required
                  />
                  <p className="text-[10px] font-mono text-ds-smoke mt-2 uppercase">💡 TIP: Utilize the AI Content Assistant on the sidebar to compile outlines or content blocks.</p>
                </div>

                {/* Metadata details, image, tags, read time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={artCoverImage}
                      onChange={(e) => setArtCoverImage(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white font-mono focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Tags (comma-separated)</label>
                    <input 
                      type="text" 
                      placeholder="AI, CRM, Automation" 
                      value={artTags}
                      onChange={(e) => setArtTags(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white focus:outline-none focus:border-ds-blue/40 placeholder:text-ds-smoke"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Est. Read Time (Minutes)</label>
                    <input 
                      type="number" 
                      value={artReadTime}
                      onChange={(e) => setArtReadTime(parseInt(e.target.value) || 5)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white font-mono focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>
                </div>

                {/* B2B Estimates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Time To Deploy/Implement</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 1-2 Weeks" 
                      value={artTimeToImplement}
                      onChange={(e) => setArtTimeToImplement(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Expected Business ROI (Impact)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Saves 15 engineering hours/wk" 
                      value={artRoiEstimation}
                      onChange={(e) => setArtRoiEstimation(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>
                </div>

                {/* Key Takeaways & SEO settings */}
                <div className="pt-4 border-t border-white/5 space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">Key Takeaways (one per line)</label>
                    <textarea 
                      placeholder="Takeaway bullet point 1&#10;Takeaway bullet point 2..." 
                      rows={3}
                      value={artKeyTakeaways}
                      onChange={(e) => setArtKeyTakeaways(e.target.value)}
                      className="w-full bg-ds-black border border-white/10 rounded-xl p-3 text-xs text-ds-white focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">SEO Status Mode</label>
                      <select
                        value={artStatus}
                        onChange={(e: any) => setArtStatus(e.target.value)}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white focus:outline-none"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">SEO Meta Title Override</label>
                      <input 
                        type="text" 
                        placeholder="Search engine title..." 
                        value={artSeoTitle}
                        onChange={(e) => setArtSeoTitle(e.target.value)}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-mono text-ds-smoke uppercase mb-2">SEO Meta Description Override</label>
                      <input 
                        type="text" 
                        placeholder="Search engine description..." 
                        value={artSeoDesc}
                        onChange={(e) => setArtSeoDesc(e.target.value)}
                        className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-xs text-ds-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions Footer inside modal */}
                <div className="border-t border-white/5 pt-6 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsArticleModalOpen(false)}
                    className="px-5 py-3 rounded-xl border border-white/10 text-ds-silver hover:text-ds-white hover:bg-white/5 font-mono text-xs uppercase tracking-widest transition-colors"
                  >
                    Cancel Edit
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-ds-white text-ds-black hover:opacity-90 font-mono text-xs uppercase tracking-widest transition-opacity flex items-center gap-1.5"
                  >
                    Save &amp; Commit <Save size={14} />
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
