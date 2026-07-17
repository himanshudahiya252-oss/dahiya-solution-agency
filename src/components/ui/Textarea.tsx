import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          className={`
            w-full bg-ds-black border border-white/10 rounded-xl px-4 py-3 text-sm text-ds-white 
            focus:outline-none focus:border-ds-blue/50 focus:ring-1 focus:ring-ds-blue/50 transition-colors 
            placeholder:text-ds-smoke disabled:opacity-50 disabled:cursor-not-allowed resize-none
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-500 ml-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
