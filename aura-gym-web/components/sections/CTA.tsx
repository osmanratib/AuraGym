'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../motion/Reveal';
import AuraImage from '../ui/AuraImage';

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-aura-canvas relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-aura-ink rounded-[28px] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden relative shadow-2xl">
          {/* Subtle background photo accent */}
          <div className="absolute -right-12 -bottom-12 w-72 h-72 rounded-full opacity-15 overflow-hidden pointer-events-none hidden lg:block">
            <AuraImage
              src="/images/trainer-physique.jpg"
              alt=""
              fill
              className="object-cover"
              containerClassName="w-full h-full"
              sizes="300px"
            />
          </div>

          <div className="flex-1 relative z-10">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-4 flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-aura-ember" />
                <span>Begin Your Trajectory</span>
              </div>

              <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-[-0.03em] mb-4 leading-tight">
                Claim your complimentary 1-day trial pass.
              </h2>

              <p className="text-base text-white/70 max-w-lg leading-relaxed mb-8 font-light">
                Experience our calibrated equipment, recovery thermal suites, and private training atmosphere with zero obligation.
              </p>

              <Button href="/contact" variant="ember" size="lg" className="group">
                <span>Book Free Visit Now</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>

          {/* Real Gym Photo Preview with AuraImage */}
          <Reveal delay={0.2} className="relative w-full lg:w-80 h-64 lg:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0">
            <AuraImage
              src="/images/facility-strength.jpg"
              alt="Aura Gym Performance Floor"
              fill
              className="object-cover"
              containerClassName="w-full h-full"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
            <div className="absolute bottom-4 left-4 right-4 z-30 text-white">
              <p className="font-heading font-bold text-sm">Metropolis Sanctuary</p>
              <p className="text-[11px] text-white/80 font-light">District 7 Performance Deck</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
