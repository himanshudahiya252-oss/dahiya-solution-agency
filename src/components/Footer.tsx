import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, Mail, Check, AlertCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter an email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Subscriber',
          email: email,
          phone: 'N/A',
          service: 'Newsletter Subscription',
          message: 'New subscriber signup.',
          date: new Date().toLocaleString()
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Submission failed');

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="relative bg-ds-black border-t border-white/5 pt-32 pb-12 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-ds-blue/50 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ds-blue/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block font-display font-bold text-2xl text-ds-white tracking-tighter mb-6">
              {settings.businessLogoText}
            </Link>
            <p className="text-ds-smoke leading-relaxed mb-8 max-w-sm">
              Architecting the digital future. We build premium ecosystems that transform businesses into category leaders.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ds-silver hover:text-ds-white hover:border-white/30 transition-all group">
                <Twitter size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ds-silver hover:text-ds-white hover:border-white/30 transition-all group">
                <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ds-silver hover:text-ds-white hover:border-white/30 transition-all group">
                <Instagram size={16} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="mt-8 space-y-2 text-ds-smoke text-sm">
              <p>CEO: Sahil Dahiya</p>
              <p>Contact: +91 9992618109</p>
              <p>Dahiya Town, Devilal Colony,<br/>Mahendragarh, Haryana, 123029, India</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-ds-white mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-ds-silver hover:text-ds-white transition-colors flex items-center gap-2 group">About <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" /></Link></li>
              <li><Link to="/services" className="text-ds-silver hover:text-ds-white transition-colors flex items-center gap-2 group">Services <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" /></Link></li>
              <li><Link to="/portfolio" className="text-ds-silver hover:text-ds-white transition-colors flex items-center gap-2 group">Portfolio <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" /></Link></li>
              <li><Link to="/contact" className="text-ds-silver hover:text-ds-white transition-colors flex items-center gap-2 group">Contact <ArrowUpRight size={12} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" /></Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-ds-white mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-ds-silver hover:text-ds-white transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="text-ds-silver hover:text-ds-white transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services" className="text-ds-silver hover:text-ds-white transition-colors">Digital Marketing</Link></li>
              <li><Link to="/services" className="text-ds-silver hover:text-ds-white transition-colors">AI & Automation</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-ds-white mb-6">Stay Informed</h4>
            <p className="text-ds-smoke text-sm mb-6">
              Subscribe to receive digital insights, platform updates, and exclusive strategy reports.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  placeholder="Email Address" 
                  className="flex-1 bg-ds-graphite/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white focus:outline-none focus:border-ds-blue/50 transition-colors placeholder:text-ds-smoke disabled:opacity-55"
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-ds-blue hover:bg-ds-blue/90 text-white rounded-xl px-4 py-3 flex items-center justify-center transition-colors disabled:opacity-55 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Mail size={18} />
                  )}
                </button>
              </div>

              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-xs text-emerald-400 flex items-center gap-1.5"
                >
                  <Check size={14} /> Subscription successful! Thank you.
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-xs text-red-400 flex items-center gap-1.5"
                >
                  <AlertCircle size={14} /> {errorMessage}
                </motion.p>
              )}
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-mono text-xs uppercase tracking-widest text-ds-smoke">
            &copy; {new Date().getFullYear()} {settings.businessName}. All Rights Reserved.
          </div>
          <div className="flex gap-6 text-sm text-ds-smoke">
            <Link to="/privacy" className="hover:text-ds-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ds-white transition-colors">Terms of Service</Link>
            <Link to="/dashboard" className="hover:text-ds-white transition-colors opacity-40 hover:opacity-100 transition-opacity font-mono text-[11px] tracking-widest uppercase">Staff Gateway</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
