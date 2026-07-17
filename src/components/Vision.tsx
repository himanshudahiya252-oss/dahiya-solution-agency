import { motion } from 'motion/react';

export default function Vision() {
  return (
    <section className="py-32 px-6 md:px-12 bg-black relative border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-12">
            The objective is not to impress with unnecessary complexity. <br/>
            <span className="text-zinc-600">The objective is to create confidence.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400 font-light text-lg">
            <p>
              Imagine entering an ultra-modern innovation campus. The building is silent. Everything is clean. Every light has purpose. Every object has intention. Nothing feels random.
            </p>
            <p>
              That is how we build digital experiences. Less clutter. More meaning. Less decoration. More storytelling. We transform complex business needs into elegant, powerful digital assets.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
