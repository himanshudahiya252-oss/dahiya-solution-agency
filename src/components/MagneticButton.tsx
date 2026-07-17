import { motion } from 'motion/react';
import React, { useRef, useState, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MagneticButton({ 
  children, 
  className = '', 
  variant = 'primary',
  onClick,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-ds-white text-ds-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]';
      case 'secondary':
        return 'glass-panel glass-panel-hover text-ds-white';
      case 'text':
        return 'text-ds-silver hover:text-ds-white px-0 py-0 border-b border-transparent hover:border-ds-white/30 rounded-none bg-transparent';
      default:
        return '';
    }
  };

  const baseStyles = 'group relative flex items-center justify-center gap-2 font-medium overflow-hidden transition-all duration-500';
  const paddingStyles = variant === 'text' ? '' : 'px-8 py-4 rounded-full';

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${paddingStyles} ${getVariantStyles()} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
