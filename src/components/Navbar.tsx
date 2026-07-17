import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', hasMegaMenu: true },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Industries', path: '/industries' },
  { name: 'AI Solutions', path: '/ai-solutions' },
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const serviceCategories = [
  {
    title: 'Website Solutions',
    links: ['Website Design', 'Website Development', 'Landing Pages', 'Business Websites', 'Corporate Websites', 'E-Commerce', 'Custom Web Applications', 'Website Redesign', 'Website Maintenance']
  },
  {
    title: 'Marketing Solutions',
    links: ['Search Engine Optimization', 'Local SEO', 'Google Ads', 'Meta Ads', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Lead Generation']
  },
  {
    title: 'Branding & Creative',
    links: ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Graphic Design', 'Motion Graphics', 'Video Editing', 'Short-form Video', 'Presentation Design']
  },
  {
    title: 'AI & Automation',
    links: ['AI Chatbots', 'Business Automation', 'Workflow Automation', 'AI Content Assistance', 'Custom AI Integrations', 'AI Learning Platforms']
  }
];

export default function Navbar() {
  const { settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled || isMegaMenuOpen || isMobileMenuOpen ? 'bg-ds-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
        
        <Link to="/" className="relative z-20 transition-transform duration-300 hover:scale-[1.02]" onClick={() => setIsMegaMenuOpen(false)}>
          <Logo type="full" size={38} />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
              onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
            >
              <Link 
                to={link.path}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === link.path ? 'text-ds-white' : 'text-ds-silver hover:text-ds-white'
                }`}
              >
                {link.name}
                {link.hasMegaMenu && <ChevronDown size={14} className={`transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />}
              </Link>

              {/* Mega Menu Dropdown */}
              {link.hasMegaMenu && (
                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[900px] bg-ds-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <div className="p-10 grid grid-cols-4 gap-8">
                        {serviceCategories.map((category, idx) => (
                          <div key={idx}>
                            <h3 className="text-ds-white font-display font-medium text-lg mb-6 border-b border-white/10 pb-2">{category.title}</h3>
                            <ul className="space-y-3">
                              {category.links.map((item, i) => (
                                <li key={i}>
                                  <Link to="/services" className="text-ds-smoke hover:text-ds-white text-sm transition-colors block">
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="bg-ds-graphite/50 p-6 flex justify-between items-center border-t border-white/5">
                        <p className="text-ds-silver text-sm">Need a custom solution for your enterprise?</p>
                        <Link to="/dashboard" className="text-ds-white text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
                          Access OS System <ArrowRight size={16} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <Link to="/dashboard" className="text-xs font-mono uppercase tracking-widest text-ds-white hover:text-ds-white transition-colors border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/5 bg-ds-graphite/50 backdrop-blur-sm">
            Portal
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-ds-white hover:opacity-70 transition-opacity relative z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-0 left-0 w-full bg-ds-black/95 backdrop-blur-xl z-10 pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pb-20">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-2xl font-display text-ds-white border-b border-white/10 pb-4"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
