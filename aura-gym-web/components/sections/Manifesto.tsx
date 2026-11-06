'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    num: '01',
    tag: 'Elite Construct',
    statement:
      'We do not build commercial fitness clubs. We engineer elite environments where physical ceilings are methodically redefined.',
    desc: 'Every rack, platform, and acoustic damper is placed with architectural purpose — eliminating crowds, noise, and commercial gimmicks.',
  },
  {
    num: '02',
    tag: 'Biomechanical Rigor',
    statement:
      'Every barbell knurling, cable vector, and resistance curve is calibrated for raw, uninterrupted athletic focus.',
    desc: 'Equipment sourced exclusively from competition manufacturers, tuned to match human musculoskeletal kinetics without joint shearing.',
  },
  {
    num: '03',
    tag: 'Scientific Recovery',
    statement:
      'Restoration is not an afterthought — it is the scientific foundation where longevity, tissue repair, and power are forged.',
    desc: 'Contrast therapy suites, Finnish dry saunas, and pneumatic compression allow rapid autonomic nervous system down-regulation.',
  },
];

export default function Manifesto() {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-black/[0.06] relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Section Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12 md:mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember">
            The Manifesto
          </span>
          <div className="w-16 h-[1.5px] bg-aura-ember" />
        </motion.div>

        {/* 3 Principles - High Contrast, Crystal Clear Readability, Crisp Timing */}
        <div className="space-y-12 md:space-y-16">
          {PRINCIPLES.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline pb-12 border-b border-black/[0.06] last:border-b-0 last:pb-0"
            >
              {/* Number & Tag (3 Cols) */}
              <div className="lg:col-span-3 flex items-center lg:flex-col lg:items-start gap-3 lg:gap-1">
                <span className="font-heading font-black text-3xl sm:text-4xl text-aura-ember tracking-tight">
                  {p.num}
                </span>
                <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-aura-slate">
                  {p.tag}
                </span>
              </div>

              {/* Statement & Supporting Context (9 Cols) - Perfectly Sized & Dark */}
              <div className="lg:col-span-9 space-y-3">
                <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-[1.75rem] text-aura-ink leading-[1.3] tracking-[-0.025em]">
                  {p.statement}
                </h3>
                <p className="text-sm sm:text-base text-aura-slate leading-relaxed font-light max-w-2xl">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
