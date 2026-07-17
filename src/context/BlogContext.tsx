import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Comment {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  date: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Supports Markdown/HTML
  category: 'AI' | 'Web Dev' | 'Marketing' | 'Data' | 'EdTech' | 'Business';
  tags: string[];
  featured: boolean;
  coverImage: string;
  videoUrl?: string;
  readTime: number; // in minutes
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  views: number;
  likes: number;
  bookmarks: number;
  seoTitle: string;
  seoDesc: string;
  comments: Comment[];
  keyTakeaways: string[];
  timeToImplement: string;
  roiEstimation: string;
  status: 'Published' | 'Draft' | 'Scheduled';
}

export interface DownloadableResource {
  id: string;
  title: string;
  type: 'Guide' | 'Whitepaper' | 'Prompt Sheet' | 'Template';
  description: string;
  thumbnail: string;
  downloadCount: number;
  fileSize: string;
  gated: boolean;
  fileContent?: string; // Mock content or template code for direct copying/use
}

const defaultArticles: Article[] = [
  {
    id: 'A-1',
    slug: 'sovereignty-agentic-workflows-crm',
    title: 'The Sovereignty of Agentic Workflows in Enterprise CRM Systems',
    summary: 'How autonomous multi-agent pipelines are replacing traditional chatbots to orchestrate structured validation, document parsing, and dynamic lead routing.',
    category: 'AI',
    tags: ['AI Agent', 'CRM Integration', 'Enterprise System', 'Workflow Automation'],
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    readTime: 6,
    author: {
      name: 'Sahil Dahiya',
      role: 'Principal Technology Director',
      avatar: 'SD'
    },
    publishDate: '2026-07-10',
    views: 412,
    likes: 84,
    bookmarks: 36,
    seoTitle: 'Enterprise Agentic CRM Pipelines & AI Workflows | Dahiya Solution',
    seoDesc: 'Deep technical analysis of multi-agent LLM systems for corporate CRM integrations, document classifications, and automated ledger updates.',
    comments: [
      {
        id: 'C-1',
        authorName: 'Marcus Reynolds',
        authorEmail: 'marcus@pinnacle.com',
        content: 'This aligns perfectly with our recent migration away from legacy chat widgets. Multi-agent validation routes are indeed far more resilient.',
        date: '2026-07-11'
      }
    ],
    keyTakeaways: [
      'Multi-agent systems split complex tasks into single-responsibility nodes.',
      'JSON-Schema enforcement bridges natural language with legacy SQL schemas.',
      'Audit loops and telemetry monitors are critical to prevent infinite routing traps.'
    ],
    timeToImplement: '3-4 Weeks',
    roiEstimation: 'Saves 35-45 engineering hours/week per automated data queue',
    status: 'Published',
    content: `
<h2>The Shift from Simple Chatbots to Autonomous Agentic Pipelines</h2>
<p>For years, enterprises treated AI as a client-side greeting mechanism. Simple chat widgets greeted users with static decision trees, routing visitors based on hardcoded filters. But modern system architecture demands a complete paradigm shift: **The Autonomous Agentic Workflow**.</p>

<p>Rather than relying on a single, oversized model to interpret, validate, and execute operations, modern systems orchestrate networks of specialized **autonomous agent pods** connected to secure API routers. In a typical CRM implementation, an incoming client email triggers a sequence of distinct agent actions:</p>

<ul>
  <li><strong>The Intent Extraction Agent:</strong> Parses the raw text payload to determine core user needs (e.g., pricing, technical inquiry, legal review).</li>
  <li><strong>The Schema Validation Agent:</strong> Extracts relevant entities (company names, budget thresholds, technical variables) and matches them against rigid <code>JSON Schema</code> specifications.</li>
  <li><strong>The Heuristic Router Agent:</strong> References historical client records and dispatches validated alerts directly to appropriate CRM channels or live sales staff.</li>
</ul>

<h3>Resilient Database Bridging with JSON-Schema</h3>
<p>The primary friction point in enterprise AI integrations is the interface between unstructured LLM outputs and highly structured database backends. Deferring validation to database engines causes system crashes on unexpected model outputs.</p>

<pre><code>// Example of an isolated validation handler in Express
import { Validator } from 'jsonschema';

const leadSchema = {
  "type": "object",
  "properties": {
    "companyName": { "type": "string" },
    "estimatedBudget": { "type": "number" },
    "primaryNeed": { "type": "string" }
  },
  "required": ["companyName", "primaryNeed"]
};
</code></pre>

<p>By enforcing intermediate Schema checks on the server, we isolate the database layer. If a model output fails structural compliance, the router triggers a sub-agent loop to self-correct the payload before execution, preserving total database integrity.</p>
    `
  },
  {
    id: 'A-2',
    slug: 'optimizing-core-web-vitals-react-spas',
    title: 'Optimizing Core Web Vitals with Next-Gen React SPAs',
    summary: 'A definitive guide to pre-rendering, lazy asset bundles, dynamic CSS variables, and maximizing mobile visual rendering scores.',
    category: 'Web Dev',
    tags: ['React', 'Core Web Vitals', 'Performance', 'SEO Engine'],
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    readTime: 5,
    author: {
      name: 'Aditya Sen',
      role: 'Lead UI Architect',
      avatar: 'AS'
    },
    publishDate: '2026-07-08',
    views: 295,
    likes: 67,
    bookmarks: 29,
    seoTitle: 'Core Web Vitals React SEO Optimization Guide | Dahiya Solution',
    seoDesc: 'Comprehensive guide to optimizing Cumulative Layout Shift, First Input Delay, and Largest Contentful Paint for React Single Page Applications.',
    comments: [],
    keyTakeaways: [
      'Code-splitting with React.lazy protects the initial loading payload.',
      'Explicit image dimension ratios entirely eliminate Cumulative Layout Shift (CLS).',
      'Deploying assets via regional edge CDNs reduces Time to First Byte (TTFB).'
    ],
    timeToImplement: '1 Week',
    roiEstimation: 'Avg. Lighthouse Performance Index score increases from 74 to 98+',
    status: 'Published',
    content: `
<h2>The SEO Impact of UI Layout Stability</h2>
<p>Search engines rank digital products based on user-centric performance metrics. A beautiful design is irrelevant if the layout jumps or flickers during asset compilation. The most critical benchmark is **Cumulative Layout Shift (CLS)**, which measures visual stability during the render cycle.</p>

<p>When React mounts dynamic components without predefined placeholders, content blocks are shoved downward as fonts, images, and embeds resolve. This is highly frustrating for visitors and heavily penalized by Google's crawler.</p>

<h3>Eliminating Shift with Explicit Sizing</h3>
<p>To eliminate CLS, every rich media asset, carousel, and grid segment must occupy its final physical layout boundaries before rendering. Avoid fluid dimensions like <code>width: auto</code> on large containers without defined aspect ratios.</p>

<pre><code>// Correct responsive media wrapper setup
&lt;div className="w-full aspect-[16/9] relative bg-ds-graphite/40 overflow-hidden"&gt;
  &lt;img 
    src={imageUrl} 
    alt="Corporate preview" 
    className="absolute inset-0 w-full h-full object-cover"
    referrerPolicy="no-referrer"
  /&gt;
&lt;/div&gt;
</code></pre>

<p>By defining a responsive aspect ratio on the parent, the layout allocation is resolved immediately at the HTML layout phase, allowing text and menus to settle in correct positions without jumping once the source image arrives.</p>
    `
  },
  {
    id: 'A-3',
    slug: 'modern-lead-generation-intent-scoring',
    title: 'Modern Lead Generation: Orchestrating Intent Scoring and Edge Triggers',
    summary: 'Moving beyond static email capture forms. Learn how to score visitor intent organically through scroll milestones, resource interactions, and dynamic indicators.',
    category: 'Marketing',
    tags: ['Lead Generation', 'Intent Scoring', 'Marketing Automation', 'User Journey'],
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    readTime: 7,
    author: {
      name: 'Sahil Dahiya',
      role: 'Principal Technology Director',
      avatar: 'SD'
    },
    publishDate: '2026-07-02',
    views: 318,
    likes: 91,
    bookmarks: 42,
    seoTitle: 'Dynamic Intent Scoring & Modern Lead Gen | Dahiya Solution',
    seoDesc: 'How to build user behavioral tracking modules on front-end sites to score and route high-fidelity leads to sales pipelines automatically.',
    comments: [],
    keyTakeaways: [
      'Gating specialized resources converts three times more traffic than standard Contact buttons.',
      'User interaction density (scroll ratio, reading time) predicts actual client intent.',
      'Immediate API dispatch ensures sales followups occur while prospect engagement is highest.'
    ],
    timeToImplement: '2 Weeks',
    roiEstimation: '+140% Qualified B2B Client conversions from standard organic traffic',
    status: 'Published',
    content: `
<h2>The Bankruptcy of the Basic "Contact Us" Form</h2>
<p>A static "Contact Us" form is a passive lead trap. It assumes visitors are prepared to surrender their email and pitch their own problems with no prior validation. In premium enterprise segments, high-value prospects demand an exchange of immediate value.</p>

<p>Instead of hoping for voluntary submissions, progressive platforms employ **Intent-Scoring Models** that trace a prospect's depth of engagement. By tracking reading speed, scroll depths, and micro-interactions on deep whitepapers, the application compiles a behavioral score in real-time:</p>

<ul>
  <li><strong>Interaction Score 10-20:</strong> Fast scroll, short duration, superficial page bounce (Low-intent visitor).</li>
  <li><strong>Interaction Score 50+:</strong> Reading speed matches natural thresholds, scroll exceeds 70%, bookmarked key insights.</li>
  <li><strong>Trigger Threshold:</strong> Upon reaching Score 60, the UI dynamically serves a targeted download prompt—such as a specific integration template—tailored to the article category.</li>
</ul>

<h3>Implementing Client-Side Intent Listeners</h3>
<p>We can establish lightweight, non-intrusive scroll trackers to adjust user intent scores locally and flag high-engagement readers:</p>

<pre><code>// Intent tracking listener skeleton
useEffect(() => {
  let hasScrolledHalfway = false;
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 50 && !hasScrolledHalfway) {
      hasScrolledHalfway = true;
      // Increment user session score or trigger contextual sidebar widget
      console.log('High engagement threshold reached');
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
</code></pre>
    `
  }
];

