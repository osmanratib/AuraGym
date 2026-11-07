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
        <div className="bg-[#0E0E12] rounded-[30px] p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 overflow-hidden relative shadow-2xl border border-white/10">
          {/* Subtle background photo accent */}
          <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full opacity-10 overflow-hidden pointer-events-none hidden lg:block">
            <AuraImage
              src="/images/trainer-physique.jpg"
              alt=""
              fill
              className="object-cover"
              containerClassName="w-full h-full"
              sizes="320px"
            />
          </div>

          <div className="flex-1 relative z-10">
            <Reveal>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-aura-ember" />
                <span className="text-[11px] uppercase tracking-[0.28em] font-heading font-bold text-aura-ember">
                  05 // Athletic Initiation
                </span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-[-0.035em] uppercase mb-5 leading-[0.98]">
                Claim Your
                <br />
                <span className="text-neutral-400">1-Day Trial Pass.</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed mb-8 font-light">
                Experience calibrated competition equipment, private contrast recovery suites, and our architectural atmosphere with zero contract obligation.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button href="/contact" variant="ember" size="lg" className="group shadow-aura-glow">
                  <span>Book Complimentary Visit</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <span className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-neutral-400">
                  Limited Daily Allocations
                </span>
              </div>
            </Reveal>
          </div>

          {/* Real Gym Photo Preview with AuraImage */}
          <Reveal delay={0.2} className="relative w-full lg:w-96 h-72 lg:h-96 rounded-[22px] overflow-hidden border border-white/10 shadow-xl shrink-0">
            <AuraImage
              src="/images/facility-strength.jpg"
              alt="Aura Gym Performance Floor"
              fill
              className="object-cover"
              containerClassName="w-full h-full"
              sizes="(max-width: 1024px) 100vw, 384px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20" />
            <div className="absolute bottom-5 left-5 right-5 z-30 text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-aura-ember">
                District 7 Metropolis
              </span>
              <p className="font-heading font-bold text-lg mt-0.5">Strength Deck & Recovery Floor</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
