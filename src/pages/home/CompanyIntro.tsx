import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Logo from '../../components/Logo';

const stats = [
  { label: "Active Clients", value: 25, suffix: "+" },
  { label: "Core Domains", value: 4, suffix: "" },
  { label: "Dedicated Experts", value: 12, suffix: "+" },
  { label: "Years of Innovation", value: 5, suffix: "+" },
];

function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ds-white">
      {count}{suffix}
    </span>
  );
}

export function CompanyIntro() {
  return (
    <section className="py-32 px-6 md:px-12 bg-ds-black relative overflow-hidden">
      {/* Background Visuals */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
           className="absolute -right-[20%] -top-[20%] w-[80vw] h-[80vw] rounded-full border border-white/[0.03] opacity-30"
        />
        <motion.div
           animate={{ rotate: -360 }}
           transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
           className="absolute -left-[10%] -bottom-[20%] w-[60vw] h-[60vw] rounded-full border border-white/[0.02] opacity-20"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Elite Official Logo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center"
        >
          <Logo type="showcase" size={90} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-ds-silver uppercase tracking-widest mb-8">
            Our Story
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-ds-white leading-[1.2] font-medium tracking-tight">
            We are not just an agency. <br className="hidden md:block" />
            <span className="text-ds-silver">We are your dedicated digital engineering partner.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-ds-smoke font-light leading-relaxed max-w-3xl mx-auto mb-24"
        >
          Driven by innovation and powered by AI, we engineer solutions that transform ambitious ideas into market-leading realities. We believe in transparency, premium quality, and results that speak for themselves.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:h-px before:top-1/2 before:-translate-y-1/2 md:before:block before:hidden">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="flex flex-col items-center justify-center p-6"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="mt-4 text-xs md:text-sm font-mono text-ds-smoke uppercase tracking-widest text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-xs text-ds-silver/50 font-mono italic"
        >
          *Note: These statistics are connected to your CMS and will update dynamically.
        </motion.div>
      </div>
    </section>
  );
}
