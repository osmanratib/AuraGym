'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ember' | 'outline' | 'ghost';
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
    'inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-300 text-xs uppercase tracking-[0.14em] focus:outline-none select-none';

  const variants = {
    primary:
      'bg-aura-ink text-white hover:bg-aura-ember shadow-aura-sm hover:shadow-aura-glow hover:-translate-y-0.5 active:translate-y-0',
    ember:
      'bg-aura-ember text-white hover:bg-aura-ember-dark shadow-aura-glow hover:shadow-aura-glow-hover hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-white text-aura-ink border border-black/10 hover:border-black/25 hover:bg-aura-subtle shadow-aura-sm hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'border border-black/20 text-aura-ink hover:border-aura-ink hover:bg-aura-ink hover:text-white',
    ghost:
      'text-aura-slate hover:text-aura-ink hover:bg-black/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-3.5 text-[13px]',
  };

  const combinedClasses = clsx(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>Processing</span>
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
          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Processing</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
