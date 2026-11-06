'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export default function Card({ children, hoverEffect = true, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white border border-black/[0.06] rounded-card p-6 md:p-8 transition-all duration-300 shadow-aura-card',
        hoverEffect && 'hover:border-black/15 hover:shadow-aura-card-hover hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
