import { motion } from 'motion/react';
import { Code, Sparkles, Megaphone, Target, Cpu, Database, Layers, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useServices } from '../context/ServiceContext';

const IconMap = {
  Code,
  Sparkles,
  Target,
  Megaphone,
  Cpu,
  Database,
  Layers,
  Shield
};

export default function Services() {
  const { services } = useServices();

  return (
    <section className="py-32 px-6 md:px-12 bg-ds-black relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-ds-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-ds-white mb-4">
              Capabilities
            </h2>
            <Link to="/services">
              <MagneticButton variant="text" className="!px-0 group">
                View All Services <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </Link>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ds-silver max-w-sm leading-relaxed"
          >
            We don't sell services. We sell transformation. Elevating your digital presence to outpace the competition.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => {
            const Icon = IconMap[service.iconName as keyof typeof IconMap] || Code;
            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-panel p-10 lg:p-14 rounded-3xl group"
              >
                <Icon className="w-8 h-8 text-ds-smoke mb-8 group-hover:text-ds-blue transition-colors duration-500" strokeWidth={1.5} />
                <h3 className="font-display text-2xl text-ds-white mb-4 group-hover:tracking-wider transition-all duration-500">{service.title}</h3>
                <p className="text-ds-smoke font-light leading-relaxed">
                  {service.description}
                </p>
                {service.features && service.features.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <span key={i} className="text-[10px] font-mono text-ds-blue border border-ds-blue/20 bg-ds-blue/5 px-2 py-0.5 rounded-full">
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
