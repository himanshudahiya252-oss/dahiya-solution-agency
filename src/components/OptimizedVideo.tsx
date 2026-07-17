import React from 'react';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

export const OptimizedVideo = ({ src, className = "", poster }: OptimizedVideoProps) => {
  return (
    <video 
      src={src} 
      autoPlay 
      loop 
      muted 
      playsInline
      poster={poster}
      className={`object-cover ${className}`}
    />
  );
};
