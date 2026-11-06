'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-aura-ember/20 to-aura-glow/10 blur-3xl animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  const headlineWords = ['ENGINEERED', 'FOR', 'PEAK', 'PHYSICAL', 'DOMINANCE'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-aura-ember/10 via-aura-glow/5 to-transparent blur-[120px] pointer-events-none" />

      {/* 3D Scene Canvas in Background / Center */}
      <div className="absolute inset-0 z-0 opacity-85">
        <HeroScene />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10 w-full text-center flex flex-col items-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aura-ember/30 bg-aura-graphite/60 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-aura-ember animate-spin-slow" />
          <span className="text-[11px] font-heading uppercase tracking-widest text-aura-bone">
            Private Athletic Performance Sanctuary
          </span>
        </motion.div>

        {/* Staggered Rising Headline */}
        <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-aura-bone max-w-4xl mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={i === 0 || i === 4 ? 'inline-block text-aura-bone mr-3' : 'inline-block text-aura-mist/90 mr-3'}
            >
              {word === 'DOMINANCE' ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-aura-ember via-aura-glow to-aura-bone">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-aura-mist max-w-2xl font-normal leading-relaxed mb-10"
        >
          Transcend ordinary training. Aura Gym fuses cutting-edge bio-mechanics, high-performance coaching, and restorative recovery protocols into an uncompromising sensory experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button href="/contact" size="lg" className="w-full sm:w-auto group">
            <span>Claim Your 1-Day Trial</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <Button href="/programs" variant="secondary" size="lg" className="w-full sm:w-auto">
            Explore Programs
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 md:mt-24 flex flex-col items-center gap-2 text-aura-mist/60 text-xs tracking-widest font-heading uppercase"
        >
          <span>Scroll to Explore</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-2 bg-aura-ember rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
