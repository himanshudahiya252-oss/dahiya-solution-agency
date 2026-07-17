import { motion } from 'motion/react';

export default function TermsPage() {
  return (
    <div className="bg-ds-black min-h-screen">
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-ds-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-ds-white tracking-tighter mb-8"
          >
            Terms of Service
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg text-ds-silver font-light leading-relaxed space-y-6"
          >
            <p className="text-xl text-ds-white font-medium mb-8">
              Welcome to Dahiya Solution. By accessing our platform, website, or services, you agree to be bound by these Terms of Service.
            </p>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">1. Scope of Services</h2>
              <p className="mb-4">
                We deliver world-class digital development, UI/UX design, performance marketing, video editing, and custom AI systems integration. The specific deliverables of any custom project will be defined in a separate mutually signed Statement of Work (SOW).
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">2. Intellectual Property</h2>
              <p className="mb-4">
                All platform architectures, visual UI models, design code, and written material developed by us remain the proprietary intellectual property of Dahiya Solution until full payment is received. Upon project completion and payment settlement, all customized client assets are transferred to the client.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">3. Prohibited Conduct</h2>
              <p className="mb-4">
                Users are strictly forbidden from attempting to penetrate, inject, or breach our server-side networks, using automated scrapers on our resources, or representing their brand as affiliated with us without our explicit written consent.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">4. Limitation of Liability</h2>
              <p className="mb-4">
                Under no circumstances shall Dahiya Solution be held liable for any indirect, incidental, or consequential damages arising from service downtime, platform upgrades, or third-party API disruptions beyond our control.
              </p>
            </div>
            <p className="pt-8 text-xs font-mono text-ds-smoke">
              Last updated: July 2026. For questions or support, contact support@dahiyasolution.com
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
