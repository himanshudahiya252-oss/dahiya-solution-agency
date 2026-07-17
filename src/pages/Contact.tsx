import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, MessageCircle, Clock, Check, AlertCircle } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { useSettings } from '../context/SettingsContext';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const { settings } = useSettings();
  
  // Form State
  const [inquiryType, setInquiryType] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Normalize phone number for whatsapp link (e.g., "919999999999")
  const numericPhone = settings.contactPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${numericPhone || '919999999999'}`;
  const mailtoUrl = `mailto:${settings.contactEmail}`;
  const telUrl = `tel:${settings.contactPhone}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inquiryType) {
      setStatus('error');
      setErrorMessage('Please select an inquiry type.');
      return;
    }
    if (!fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!details.trim()) {
      setStatus('error');
      setErrorMessage('Please provide project details.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await emailjs.send(
        'service_9edfe1f',
        'template_qzlwkwh',
        {
          name: fullName,
          email: email,
          phone: phone,
          message: details,
          service: inquiryType,
          date: new Date().toLocaleString()
        },
        'N1WywWlDD9kJZRJTY'
      );

      setInquiryType('');
      setFullName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setDetails('');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to send enquiry. Please try again.');
    }
  };

  return (
    <div className="bg-ds-black min-h-screen">
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-ds-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Left Col: Info */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-ds-white tracking-tighter mb-8"
              >
                Initiate <br/>
                <span className="text-ds-smoke">Contact.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-ds-silver font-light leading-relaxed mb-16 max-w-md"
              >
                We collaborate with ambitious organizations to architect their digital future. Request a consultation with our senior team. Expect a response within 24 business hours.
              </motion.p>

              <div className="flex gap-4 mb-16">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex-1 glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
                  <MessageCircle size={20} className="text-[#25D366]" />
                  <span className="text-ds-white font-medium group-hover:text-[#25D366] transition-colors">WhatsApp</span>
                </a>
                <a href={mailtoUrl} className="flex-1 glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
                  <Mail size={20} className="text-ds-blue" />
                  <span className="text-ds-white font-medium group-hover:text-ds-blue transition-colors">Email</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ds-graphite rounded-full flex items-center justify-center shrink-0 border border-white/5">
                    <Phone className="w-4 h-4 text-ds-silver" />
                  </div>
                  <div>
                    <div className="text-xs text-ds-smoke mb-1 uppercase tracking-widest font-mono">Direct Line</div>
                    <a href={telUrl} className="text-ds-white hover:text-ds-blue transition-colors">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ds-graphite rounded-full flex items-center justify-center shrink-0 border border-white/5">
                    <Clock className="w-4 h-4 text-ds-silver" />
                  </div>
                  <div>
                    <div className="text-xs text-ds-smoke mb-1 uppercase tracking-widest font-mono">Business Hours</div>
                    <div className="text-ds-white">
                      Mon - Fri: 9am - 6pm (EST)
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-ds-graphite/50" />
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:w-1/2 aspect-square sm:aspect-auto sm:h-32 rounded-2xl overflow-hidden bg-ds-black relative">
                    <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <MapPin size={24} className="text-ds-blue" />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="text-xs text-ds-smoke mb-1 uppercase tracking-widest font-mono">Headquarters</div>
                    <div className="text-ds-white leading-relaxed font-medium text-sm">
                      {settings.contactAddress}
                    </div>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(settings.contactAddress)}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm text-ds-blue mt-2 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      Get Directions <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-8 md:p-12 rounded-3xl h-fit"
            >
              <h2 className="text-2xl font-display text-ds-white mb-2">Request Consultation</h2>
              <p className="text-ds-smoke text-sm mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2 ml-4">Inquiry Type</label>
                  <select 
                    value={inquiryType}
                    onChange={(e) => {
                      setInquiryType(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'loading'}
                    className="w-full bg-ds-black/50 border border-white/10 rounded-full px-6 py-4 text-ds-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer disabled:opacity-55"
                  >
                    <option value="">Select an option...</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="ai">AI & Automation</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      disabled={status === 'loading'}
                      className="w-full bg-ds-black/50 border border-white/10 rounded-full px-6 py-4 text-ds-white focus:outline-none focus:border-white/30 transition-colors disabled:opacity-55" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2 ml-4">Company</label>
                    <input 
                      type="text" 
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      disabled={status === 'loading'}
                      className="w-full bg-ds-black/50 border border-white/10 rounded-full px-6 py-4 text-ds-white focus:outline-none focus:border-white/30 transition-colors disabled:opacity-55" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2 ml-4">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      disabled={status === 'loading'}
                      className="w-full bg-ds-black/50 border border-white/10 rounded-full px-6 py-4 text-ds-white focus:outline-none focus:border-white/30 transition-colors disabled:opacity-55" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2 ml-4">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      disabled={status === 'loading'}
                      className="w-full bg-ds-black/50 border border-white/10 rounded-full px-6 py-4 text-ds-white focus:outline-none focus:border-white/30 transition-colors disabled:opacity-55" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-ds-smoke mb-2 ml-4">Project Details</label>
                  <textarea 
                    rows={4} 
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'loading'}
                    placeholder="Tell us about your objectives, timeline, and budget..." 
                    className="w-full bg-ds-black/50 border border-white/10 rounded-3xl px-6 py-4 text-ds-white focus:outline-none focus:border-white/30 transition-colors resize-none placeholder:text-ds-smoke/50 disabled:opacity-55"
                  />
                </div>

                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3"
                  >
                    <Check className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <div className="font-semibold text-emerald-400 text-sm">Consultation Requested</div>
                      <div className="text-xs text-emerald-500/80 mt-1">Thank you. Your enquiry has been submitted successfully.</div>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3"
                  >
                    <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-red-400">{errorMessage}</div>
                  </motion.div>
                )}

                <MagneticButton 
                  variant="primary" 
                  type="submit" 
                  disabled={status === 'loading'} 
                  className="w-full group mt-4 cursor-pointer disabled:opacity-55"
                >
                  {status === 'loading' ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
