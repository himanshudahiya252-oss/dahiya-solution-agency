import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Code2, 
  Smartphone, 
  BarChart3, 
  TrendingUp, 
  Share2, 
  Film,
  Compass
} from 'lucide-react';
import { Button } from '../../components/ui';

interface VideoTheme {
  id: string;
  label: string;
  videoUrl: string;
  fallbackImg: string;
  tagline: string;
}

// 7 Realistic cinematic background video themes
const videoThemes: VideoTheme[] = [
  {
    id: 'ai-solutions',
    label: 'AI Technology',
    videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0542d87e143fa1bcaf269542478937a&profile_id=139&oauth2_token_id=57447761',
    fallbackImg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Deep neural networks and adaptive cognitive systems.'
  },
  {
    id: 'web-dev',
    label: 'Website Development',
    videoUrl: 'https://player.vimeo.com/external/540092284.sd.mp4?s=6a57c525f0a7f14b306b3e75878fe9fb73778550&profile_id=165&oauth2_token_id=57447761',
    fallbackImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Next-generation web architectures and custom-built enterprise systems.'
  },
  {
    id: 'app-dev',
    label: 'App Development',
    videoUrl: 'https://player.vimeo.com/external/409217645.sd.mp4?s=ce9fb4e68e0d9b13994c502598bebc64f52e3794&profile_id=164&oauth2_token_id=57447761',
    fallbackImg: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Premium native mobile designs and responsive cross-platform architectures.'
  },
  {
    id: 'business-analytics',
    label: 'Business Analytics',
    videoUrl: 'https://player.vimeo.com/external/517614068.sd.mp4?s=339659a8435d6dfb8d4f0d367c33003af87c932a&profile_id=164&oauth2_token_id=57447761',
    fallbackImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Real-time performance metrics and predictive analytics dashboards.'
  },
  {
    id: 'digital-marketing',
    label: 'Digital Marketing',
    videoUrl: 'https://player.vimeo.com/external/384350529.sd.mp4?s=27a9226154563456886f3f019054743c72b2ff5c&profile_id=139&oauth2_token_id=57447761',
    fallbackImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Accelerating user conversion, performance marketing, and creative campaigns.'
  },
  {
    id: 'social-media',
    label: 'Social Media',
    videoUrl: 'https://player.vimeo.com/external/384350529.sd.mp4?s=27a9226154563456886f3f019054743c72b2ff5c&profile_id=139&oauth2_token_id=57447761',
    fallbackImg: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Social brand ecosystems, targeted positioning, and viral reach.'
  },
  {
    id: 'video-production',
    label: 'Video Production',
    videoUrl: 'https://player.vimeo.com/external/435674703.sd.mp4?s=6f4116190da21d9f12db14e36691063fc7af3399&profile_id=165&oauth2_token_id=57447761',
    fallbackImg: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    tagline: 'High-end post-production editing, dynamic content, and cinema assets.'
  }
];

interface FloatingCardData {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  themeIndex: number;
  top: string;
  right: string;
  duration: number;
  delay: number;
  yOffset: number;
  iconColor: string;
}

