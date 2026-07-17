import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: 'Code' | 'Sparkles' | 'Target' | 'Megaphone' | 'Cpu' | 'Database' | 'Layers' | 'Shield';
  order: number;
  image?: string;
  videoUrl?: string;
  features: string[];
  seoTitle?: string;
  seoDescription?: string;
}

interface ServiceContextType {
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  reorderServices: (reordered: ServiceItem[]) => void;
  resetServices: () => void;
}

const defaultServices: ServiceItem[] = [
  {
    id: 'S-1',
    title: 'Digital Architecture',
    description: 'Premium website development and digital platforms engineered for speed, scale, and flawless user experience.',
    category: 'web-dev',
    iconName: 'Code',
    order: 1,
    image: '/src/assets/images/website_development_studio_1784273706424.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    features: ['Sub-300ms loading latency', 'Custom interactive motion modules', 'Complete semantic code structures', 'Enterprise CMS panel distribution'],
    seoTitle: 'Digital Architecture & Web Development | Dahiya Solution',
    seoDescription: 'High-end custom React and Vite architectures crafted with design precision.'
  },
  {
    id: 'S-2',
    title: 'AI Integration',
    description: 'Intelligent automation and AI-powered business solutions that give your company an unfair advantage.',
    category: 'ai-automation',
    iconName: 'Sparkles',
    order: 2,
    image: '/src/assets/images/ai_dashboard_hologram_1784272685643.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    features: ['Multi-agent pipeline setups', 'LLM security prompt shields', 'Autonomous validation architectures', 'Intelligent search grounding'],
    seoTitle: 'AI System Integration & Automations | Dahiya Solution',
    seoDescription: 'Deploying secure LLM integrations, document classifiers, and automated agent workflows.'
  },
  {
    id: 'S-3',
    title: 'Brand Strategy',
    description: 'Positioning your business as a category leader through precise messaging, visual identity, and strategic direction.',
    category: 'branding',
    iconName: 'Target',
    order: 3,
    image: '/src/assets/images/video_editing_studio_1784273767977.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    features: ['Swiss typography layouts', 'Atmospheric brand rulesets', 'Premium marketing alignment', 'Custom component layout benchmarks'],
    seoTitle: 'Strategic Brand Identity & Design | Dahiya Solution',
    seoDescription: 'Elevate your business branding to connect with elite enterprise clients.'
  },
  {
    id: 'S-4',
    title: 'Growth Systems',
    description: 'Data-driven SEO, digital advertising, and social marketing designed to attract and convert high-value clients.',
    category: 'marketing',
    iconName: 'Megaphone',
    order: 4,
    image: '/src/assets/images/marketing_dashboard_1784273747900.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    features: ['Technical crawlability index optimizations', 'Performance marketing funnels', 'Dynamic subscriber lead tags', 'B2B outreach analytics dashboards'],
    seoTitle: 'B2B Growth Engineering & Marketing | Dahiya Solution',
    seoDescription: 'Scale your active funnel with search engine crawling authority and technical SEO.'
  }
];

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ds_services');
    if (saved) {
      try {
        setServices(JSON.parse(saved).sort((a: ServiceItem, b: ServiceItem) => a.order - b.order));
      } catch (e) {
        setServices(defaultServices);
      }
    } else {
      localStorage.setItem('ds_services', JSON.stringify(defaultServices));
      setServices(defaultServices);
    }
  }, []);

  const saveToStorage = (newServices: ServiceItem[]) => {
    const sorted = [...newServices].sort((a, b) => a.order - b.order);
    setServices(sorted);
    localStorage.setItem('ds_services', JSON.stringify(sorted));
  };

  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const service: ServiceItem = {
      ...newService,
      id: `S-${Math.floor(1000 + Math.random() * 9000)}`,
      order: services.length > 0 ? Math.max(...services.map(s => s.order)) + 1 : 1
    };
    saveToStorage([...services, service]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    const modified = services.map(s => s.id === id ? { ...s, ...updated } : s);
    saveToStorage(modified);
  };

  const deleteService = (id: string) => {
    const filtered = services.filter(s => s.id !== id);
    // Renumber orders to avoid gaps
    const reordered = filtered.map((s, idx) => ({ ...s, order: idx + 1 }));
    saveToStorage(reordered);
  };

  const reorderServices = (reordered: ServiceItem[]) => {
    const mapped = reordered.map((s, idx) => ({ ...s, order: idx + 1 }));
    saveToStorage(mapped);
  };

  const resetServices = () => {
    saveToStorage(defaultServices);
  };

  return (
    <ServiceContext.Provider value={{ services, addService, updateService, deleteService, reorderServices, resetServices }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}
