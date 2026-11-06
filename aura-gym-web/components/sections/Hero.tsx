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
      <div className="w-16 h-16 rounded-full bg-neutral-100 animate-pulse" />
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          {/* Left Column: Bold Editorial Typography Lockup (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold text-[2.75rem] sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem] tracking-[-0.04em] text-aura-ink leading-[0.98] mb-6"
            >
              Built for pure
              <br />
              <span className="text-aura-ember">human performance.</span>
            </motion.h1>

            {/* Editorial Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-aura-slate leading-relaxed font-light max-w-xl mb-8"
            >
              Where exercise biomechanics meets architectural focus. Calibrated competition equipment, periodized coaching, and private contrast recovery suites.
            </motion.p>

            {/* CTA Buttons */}
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

            {/* Trust Metrics Ledger Ribbon */}
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

          {/* Right Column: Fitted 3D Gym Barbell Showcase (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Primary 3D Showcase Card - Calibrated & Perfectly Fitted */}
            <div className="w-full bg-white border border-black/[0.08] rounded-2xl p-6 shadow-aura-card relative overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
              {/* Header Label inside Card */}
              <div className="flex items-center justify-between z-20 relative">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-aura-ember" />
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-aura-slate">
                    Olympic Barbell · 3D Specimen
                  </span>
                </div>
                <span className="text-[10px] font-heading font-medium uppercase tracking-wider text-aura-slate bg-neutral-100 px-2.5 py-0.5 rounded-full">
                  Interactive
                </span>
              </div>

              {/* 3D Scene Viewport - Perfectly Scaled & Centered */}
              <div className="absolute inset-0 pt-6 pb-8">
                <HeroScene />
              </div>

              {/* Micro-specs at bottom of 3D card */}
              <div className="flex items-center justify-between z-20 relative pt-3 border-t border-black/[0.04] text-[11px] font-mono">
                <span className="text-aura-slate uppercase tracking-wider">
                  Competition 25KG Plates
                </span>
                <span className="text-aura-ember font-bold">
                  28MM Steel Shaft
                </span>
              </div>
            </div>

            {/* Quick Dual Photo Preview Chips below 3D */}
            <div className="grid grid-cols-2 gap-4">
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
