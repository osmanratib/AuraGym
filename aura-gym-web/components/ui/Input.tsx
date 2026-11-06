'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(2, 9);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-aura-slate"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full bg-[#FAF9F6] border border-black/10 rounded-xl px-4 py-3 text-aura-ink placeholder:text-aura-mist text-sm transition-all duration-200 outline-none focus:bg-white focus:border-aura-ember focus:ring-1 focus:ring-aura-ember shadow-sm',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-aura-slate mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
