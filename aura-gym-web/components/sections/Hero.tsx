'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import AuraImage from '../ui/AuraImage';
import { ArrowRight, Star, ShieldCheck, Check } from 'lucide-react';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-neutral-200/50 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-aura-canvas overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Top Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-sm mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-aura-ember" />
          <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.22em] text-aura-slate">
            Metropolis Performance Sanctuary · Est. 2026
          </span>
        </motion.div>

        {/* 2-Column Balanced Master Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12">
          {/* Left Column: Editorial Typography Lockup (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold text-4xl sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem] tracking-[-0.04em] text-aura-ink leading-[0.98] mb-6"
            >
              Built for pure
              <br />
              <span className="text-aura-ember">human performance.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-aura-slate leading-relaxed font-light max-w-xl mb-8"
            >
              Where exercise biomechanics meets architectural focus. Calibrated competition equipment, periodized coaching, and private contrast recovery suites.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 mb-10"
            >
              <Button href="/contact" size="lg" className="group shadow-aura-card">
                <span>Claim 1-Day Trial Pass</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/programs" variant="secondary" size="lg">
                Explore Disciplines
              </Button>
            </motion.div>

            {/* Trust Metrics Ledger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-black/[0.06] text-xs text-aura-slate font-medium"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-aura-ink font-semibold">4.9 / 5</span>
                <span className="text-aura-slate font-light">(1,250+ Athletes)</span>
              </div>

              <div className="h-3 w-[1px] bg-black/10 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-aura-ink">
                <ShieldCheck className="w-4 h-4 text-aura-ember" />
                <span>Zero Locked Contracts</span>
              </div>

              <div className="h-3 w-[1px] bg-black/10 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-aura-ink">
                <Check className="w-3.5 h-3.5 text-aura-ember" />
                <span>100% Calibrated Gear</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Seamless Free-Floating 3D Barbell (NO BOX, NO WHITE BACKGROUND) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            {/* Pure Floating 3D Barbell without any box/card */}
            <div className="w-full h-[320px] sm:h-[360px] relative bg-transparent flex items-center justify-center">
              <HeroScene />
            </div>

            {/* Quick Dual Photo Preview Chips below 3D */}
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              <div className="relative h-28 rounded-xl overflow-hidden border border-black/[0.08] shadow-sm group">
                <AuraImage
                  src="/images/facility-strength.jpg"
                  alt="Strength Facility"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-2.5 left-3 z-20 text-white">
                  <p className="font-heading font-bold text-xs">Strength Deck</p>
                  <p className="text-[10px] text-white/80 font-light">Bio-mechanical fleet</p>
                </div>
              </div>

              <div className="relative h-28 rounded-xl overflow-hidden border border-black/[0.08] shadow-sm group">
                <AuraImage
                  src="/images/athlete-curls.jpg"
                  alt="Coaching Specialist"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-2.5 left-3 z-20 text-white">
                  <p className="font-heading font-bold text-xs">Master Coaches</p>
                  <p className="text-[10px] text-white/80 font-light">1-on-1 coaching</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
