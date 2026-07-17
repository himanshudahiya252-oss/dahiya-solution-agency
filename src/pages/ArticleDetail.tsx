import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Bookmark, 
  Share2, 
  ThumbsUp, 
  CheckCircle2, 
  Calculator, 
  ArrowRight, 
  Sparkles,
  MessageSquare,
  Send,
  Linkedin,
  Twitter,
  Copy
} from 'lucide-react';
import { useBlog, Article } from '../context/BlogContext';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { 
    articles, 
    bookmarkedIds, 
    toggleBookmark, 
    likeArticle, 
    addComment, 
    incrementViews 
  } = useBlog();

  const article = articles.find(art => art.slug === slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Comments form
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // ROI Calculator State
  const [weeklyTasks, setWeeklyTasks] = useState(150);
  const [hoursPerTask, setHoursPerTask] = useState(1.5);
  const [hourlyRate, setHourlyRate] = useState(45);

  // Copy share feedback
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (!article) {
      // Redirect to resources page if not found
      navigate('/resources');
      return;
    }
    // Increment views once on load
    incrementViews(article.id);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const element = contentRef.current;
      const totalHeight = element.clientHeight - window.innerHeight + 400;
      const windowScrollTop = window.scrollY;
      
      if (windowScrollTop === 0) {
        setScrollProgress(0);
        return;
      }
      
      const progress = (windowScrollTop / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) return null;

  // Calculate ROI estimations
  const currentWeeklyHours = weeklyTasks * hoursPerTask;
  const currentWeeklyCost = currentWeeklyHours * hourlyRate;
  
  // Dahiya Solution agentic pipelines typically save ~85% of execution time
  const agenticWeeklyHours = currentWeeklyHours * 0.15;
  const weeklyHoursSaved = currentWeeklyHours - agenticWeeklyHours;
  const annualCostSaved = weeklyHoursSaved * hourlyRate * 52;
  const productivityMultiplier = 6.6; // 85% reduction implies ~6.6x output volume capacity

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentContent) return;
    
    addComment(article.id, commentName, commentEmail, commentContent);
    setCommentSubmitted(true);
    setCommentContent('');
    setTimeout(() => {
      setCommentSubmitted(false);
    }, 4000);
  };

  const triggerLike = () => {
    likeArticle(article.id);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find related articles
  const relatedArticles = articles
    .filter(art => art.id !== article.id && art.status === 'Published')
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-ds-black text-ds-white relative selection:bg-ds-blue/30 pb-24">
      
      {/* Floating Reading Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 h-1 bg-white/5 z-45">
        <motion.div 
          className="h-full bg-ds-blue"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Cinematic Cover Background blur */}
      <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 blur-3xl scale-110"
          style={{ backgroundImage: `url(${article.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ds-black to-ds-black" />
      </div>

      <div className="pt-32 px-6 max-w-6xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/resources"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ds-silver hover:text-ds-white transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Resources
        </Link>

        {/* Article Title Header */}
        <div className="max-w-4xl mb-12">
          <span className="px-3 py-1 text-xs font-mono tracking-widest uppercase bg-ds-blue/10 border border-ds-blue/20 rounded-md text-ds-blue mb-4 inline-block">
            {article.category}
          </span>
          
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-ds-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-ds-silver text-lg md:text-xl font-light leading-relaxed mb-8">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 border-y border-white/5 py-6">
            
            {/* Author Circle */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-ds-blue/15 border border-ds-blue/20 flex items-center justify-center font-mono text-ds-white text-sm">
                {article.author.avatar}
              </div>
              <div>
                <div className="text-sm font-medium text-ds-white">{article.author.name}</div>
                <div className="text-xs text-ds-smoke">{article.author.role}</div>
              </div>
            </div>

            {/* Article Metrics */}
            <div className="flex items-center gap-6 text-xs font-mono text-ds-silver">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {article.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {article.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <ThumbsUp size={14} /> {article.likes} Likes
              </span>
            </div>

            {/* Sharing & Bookmark Controls */}
            <div className="flex items-center gap-3 relative">
              <button 
                onClick={triggerLike}
                className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-ds-silver hover:text-ds-white transition-all flex items-center gap-2 text-xs font-mono uppercase"
                title="Like Article"
              >
                <ThumbsUp size={14} /> Like
              </button>
              
              <button 
                onClick={() => toggleBookmark(article.id)}
                className={`p-2.5 rounded-full border transition-all ${
                  bookmarkedIds.includes(article.id) 
                    ? 'bg-ds-blue/10 border-ds-blue text-ds-blue' 
                    : 'border-white/10 hover:border-white/30 text-ds-silver hover:text-ds-white'
                }`}
                title="Bookmark Insight"
              >
                <Bookmark size={14} />
              </button>

              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-ds-silver hover:text-ds-white transition-all"
                title="Share"
              >
                <Share2 size={14} />
              </button>

              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 bottom-full mb-3 w-48 bg-ds-graphite/95 border border-white/10 p-2 rounded-xl backdrop-blur-md z-30 shadow-2xl space-y-1"
                  >
                    <button 
                      onClick={copyLink}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono uppercase text-ds-silver hover:text-ds-white hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <Copy size={13} /> {copied ? 'Copied' : 'Copy Link'}
                    </button>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono uppercase text-ds-silver hover:text-ds-white hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <Linkedin size={13} /> LinkedIn
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono uppercase text-ds-silver hover:text-ds-white hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <Twitter size={13} /> Twitter
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Layout Grid: Article content & TOC sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24" ref={contentRef}>
          
          {/* Main Article Content Panel */}
          <div className="lg:col-span-8">
            
            {/* Cover Image container */}
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-ds-graphite/40 mb-10 shadow-lg">
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Custom Interactive Tool: ROI ESTIMATOR (Inserted elegantly before main text starts if category is AI/Business) */}
            {(article.category === 'AI' || article.category === 'Business') && (
              <div className="bg-ds-graphite/30 border border-ds-blue/20 rounded-2xl p-6 md:p-8 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-ds-blue/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-2.5 mb-4">
                  <Calculator className="text-ds-blue" size={20} />
                  <h4 className="font-display text-lg font-medium text-ds-white">
                    Interactive AI Pipeline ROI Estimator
                  </h4>
                  <span className="px-2 py-0.5 text-[8px] font-mono bg-ds-blue/15 border border-ds-blue/20 rounded text-ds-blue uppercase tracking-widest ml-auto">
                    Live Widget
                  </span>
                </div>

                <p className="text-ds-silver text-xs font-light leading-relaxed mb-6">
                  Estimate the custom efficiency, hours reclaimed, and cost reduction your enterprise will secure by integrating a specialized Dahiya Solution agentic router pipeline.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-[10px] font-mono text-ds-smoke uppercase mb-2">Weekly CRM Tasks</label>
                    <input 
                      type="number"
                      value={weeklyTasks}
                      onChange={(e) => setWeeklyTasks(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-ds-black border border-white/10 rounded-lg p-2.5 text-sm font-mono text-ds-white focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-ds-smoke uppercase mb-2">Hours Per Manual Task</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={hoursPerTask}
                      onChange={(e) => setHoursPerTask(Math.max(0.1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-ds-black border border-white/10 rounded-lg p-2.5 text-sm font-mono text-ds-white focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-ds-smoke uppercase mb-2">Internal Staff Hourly Rate ($)</label>
                    <input 
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-ds-black border border-white/10 rounded-lg p-2.5 text-sm font-mono text-ds-white focus:outline-none focus:border-ds-blue/40"
                    />
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-ds-black/60 border border-white/5">
                  <div className="text-center sm:text-left">
                    <div className="text-xs font-mono text-ds-smoke uppercase">Hours Saved / Wk</div>
                    <div className="text-2xl font-mono text-ds-blue font-bold mt-1">
                      {weeklyHoursSaved.toFixed(1)} hrs
                    </div>
                  </div>
                  <div className="text-center sm:text-left border-y sm:border-y-0 sm:border-x border-white/5 py-3 sm:py-0 sm:px-4">
                    <div className="text-xs font-mono text-ds-smoke uppercase">Annual Savings</div>
                    <div className="text-2xl font-mono text-emerald-400 font-bold mt-1">
                      ${annualCostSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-xs font-mono text-ds-smoke uppercase">Output Capacity</div>
                    <div className="text-2xl font-mono text-ds-white font-bold mt-1">
                      {productivityMultiplier}x
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Article Body Text */}
            <div 
              className="article-body-content text-ds-silver font-light leading-relaxed space-y-6 text-base md:text-lg mb-12 border-b border-white/5 pb-10"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-2 mb-16">
              <span className="text-xs font-mono text-ds-smoke uppercase mr-2">Tags:</span>
              {article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-mono border border-white/5 bg-white/5 rounded-full text-ds-silver">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Community Comments section */}
            <section className="mb-16">
              <h3 className="font-display text-2xl font-semibold text-ds-white mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-ds-blue" />
                Community Discussion <span className="text-xs font-mono text-ds-smoke bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">{article.comments.length}</span>
              </h3>

              {/* Form */}
              <div className="bg-ds-graphite/20 border border-white/5 p-6 rounded-2xl mb-8">
                <h4 className="text-sm font-mono text-ds-silver uppercase tracking-wider mb-4">Leave an Editorial Comment</h4>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white placeholder:text-ds-smoke focus:outline-none focus:border-ds-blue/40"
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Your Professional Email" 
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white placeholder:text-ds-smoke focus:outline-none focus:border-ds-blue/40"
                      required
                    />
                  </div>
                  <textarea 
                    placeholder="Provide professional input, feedback, or inquiries..." 
                    rows={4}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white placeholder:text-ds-smoke focus:outline-none focus:border-ds-blue/40 resize-none"
                    required
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono text-ds-smoke uppercase">🔒 Privacy protected. Comments are vetted before posting.</p>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-ds-white text-ds-black hover:opacity-90 transition-opacity font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 shrink-0"
                    >
                      Dispatch Comment <Send size={12} />
                    </button>
                  </div>
                </form>

                <AnimatePresence>
                  {commentSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-emerald-400 text-xs font-mono flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} /> Comment dispatched to moderation queue. Thank you.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Feed */}
              <div className="space-y-6">
                {article.comments.length > 0 ? (
                  article.comments.map(c => (
                    <div key={c.id} className="border-l-2 border-ds-blue/30 pl-5 py-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-ds-white">{c.authorName}</span>
                        <span className="text-[10px] font-mono text-ds-smoke uppercase">{c.date}</span>
                      </div>
                      <p className="text-ds-silver text-sm font-light leading-relaxed">{c.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-ds-smoke text-sm font-mono text-center py-4">
                    No comments yet. Initiate the discussion above.
                  </p>
                )}
              </div>
            </section>

          </div>

          {/* Sidebar widget panel */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Key Takeaways Card */}
            <div className="bg-ds-graphite/20 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ds-blue/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-ds-blue" />
                <h4 className="font-display text-sm font-semibold text-ds-white uppercase tracking-widest">
                  Key Takeaways
                </h4>
              </div>

              <ul className="space-y-4">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-light leading-relaxed text-ds-silver">
                    <CheckCircle2 size={16} className="text-ds-blue shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Implementation Details Info Block */}
            <div className="bg-ds-graphite/20 border border-white/5 rounded-2xl p-6">
              <h4 className="font-display text-xs font-semibold text-ds-white uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Implementation Details
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-mono text-ds-smoke uppercase mb-1">Time to Deploy</div>
                  <div className="text-sm font-medium text-ds-white">{article.timeToImplement}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-ds-smoke uppercase mb-1">Projected Business Impact</div>
                  <div className="text-sm font-medium text-emerald-400">{article.roiEstimation}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-ds-smoke uppercase mb-1">Editorial Author</div>
                  <div className="text-sm font-medium text-ds-white">{article.author.name}</div>
                  <div className="text-xs text-ds-smoke">{article.author.role}</div>
                </div>
              </div>
            </div>

            {/* Related Downloadable Resources (Contextual) */}
            <div className="bg-ds-graphite/20 border border-white/5 rounded-2xl p-6">
              <h4 className="font-display text-xs font-semibold text-ds-white uppercase tracking-widest mb-4">
                Contextual Templates
              </h4>
              <p className="text-ds-silver text-xs font-light leading-relaxed mb-4">
                Ready-to-use codebase templates and structural assets relevant to this technology stack.
              </p>
              <Link 
                to="/resources"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase text-ds-blue hover:text-ds-white transition-colors"
              >
                Access Blueprints Room <ArrowRight size={12} />
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="pt-16 border-t border-white/5">
            <h3 className="font-display text-2xl font-semibold mb-8 text-ds-white">Suggested Related Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map(art => (
                <div key={art.id} className="bg-ds-graphite/10 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-white/10 transition-all">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ds-smoke mb-2 block">{art.category}</span>
                    <h4 className="font-display text-lg font-medium text-ds-white mb-2 group-hover:text-ds-blue transition-colors">
                      <Link to={`/resources/${art.slug}`}>{art.title}</Link>
                    </h4>
                    <p className="text-ds-silver text-xs font-light line-clamp-2 leading-relaxed mb-4">{art.summary}</p>
                  </div>
                  <Link 
                    to={`/resources/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-ds-silver group-hover:text-ds-white transition-colors mt-2"
                  >
                    Load Insight <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
