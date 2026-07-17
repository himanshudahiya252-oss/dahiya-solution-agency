import { motion } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Search, 
  Video, 
  Youtube, 
  Share2, 
  BarChart, 
  GraduationCap, 
  Zap, 
  PenTool, 
  Users,
  ArrowRight
} from 'lucide-react';
import { Card } from '../../components/ui';

const services = [
  { id: 'web', title: "Website Development", icon: Globe, desc: "High-performance enterprise websites." },
  { id: 'app', title: "App Development", icon: Smartphone, desc: "Native and cross-platform mobile apps." },
  { id: 'marketing', title: "Digital Marketing", icon: TrendingUp, desc: "Data-driven campaigns that convert." },
  { id: 'marketing', title: "SEO Strategy", icon: Search, desc: "Dominate search engine rankings." },
  { id: 'video', title: "Video Editing", icon: Video, desc: "Cinematic post-production services." },
  { id: 'youtube', title: "YouTube Management", icon: Youtube, desc: "Channel growth and optimization." },
  { id: 'social', title: "Social Media", icon: Share2, desc: "Engaging content that builds community." },
  { id: 'analytics', title: "Business Analytics", icon: BarChart, desc: "Insights that drive decision making." },
  { id: 'education', title: "AI Practice Exams", icon: GraduationCap, desc: "Intelligent testing platforms." },
  { id: 'automation', title: "Automation", icon: Zap, desc: "Streamline your business operations." },
  { id: 'uiux', title: "Branding", icon: PenTool, desc: "Identity design that stands out." },
  { id: 'crm', title: "CRM Solutions", icon: Users, desc: "Manage and nurture client relationships." },
];

interface QuickServicesProps {
  onSelectService?: (id: string) => void;
}

export function QuickServices({ onSelectService }: QuickServicesProps) {
  return (
    <section className="py-32 px-6 md:px-12 bg-ds-black relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ds-black via-ds-black to-ds-black/90" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ds-blue/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-6">
              Core Capabilities
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ds-white">
              Comprehensive Solutions
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ds-smoke max-w-sm leading-relaxed text-lg font-light"
          >
            End-to-end digital transformation designed to elevate your brand and outpace the competition.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card 
                  hoverable 
                  onClick={() => onSelectService?.(service.id)}
                  className="p-8 h-full flex flex-col group cursor-pointer border-white/5 bg-white/[0.02]"
                >
                  <div className="w-12 h-12 rounded-xl bg-ds-graphite flex items-center justify-center mb-6 group-hover:bg-ds-blue/10 transition-colors duration-500">
                    <Icon size={24} className="text-ds-silver group-hover:text-ds-blue transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg text-ds-white mb-2">{service.title}</h3>
                  <p className="text-ds-smoke text-sm font-light leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-ds-silver group-hover:text-ds-white transition-colors mt-auto opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                    Explore Solution <ArrowRight size={14} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
