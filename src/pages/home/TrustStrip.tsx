import { motion } from 'motion/react';
import { 
  GraduationCap, 
  HeartPulse, 
  ShoppingBag, 
  Utensils, 
  Building2, 
  Factory, 
  Rocket, 
  Briefcase, 
  Landmark, 
  Cpu 
} from 'lucide-react';

const industries = [
  { name: 'Education', icon: GraduationCap },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Restaurants', icon: Utensils },
  { name: 'Real Estate', icon: Building2 },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Startups', icon: Rocket },
  { name: 'Professional Services', icon: Briefcase },
  { name: 'Finance', icon: Landmark },
  { name: 'Technology', icon: Cpu },
];

export function TrustStrip() {
  return (
    <div className="w-full bg-ds-black py-10 border-y border-white/5 relative overflow-hidden z-20">
      {/* Gradients to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ds-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ds-black to-transparent z-10" />
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex items-center w-max"
      >
        {[...industries, ...industries].map((industry, index) => {
          const Icon = industry.icon;
          return (
            <div key={index} className="flex items-center gap-3 px-12 group cursor-pointer">
              <Icon size={20} className="text-ds-smoke group-hover:text-ds-white transition-colors duration-300" />
              <span className="text-sm font-display text-ds-smoke group-hover:text-ds-white uppercase tracking-widest transition-colors duration-300">
                {industry.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
