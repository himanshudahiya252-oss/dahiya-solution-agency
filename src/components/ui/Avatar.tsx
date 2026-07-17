import { HTMLAttributes, forwardRef } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, fallback, size = 'md', ...props }, ref) => {
    
    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-14 h-14 text-base'
    };

    return (
      <div 
        ref={ref}
        className={`relative flex shrink-0 overflow-hidden rounded-full bg-ds-graphite border border-white/10 items-center justify-center ${sizes[size]} ${className}`}
        {...props}
      >
        {src ? (
          <img src={src} alt={fallback} className="aspect-square h-full w-full object-cover" />
        ) : (
          <span className="font-medium text-ds-silver uppercase">{fallback.substring(0, 2)}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';
