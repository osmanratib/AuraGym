'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 font-heading tracking-wide uppercase text-xs focus:outline-none focus:ring-2 focus:ring-aura-ember/50 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-aura-ember text-aura-black font-semibold hover:bg-aura-ember-hover shadow-aura-glow hover:shadow-aura-glow-strong hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-aura-graphite text-aura-bone border border-white/10 hover:border-white/20 hover:bg-[#202026] hover:scale-[1.01] active:scale-[0.98]',
    outline:
      'border border-aura-ember text-aura-ember hover:bg-aura-ember hover:text-aura-black hover:shadow-aura-glow',
    ghost:
      'text-aura-bone hover:text-aura-ember hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[11px] tracking-wider',
    md: 'px-6 py-3 text-xs tracking-wider',
    lg: 'px-8 py-4 text-sm tracking-widest font-bold',
  };

  const combinedClasses = clsx(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
