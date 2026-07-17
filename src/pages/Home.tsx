import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { 
  HeroSection, 
  TrustVisuals,
  TrustStrip, 
  QuickServices, 
  CompanyIntro, 
  WhyChooseUs,
  ServiceExperienceHub
} from './home';

import ProcessGalleryContact from './home/ProcessGalleryContact';
import AIBusinessAssistant from '../components/AIBusinessAssistant';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
        <HeroSection />
        <TrustVisuals />
        <TrustStrip />
        <QuickServices onSelectService={(id) => setActiveServiceId(id)} />
        <CompanyIntro />
        <WhyChooseUs />
        <ServiceExperienceHub activeServiceId={activeServiceId} onSelectService={(id) => setActiveServiceId(id)} />
        
        <ProcessGalleryContact />

        {/* Floating AI Business Assistant */}
        <AIBusinessAssistant />
      </div>
    </>
  );
}
