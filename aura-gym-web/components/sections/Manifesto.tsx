'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    num: '01',
    code: 'MMXXVI · SPEC 01',
    tag: 'Elite Construct',
    statement:
      'We do not build commercial fitness clubs. We engineer elite environments where physical ceilings are methodically redefined.',
    desc: 'Every rack, platform, and acoustic damper is placed with architectural purpose — eliminating crowds, noise, and commercial gimmicks.',
  },
  {
    num: '02',
    code: 'MMXXVI · SPEC 02',
    tag: 'Biomechanical Rigor',
    statement:
      'Every barbell knurling, cable vector, and resistance curve is calibrated for raw, uninterrupted athletic focus.',
    desc: 'Equipment sourced exclusively from competition manufacturers, tuned to match human musculoskeletal kinetics without joint shearing.',
  },
  {
    num: '03',
    code: 'MMXXVI · SPEC 03',
    tag: 'Scientific Recovery',
    statement:
      'Restoration is not an afterthought — it is the scientific foundation where longevity, tissue repair, and power are forged.',
    desc: 'Contrast therapy suites, Finnish dry saunas, and pneumatic compression allow rapid autonomic nervous system down-regulation.',
  },
];

export default function Manifesto() {
  return (
    <section className="py-24 md:py-32 bg-white border-y border-black/[0.08] relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Section Header Inscription */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-black/[0.08]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-aura-ember" />
              <span className="text-[11px] uppercase tracking-[0.28em] font-heading font-bold text-aura-ember">
                01 // The Manifesto
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-aura-ink tracking-[-0.035em] uppercase leading-[0.96]">
              Architectural
              <br />
              <span className="text-aura-slate/80">Principles of Force.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] font-heading uppercase tracking-[0.22em] text-aura-slate text-left md:text-right space-y-1"
          >
            <p>Metropolis Athletic Enlistment</p>
            <p className="text-aura-ink font-bold">Standard MMXXVI Edition</p>
          </motion.div>
        </div>

        {/* 3 Principles - Monumental Editorial Rows */}
        <div className="space-y-14 md:space-y-20">
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-baseline pb-14 border-b border-black/[0.06] last:border-b-0 last:pb-0"
            >
              {/* Number & Tag (3 Cols) */}
              <div className="lg:col-span-3 flex items-center lg:flex-col lg:items-start gap-4 lg:gap-2">
                <span className="font-display font-black text-4xl sm:text-5xl text-aura-ink tracking-tight">
                  {p.num}
                  <span className="text-aura-ember">.</span>
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-heading font-semibold uppercase tracking-[0.24em] text-aura-ember">
                    {p.code}
                  </div>
                  <div className="text-[12px] font-heading font-bold uppercase tracking-[0.18em] text-aura-slate">
                    {p.tag}
                  </div>
                </div>
              </div>

              {/* Statement & Supporting Context (9 Cols) */}
              <div className="lg:col-span-9 space-y-4">
                <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-[1.85rem] text-aura-ink leading-[1.25] tracking-[-0.025em]">
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
