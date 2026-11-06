'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ChevronRight } from 'lucide-react';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';
import AuraImage from '../ui/AuraImage';

export const TRAINERS_DATA = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Head of Human Performance',
    specialties: ['Biomechanics', 'Strength', 'Hypertrophy'],
    bio: 'Former collegiate strength coach and Olympic lifter with 12+ years of experience training professional athletes. Specialized in kinetic chain alignment and progressive neural loading.',
    certifications: ['CSCS *D', 'USAW Senior Coach', 'EXOS Performance Specialist'],
    image: '/images/athlete-biceps.jpg',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Director of Metabolic Conditioning',
    specialties: ['VO2 Max', 'Anaerobic Threshold', 'Conditioning'],
    bio: 'Former national heptathlete. Elena develops proprietary high-intensity conditioning circuits designed to elevate metabolic ceiling without compromising lean muscle.',
    certifications: ['NASM Master Trainer', 'Precision Nutrition L2'],
    image: '/images/athlete-curls.jpg',
  },
  {
    id: 'darius-sterling',
    name: 'Darius Sterling',
    role: 'Olympic Weightlifting Coach',
    specialties: ['Snatch & C&J', 'Barbell Dynamics', 'Power Output'],
    bio: 'National Olympic weightlifting medalist with over 15 years on the platform. Teaches precision bar mechanics and explosive hip hinge kinetics.',
    certifications: ['USAW Level 3', 'FMS Certified'],
    image: '/images/athlete-triceps.jpg',
  },
  {
    id: 'maya-lin',
    name: 'Dr. Maya Lin, PT',
    role: 'Lead Physiotherapist',
    specialties: ['Fascial Release', 'Spine Mechanics', 'Recovery'],
    bio: 'Doctor of Physical Therapy specializing in orthopedic performance and athletic restoration. Bridges strenuous training and cellular recovery.',
    certifications: ['Doctor of PT', 'FRCms', 'Dry Needling Certified'],
    image: '/images/trainer-physique.jpg',
  },
  {
    id: 'kai-tanaka',
    name: 'Kai Tanaka',
    role: 'Striking & Tactical Conditioning',
    specialties: ['Combat Conditioning', 'Rotational Power', 'Agility'],
    bio: 'Championship muay thai practitioner and tactical conditioning advisor. Develops reactive rotational velocity, core stability, and cardiovascular output.',
    certifications: ['ISSA Tactical', 'Kettlebell Athletics L2'],
    image: '/images/athlete-back.jpg',
  },
];

export default function TrainersSection() {
  const [activeTrainer, setActiveTrainer] = useState<(typeof TRAINERS_DATA)[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-black/[0.06]">
      <div className="max-w-content mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-3 flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-aura-ember" />
              <span>Coaching Faculty</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-aura-ink tracking-[-0.03em]">
              Master Coaches
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-aura-slate text-sm max-w-sm leading-relaxed font-light">
              Credentialed sports scientists and world-class athletes dedicated to your physical evolution.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div className="w-full overflow-x-auto pb-6 pt-2 px-6 md:px-12 scrollbar-none">
        <div className="flex gap-5 w-max">
          {TRAINERS_DATA.map((trainer, i) => (
            <Reveal key={trainer.id} delay={i * 0.08} direction="none">
              <div
                onClick={() => setActiveTrainer(trainer)}
                className="w-[270px] sm:w-[300px] bg-aura-canvas border border-black/[0.08] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:border-black/20 hover:shadow-aura-card-hover hover:-translate-y-1 shadow-aura-card"
              >
                <div className="relative h-[340px] w-full overflow-hidden bg-neutral-100">
                  <AuraImage
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-20" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-30">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-heading font-semibold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-aura-ember border border-black/[0.06] shadow-sm">
                      {trainer.specialties[0]}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/95 text-aura-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-aura-ink group-hover:text-aura-ember transition-colors tracking-tight">
                    {trainer.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-aura-slate mt-0.5 font-heading font-medium">
                    {trainer.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bio Drawer */}
      <AnimatePresence>
        {activeTrainer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTrainer(null)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white border-l border-black/10 h-full p-8 overflow-y-auto z-10 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <button
                  onClick={() => setActiveTrainer(null)}
                  className="p-2 text-aura-slate hover:text-aura-ink rounded-full hover:bg-black/5 transition-colors mb-5"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 border border-black/[0.06]">
                  <AuraImage
                    src={activeTrainer.image}
                    alt={activeTrainer.name}
                    fill
                    className="object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>

                <div className="text-[11px] uppercase tracking-[0.2em] text-aura-ember font-heading font-semibold mb-0.5">
                  Specialist
                </div>
                <h3 className="font-heading font-bold text-2xl text-aura-ink tracking-tight">
                  {activeTrainer.name}
                </h3>
                <p className="text-xs text-aura-slate mt-0.5 mb-5 font-heading font-medium uppercase tracking-[0.1em]">
                  {activeTrainer.role}
                </p>

                <h4 className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-ink mb-2">
                  Biography
                </h4>
                <p className="text-sm text-aura-slate leading-relaxed mb-6 font-light">
                  {activeTrainer.bio}
                </p>

                <h4 className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-ink mb-2">
                  Credentials
                </h4>
                <ul className="space-y-2">
                  {activeTrainer.certifications.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-aura-ink">
                      <Award className="w-3.5 h-3.5 text-aura-ember shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06]">
                <Button href="/contact" className="w-full">
                  Book Assessment with {activeTrainer.name.split(' ')[0]}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
