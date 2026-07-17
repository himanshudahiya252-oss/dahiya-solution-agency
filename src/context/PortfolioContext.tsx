import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'website' | 'app' | 'ai' | 'marketing' | 'creative';
  subCategory: string;
  image: string;
  videoUrl?: string;
  videoDuration?: string;
  websitePreviewUrl?: string;
  mobilePreviewUrl?: string;
  description: string;
  objective: string;
  challenge: string;
  solution: string;
  devProcess: string[];
  techTags: string[];
  beforeState: {
    design: string;
    ux: string;
    structure: string;
  };
  afterState: {
    design: string;
    ux: string;
    structure: string;
  };
  metrics: {
    timelineWeeks: number;
    featuresDelivered: number;
    performanceScore: number;
    uxScore: number;
    customMetricName: string;
    customMetricValue: string;
  };
  clientName?: string;
  clientCompany?: string;
  clientTestimonial?: string;
  clientLogoText?: string;
  clientApprovalStatus: 'approved' | 'draft' | 'pending';
  seoTitle: string;
  seoDescription: string;
  seoStructuredData: string;
  isDraft: boolean;
  isFeatured: boolean;
}

const defaultProjects: PortfolioProject[] = [
  {
    id: 'P-1',
    slug: 'megalith-corporate-ecosystem',
    title: 'Megalith Corporate Ecosystem',
    subtitle: 'Re-engineering corporate presence with multi-region CDN scaling',
    category: 'website',
    subCategory: 'Corporate Websites',
    image: '/src/assets/images/website_development_studio_1784273706424.jpg',
    websitePreviewUrl: 'https://megalith-preview.dahiyasolution.com',
    description: 'We rebuilt Megalith Inc\'s global corporate portal, transforming a legacy web interface into a hyper-performant, responsive experience backed by static generation and real-time localization.',
    objective: 'Unify 14 regional domains into a single blazing-fast enterprise website ecosystem with instant translation and modular page assemblies.',
    challenge: 'Megalith\'s legacy corporate stack suffered from 5.4-second load times, bloated styles, and a rigid, unmanaged content publishing cycle.',
    solution: 'Engineered a React SPA architecture utilizing localized static rendering, advanced image optimization, and global edge caching.',
    devProcess: [
      'Discovery & structural sitemap blueprinting',
      'Fidelity-aligned mockups and custom dark-theme tailwind variables',
      'Modular page layouts assembly with scroll-driven animations',
      'Lighthouse and mobile-responsiveness benchmarking',
      'Dynamic metadata routing for regional localized SEO headers'
    ],
    techTags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloud Edge'],
    beforeState: {
      design: 'Dated corporate layouts, misaligned grids, low-contrast text',
      ux: '5.4s load speed, broken mobile scaling, sluggish menu transitions',
      structure: 'Rigid monolithic site, zero page performance indexes, manual compilation'
    },
    afterState: {
      design: 'Swiss-style minimalist dark aesthetic with subtle edge highlights',
      ux: 'Sub-300ms loading speeds, fluid responsive touch-targets',
      structure: 'Fully optimized automated build, structured SEO parameters, modern routing'
    },
    metrics: {
      timelineWeeks: 4,
      featuresDelivered: 12,
      performanceScore: 99,
      uxScore: 98,
      customMetricName: 'Initial Load Reduction',
      customMetricValue: '-94%'
    },
    clientName: 'Alexander Megalith',
    clientCompany: 'Megalith Group LLC',
    clientTestimonial: 'Dahiya Solution turned our unmanageable corporate site into our most valuable digital asset. The velocity and precision of execution exceeded every benchmark.',
    clientLogoText: 'MEGALITH',
    clientApprovalStatus: 'approved',
    seoTitle: 'Megalith Inc. Global Corporate Ecosystem Rebuild | Dahiya Solution Case Study',
    seoDescription: 'Case study on how Dahiya Solution re-engineered Megalith Group\'s multi-region corporate platform into a modern React-driven static framework.',
    seoStructuredData: '{"@context": "https://schema.org", "@type": "CaseStudy", "name": "Megalith Corp Rebuild"}',
    isDraft: false,
    isFeatured: true
  },
  {
    id: 'P-2',
    slug: 'pinnacle-capital-portfolio',
    title: 'Pinnacle Capital Web Dashboard',
    subtitle: 'Connecting financial assets to real-time analytics hubs',
    category: 'app',
    subCategory: 'Dashboard Systems',
    image: '/src/assets/images/ai_visualization_screens_1784271794578.jpg',
    mobilePreviewUrl: 'https://pinnacle-mobile.dahiyasolution.com',
    description: 'A bespoke customer portal and financial management interface connecting portfolio valuations to live API data aggregates securely.',
    objective: 'Provide pinnacle executives and clients with real-time portfolio visualization, customized alerts, and instantaneous PDF ledger generation.',
    challenge: 'Pinnacle clients relied on stale overnight email attachments and legacy XLS logs with zero interactive tracking or chart analysis.',
    solution: 'Designed and engineered an isolated client-side dashboard with dynamic SVG charting, modular bento grids, and interactive filters.',
    devProcess: [
      'API routing & ledger data stream blueprinting',
      'Responsive dashboard layout design with safe touch-targets',
      'Integrated live-charting node using vectorized SVG path animations',
      'AES-256 local encrypted cache mapping securely'
    ],
    techTags: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Vector Math'],
    beforeState: {
      design: 'Spreadsheet layout grids, difficult reading spacing, tiny links',
      ux: '24-hour delayed reports, static downloads, non-responsive on mobile',
      structure: 'Isolated file servers, manually compiled accounts, vulnerable email pipes'
    },
    afterState: {
      design: 'Aesthetic dashboard layout featuring clean mono fonts and custom graphs',
      ux: 'Instant valuation updates, mobile adaptive views, high touch-fidelity',
      structure: 'Direct secure API integration, dynamic data aggregation, client-side encryption'
    },
    metrics: {
      timelineWeeks: 6,
      featuresDelivered: 18,
      performanceScore: 98,
      uxScore: 97,
      customMetricName: 'Valuation latency',
      customMetricValue: '-99.9%'
    },
    clientName: 'Sarah Vance',
    clientCompany: 'Pinnacle Capital',
    clientTestimonial: 'The intuitive chart visualizations and real-time assets tracking have elevated our customer experience to an entirely new competitive tier.',
    clientLogoText: 'PINNACLE',
    clientApprovalStatus: 'approved',
    seoTitle: 'Pinnacle Capital Interactive Asset Dashboard | Dahiya Solution Portfolio',
    seoDescription: 'See how Dahiya Solution implemented real-time asset charting, responsive portals, and military-grade client data isolation.',
    seoStructuredData: '{"@context": "https://schema.org", "@type": "CaseStudy", "name": "Pinnacle Capital Portals"}',
    isDraft: false,
    isFeatured: true
  },
  {
    id: 'P-3',
    slug: 'sovereign-agent-router',
    title: 'Sovereign Autonomous Agent Router',
    subtitle: 'Orchestrating multi-agent LLM systems for enterprise pipelines',
    category: 'ai',
    subCategory: 'Automation Systems',
    image: '/src/assets/images/ai_dashboard_hologram_1784272685643.jpg',
    description: 'An intelligent pipeline routing customer intent messages to fine-tuned autonomous LLM agent pods with strict validation.',
    objective: 'Automate high-volume corporate document parsings, lead scorings, and support ticket resolutions autonomously.',
    challenge: 'The client spent 120 man-hours weekly reviewing customer incoming requests, extracting PDFs, and entering indices manually.',
    solution: 'Deployed an AI-driven routing hub utilizing multi-agent pipelines, localized semantic embeddings, and automated schema parsers.',
    devProcess: [
      'Document and email intent schema mapping',
      'Fine-tuning localized parsing rules and classification layers',
      'Designing terminal simulator and console output pipelines',
      'Stress testing multi-agent loops for infinite recursion blocks'
    ],
    techTags: ['AI Models', 'Express', 'TypeScript', 'JSON Schema', 'Cognitive Routing'],
    beforeState: {
      design: 'Manual form filings, email queues, chaotic inbox folders',
      ux: '12-hour support SLA, constant data typos, overlooked customer files',
      structure: 'Disjointed file shares, paper printouts, lack of audit trails'
    },
    afterState: {
      design: 'Terminal-inspired monitoring control deck with real-time logs',
      ux: 'SLA reduced to milliseconds, automated classification, clean outcomes',
      structure: 'Completely audited pipeline nodes, sovereign system isolation'
    },
    metrics: {
      timelineWeeks: 5,
      featuresDelivered: 8,
      performanceScore: 95,
      uxScore: 94,
      customMetricName: 'Lead Processing Time',
      customMetricValue: '0.8s'
    },
    clientName: 'CEO Gitesh',
    clientCompany: 'Quantum Automation',
    clientTestimonial: 'We replaced our entire document ingestion backlog with an automated pipeline that operates 24/7 without error. Brilliant engineering.',
    clientLogoText: 'QUANTUM AI',
    clientApprovalStatus: 'approved',
    seoTitle: 'Sovereign Autonomous AI Agent Pipelines | Dahiya Solution',
    seoDescription: 'Discover how Dahiya Solution engineers secure, high-accuracy LLM pipelines and automated semantic routers for modern enterprises.',
    seoStructuredData: '{"@context": "https://schema.org", "@type": "CaseStudy", "name": "AI Sovereign Router"}',
    isDraft: false,
    isFeatured: true
  },
  {
    id: 'P-4',
    slug: 'astra-biotech-storefront',
    title: 'Astra Biotech Digital Storefront',
    subtitle: 'Connecting medical-grade diagnostics to B2B pharmacies',
    category: 'website',
    subCategory: 'E-commerce Platforms',
    image: '/src/assets/images/semiconductor_macro_1784272705068.jpg',
    description: 'A premium, high-security medical diagnostics procurement platform enabling B2B pharmacies to order custom laboratory test-kits and trace logistics.',
    objective: 'Build an elegant, fully-compliant laboratory procurement platform supporting batch orders and instant compliance tracking.',
    challenge: 'Existing diagnostics catalogs were clunky, non-responsive, and required phone calls or PDF faxes to finalize regulatory compliance paperwork.',
    solution: 'Designed a high-end e-commerce experience featuring clear tabular listings, intuitive search queries, and integrated digital document signoffs.',
    devProcess: [
      'User journey and compliance paper-trail architecture planning',
      'Responsive design styling with pristine type layout grids',
      'Seamless checkout and pricing tier calculations setup',
      'End-to-end security audit and authorization boundaries validation'
    ],
    techTags: ['React', 'TypeScript', 'Tailwind', 'Secure Auth', 'Logistics API'],
    beforeState: {
      design: 'Bloated tabular legacy design, hard-to-read listings',
      ux: 'Manual phone calls for pricing, delayed orders, complex checkout screens',
      structure: 'Unsecured document shares, offline paper ledgers, fragmented database storage'
    },
    afterState: {
      design: 'High-end clinical dark theme with neon cyan status indicators',
      ux: 'One-click checkout, interactive pricing models, real-time logistics tracking',
      structure: 'Completely localized, encrypted database storage with verified digital audits'
    },
    metrics: {
      timelineWeeks: 5,
      featuresDelivered: 14,
      performanceScore: 99,
      uxScore: 99,
      customMetricName: 'Compliance Clearance Speed',
      customMetricValue: '+400%'
    },
    clientName: 'Elena Korolyova',
    clientCompany: 'Astra Biotech Co',
    clientTestimonial: 'Dahiya Solution streamlined our medical sales completely. Our partner pharmacies have praised the sheer clarity of the interface.',
    clientLogoText: 'ASTRA BIOTECH',
    clientApprovalStatus: 'approved',
    seoTitle: 'Astra Biotech B2B Diagnostics Marketplace | Dahiya Solution Case Study',
    seoDescription: 'Case study on building secure, compliant laboratory diagnostic ordering platforms for international healthcare companies.',
    seoStructuredData: '{"@context": "https://schema.org", "@type": "CaseStudy", "name": "Astra Biotech Storefront"}',
    isDraft: false,
    isFeatured: false
  },
  {
    id: 'P-5',
    slug: 'cinematic-video-production',
    title: 'High-Fidelity Cinematic Brand Videos',
    subtitle: 'Bespoke marketing creatives and cinematic social reels',
    category: 'creative',
    subCategory: 'Video Editing',
    image: '/src/assets/images/video_editing_studio_1784273767977.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Demo video placeholder
    videoDuration: '1:45',
    description: 'High-end video storytelling, motion graphics, and corporate advertising campaigns built for modern multichannel audience retention.',
    objective: 'Synthesize highly engaging, high-retention corporate brand animations and social media assets.',
    challenge: 'Traditional video materials suffered from slow editing paces, lackluster audio grading, and unoptimized aspects ratios.',
    solution: 'Crafted bespoke motion-designed, meticulously timed cinematic cuts featuring immersive color grading and custom graphics overlays.',
    devProcess: [
      'Storyboarding and narrative pacing mapping',
      'Prototyping dynamic SVG micro-animations and typography tracking',
      'Color grading and multi-format exporting optimization',
      'Deploying responsive web-embed frames'
    ],
    techTags: ['Video Production', 'Motion Graphics', 'Typography', 'Audio Design'],
    beforeState: {
      design: 'Stale corporate talking heads, uninspiring slides',
      ux: 'Bloated media payloads, stuttering embeds, zero viewport adjustments',
      structure: 'Unmanaged file sizes, lack of responsive ratios'
    },
    afterState: {
      design: 'High-retention cinematic pacing with clean type transitions',
      ux: 'Blazing-fast streaming layouts, responsive aspects, beautiful touch loops',
      structure: 'CDN-optimized media files, modern compression standards'
    },
    metrics: {
      timelineWeeks: 2,
      featuresDelivered: 5,
      performanceScore: 97,
      uxScore: 96,
      customMetricName: 'Audience Retention Index',
      customMetricValue: '+180%'
    },
    clientName: 'Sahil Dahiya',
    clientCompany: 'Dahiya Agency Co.',
    clientApprovalStatus: 'approved',
    seoTitle: 'Premium Video & Creative Production Portfolio | Dahiya Solution',
    seoDescription: 'Cinematic brand media, responsive video ads, and engaging motion graphics for social channels.',
    seoStructuredData: '{"@context": "https://schema.org", "@type": "CaseStudy", "name": "Dahiya Creative Media"}',
    isDraft: false,
    isFeatured: false
  }
];

