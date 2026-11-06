'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../motion/Reveal';

export default function CTASection() {
  return (
    <section className="py-24 md:py-36 bg-aura-black relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-aura-ember/15 via-aura-glow/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aura-ember/30 bg-aura-graphite/80 backdrop-blur-md mb-6">
            <Flame className="w-3.5 h-3.5 text-aura-ember" />
            <span className="text-[11px] font-heading uppercase tracking-widest text-aura-bone">
              Begin Your Trajectory
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-aura-bone tracking-tight max-w-3xl mb-6">
            Claim Your Complimentary 1-Day Trial Pass
          </h2>

          <p className="text-base sm:text-lg text-aura-mist max-w-xl mx-auto leading-relaxed mb-10">
            Experience our calibrated equipment, state-of-the-art contrast recovery suites, and private training atmosphere with zero obligation.
          </p>

          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: [1, 1.03, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block"
          >
            <Button href="/contact" size="lg" className="shadow-aura-glow-strong">
              <span>Book Your Free Visit Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
