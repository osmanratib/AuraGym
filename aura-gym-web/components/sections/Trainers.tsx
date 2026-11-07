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
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-black/[0.08]">
      <div className="max-w-content mx-auto px-6 md:px-12 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/[0.08]">
          <Reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-aura-ember" />
              <span className="text-[11px] uppercase tracking-[0.28em] font-heading font-bold text-aura-ember">
                03 // Coaching Faculty
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-aura-ink tracking-[-0.035em] uppercase leading-[0.96]">
              Masters of
              <br />
              <span className="text-aura-slate/80">Human Kinetics.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-aura-slate text-xs sm:text-sm max-w-sm leading-relaxed font-light">
              Credentialed sports scientists and former Olympic lifters dedicated to methodically redefining your physical capacity.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="w-full overflow-x-auto pb-8 pt-2 px-6 md:px-12 scrollbar-none">
        <div className="flex gap-6 w-max">
          {TRAINERS_DATA.map((trainer, i) => (
            <Reveal key={trainer.id} delay={i * 0.08} direction="none">
              <div
                onClick={() => setActiveTrainer(trainer)}
                className="w-[280px] sm:w-[310px] bg-aura-canvas border border-black/[0.08] rounded-[22px] overflow-hidden group cursor-pointer transition-all duration-300 hover:border-black/20 hover:shadow-aura-card-hover hover:-translate-y-1 shadow-aura-card"
              >
                <div className="relative h-[360px] w-full overflow-hidden bg-neutral-100">
                  <AuraImage
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                    sizes="310px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 z-20" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-heading font-bold px-3 py-1 rounded-full bg-white/95 text-aura-ember border border-black/[0.06] shadow-sm">
                      {trainer.specialties[0]}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white text-aura-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-aura-ink group-hover:text-aura-ember transition-colors tracking-tight">
                    {trainer.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-aura-slate mt-1 font-heading font-medium">
                    {trainer.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Slide-over Bio Drawer */}
      <AnimatePresence>
        {activeTrainer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTrainer(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl p-8 overflow-y-auto flex flex-col justify-between z-10"
            >
              <div>
                <button
                  onClick={() => setActiveTrainer(null)}
                  className="p-2 text-aura-slate hover:text-aura-ink rounded-full hover:bg-black/5 transition-colors mb-6"
                  aria-label="Close bio drawer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-6 shadow-md">
                  <AuraImage
                    src={activeTrainer.image}
                    alt={activeTrainer.name}
                    fill
                    className="object-cover"
                    containerClassName="w-full h-full"
                    sizes="480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-heading font-bold text-2xl tracking-tight">
                      {activeTrainer.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-neutral-300 font-heading">
                      {activeTrainer.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-heading font-bold text-aura-ember mb-2">
                      Athletic Biography
                    </h4>
                    <p className="text-sm text-aura-slate leading-relaxed font-light">
                      {activeTrainer.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-heading font-bold text-aura-ember mb-2">
                      Key Disciplines
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeTrainer.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 rounded-full bg-aura-canvas border border-black/[0.08] text-xs font-heading font-medium text-aura-ink"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-heading font-bold text-aura-ember mb-2">
                      Credentials & Honors
                    </h4>
                    <div className="space-y-2">
                      {activeTrainer.certifications.map((cert) => (
                        <div key={cert} className="flex items-center gap-2 text-xs text-aura-ink font-medium">
                          <Award className="w-4 h-4 text-aura-ember shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-black/[0.08] mt-8">
                <Button href="/contact" size="lg" className="w-full">
                  Book 1-on-1 Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
