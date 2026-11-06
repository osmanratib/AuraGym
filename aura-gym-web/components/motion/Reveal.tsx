'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 28, x: 0 };
      case 'down':
        return { y: -28, x: 0 };
      case 'left':
        return { x: 28, y: 0 };
      case 'right':
        return { x: -28, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = prefersReduced ? { x: 0, y: 0 } : getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: prefersReduced ? 0.2 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
