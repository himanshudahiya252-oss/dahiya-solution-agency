import { motion } from 'motion/react';
import { ArrowRight, Megaphone, TrendingUp, Target, BarChart3 } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

const metrics = [
  { label: 'Avg. ROI Increase', value: '185%' },
  { label: 'Lead Generation', value: '3x' },
  { label: 'Cost Per Acquisition', value: '-40%' }
];

export default function DigitalMarketingSection() {
  return (
    <Section className="py-32 px-6 relative border-t border-white/5 bg-ds-black" title="Digital Marketing">
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
              <div className="flex items-center gap-3 text-ds-cyan mb-4 font-mono text-sm uppercase tracking-widest">
                <Megaphone size={16} /> <span>03. Growth Systems</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                Digital Marketing <br />& Performance
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                Stop guessing. Start growing. We build data-driven marketing systems that attract the right audience, engage them meaningfully, and convert them into high-value clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 mb-12">
              {metrics.map((metric, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-4 rounded-2xl text-center"
                >
                  <div className="text-2xl lg:text-3xl font-display font-bold text-ds-white mb-1">{metric.value}</div>
                  <div className="text-xs text-ds-smoke font-mono uppercase tracking-wider">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {['Search Engine Optimization (SEO)', 'Google Ads', 'Meta Advertising', 'Content Strategy', 'Lead Generation'].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/10 text-sm text-ds-silver bg-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <MagneticButton variant="primary" className="!py-3 !px-6 group/btn">
              Scale Your Revenue <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          {/* Visuals */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-white/10 bg-ds-graphite"
            >
              <img 
                src="/src/assets/images/marketing_dashboard_1784273747900.jpg" 
                alt="Digital Marketing Dashboard" 
                className="w-full h-auto"
              />
              
              {/* Overlay animated chart element */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ds-black/90 via-transparent to-transparent pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-8 left-8 glass-panel p-5 rounded-2xl backdrop-blur-xl border-white/20 w-64"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-ds-white font-medium">Traffic Growth</div>
                  <TrendingUp size={16} className="text-ds-cyan" />
                </div>
                <div className="h-16 flex items-end gap-1">
                  {[30, 45, 40, 60, 75, 65, 90].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className="flex-1 bg-ds-cyan/40 rounded-t-sm"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
