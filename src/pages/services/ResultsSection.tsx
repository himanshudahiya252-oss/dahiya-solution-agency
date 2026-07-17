import { motion } from 'motion/react';
import { ShieldCheck, Zap, Users, TrendingUp } from 'lucide-react';
import Section from '../../components/Section';

const outcomes = [
  { icon: ShieldCheck, title: 'Improved Online Presence', desc: 'Establish authority and trust with a premium digital footprint.' },
  { icon: Zap, title: 'Faster Performance', desc: 'Sub-second load times that reduce bounce rates and improve SEO.' },
  { icon: Users, title: 'Higher-Quality Leads', desc: 'Attract the right audience through targeted, data-driven systems.' },
  { icon: TrendingUp, title: 'Operational Efficiency', desc: 'Automate repetitive tasks and focus on strategic business growth.' }
];

export default function ResultsSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-graphite/20" title="Business Outcomes">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
              Measurable Business Value
            </h2>
            <p className="text-ds-silver text-lg leading-relaxed">
              We do not make unsupported promises. We architect systems designed to deliver clear, strategic outcomes for your organization.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {outcomes.map((outcome, i) => (
            <motion.div 
              key={i} 
              className="glass-panel p-10 rounded-3xl flex flex-col md:flex-row gap-6 items-start group hover:bg-white/[0.03] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-ds-black flex items-center justify-center shrink-0 border border-white/5 group-hover:border-ds-blue/30 transition-colors">
                <outcome.icon size={28} className="text-ds-silver group-hover:text-ds-blue transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-display font-medium text-ds-white mb-3">{outcome.title}</h3>
                <p className="text-ds-smoke leading-relaxed">{outcome.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