const defaultResources: DownloadableResource[] = [
  {
    id: 'R-1',
    title: 'Enterprise AI Implementation Playbook',
    type: 'Guide',
    description: 'A comprehensive structural playbook detailing how to audit corporate operational inefficiencies, map AI feasibility boundaries, and plan secure multi-agent pipelines.',
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80',
    downloadCount: 142,
    fileSize: '4.2 MB',
    gated: true,
    fileContent: `
# Dahiya Solution AI Implementation Playbook
===================================================
A Strategic Framework for B2B Enterprise Automation

1. FEASIBILITY ANALYSIS MATRIX
---------------------------------------------------
- Evaluate process variance (Is it predictable?)
- Evaluate system integration endpoints (Are APIs documented?)
- Map data isolation boundaries (Where are private keys stored?)

2. MULTI-AGENT ARCHITECTURE PATTERNS
---------------------------------------------------
- Define specialized micro-agent clusters
- Establish validation schemas at intermediate layers
- Set absolute timeout thresholds to terminate looping behaviors
    `
  },
  {
    id: 'R-2',
    title: 'SEO Core Web Vitals Checklist',
    type: 'Template',
    description: 'Production-ready code snippets and HTML configuration rules to eliminate layout shifts, optimize preloading, and configure web cache rules.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
    downloadCount: 284,
    fileSize: '128 KB',
    gated: false,
    fileContent: `
<!-- Dahiya SEO Optimization Header Snippet -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Critical Render Paths -->
<style>
  body { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }
  .hero-container { min-height: 80vh; aspect-ratio: 16/9; }
</style>
    `
  },
  {
    id: 'R-3',
    title: 'CRM Dynamic Integrations Middleware',
    type: 'Template',
    description: 'An Express.js TypeScript middleware template parsing raw webhook payloads and validating entity formatting before dispatch.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    downloadCount: 198,
    fileSize: '24 KB',
    gated: true,
    fileContent: `
// Express Webhook Proxy & Sanitizer
import express from 'express';
import { Validator } from 'jsonschema';

export const validateIncomingWebhook = (schema: object) => {
  const validator = new Validator();
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = validator.validate(req.body, schema);
    if (!result.valid) {
      return res.status(400).json({ error: "Invalid webhook format", details: result.errors });
    }
    next();
  };
};
    `
  }
];

