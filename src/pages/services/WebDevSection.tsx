import { motion } from 'motion/react';
import { ArrowRight, Code, Monitor, Smartphone, Globe, Lock, Zap } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

const features = [
  { icon: Monitor, title: 'Corporate Websites', desc: 'Digital headquarters designed to scale.' },
  { icon: Smartphone, title: 'Responsive Design', desc: 'Flawless execution across all devices.' },
  { icon: Lock, title: 'Secure Architecture', desc: 'Enterprise-grade security protocols.' },
  { icon: Zap, title: 'Fast Performance', desc: 'Optimized for sub-second load times.' }
];

export default function WebDevSection() {
  return (
    <Section className="py-32 px-6 relative border-t border-white/5 bg-ds-black" title="Web Development">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 text-ds-blue mb-4 font-mono text-sm uppercase tracking-widest">
                <Code size={16} /> <span>01. Digital Platforms</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                Website Development <br />& Architecture
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                We build modern, fast, and scalable websites. This is not just a digital brochure; it is your digital headquarters. From corporate sites to complex web applications, we engineer platforms that convert visitors into clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-6 rounded-2xl group hover:border-ds-blue/30 transition-colors"
                >
                  <feature.icon className="text-ds-smoke mb-4 group-hover:text-ds-blue transition-colors" size={24} />
                  <h4 className="text-ds-white font-medium mb-2">{feature.title}</h4>
                  <p className="text-ds-silver text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <MagneticButton variant="primary" className="!py-3 !px-6 group/btn">
              Discuss Web Project <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          {/* Visuals */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative z-10"
            >
              <img 
                src="/src/assets/images/website_development_studio_1784273706424.jpg" 
                alt="Web Development Studio" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ds-black/80 to-transparent" />
              
              {/* Floating Performance Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl backdrop-blur-md border-white/20 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-ds-smoke font-mono uppercase mb-1">Performance Score</div>
                  <div className="text-ds-white font-medium text-lg">99/100</div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 10 }}
                      animate={{ height: [10, 24, 10] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 bg-ds-blue rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Background glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-ds-blue/20 blur-[100px] -z-10 rounded-full" />
          </div>
        </div>
      </div>
    </Section>
  );
}
