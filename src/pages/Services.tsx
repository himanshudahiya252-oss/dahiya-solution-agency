import { motion } from 'motion/react';
import Section from '../components/Section';

import WebDevSection from './services/WebDevSection';
import MobileAppSection from './services/MobileAppSection';
import DigitalMarketingSection from './services/DigitalMarketingSection';
import SocialMediaSection from './services/SocialMediaSection';
import YouTubeManagementSection from './services/YouTubeManagementSection';
import VideoEditingSection from './services/VideoEditingSection';
import AIEducationSection from './services/AIEducationSection';
import DataAnalyticsSection from './services/DataAnalyticsSection';
import AIAutomationSection from './services/AIAutomationSection';
import BrandingSection from './services/BrandingSection';
import ProcessSection from './services/ProcessSection';
import ResultsSection from './services/ResultsSection';
import FAQSection from './services/FAQSection';

export default function ServicesPage() {
  return (
    <div className="bg-ds-black min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ds-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-ds-white tracking-tighter mb-6"
          >
            Digital <span className="text-ds-smoke">Ecosystems.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-ds-silver max-w-2xl mx-auto font-light leading-relaxed"
          >
            We engineer premium digital solutions that scale. From intelligent web platforms and mobile applications to data-driven marketing systems and AI automation.
          </motion.p>
        </div>
      </section>

      <WebDevSection />
      <MobileAppSection />
      <DigitalMarketingSection />
      <SocialMediaSection />
      <YouTubeManagementSection />
      <VideoEditingSection />
      <AIEducationSection />
      <DataAnalyticsSection />
      <AIAutomationSection />
      <BrandingSection />
      <ProcessSection />
      <ResultsSection />
      <FAQSection />

    </div>
  );
}
