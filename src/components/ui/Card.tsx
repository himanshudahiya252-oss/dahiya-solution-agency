import { HTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { asMotion?: boolean; hoverable?: boolean }>(
  ({ className = '', asMotion, hoverable, ...props }, ref) => {
    const baseClass = `glass-panel rounded-2xl border border-white/5 overflow-hidden ${hoverable ? 'hover:border-white/10 hover:bg-white/[0.03] transition-colors' : ''} ${className}`;
    
    if (asMotion) {
      return (
        <motion.div 
          ref={ref as any}
          className={baseClass} 
          {...(props as HTMLMotionProps<"div">)} 
        />
      );
    }
    return <div ref={ref} className={baseClass} {...props} />;
  }
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-5 border-b border-white/5 flex flex-col space-y-1.5 ${className}`} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => (
    <h3 ref={ref} className={`text-lg font-medium text-ds-white leading-none tracking-tight ${className}`} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => (
    <p ref={ref} className={`text-sm text-ds-smoke ${className}`} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-t border-white/5 flex items-center ${className}`} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
