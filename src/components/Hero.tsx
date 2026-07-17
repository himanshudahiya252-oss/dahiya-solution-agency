import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import DigitalParticles from './DigitalParticles';

import bg1 from '../assets/images/futuristic_innovation_lab_1784271765964.jpg';
import bg2 from '../assets/images/abstract_digital_particles_1784271780742.jpg';
import bg3 from '../assets/images/ai_visualization_screens_1784271794578.jpg';

const backgrounds = [bg1, bg2, bg3];

const headlines = [
  "WE BUILD DIGITAL EXPERIENCES.",
  "WE DESIGN FOR THE FUTURE.",
  "AI-POWERED GROWTH.",
  "SMARTER DIGITAL STRATEGIES.",
];

const trustStripItems = [
  "Website Development",
  "Digital Marketing",
  "SEO",
  "Branding",
  "AI Solutions",
  "Automation",
  "Content Strategy"
];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);

    const headlineInterval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(bgInterval);
      clearInterval(headlineInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ds-black px-6 pt-20">
      
      {/* Background Sequence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
          />
        </AnimatePresence>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black/80 via-ds-black/50 to-ds-black pointer-events-none" />
        <div className="absolute inset-0 bg-ds-black/40 pointer-events-none mix-blend-multiply" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <DigitalParticles />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-ds-blue/5 rounded-full blur-[120px]"
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full mt-10">
        
        {/* Main Headline System */}
        <div className="h-[120px] md:h-[180px] flex items-center justify-center w-full mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={headlineIndex}
              initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-ds-white uppercase leading-[1.1]"
            >
              {headlines[headlineIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base md:text-xl text-ds-silver font-light leading-relaxed mb-12"
        >
          We help businesses strengthen their digital presence through thoughtful design, modern technology, AI-powered solutions, and effective digital marketing.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton variant="primary">
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </MagneticButton>

          <MagneticButton variant="text">
            Explore Our Work
          </MagneticButton>
        </motion.div>
      </div>

      {/* Trust Strip */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-24 left-0 w-full overflow-hidden z-10 flex py-4 border-y border-white/5 bg-ds-black/20 backdrop-blur-md"
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex items-center whitespace-nowrap"
        >
          {[...trustStripItems, ...trustStripItems].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-xs md:text-sm font-mono text-ds-smoke uppercase tracking-widest px-8">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-ds-steel" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ds-smoke">Scroll</span>
            <div className="w-px h-8 bg-ds-steel relative overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-ds-silver"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
