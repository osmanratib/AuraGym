'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Snappy line opacity and vertical shift
  const l1Opacity = useTransform(scrollYProgress, [0.0, 0.18, 0.32], [0.1, 1, 0.15]);
  const l1Y = useTransform(scrollYProgress, [0.0, 0.18], [20, 0]);

  const l2Opacity = useTransform(scrollYProgress, [0.32, 0.5, 0.65], [0.15, 1, 0.15]);
  const l2Y = useTransform(scrollYProgress, [0.32, 0.5], [20, 0]);

  const l3Opacity = useTransform(scrollYProgress, [0.65, 0.82, 0.98], [0.15, 1, 1]);
  const l3Y = useTransform(scrollYProgress, [0.65, 0.82], [20, 0]);

  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-white border-y border-black/[0.06]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <div className="max-w-content mx-auto px-6 md:px-12 w-full">
          {/* Header & Line tracker */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember">
              The Manifesto
            </span>
            <div className="w-24 h-[1.5px] bg-neutral-200 relative overflow-hidden rounded-full">
              <motion.div
                style={{ width: progressBar }}
                className="h-full bg-aura-ember rounded-full"
              />
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 max-w-4xl">
            <motion.h2
              style={{ opacity: l1Opacity, y: l1Y }}
              className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-aura-ink leading-[1.12] tracking-[-0.03em]"
            >
              01. We do not build commercial fitness clubs. We engineer elite environments where physical ceilings are methodically redefined.
            </motion.h2>

            <motion.h2
              style={{ opacity: l2Opacity, y: l2Y }}
              className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-aura-ink leading-[1.12] tracking-[-0.03em]"
            >
              02. Every barbell knurling, cable vector, and acoustic frequency is calibrated for raw, uninterrupted athletic focus.
            </motion.h2>

            <motion.h2
              style={{ opacity: l3Opacity, y: l3Y }}
              className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-aura-ink leading-[1.12] tracking-[-0.03em]"
            >
              03. Restoration is not an afterthought — it is the scientific foundation where longevity, tissue repair, and power are forged.
            </motion.h2>
          </div>
        </div>
      </div>
    </div>
  );
}
