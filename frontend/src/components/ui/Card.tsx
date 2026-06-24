// src/components/ui/Card.tsx
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md'
}: CardProps) => {
  const paddingSizes = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverEffects = hover 
    ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' 
    : '';

  return (
    <div
      className={`
        bg-white/70 
        backdrop-blur-sm 
        rounded-lg 
        border 
        border-archive-gold/20 
        ${paddingSizes[padding]}
        ${hoverEffects}
        ${className}
      `}
    >
      {children}
    </div>
  );
};