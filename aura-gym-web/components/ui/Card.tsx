'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
}

export default function Card({ children, glowOnHover = false, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-aura-graphite border border-white/5 rounded-card p-6 md:p-8 transition-all duration-300',
        glowOnHover && 'hover:border-aura-ember/30 hover:shadow-aura-glow hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
