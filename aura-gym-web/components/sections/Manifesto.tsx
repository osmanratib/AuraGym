'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Line 1 opacity and translateY
  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [0.15, 1, 0.3]);
  const line1Y = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);

  // Line 2 opacity and translateY
  const line2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0.15, 1, 0.3]);
  const line2Y = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);

  // Line 3 opacity and translateY
  const line3Opacity = useTransform(scrollYProgress, [0.65, 0.8, 0.95], [0.15, 1, 1]);
  const line3Y = useTransform(scrollYProgress, [0.65, 0.8], [30, 0]);

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-aura-black">
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center max-w-content mx-auto px-6 md:px-12">
        <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-6 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-aura-ember" />
          <span>The Aura Gym Manifesto</span>
        </div>

        <div className="space-y-6 md:space-y-10 max-w-4xl">
          <motion.h2
            style={{ opacity: line1Opacity, y: line1Y }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-aura-bone leading-tight tracking-tight"
          >
            01. We do not build commercial gyms. We engineer elite environments where limits are methodically shattered.
          </motion.h2>

          <motion.h2
            style={{ opacity: line2Opacity, y: line2Y }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-aura-bone leading-tight tracking-tight"
          >
            02. Every barbell, cable angle, and light frequency is calibrated for raw neuromuscular power and focused intensity.
          </motion.h2>

          <motion.h2
            style={{ opacity: line3Opacity, y: line3Y }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-aura-bone leading-tight tracking-tight"
          >
            03. Recovery is not an afterthought — it is the scientific foundation where longevity and resilience are forged.
          </motion.h2>
        </div>
      </div>
    </div>
  );
}
