'use client';

import React from 'react';
import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import Button from '@/components/ui/Button';
import { ShieldCheck, Compass, Zap, Flame } from 'lucide-react';

const VALUES = [
  {
    icon: Compass,
    title: 'Precision Biomechanics',
    desc: 'Every machine and bar path is chosen to match human muscular kinetics, preventing shearing forces while maximizing neural recruitment.',
  },
  {
    icon: Zap,
    title: 'Metabolic Optimization',
    desc: 'We integrate real-time bio-feedback with progressive conditioning so you build sustainable engine capacity without burnout.',
  },
  {
    icon: ShieldCheck,
    title: 'Restorative Longevity',
    desc: 'Cold contrast pools, Finnish dry saunas, and pneumatic compression allow rapid autonomic nervous system recovery.',
  },
  {
    icon: Flame,
    title: 'Uncompromised Community',
    desc: 'An intentional culture of disciplined athletes, executives, and specialists focused on genuine personal evolution.',
  },
];

const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    title: 'Heavy Strength & Free Weight Floor',
    subtitle: 'Calibrated competition plates & Olympic racks',
  },
  {
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    title: 'Metabolic Engine Deck',
    subtitle: 'Custom sprint tracks and curved assault treads',
  },
  {
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    title: 'Contrast Thermal Sanctuary',
    subtitle: '38°F cold immersion & 195°F cedar saunas',
  },
  {
    url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=80',
    title: 'Private Athlete Coaching Suite',
    subtitle: 'High-speed bar velocity telemetry',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-aura-black">
      {/* Hero Header */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-24">
        <Reveal>
          <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-aura-ember" />
            <span>Our Origin & Philosophy</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-aura-bone tracking-tight max-w-4xl mb-8 leading-tight">
            We Reimagined The Gym As An Athletic Sanctuary.
          </h1>
          <p className="text-lg md:text-xl text-aura-mist max-w-2xl leading-relaxed">
            Founded with one clear mandate: eliminate the clutter, commercial gimmicks, and distractions of generic fitness chains in pursuit of pure, uncompromised athletic development.
          </p>
        </Reveal>
      </section>

      {/* Brand Story Parallax Row */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal direction="left">
            <div className="relative h-[480px] w-full rounded-card overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="Aura Gym Facility Story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aura-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-aura-ember">
                  CALIBRATED ATMOSPHERE
                </span>
                <p className="font-heading text-lg font-bold text-aura-bone mt-1">
                  Dark acoustic architecture engineered for total focus.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.2} className="space-y-6 text-aura-mist leading-relaxed">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-aura-bone tracking-tight">
              Crafted For Those Who Value Process Over Trends.
            </h3>
            <p>
              Traditional gyms pack floors with rows of redundant chrome machinery and loud commercials. Aura Gym was conceived as the antithesis — an architecturally considered dark space bathed in warm amber tones, where each zone has a dedicated acoustic and kinetic purpose.
            </p>
            <p>
              Whether you are preparing for high-level athletic competition or building resilience for relentless executive demands, our equipment and recovery protocols treat training as an exacting science.
            </p>
            <div className="pt-4">
              <Button href="/contact" size="md">
                Experience The Sanctuary
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#0e0e12] border-y border-white/5 py-24 mb-32">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-2">
              Foundational Principles
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-aura-bone tracking-tight">
              The Aura Standards
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={i}>
                  <div className="p-8 rounded-card bg-aura-graphite border border-white/5 hover:border-aura-ember/30 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-full bg-aura-black border border-white/10 flex items-center justify-center text-aura-ember mb-6">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-lg text-aura-bone mb-3">
                        {v.title}
                      </h4>
                      <p className="text-sm text-aura-mist leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-24">
        <Reveal className="mb-12">
          <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-2">
            The Facility
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-aura-bone tracking-tight">
            Curated Performance Zones
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group relative h-[340px] rounded-card overflow-hidden border border-white/5 bg-aura-graphite cursor-pointer">
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aura-black via-aura-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="font-heading font-bold text-xl text-aura-bone group-hover:text-aura-ember transition-colors">
                    {img.title}
                  </h4>
                  <p className="text-xs font-mono text-aura-mist mt-1">
                    {img.subtitle}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