interface BlogContextType {
  articles: Article[];
  resources: DownloadableResource[];
  newsletters: string[];
  bookmarkedIds: string[];
  addArticle: (a: Omit<Article, 'id' | 'views' | 'likes' | 'bookmarks' | 'comments'>) => void;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  incrementViews: (id: string) => void;
  likeArticle: (id: string) => void;
  toggleBookmark: (id: string) => void;
  addComment: (articleId: string, authorName: string, authorEmail: string, content: string) => void;
  subscribeNewsletter: (email: string) => boolean;
  downloadResource: (resourceId: string, email?: string) => void;
  resetBlog: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('ds_blog_articles');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load blog articles', e);
    }
    return defaultArticles;
  });

  const [resources, setResources] = useState<DownloadableResource[]>(() => {
    try {
      const saved = localStorage.getItem('ds_blog_resources');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load downloadable resources', e);
    }
    return defaultResources;
  });

  const [newsletters, setNewsletters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ds_blog_newsletters');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load newsletters', e);
    }
    return [];
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ds_blog_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
    return [];
  });

  const saveArticles = (current: Article[]) => {
    setArticles(current);
    try {
      localStorage.setItem('ds_blog_articles', JSON.stringify(current));
    } catch (e) {
      console.error('Failed to save blog articles', e);
    }
  };

  const saveResources = (current: DownloadableResource[]) => {
    setResources(current);
    try {
      localStorage.setItem('ds_blog_resources', JSON.stringify(current));
    } catch (e) {
      console.error('Failed to save downloadable resources', e);
    }
  };

  const addArticle = (a: Omit<Article, 'id' | 'views' | 'likes' | 'bookmarks' | 'comments'>) => {
    const newId = `A-${Date.now()}`;
    const newArt: Article = {
      ...a,
      id: newId,
      views: 0,
      likes: 0,
      bookmarks: 0,
      comments: []
    };
    saveArticles([...articles, newArt]);
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    saveArticles(
      articles.map((art) => {
        if (art.id === id) {
          return { ...art, ...updated };
        }
        return art;
      })
    );
  };

  const deleteArticle = (id: string) => {
    saveArticles(articles.filter((art) => art.id !== id));
  };

  const incrementViews = (id: string) => {
    saveArticles(
      articles.map((art) => (art.id === id ? { ...art, views: art.views + 1 } : art))
    );
  };

  const likeArticle = (id: string) => {
    saveArticles(
      articles.map((art) => (art.id === id ? { ...art, likes: art.likes + 1 } : art))
    );
  };

  const toggleBookmark = (id: string) => {
    let updatedBookmarks: string[];
    const isBookmarked = bookmarkedIds.includes(id);
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedIds.filter((bId) => bId !== id);
    } else {
      updatedBookmarks = [...bookmarkedIds, id];
    }
    
    setBookmarkedIds(updatedBookmarks);
    try {
      localStorage.setItem('ds_blog_bookmarks', JSON.stringify(updatedBookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }

    // Also update count in article
    saveArticles(
      articles.map((art) => {
        if (art.id === id) {
          return {
            ...art,
            bookmarks: isBookmarked ? Math.max(0, art.bookmarks - 1) : art.bookmarks + 1
          };
        }
        return art;
      })
    );
  };

  const addComment = (articleId: string, authorName: string, authorEmail: string, content: string) => {
    const newComment: Comment = {
      id: `C-${Date.now()}`,
      authorName,
      authorEmail,
      content,
      date: new Date().toISOString().split('T')[0]
    };

    saveArticles(
      articles.map((art) => {
        if (art.id === articleId) {
          return { ...art, comments: [...art.comments, newComment] };
        }
        return art;
      })
    );
  };

  const subscribeNewsletter = (email: string) => {
    if (!email || newsletters.includes(email)) return false;
    const updated = [...newsletters, email];
    setNewsletters(updated);
    try {
      localStorage.setItem('ds_blog_newsletters', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save newsletters', e);
    }
    return true;
  };

  const downloadResource = (resourceId: string, email?: string) => {
    if (email) {
      subscribeNewsletter(email);
    }
    saveResources(
      resources.map((res) => (res.id === resourceId ? { ...res, downloadCount: res.downloadCount + 1 } : res))
    );
  };

  const resetBlog = () => {
    saveArticles(defaultArticles);
    saveResources(defaultResources);
    setNewsletters([]);
    setBookmarkedIds([]);
    try {
      localStorage.removeItem('ds_blog_newsletters');
      localStorage.removeItem('ds_blog_bookmarks');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BlogContext.Provider value={{
      articles,
      resources,
      newsletters,
      bookmarkedIds,
      addArticle,
      updateArticle,
      deleteArticle,
      incrementViews,
      likeArticle,
      toggleBookmark,
      addComment,
      subscribeNewsletter,
      downloadResource,
      resetBlog
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
