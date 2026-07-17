import { motion } from 'motion/react';
import Section from '../../components/Section';

const steps = [
  { num: '01', title: 'Discovery', desc: 'Understanding your business, audience, and objectives.' },
  { num: '02', title: 'Research', desc: 'Analyzing the market, competitors, and technical requirements.' },
  { num: '03', title: 'Strategy', desc: 'Architecting the digital roadmap and technical foundation.' },
  { num: '04', title: 'Design', desc: 'Crafting premium interfaces and user experiences.' },
  { num: '05', title: 'Development', desc: 'Writing clean, scalable, and secure code.' },
  { num: '06', title: 'Testing', desc: 'Rigorous quality assurance across all devices.' },
  { num: '07', title: 'Launch', desc: 'Deploying your digital solution to the world.' },
  { num: '08', title: 'Support', desc: 'Continuous optimization, scaling, and maintenance.' }
];

export default function ProcessSection() {
  return (
    <Section className="py-32 px-6 border-t border-white/5 bg-ds-black" title="Our Process">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
              Engineering Perfection
            </h2>
            <p className="text-ds-silver text-lg leading-relaxed">
              A systematic approach to digital transformation, ensuring precision and impact at every stage of the project lifecycle.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16 relative z-10">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              className="relative text-left group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-6xl font-display font-bold text-ds-graphite group-hover:text-ds-blue/30 transition-colors duration-500 mb-6">{step.num}</div>
              <h3 className="text-xl font-display text-ds-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ds-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                {step.title}
              </h3>
              <p className="text-sm text-ds-smoke leading-relaxed">{step.desc}</p>
              
              {/* Connecting lines */}
              {i % 4 !== 3 && i < 7 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-ds-graphite to-transparent -translate-x-12" />
              )}
              {i % 2 === 0 && i < 7 && (
                <div className="hidden md:block lg:hidden absolute top-10 left-full w-full h-px bg-gradient-to-r from-ds-graphite to-transparent -translate-x-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
