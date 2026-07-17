import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function WhatsAppButton() {
  const { settings } = useSettings();
  
  // Normalize phone number for WhatsApp link
  const numericPhone = settings.contactPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${numericPhone || '919999999999'}`;

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      href={whatsappUrl} 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-green-600 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:scale-105 hover:bg-green-500 transition-all flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
