'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-aura-ember/10 to-transparent blur-2xl animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Soft warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F2] via-aura-canvas to-aura-canvas pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center py-16 lg:py-0">
        {/* Left: Content */}
        <div className="order-2 lg:order-1 flex flex-col items-start">
          {/* Minimal tag */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-aura-sm mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aura-ember" />
            <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-aura-slate">
              Athletic Performance Sanctuary
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-[2.75rem] sm:text-6xl md:text-7xl tracking-[-0.04em] leading-[1.05] text-aura-ink max-w-xl mb-6"
          >
            Engineered for
            <br />
            <span className="text-aura-ember">peak form.</span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-aura-slate max-w-md leading-relaxed mb-10 font-light"
          >
            Precision coaching, calibrated biomechanics, and restorative recovery — fused into an uncompromising athletic experience.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <Button href="/contact" variant="primary" size="lg" className="group">
              <span>Claim Free Trial</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button href="/programs" variant="secondary" size="lg">
              Explore Programs
            </Button>
          </motion.div>
        </div>

        {/* Right: 3D Scene + Photo Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2 relative h-[420px] sm:h-[500px] lg:h-[600px] w-full"
        >
          {/* 3D Scene */}
          <div className="absolute inset-0 z-10">
            <HeroScene />
          </div>

          {/* Photo accent cards floating behind */}
          <div className="absolute top-8 right-0 w-44 h-56 rounded-2xl overflow-hidden border border-black/[0.06] shadow-aura-card opacity-70 z-0 rotate-3">
            <Image src="/images/athlete-back.jpg" alt="Athlete" fill className="object-cover" sizes="180px" />
          </div>
          <div className="absolute bottom-4 left-0 w-36 h-48 rounded-2xl overflow-hidden border border-black/[0.06] shadow-aura-card opacity-60 z-0 -rotate-2">
            <Image src="/images/weights-floor.jpg" alt="Equipment" fill className="object-cover" sizes="150px" />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-aura-mist z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-heading">Scroll</span>
        <div className="w-5 h-7 border border-black/15 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-1 h-1.5 bg-aura-ember rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
