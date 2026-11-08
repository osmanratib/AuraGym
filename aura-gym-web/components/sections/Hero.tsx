'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Move, Sparkles } from 'lucide-react';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-neutral-300/40 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative w-full min-h-[95vh] lg:min-h-screen bg-[#EBEAE5] text-aura-ink flex flex-col justify-between pt-24 pb-8 sm:pb-12 px-6 md:px-12 overflow-hidden select-none">
      {/* 1. Top Architectural Micro-Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-content mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-heading font-semibold uppercase tracking-[0.22em] text-aura-slate border-b border-black/[0.08] pb-4 z-20 relative"
      >
        <div className="flex items-center gap-2 text-aura-ink">
          <span className="w-2 h-2 rounded-full bg-aura-ember animate-pulse" />
          <span>AURA (01)</span>
        </div>

        <div className="hidden sm:block tracking-[0.3em] text-aura-slate/80">
          VOLUME 01 // MMXXVI
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline">BIOMECHANICS // A MODERN DISCIPLINE</span>
          <span className="px-2 py-0.5 rounded bg-black/5 text-[9px] tracking-[0.18em]">
            STUDIO SPEC
          </span>
        </div>
      </motion.div>

      {/* 2. Monumental Hero Center: Massive Typography Layered BEHIND 3D Model in #8E1616 */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-[440px] sm:min-h-[500px] lg:min-h-[560px]">
        {/* Giant Editorial Display Typography in #8E1616 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <h1 className="font-display font-black text-[23vw] sm:text-[22vw] lg:text-[23vw] tracking-[-0.04em] leading-none uppercase text-[#8E1616] opacity-[0.95] select-none text-center">
            AURA
          </h1>
        </motion.div>

        {/* Floating Dark Obsidian Narrative Card (Top/Mid Right, inspired by the video) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block absolute right-4 top-10 z-20 max-w-[280px] p-5 rounded-2xl bg-[#111114] text-white shadow-2xl border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aura-ember" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember">
              Performance Sanctuary
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-neutral-300 font-light">
            An architectural refuge for intention, where biomechanical rigor meets human discipline and dissolves physical limits. Calibrated competition equipment and periodized coaching.
          </p>
        </motion.div>

        {/* 3D Interactive Barbell Viewport (Layered IN FRONT of "AURA", with 360° Drag Inspection) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* 3. Bottom Editorial Grid & Actions (Faithful to video aesthetic) */}
      <div className="w-full max-w-content mx-auto z-20 relative pt-4 border-t border-black/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* Bottom Left: Editorial Inscription (like in video) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 space-y-1"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.26em] font-heading font-bold text-aura-ember">
                Rituals Refined:
              </span>
              <div className="w-8 h-[1px] bg-aura-ember/60" />
            </div>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-aura-slate font-medium leading-relaxed">
              Tracing Force, Kinetic Load & Recovery
              <br />
              Across The Human Ceiling.
            </p>
          </motion.div>

          {/* Bottom Center: Interactive 360 Cue & Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 flex flex-col items-center justify-center gap-3"
          >
            {/* 360 Rotation Hint */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.05] border border-black/[0.06] text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-aura-ink">
              <Move className="w-3 h-3 text-aura-ember animate-pulse" />
              <span>Drag To Inspect 360° · Eleiko 25KG Spec</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button href="/contact" size="md" className="group shadow-aura-card flex-1 sm:flex-initial">
                <span>Claim Trial Pass</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/programs" variant="secondary" size="md" className="flex-1 sm:flex-initial bg-white/80 hover:bg-white">
                Disciplines
              </Button>
            </div>
          </motion.div>

          {/* Bottom Right: Metric Ledger */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 flex md:justify-end text-left md:text-right"
          >
            <div className="space-y-1">
              <div className="flex items-center md:justify-end gap-1.5 text-xs font-heading font-bold text-aura-ink">
                <Sparkles className="w-3.5 h-3.5 text-aura-ember" />
                <span>4.9 / 5.0 RATING · 1,250+ ATHLETES</span>
              </div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-aura-slate font-medium">
                Est. MMXXVI · Zero Locked Contracts · 100% Calibrated Gear
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