// 7 premium floating service cards arranged dynamically
const floatingCards: FloatingCardData[] = [
  {
    id: 'ai-solutions',
    name: 'AI Solutions',
    subtitle: 'Neural Models & Logic',
    icon: Sparkles,
    themeIndex: 0,
    top: '12%',
    right: '25%',
    duration: 5.5,
    delay: 0.1,
    yOffset: 12,
    iconColor: 'text-ds-blue'
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    subtitle: 'High-Performance Apps',
    icon: Code2,
    themeIndex: 1,
    top: '23%',
    right: '2%',
    duration: 6.2,
    delay: 0.5,
    yOffset: 16,
    iconColor: 'text-ds-cyan'
  },
  {
    id: 'app-dev',
    name: 'App Development',
    subtitle: 'iOS & Android Systems',
    icon: Smartphone,
    themeIndex: 2,
    top: '39%',
    right: '18%',
    duration: 5.8,
    delay: 0.3,
    yOffset: 14,
    iconColor: 'text-purple-400'
  },
  {
    id: 'business-analytics',
    name: 'Business Analytics',
    subtitle: 'Insight & Telemetry',
    icon: BarChart3,
    themeIndex: 3,
    top: '55%',
    right: '27%',
    duration: 6.8,
    delay: 0.7,
    yOffset: 18,
    iconColor: 'text-emerald-400'
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    subtitle: 'Growth & Optimization',
    icon: TrendingUp,
    themeIndex: 4,
    top: '71%',
    right: '8%',
    duration: 6.0,
    delay: 0.2,
    yOffset: 15,
    iconColor: 'text-pink-400'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    subtitle: 'Brand Reach & Buzz',
    icon: Share2,
    themeIndex: 5,
    top: '51%',
    right: '1%',
    duration: 5.2,
    delay: 0.6,
    yOffset: 13,
    iconColor: 'text-blue-400'
  },
  {
    id: 'video-production',
    name: 'Video Production',
    subtitle: 'Cinematic Storytelling',
    icon: Film,
    themeIndex: 6,
    top: '83%',
    right: '21%',
    duration: 7.0,
    delay: 0.4,
    yOffset: 20,
    iconColor: 'text-red-400'
  }
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active theme index state
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const currentTheme = videoThemes[activeThemeIndex];

  // Auto-rotate themes slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThemeIndex((prev) => (prev + 1) % videoThemes.length);
    }, 15000); // 15 seconds per theme
    return () => clearInterval(interval);
  }, []);

  // Mouse coordinates for Apple-inspired subtle 3D parallax depth
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });

  // Handle mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Range: -0.5 to 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Smooth mouse interpolation loop
  useEffect(() => {
    let animationFrameId: number;
    const updateSmoothCoords = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08
      }));
      animationFrameId = requestAnimationFrame(updateSmoothCoords);
    };
    animationFrameId = requestAnimationFrame(updateSmoothCoords);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Clean, high-fidelity neural connection particle network on Canvas
  // (Particle effects removed as requested)

  return (
    <section 
      ref={containerRef}
      id="hero-cinematic"
      className="relative min-h-screen lg:h-[105vh] flex flex-col items-center justify-center overflow-hidden bg-ds-black px-6 pt-32 pb-20 md:pb-12 border-b border-white/5"
    >
      {/* 1. PREMIUM FULL-SCREEN VIDEO CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none">
        <AnimatePresence>
          <motion.div
            key={currentTheme.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* HTML5 Background Video - Now fully active on all screen sizes */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={currentTheme.fallbackImg}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
            >
              <source src={currentTheme.videoUrl} type="video/mp4" />
            </video>

            {/* Static overlay fallback */}
            <div 
              className="absolute inset-0 bg-cover bg-center sm:hidden opacity-30"
              style={{ backgroundImage: `url(${currentTheme.fallbackImg})` }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Translucent glass blur overlays for clean readability & deep spatial depth */}
        <div className="absolute inset-0 bg-ds-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ds-black/60 via-transparent to-ds-black" />
      </div>

      {/* 3. CORE PRESENTATION CONTAINER */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Clean, Minimal, Impactful Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Subtle Enterprise Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-ds-white mb-6 backdrop-blur-2xl shadow-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-blue"></span>
            </span>
            <span className="tracking-[0.18em] font-semibold uppercase text-ds-white">Dahiya Solution</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-ds-silver tracking-wide">Elite Digital Engineering</span>
          </motion.div>


          {/* Hero Main Header: Clean and Minimal */}
          <div className="space-y-4 mb-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-ds-silver/70 font-mono text-xs uppercase tracking-[0.35em] font-semibold"
            >
              Architecting Digital Ecosystems
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-ds-white leading-[1.08] drop-shadow-2xl"
            >
              We Build Premium <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ds-blue via-ds-cyan to-purple-400 drop-shadow-[0_2px_15px_rgba(96,165,250,0.25)]">Digital Experiences</span>
            </motion.h1>
          </div>

          {/* Clean, Non-Glitchy Supporting Copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl text-ds-silver text-sm md:text-lg font-light leading-relaxed mb-10 text-center lg:text-left drop-shadow-md"
          >
            We merge sophisticated <span className="text-ds-white font-medium">web architectures</span>, intelligent <span className="text-ds-cyan font-medium">AI integrations</span>, high-performance <span className="text-ds-white font-medium">applications</span>, and creative <span className="text-ds-blue font-medium">cinematic production</span> to scale ambitious businesses globally.
          </motion.p>

          {/* Premium Control Buttons (Magnetic Spring feel, Soft Animations, No Aggressive Effects) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4.5 w-full sm:w-auto"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ 
                  scale: 1.03, 
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.45), 0 8px 10px -6px rgba(59, 130, 246, 0.45)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-ds-blue text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-colors duration-300 hover:bg-ds-blue/90 cursor-pointer text-sm tracking-wide gap-2"
              >
                Start Your Project 
                <ArrowRight size={16} />
              </motion.button>
            </Link>

            <Link to="/services" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ 
                  scale: 1.03, 
                  y: -2,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-ds-white font-semibold rounded-full transition-all duration-300 cursor-pointer text-sm"
              >
                Explore Services
              </motion.button>
            </Link>
          </motion.div>

          {/* Active Live Ecosystem Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 py-2.5 px-4.5 rounded-xl bg-ds-graphite/40 border border-white/5 backdrop-blur-xl flex items-center gap-2.5 text-left"
          >
            <div className="w-2 h-2 bg-ds-blue rounded-full animate-pulse" />
            <div className="text-[10px] font-mono text-ds-smoke uppercase tracking-wider">
              Focus: <span className="text-ds-white font-medium">{currentTheme.tagline}</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: 7 Floating Glassmorphism Cards (Desktop Only) */}
        <div className="lg:col-span-5 relative w-full h-[540px] hidden lg:flex items-center justify-center">
          
          {/* Subtle Concentric System Rings */}
          <div className="absolute w-[440px] h-[440px] border border-white/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '100s' }} />
          <div className="absolute w-[280px] h-[280px] border border-ds-blue/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />

          {/* Render 7 Floating Service Elements */}
          {floatingCards.map((card) => {
            const CardIcon = card.icon;
            const isHovered = activeThemeIndex === card.themeIndex;

            return (
              <motion.div 
                key={card.id}
                style={{ 
                  x: smoothMouse.x * 25, 
                  y: smoothMouse.y * 25,
                  position: 'absolute',
                  top: card.top,
                  right: card.right,
                }}
                className="w-[195px] pointer-events-auto"
                onMouseEnter={() => setActiveThemeIndex(card.themeIndex)}
              >
                {/* 1. Slow, Water-like Organic Floating Loop */}
                <motion.div
                  animate={{
                    y: [0, -card.yOffset, 0],
                    rotate: [0, 0.4, -0.4, 0]
                  }}
                  transition={{
                    duration: card.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay
                  }}
                >
                  {/* 2. Responsive Apple-Inspired Smooth Spring Hover Interaction */}
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      borderColor: 'rgba(255, 255, 255, 0.22)',
                      boxShadow: '0 20px 35px rgba(0, 0, 0, 0.35)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={`p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
                      isHovered 
                        ? 'border-ds-blue/50 bg-white/[0.07] shadow-xl shadow-ds-blue/10 scale-[1.02]' 
                        : 'border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.22)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${card.iconColor}`}>
                        <CardIcon size={14} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-semibold text-ds-white tracking-tight">{card.name}</div>
                        <div className="text-[9px] font-mono text-ds-smoke uppercase tracking-wider mt-0.5">{card.subtitle}</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}

        </div>

      </div>

      {/* 4. RESPONSIVE MOBILE SERVICE GRID */}
      {/* On mobile, cards render in a beautiful horizontal list or structured grid beneath main content to ensure absolute legibility */}
      <div className="w-full max-w-lg mt-14 lg:hidden relative z-20">
        <p className="text-center text-[10px] font-mono text-ds-smoke uppercase tracking-widest mb-4">
          Tap elements to interact & load visual focus
        </p>
        <div className="grid grid-cols-2 gap-3">
          {floatingCards.map((card) => {
            const CardIcon = card.icon;
            const isHovered = activeThemeIndex === card.themeIndex;

            return (
              <button
                key={card.id}
                onClick={() => setActiveThemeIndex(card.themeIndex)}
                className={`p-3 rounded-xl backdrop-blur-xl border text-left transition-all duration-300 flex items-center gap-2.5 active:scale-95 ${
                  isHovered 
                    ? 'bg-ds-blue/10 border-ds-blue text-ds-white' 
                    : 'bg-white/5 border-white/10 text-ds-silver'
                }`}
              >
                <div className={`p-1 rounded-lg bg-white/5 ${card.iconColor}`}>
                  <CardIcon size={14} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ds-white">{card.name}</div>
                  <div className="text-[8px] font-mono text-ds-smoke mt-0.5">{card.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ATMOSPHERIC THEME HUB CONTROLLER (Desktop Only) */}
      <div className="absolute bottom-10 right-6 md:right-10 z-30 hidden sm:flex flex-col items-end gap-2 bg-ds-graphite/40 backdrop-blur-xl p-4.5 border border-white/10 rounded-2xl max-w-sm">
        <span className="text-[10px] font-mono text-ds-silver uppercase tracking-widest flex items-center gap-2">
          <Compass size={12} className="text-ds-blue" /> Select Experience Focus
        </span>
        <div className="grid grid-cols-2 gap-1.5 mt-2.5 w-full">
          {videoThemes.map((theme, i) => (
            <button 
              key={theme.id}
              onClick={() => setActiveThemeIndex(i)}
              className={`px-3 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeThemeIndex === i 
                  ? 'bg-ds-blue text-white font-bold shadow-lg shadow-ds-blue/25 border border-ds-blue/40' 
                  : 'bg-white/5 text-ds-smoke border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      {/* 6. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 cursor-pointer pointer-events-auto"
        onClick={() => {
          document.getElementById('trust-visuals-strip')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] uppercase tracking-widest text-ds-smoke font-mono">Explore Solutions</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-ds-silver" />
        </motion.div>
      </motion.div>

    </section>
  );
}
