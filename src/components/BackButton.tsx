import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => navigate(-1)}
      className="fixed top-24 left-6 z-40 flex items-center gap-2 text-ds-silver hover:text-ds-white transition-colors bg-ds-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm"
    >
      <ArrowLeft size={16} />
      Back
    </motion.button>
  );
}
