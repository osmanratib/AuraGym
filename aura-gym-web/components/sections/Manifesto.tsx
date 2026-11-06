'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Tighter, more intentional timing per line with clean ease
  const l1Opacity = useTransform(scrollYProgress, [0.0, 0.12, 0.3], [0.08, 1, 0.2]);
  const l1Y = useTransform(scrollYProgress, [0.0, 0.12], [24, 0]);

  const l2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.62], [0.08, 1, 0.2]);
  const l2Y = useTransform(scrollYProgress, [0.3, 0.45], [24, 0]);

  const l3Opacity = useTransform(scrollYProgress, [0.62, 0.78, 0.95], [0.08, 1, 1]);
  const l3Y = useTransform(scrollYProgress, [0.62, 0.78], [24, 0]);

  // Subtle ember accent bar growing on scroll
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center bg-aura-canvas">
        <div className="max-w-content mx-auto px-6 md:px-12 w-full">
          {/* Section label */}
          <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-8 flex items-center gap-3">
            <motion.div
              style={{ scaleX: barScaleX, originX: 0 }}
              className="w-10 h-[1.5px] bg-aura-ember"
            />
            <span>The Manifesto</span>
          </div>

          <div className="space-y-8 md:space-y-10 max-w-4xl">
            <motion.h2
              style={{ opacity: l1Opacity, y: l1Y }}
              className="font-heading font-bold text-2xl sm:text-3xl md:text-[2.75rem] lg:text-5xl text-aura-ink leading-[1.15] tracking-[-0.03em]"
            >
              We don&apos;t build commercial gyms. We engineer environments where limits are methodically shattered.
            </motion.h2>

            <motion.h2
              style={{ opacity: l2Opacity, y: l2Y }}
              className="font-heading font-bold text-2xl sm:text-3xl md:text-[2.75rem] lg:text-5xl text-aura-ink leading-[1.15] tracking-[-0.03em]"
            >
              Every barbell, cable angle, and light frequency is calibrated for focused neuromuscular power.
            </motion.h2>

            <motion.h2
              style={{ opacity: l3Opacity, y: l3Y }}
              className="font-heading font-bold text-2xl sm:text-3xl md:text-[2.75rem] lg:text-5xl text-aura-ink leading-[1.15] tracking-[-0.03em]"
            >
              Recovery is not optional — it is where longevity and resilience are forged.
            </motion.h2>
          </div>
        </div>
      </div>
    </div>
  );
}
