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
          <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-3 flex items-center gap-3">
            <span className="w-8 h-[1.5px] bg-aura-ember" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl text-aura-ink tracking-[-0.04em] max-w-4xl mb-7 leading-tight">
            We reimagined the gym as an athletic sanctuary.
          </h1>
          <p className="text-lg text-aura-slate max-w-2xl leading-relaxed font-light">
            Founded to eliminate clutter, commercial gimmicks, and distractions in pursuit of uncompromised athletic development.
          </p>
        </Reveal>
      </section>

      {/* Story Row */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal direction="left">
            <div className="relative h-[440px] w-full rounded-2xl overflow-hidden border border-black/[0.08] shadow-aura-card">
              <AuraImage
                src="/images/facility-strength.jpg"
                alt="Aura Gym Performance Floor"
                fill
                priority
                className="object-cover"
                containerClassName="w-full h-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
              <div className="absolute bottom-5 left-5 right-5 z-30 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-ember">Calibrated Atmosphere</span>
                <p className="font-heading text-base font-bold mt-0.5">Engineered for total focus and output.</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15} className="space-y-5 text-aura-slate leading-relaxed">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-aura-ink tracking-[-0.02em]">
              Process over trends.
            </h3>
            <p className="font-light">Traditional gyms pack floors with redundant machinery and loud commercials. Aura Gym was conceived as the antithesis — an architecturally considered space where each zone has a dedicated kinetic purpose.</p>
            <p className="font-light">Whether preparing for competition or building executive resilience, our equipment and recovery protocols treat training as an exacting science.</p>
            <div className="pt-3">
              <Button href="/contact" size="md">Experience The Sanctuary</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-black/[0.06] py-24 mb-28">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-md mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-2">Principles</div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-aura-ink tracking-[-0.03em]">The Aura Standards</h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={i}>
                  <div className="p-7 rounded-2xl bg-aura-canvas border border-black/[0.06] hover:border-black/15 hover:shadow-aura-card-hover transition-all duration-300 h-full shadow-aura-sm">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-aura-ember mb-5 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-aura-ink mb-2 tracking-tight">{v.title}</h4>
                    <p className="text-sm text-aura-slate leading-relaxed font-light">{v.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery with User Photos */}
      <section className="max-w-content mx-auto px-6 md:px-12">
        <Reveal className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-2">The Facility</div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-aura-ink tracking-[-0.03em]">Performance Zones</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative h-[320px] rounded-2xl overflow-hidden border border-black/[0.08] bg-white cursor-pointer shadow-aura-card hover:shadow-aura-card-hover transition-all duration-300">
                <AuraImage
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
                <div className="absolute bottom-5 left-5 right-5 z-30">
                  <h4 className="font-heading font-bold text-lg text-white group-hover:text-aura-ember transition-colors tracking-tight">{img.title}</h4>
                  <p className="text-xs text-white/80 mt-0.5 font-light">{img.subtitle}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
