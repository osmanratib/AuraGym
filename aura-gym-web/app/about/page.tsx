'use client';

import React from 'react';
import Reveal from '@/components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import Button from '@/components/ui/Button';
import AuraImage from '@/components/ui/AuraImage';
import { ShieldCheck, Compass, Zap, Flame } from 'lucide-react';

const VALUES = [
  { icon: Compass, title: 'Precision Biomechanics', desc: 'Every machine and bar path matches human muscular kinetics, preventing shearing while maximizing neural recruitment.' },
  { icon: Zap, title: 'Metabolic Optimization', desc: 'Real-time bio-feedback with progressive conditioning builds sustainable engine capacity without burnout.' },
  { icon: ShieldCheck, title: 'Restorative Longevity', desc: 'Cold contrast pools, saunas, and pneumatic compression allow rapid nervous system recovery.' },
  { icon: Flame, title: 'Intentional Community', desc: 'A culture of disciplined athletes and specialists focused on genuine personal evolution.' },
];

const GALLERY_IMAGES = [
  { url: '/images/facility-cardio.jpg', title: 'Cardio & Conditioning Deck', subtitle: 'Assault treads & clean architectural lighting' },
  { url: '/images/facility-turf.jpg', title: 'Functional Sled Turf Zone', subtitle: 'Astroturf sled lanes and hex bar training' },
  { url: '/images/facility-strength.jpg', title: 'Strength & Machine Floor', subtitle: 'Leg presses, hacks, and calibrated weights' },
  { url: '/images/weights-floor.jpg', title: 'Free Weight Arsenal', subtitle: 'Competition plates and rubberized dumbbells' },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-aura-canvas">
      {/* Header */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-24">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-aura-ember" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-heading font-bold text-aura-ember">
              About // Our Philosophy
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-aura-ink tracking-[-0.04em] uppercase max-w-4xl mb-7 leading-[0.96]">
            Architectural Focus.
            <br />
            <span className="text-aura-slate/80">Athletic Sanctuary.</span>
          </h1>
          <p className="text-base sm:text-lg text-aura-slate max-w-2xl leading-relaxed font-light">
            Founded to eliminate clutter, commercial gimmicks, and distractions in pursuit of uncompromised athletic development.
          </p>
        </Reveal>
      </section>

      {/* Story Row */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal direction="left">
            <div className="relative h-[440px] w-full rounded-[24px] overflow-hidden border border-black/[0.08] shadow-aura-card">
              <AuraImage
                src="/images/facility-strength.jpg"
                alt="Aura Gym Performance Floor"
                fill
                priority
                className="object-cover"
                containerClassName="w-full h-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20" />
              <div className="absolute bottom-5 left-5 right-5 z-30 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-heading font-bold text-aura-ember">Calibrated Atmosphere</span>
                <p className="font-heading text-lg font-bold mt-0.5">Engineered for total focus and output.</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="space-y-6">
            <div className="text-[10px] uppercase tracking-[0.24em] font-heading font-bold text-aura-ember">
              The Genesis // MMXXVI
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-aura-ink uppercase tracking-[-0.03em] leading-tight">
              Crafted for athletes who demand methodical rigor.
            </h2>
            <p className="text-sm sm:text-base text-aura-slate leading-relaxed font-light">
              Most modern gyms are designed for foot traffic and monthly retention rather than actual physical adaptation. We engineered Aura Gym around human biomechanics, uninterrupted acoustic focus, and recovery science.
            </p>
            <p className="text-sm sm:text-base text-aura-slate leading-relaxed font-light">
              Every barbell knurling, cable vector, and sauna bench was selected to serve one singular objective: sustainable, injury-free physical mastery.
            </p>
            <div className="pt-2">
              <Button href="/membership" size="md">
                Explore Membership Protocol
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-28">
        <div className="pb-8 mb-12 border-b border-black/[0.08]">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-aura-ink uppercase tracking-[-0.03em]">
            Core Performance Pillars
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, i) => {
            const Icon = val.icon;
            return (
              <StaggerItem key={i}>
                <div className="bg-white border border-black/[0.08] rounded-[22px] p-7 shadow-aura-card hover:shadow-aura-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-aura-canvas border border-black/[0.06] flex items-center justify-center text-aura-ember mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-aura-ink mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-aura-slate leading-relaxed font-light">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Facility Gallery */}
      <section className="max-w-content mx-auto px-6 md:px-12">
        <div className="pb-8 mb-12 border-b border-black/[0.08]">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-aura-ink uppercase tracking-[-0.03em]">
            Sanctuary Floor & Deck
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative h-72 sm:h-80 rounded-[22px] overflow-hidden border border-black/[0.08] shadow-aura-card bg-neutral-100">
                <AuraImage
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-20" />
                <div className="absolute bottom-5 left-5 right-5 z-30 text-white">
                  <p className="font-heading font-bold text-lg">{img.title}</p>
                  <p className="text-xs text-neutral-300 font-light mt-0.5">{img.subtitle}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
