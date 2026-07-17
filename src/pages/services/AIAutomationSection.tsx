import { motion } from 'motion/react';
import { ArrowRight, Bot, Workflow, Cpu, Settings } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

export default function AIAutomationSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-black" title="AI & Automation">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 text-ds-blue mb-4 font-mono text-sm uppercase tracking-widest">
              <Bot size={16} /> <span>08. Intelligent Systems</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
              AI & Workflow Automation
            </h2>
            <p className="text-ds-silver text-lg leading-relaxed">
              Eliminate repetitive tasks, reduce human error, and accelerate business operations. We build intelligent automation systems that work quietly and efficiently in the background.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visuals - Workflow Diagram */}
          <div className="relative h-[400px] w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 flex flex-col items-center justify-between py-8"
            >
              {[
                { icon: Workflow, label: 'Inquiry Received' },
                { icon: Cpu, label: 'AI Processing & Lead Scoring' },
                { icon: Bot, label: 'Automated Response & CRM Entry' },
                { icon: Settings, label: 'Task Assignment to Team' }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.4 }}
                    className="glass-panel px-6 py-4 rounded-full flex items-center gap-4 z-10"
                  >
                    <div className="w-8 h-8 rounded-full bg-ds-blue/20 flex items-center justify-center text-ds-blue">
                      <step.icon size={16} />
                    </div>
                    <span className="text-ds-white font-medium text-sm">{step.label}</span>
                  </motion.div>
                  
                  {i < 3 && (
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (i * 0.4) + 0.2 }}
                      className="w-px bg-gradient-to-b from-ds-blue to-transparent my-2"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <div className="space-y-6 mb-12">
              {[
                'Automated Lead Management & CRM Synchronization',
                'Intelligent Chatbots & Customer Support',
                'Document Processing & Data Extraction',
                'Custom AI Agent Development'
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="p-6 rounded-2xl glass-panel group hover:border-ds-blue/30 transition-colors"
                >
                  <h4 className="text-ds-white font-medium flex items-center gap-3">
                    <span className="text-ds-blue">0{i + 1}.</span> {feature}
                  </h4>
                </motion.div>
              ))}
            </div>

            <MagneticButton variant="primary" className="!py-3 !px-6 group/btn">
              Automate Your Business <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

        </div>
      </div>
    </Section>
  );
}
