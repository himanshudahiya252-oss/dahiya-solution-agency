import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section className="py-40 px-6 md:px-12 bg-black overflow-hidden flex items-center justify-center text-center">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {["Beauty without speed is failure.", "Luxury without usability is failure.", "Animation without purpose is failure."].map((text, i) => (
            <motion.h3 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 + 0.5 }}
              className="font-display text-2xl md:text-4xl lg:text-5xl text-zinc-700 tracking-tight"
            >
              {text}
            </motion.h3>
          ))}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5 }}
            className="pt-12"
          >
            <p className="text-white font-display text-xl md:text-2xl">
              We engineer perfection.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
