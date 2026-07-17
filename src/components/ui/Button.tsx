import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  className?: string;
  asMotion?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, asMotion, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ds-blue/50 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-ds-blue text-white hover:bg-ds-blue/90 shadow-lg shadow-ds-blue/20",
      secondary: "bg-ds-white text-ds-black hover:bg-white/90",
      outline: "border border-white/10 text-ds-white hover:bg-white/5",
      ghost: "text-ds-silver hover:text-ds-white hover:bg-white/5",
      glass: "bg-white/5 backdrop-blur-md border border-white/10 text-ds-white hover:bg-white/10",
      danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
      success: "bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-11 w-11",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asMotion) {
      const motionProps = props as HTMLMotionProps<"button">;
      return (
        <motion.button 
          ref={ref as any}
          className={combinedClassName} 
          disabled={disabled || isLoading}
          whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
          whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
          {...motionProps}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {children}
        </motion.button>
      );
    }

    return (
      <button 
        ref={ref}
        className={combinedClassName} 
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
