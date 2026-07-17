import { motion } from 'motion/react';
import { ArrowRight, Youtube, Eye, ThumbsUp, Clock } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

export default function YouTubeManagementSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-graphite/20" title="YouTube Management">
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
              <div className="flex items-center gap-3 text-red-500 mb-4 font-mono text-sm uppercase tracking-widest">
                <Youtube size={16} /> <span>06. Video Strategy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                YouTube Channel <br />Management
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                Transform your YouTube channel into a powerful business asset. We handle SEO, thumbnail design, audience retention strategy, and comprehensive growth analytics.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { label: 'Thumbnail CTR', value: '+45%' },
                { label: 'Watch Time', value: '2.5x' },
                { label: 'SEO Ranking', value: 'Top 3' },
                { label: 'Subscriber Growth', value: '+120%' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-ds-black p-4 rounded-2xl border border-white/5"
                >
                  <div className="text-xl font-display font-bold text-ds-white mb-1">{stat.value}</div>
                  <div className="text-xs text-ds-smoke uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <MagneticButton variant="primary" className="!py-3 !px-6 group/btn">
              Scale Your Channel <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          {/* UI Mock Visuals */}
          <div className="order-1 lg:order-2 relative h-[500px] w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-ds-black rounded-3xl p-6 overflow-hidden border border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <h3 className="text-lg font-medium text-ds-white flex items-center gap-2">
                  <Youtube className="text-red-500" size={20} /> Studio Analytics
                </h3>
                <div className="text-xs text-ds-smoke bg-white/5 px-3 py-1 rounded-full">Last 28 Days</div>
              </div>
              
              {/* Analytics Graph Mock */}
              <div className="flex-1 relative mb-6">
                <div className="absolute inset-0 flex items-end justify-between px-4 pb-2">
                  {[30, 45, 60, 40, 80, 100, 85, 70, 90, 110, 105, 120].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(h / 120) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.05 }}
                      className="w-4 bg-gradient-to-t from-red-500/20 to-red-500/60 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Eye, label: 'Views', value: '1.2M' },
                  { icon: Clock, label: 'Watch Time (hrs)', value: '84.5K' },
                  { icon: ThumbsUp, label: 'Likes', value: '142K' }
                ].map((stat, i) => (
                  <div key={i} className="bg-ds-graphite rounded-xl p-3 flex flex-col items-center text-center">
                    <stat.icon size={16} className="text-ds-smoke mb-2" />
                    <div className="text-sm font-display text-ds-white">{stat.value}</div>
                    <div className="text-[10px] text-ds-smoke uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </Section>
  );
}
