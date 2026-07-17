import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Brain, BarChart2, CheckCircle2 } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

export default function AIEducationSection() {
  return (
    <Section className="py-32 px-6 relative border-t border-white/5 bg-ds-black" title="AI Education Platform">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 text-ds-cyan mb-4 font-mono text-sm uppercase tracking-widest">
              <GraduationCap size={16} /> <span>05. Intelligent Learning</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
              AI Practice Exam Platform
            </h2>
            <p className="text-ds-silver text-lg leading-relaxed">
              A comprehensive educational module powered by artificial intelligence. Generate questions, analyze student performance, and scale your teaching capabilities.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual */}
          <div className="lg:col-span-8 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-white/10"
            >
              <img 
                src="/src/assets/images/ai_education_platform_1784273786221.jpg" 
                alt="AI Education Platform Dashboard" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>

          {/* Features Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {[
              { icon: Brain, title: 'AI Question Generation', desc: 'Automatically create mock tests and practice sets based on syllabus topics.' },
              { icon: BarChart2, title: 'Performance Analytics', desc: 'Track student progress, accuracy trends, and subject-wise strength.' },
              { icon: CheckCircle2, title: 'Adaptive Learning', desc: 'Identify weak areas and suggest targeted practice questions.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="glass-panel p-6 rounded-2xl group"
              >
                <div className="w-10 h-10 rounded-full bg-ds-graphite flex items-center justify-center mb-4 group-hover:bg-ds-blue/10 transition-colors">
                  <feature.icon size={20} className="text-ds-silver group-hover:text-ds-blue transition-colors" />
                </div>
                <h4 className="text-ds-white font-medium mb-2">{feature.title}</h4>
                <p className="text-ds-smoke text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <MagneticButton variant="primary" className="w-full justify-center !py-3 group/btn">
                Discover EdTech Solutions <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </MagneticButton>
            </motion.div>
          </div>

        </div>
      </div>
    </Section>
  );
}
