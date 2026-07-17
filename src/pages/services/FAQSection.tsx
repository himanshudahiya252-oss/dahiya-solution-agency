import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Section from '../../components/Section';

const faqs = [
  { 
    q: 'What makes Dahiya Solution different from other agencies?', 
    a: 'We operate as an extension of your business, not just a service provider. Our approach combines enterprise-grade engineering, premium design, and AI-driven efficiency to build digital ecosystems, not just websites.' 
  },
  { 
    q: 'How long does a typical web development project take?', 
    a: 'Project timelines vary based on complexity. A standard corporate website typically takes 4-6 weeks from discovery to launch, while complex web applications or comprehensive digital platforms may take 3-6 months. We provide precise timelines during the strategy phase.' 
  },
  { 
    q: 'Do you provide ongoing support and maintenance?', 
    a: 'Yes. We believe launch is just the beginning. We offer comprehensive support, maintenance, security updates, and continuous optimization retainers to ensure your digital assets scale with your business.' 
  },
  { 
    q: 'Can you integrate AI into our existing business processes?', 
    a: 'Absolutely. We specialize in identifying bottlenecks and implementing custom AI solutions—from intelligent chatbots to automated workflows and predictive analytics—that seamlessly integrate with your current operations.' 
  },
  { 
    q: 'What is your pricing structure?', 
    a: 'Every project is unique. We do not use cookie-cutter pricing templates. After our initial discovery consultation, we provide a detailed, transparent proposal outlining the scope, deliverables, and investment required to achieve your specific goals.' 
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Section className="py-32 px-6 border-t border-white/5 bg-ds-black" title="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ds-white mb-6">
              Common Inquiries
            </h2>
            <p className="text-ds-silver text-lg leading-relaxed mb-8">
              Find answers to the most frequently asked questions about our process, capabilities, and partnerships.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ds-smoke" size={18} />
              <input 
                type="text" 
                placeholder="Search questions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ds-graphite/50 border border-white/10 rounded-full py-3 pl-12 pr-6 text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors placeholder:text-ds-smoke"
              />
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center text-ds-smoke py-8">No matching questions found.</div>
          ) : (
            filteredFaqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-panel rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="font-medium text-ds-white text-lg">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-ds-smoke transition-transform duration-300 shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-ds-silver leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
