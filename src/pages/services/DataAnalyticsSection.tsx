import { motion } from 'motion/react';
import { ArrowRight, BarChart3, PieChart, Activity, Layers } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton';
import Section from '../../components/Section';

export default function DataAnalyticsSection() {
  return (
    <Section className="py-32 px-6 relative bg-ds-graphite/20" title="Data Analytics & Business Intelligence">
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
                <BarChart3 size={16} /> <span>06. Business Intelligence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
                Data Analytics <br />& Insights
              </h2>
              <p className="text-ds-silver text-lg leading-relaxed mb-8">
                Transform raw data into strategic business value. We build executive dashboards and analytics systems that help you monitor KPIs, understand customer journeys, and make informed decisions.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { icon: PieChart, title: 'Custom Dashboards' },
                { icon: Activity, title: 'Real-time Monitoring' },
                { icon: Layers, title: 'Data Integration' },
                { icon: BarChart3, title: 'Predictive Analytics' }
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
              Explore Analytics <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          {/* UI Mock Visuals */}
          <div className="order-1 lg:order-2 relative h-[500px] w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 glass-panel rounded-3xl p-8 overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-medium text-ds-white">Revenue Overview</h3>
                <div className="px-3 py-1 rounded-full bg-ds-graphite border border-white/10 text-xs text-ds-silver">This Month</div>
              </div>
              
              <div className="flex items-end justify-between gap-2 h-48 border-b border-white/5 pb-4 mb-4">
                {[40, 55, 45, 70, 60, 85, 95, 80, 100, 90].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + (i * 0.05) }}
                    className="flex-1 bg-gradient-to-t from-ds-blue/10 to-ds-blue/60 rounded-t-sm border-t border-ds-blue"
                  />
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-auto">
                {[
                  { label: 'Total Revenue', value: '$124,500', trend: '+14%' },
                  { label: 'Conversion Rate', value: '3.2%', trend: '+0.5%' },
                  { label: 'Active Users', value: '8,432', trend: '+12%' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4">
                    <div className="text-xs text-ds-smoke mb-1">{stat.label}</div>
                    <div className="text-lg font-display text-ds-white mb-1">{stat.value}</div>
                    <div className="text-[10px] text-green-400 font-mono">{stat.trend}</div>
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
