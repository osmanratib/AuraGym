'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../motion/Reveal';

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-aura-canvas relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-aura-ink rounded-[28px] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden relative">
          {/* Photo accent */}
          <div className="absolute -right-12 -bottom-12 w-72 h-72 rounded-full opacity-20 overflow-hidden pointer-events-none hidden lg:block">
            <Image src="/images/trainer-physique.jpg" alt="" fill className="object-cover" sizes="300px" />
          </div>

          <div className="flex-1 relative z-10">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-4">
                Begin Your Trajectory
              </div>

              <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-[-0.03em] mb-4 leading-tight">
                Claim your free 1-day trial pass.
              </h2>

              <p className="text-base text-white/70 max-w-lg leading-relaxed mb-8 font-light">
                Experience our calibrated equipment, recovery suites, and private training atmosphere with zero obligation.
              </p>

              <Button href="/contact" variant="ember" size="lg" className="group">
                <span>Book Free Visit</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>

          {/* Photo */}
          <Reveal delay={0.2} className="relative w-full lg:w-72 h-60 lg:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0">
            <Image src="/images/facility-strength.jpg" alt="Aura Gym Floor" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 300px" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