interface PortfolioContextType {
  projects: PortfolioProject[];
  addProject: (p: Omit<PortfolioProject, 'id'>) => void;
  updateProject: (id: string, updated: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem('ds_portfolio_projects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load portfolio projects', e);
    }
    return defaultProjects;
  });

  const saveProjects = (currentProjects: PortfolioProject[]) => {
    setProjects(currentProjects);
    try {
      localStorage.setItem('ds_portfolio_projects', JSON.stringify(currentProjects));
    } catch (e) {
      console.error('Failed to save portfolio projects', e);
    }
  };

  const addProject = (p: Omit<PortfolioProject, 'id'>) => {
    const newId = `P-${Date.now()}`;
    const newProj: PortfolioProject = { ...p, id: newId };
    saveProjects([...projects, newProj]);
  };

  const updateProject = (id: string, updated: Partial<PortfolioProject>) => {
    saveProjects(
      projects.map((proj) => {
        if (proj.id === id) {
          // Deep merge for nested objects if modified
          const merged = { ...proj, ...updated };
          if (updated.beforeState) {
            merged.beforeState = { ...proj.beforeState, ...updated.beforeState };
          }
          if (updated.afterState) {
            merged.afterState = { ...proj.afterState, ...updated.afterState };
          }
          if (updated.metrics) {
            merged.metrics = { ...proj.metrics, ...updated.metrics };
          }
          return merged;
        }
        return proj;
      })
    );
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter((proj) => proj.id !== id));
  };

  const resetProjects = () => {
    saveProjects(defaultProjects);
  };

  return (
    <PortfolioContext.Provider value={{ projects, addProject, updateProject, deleteProject, resetProjects }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
