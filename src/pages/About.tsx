import { motion } from 'motion/react';
import Section from '../components/Section';

export default function AboutPage() {
  return (
    <div className="bg-ds-black">
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-ds-cyan/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold text-ds-white tracking-tighter mb-12"
          >
            Engineering <br className="hidden md:block"/>
            <span className="text-ds-smoke">Digital Futures.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg mx-auto text-left text-ds-silver font-light leading-relaxed"
          >
            <p className="text-2xl text-ds-white font-medium mb-8 text-center md:text-left">
              We are architects of the digital space, bridging the gap between complex technology and elegant human experiences.
            </p>
            <div className="my-16 rounded-3xl overflow-hidden shadow-2xl bg-ds-graphite aspect-[21/9] relative">
              <div className="absolute inset-0 bg-ds-black/10 z-10" />
              <img 
                src="/src/assets/images/modern_ai_workspace_1784272666662.jpg" 
                alt="Modern AI Innovation Workspace" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div>
                <p className="mb-6">
                  Dahiya Solution was founded on a simple premise: technology should elevate business, not complicate it. In a landscape cluttered with generic templates and noisy interfaces, we champion clarity, performance, and purpose.
                </p>
              </div>
              <div>
                <p className="mb-6">
                  Our team consists of senior engineers, digital strategists, and designers who treat code and pixels with the same reverence as physical architecture. We don't just build websites; we construct digital headquarters designed to scale, convert, and endure.
                </p>
                <p>
                  We believe that beauty without speed is failure, and luxury without usability is failure. Every project we undertake is an exercise in engineering perfection.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        centered
        label="Core Values"
        title="Our Principles"
        description="The foundational beliefs that guide our work, our decisions, and our relationships with clients."
        className="bg-ds-graphite/30 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              { title: 'Vision', desc: 'To set the global standard for digital excellence and AI integration.' },
              { title: 'Mission', desc: 'Empowering ambitious companies to dominate their digital landscape.' },
              { title: 'Values', desc: 'Precision. Innovation. Integrity. Uncompromising Quality.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel glass-panel-hover p-10 text-center rounded-3xl"
              >
                <h3 className="font-display text-2xl text-ds-white mb-4">{item.title}</h3>
                <p className="text-ds-silver leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
