import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <section className="py-32 px-6 md:px-12 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8"
        >
          Initiate Transformation
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl text-white tracking-tighter mb-12"
        >
          Ready to build your <br className="hidden md:block"/> digital future?
        </motion.h2>

        <Link to="/contact">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Contact Our Team
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
