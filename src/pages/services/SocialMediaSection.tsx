import { motion } from 'motion/react';
import { ArrowRight, Share2, MessageCircle, Heart, BarChart } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

export default function SocialMediaSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-black" title="Social Media Management">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visuals */}
          <div className="relative h-[600px] w-full order-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute inset-0 rounded-3xl overflow-hidden glass-panel p-8"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ds-blue/20 flex items-center justify-center">
                    <span className="text-ds-blue font-display font-medium">DS</span>
                  </div>
                  <div>
                    <div className="text-ds-white font-medium text-sm">Dahiya Solution</div>
                    <div className="text-ds-smoke text-xs">@dahiyasolution</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-ds-white font-medium">124K</div>
                    <div className="text-ds-smoke text-[10px] uppercase">Followers</div>
                  </div>
                </div>
              </div>

              {/* Feed Grid */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square bg-white/5 rounded-lg relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-ds-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Heart size={14} className="text-white" />
                      <MessageCircle size={14} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 text-ds-cyan mb-4 font-mono text-sm uppercase tracking-widest">
                <Share2 size={16} /> <span>05. Community Growth</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                Social Media <br />Management
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                Build a loyal community and drive engagement across all platforms. We manage your presence end-to-end, from content creation to community management.
              </p>
            </motion.div>

            <div className="space-y-4 mb-12">
              {['Content Strategy & Calendar', 'Creative Design & Copywriting', 'Community Engagement', 'Performance Analytics & Reporting'].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-ds-cyan" />
                  <span className="text-ds-silver">{feature}</span>
                </motion.div>
              ))}
            </div>

            <MagneticButton variant="secondary" className="!py-3 !px-6 group/btn">
              Grow Your Audience <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

        </div>
      </div>
    </Section>
  );
}
