import { motion } from 'motion/react';
import { ArrowRight, PenTool, Palette, Type, Layers } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

export default function BrandingSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-graphite/20" title="Branding & Design">
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
                <PenTool size={16} /> <span>09. Visual Identity</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                Branding & Design
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                Design is not just how it looks, but how it works and communicates. We craft premium visual identities that position your business as a leader in your industry.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { icon: Palette, title: 'Logo & Identity Systems' },
                { icon: Type, title: 'Typography & Color Strategy' },
                { icon: Layers, title: 'UI/UX Design' },
                { icon: PenTool, title: 'Brand Guidelines' }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-5 rounded-2xl group"
                >
                  <feature.icon className="text-ds-smoke mb-3 group-hover:text-ds-blue transition-colors" size={24} />
                  <h4 className="text-ds-white font-medium text-sm">{feature.title}</h4>
                </motion.div>
              ))}
            </div>

            <MagneticButton variant="secondary" className="!py-3 !px-6 group/btn">
              View Design Portfolio <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          {/* Visuals Gallery */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-ds-black rounded-3xl border border-white/5 flex items-center justify-center p-8 group overflow-hidden relative"
            >
              <div className="text-ds-silver font-display text-4xl group-hover:scale-110 transition-transform duration-500">Logo</div>
              <div className="absolute inset-0 bg-ds-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-square bg-ds-graphite rounded-3xl border border-white/5 flex flex-col items-center justify-center p-8 group overflow-hidden relative"
            >
              <div className="flex gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-ds-white" />
                <div className="w-6 h-6 rounded-full bg-ds-blue" />
                <div className="w-6 h-6 rounded-full bg-ds-cyan" />
              </div>
              <div className="text-ds-smoke text-sm font-mono group-hover:text-ds-white transition-colors">Colors</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="aspect-square bg-ds-black rounded-3xl border border-white/5 flex flex-col items-center justify-center p-8 group overflow-hidden relative col-span-2"
            >
              <div className="text-ds-white font-display text-5xl mb-2 group-hover:tracking-widest transition-all duration-700">Typography</div>
              <div className="text-ds-smoke text-sm">Inter & Space Grotesk</div>
            </motion.div>
          </div>

        </div>
      </div>
    </Section>
  );
}
