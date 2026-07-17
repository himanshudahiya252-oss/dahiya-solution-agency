import { motion } from 'motion/react';
import { ArrowRight, Video, PlayCircle, Film, SlidersHorizontal } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

export default function VideoEditingSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-graphite/20" title="Video Production & Editing">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visuals */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl relative z-10 aspect-video lg:aspect-square flex items-center justify-center bg-ds-black border border-white/5"
            >
              <img 
                src="/src/assets/images/video_editing_studio_1784273767977.jpg" 
                alt="Video Editing Studio" 
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="absolute inset-0 m-auto w-20 h-20 bg-ds-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer group"
              >
                <PlayCircle size={40} className="text-ds-white group-hover:text-ds-blue transition-colors" />
              </motion.div>
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
                <Video size={16} /> <span>04. Cinematic Storytelling</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                Video Production <br />& Editing
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                Visual storytelling that commands attention. From high-end corporate films to engaging social media reels, we produce content that elevates your brand identity.
              </p>
            </motion.div>

            <div className="space-y-6 mb-12">
              {[
                { icon: Film, title: 'Corporate Documentaries & Commercials' },
                { icon: PlayCircle, title: 'YouTube Channel Management & Editing' },
                { icon: SlidersHorizontal, title: 'Color Grading & Motion Graphics' }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl glass-panel group"
                >
                  <feature.icon size={24} className="text-ds-smoke group-hover:text-ds-blue transition-colors" />
                  <h4 className="text-ds-white font-medium">{feature.title}</h4>
                </motion.div>
              ))}
            </div>

            <MagneticButton variant="secondary" className="!py-3 !px-6 group/btn">
              View Showreel <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

        </div>
      </div>
    </Section>
  );
}
