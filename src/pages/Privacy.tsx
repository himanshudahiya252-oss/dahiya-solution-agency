import { motion } from 'motion/react';

export default function PrivacyPage() {
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
            Privacy Policy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg text-ds-silver font-light leading-relaxed space-y-6"
          >
            <p className="text-xl text-ds-white font-medium mb-8">
              Your privacy is of paramount importance to us. This policy outlines how Dahiya Solution handles, secures, and protects your information.
            </p>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">1. Information Collection</h2>
              <p className="mb-4">
                We collect information necessary to provide and improve our professional services. This may include personal identifier information such as names, email addresses, phone numbers, and company details when you submit inquiries through our contact forms or use our portal.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">2. Use of Information</h2>
              <p className="mb-4">
                The collected data is used exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Respond to your service requests and contact forms.</li>
                <li>Optimize our digital portal and client experiences.</li>
                <li>Send updates, security notices, and relevant newsletters.</li>
                <li>Maintain safety, security, and integrity across our platforms.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">3. Data Security & Storage</h2>
              <p className="mb-4">
                We employ advanced encryption algorithms and secure database environments to safeguard your personal data from unauthorized access, theft, or manipulation. We keep all confidential API credentials and sensitive data server-side behind secure firewalls.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-ds-white font-display font-medium mt-8 mb-4">4. Third-Party Sharing</h2>
              <p className="mb-4">
                We do not sell, rent, or trade your personal data. We only share details with trusted infrastructure providers (e.g. databases, hosting platforms) that are fully aligned with industry security compliance standards.
              </p>
            </div>
            <p className="pt-8 text-xs font-mono text-ds-smoke">
              Last updated: July 2026. If you have any questions, contact us directly at support@dahiyasolution.com
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
