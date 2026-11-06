'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import AuraImage from '../ui/AuraImage';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-neutral-100 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-aura-canvas overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Top Minimalist Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-aura-ember animate-pulse" />
          <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-aura-slate">
            Private Athletic Performance Sanctuary
          </span>
        </motion.div>

        {/* Main Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.04em] text-aura-ink leading-[0.98]">
              Engineered for
              <br />
              <span className="text-aura-ember">peak physical output.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <p className="text-base sm:text-lg text-aura-slate leading-relaxed font-light mb-6">
              A calibrated environment fusing biomechanical strength training, metabolic conditioning, and active cellular recovery.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" size="md" className="group">
                <span>Claim Free Trial</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/programs" variant="secondary" size="md">
                View Disciplines
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Showcase Grid: Minimal 3D Gym Model + Instant Photos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
        >
          {/* Card 1: 3D Studio Gym Barbell Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-8 shadow-aura-card flex flex-col justify-between relative overflow-hidden min-h-[380px] sm:min-h-[440px]">
            {/* Top Micro-label */}
            <div className="flex items-center justify-between z-10 relative">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-aura-ember" />
                <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-aura-slate">
                  Interactive Calibrated Barbell · 3D
                </span>
              </div>
              <span className="text-[10px] font-heading uppercase tracking-wider text-aura-mist bg-neutral-100 px-2.5 py-1 rounded-full">
                Drag to inspect
              </span>
            </div>

            {/* 3D Scene in Center */}
            <div className="absolute inset-0 pt-8 pb-4">
              <HeroScene />
            </div>

            {/* Bottom Specs */}
            <div className="flex items-center justify-between z-10 relative pt-4 border-t border-black/[0.04]">
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-aura-ink">
                Competition Standard Eleiko Specification
              </span>
              <span className="text-xs font-mono text-aura-ember font-bold">
                20 KG · 28 MM
              </span>
            </div>
          </div>

          {/* Card 2: Real Gym Facility Photo (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-5">
            {/* Photo 1: Strength Floor */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2 relative h-[210px] rounded-2xl overflow-hidden border border-black/[0.08] shadow-aura-card group">
              <AuraImage
                src="/images/facility-strength.jpg"
                alt="Aura Gym Strength Floor"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                containerClassName="w-full h-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
              <div className="absolute bottom-4 left-4 right-4 z-30 text-white">
                <p className="font-heading font-bold text-sm">Strength Floor</p>
                <p className="text-[11px] text-white/80 font-light">Bio-mechanical leg presses & hack squats</p>
              </div>
            </div>

            {/* Photo 2: Free Weights Floor */}
            <div className="col-span-1 relative h-[180px] rounded-2xl overflow-hidden border border-black/[0.08] shadow-aura-card group">
              <AuraImage
                src="/images/weights-floor.jpg"
                alt="Free Weights"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                containerClassName="w-full h-full"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
              <div className="absolute bottom-3 left-3 z-30 text-white">
                <p className="font-heading font-bold text-xs">Free Weights</p>
              </div>
            </div>

            {/* Photo 3: Functional Turf Deck */}
            <div className="col-span-1 relative h-[180px] rounded-2xl overflow-hidden border border-black/[0.08] shadow-aura-card group">
              <AuraImage
                src="/images/facility-turf.jpg"
                alt="Turf Track"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                containerClassName="w-full h-full"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
              <div className="absolute bottom-3 left-3 z-30 text-white">
                <p className="font-heading font-bold text-xs">Sled Turf</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
