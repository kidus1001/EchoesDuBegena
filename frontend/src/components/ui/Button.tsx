// src/components/ui/Button.tsx
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer';

    const variants = {
        primary: 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-xl',
        secondary: 'bg-white/10 hover:bg-white/20 text-white border-2 border-amber-500',
        outline: 'bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} rounded-full ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};