import { motion } from 'motion/react';
import { ArrowRight, Smartphone, LayoutGrid, Zap, Blocks } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

const features = [
  { icon: Smartphone, title: 'iOS & Android', desc: 'Native performance, cross-platform reach.' },
  { icon: LayoutGrid, title: 'Intuitive UI/UX', desc: 'Gesture-inspired, fluid interactions.' },
  { icon: Blocks, title: 'Custom Features', desc: 'Built specifically for your business needs.' }
];

export default function MobileAppSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-graphite/20" title="Mobile App Development">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visuals */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl relative z-10 aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center bg-ds-black border border-white/5"
            >
              <img 
                src="/src/assets/images/mobile_app_interface_1784273728384.jpg" 
                alt="Mobile App Interface" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 text-ds-blue mb-4 font-mono text-sm uppercase tracking-widest">
                <Smartphone size={16} /> <span>02. Mobile Ecosystems</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                Mobile App <br />Development
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                We craft mobile experiences that people actually want to use. From consumer applications to enterprise mobile portals, our apps are designed for speed, usability, and scale.
              </p>
            </motion.div>

            <div className="space-y-4 mb-12">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-ds-graphite flex items-center justify-center shrink-0 border border-white/5 group-hover:border-ds-blue/30 group-hover:text-ds-blue text-ds-smoke transition-colors">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-ds-white font-medium mb-1">{feature.title}</h4>
                    <p className="text-ds-silver text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <MagneticButton variant="secondary" className="!py-3 !px-6 group/btn">
              Explore Mobile Solutions <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

        </div>
      </div>
    </Section>
  );
}
