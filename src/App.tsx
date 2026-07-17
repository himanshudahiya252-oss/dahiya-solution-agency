import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import BackButton from './components/BackButton';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import IndustriesPage from './pages/Industries';
import AISolutionsPage from './pages/AISolutions';
import CareersPage from './pages/Careers';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import { useState } from 'react';

import DashboardPlaceholder from './pages/dashboard/DashboardPlaceholder';
import DashboardCRM from './pages/dashboard/DashboardCRM';
import DashboardAI from './pages/dashboard/DashboardAI';
import DashboardSettings from './pages/dashboard/DashboardSettings';
import DashboardServices from './pages/dashboard/DashboardServices';
import DashboardAnalytics from './pages/dashboard/DashboardAnalytics';

import { SettingsProvider } from './context/SettingsContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { MediaProvider } from './context/MediaContext';
import { ServiceProvider } from './context/ServiceContext';
import DashboardPortfolio from './pages/dashboard/DashboardPortfolio';
import { BlogProvider } from './context/BlogContext';
import ResourcesPage from './pages/Resources';
import ArticleDetailPage from './pages/ArticleDetail';
import DashboardCMS from './pages/dashboard/DashboardCMS';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <BackButton />
      <AnimatePresence mode="wait">
        {/* @ts-ignore */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/ai-solutions" element={<AISolutionsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ArticleDetailPage />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="crm" element={<DashboardCRM />} />
            <Route path="services" element={<DashboardServices />} />
            <Route path="messages" element={<DashboardPlaceholder title="Unified Inbox" />} />
            <Route path="cms" element={<DashboardCMS />} />
            <Route path="portfolio" element={<DashboardPortfolio />} />
            <Route path="academy" element={<DashboardPlaceholder title="AI Practice Exam Platform" />} />
            <Route path="clients" element={<DashboardPlaceholder title="Client Portal Manager" />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
            <Route path="ai" element={<DashboardAI />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
        </Routes>
      </AnimatePresence>
      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <MediaProvider>
      <SettingsProvider>
        <PortfolioProvider>
          <ServiceProvider>
            <BlogProvider>
              <AnimatePresence>
                {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
              </AnimatePresence>
              <div className={`min-h-screen bg-ds-black text-ds-white transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <CustomCursor />
                <AppContent />
                <BackToTop />
                <WhatsAppButton />
              </div>
            </BlogProvider>
          </ServiceProvider>
        </PortfolioProvider>
      </SettingsProvider>
    </MediaProvider>
  );
}

export default App;
