'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, Award, ChevronRight } from 'lucide-react';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';

export const TRAINERS_DATA = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Head of Human Performance & Hypertrophy',
    specialties: ['Biomechanics', 'Strength Periodization', 'Body Composition'],
    bio: 'Former collegiate strength coach and Olympic lifter with 12+ years of experience training professional athletes and executives. Specialized in kinetic chain alignment and progressive neural loading.',
    certifications: ['CSCS *D', 'USAW Senior Coach', 'EXOS Performance Specialist'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Director of Metabolic Conditioning',
    specialties: ['VO2 Max Protocols', 'Anaerobic Threshold', 'Track Kinetics'],
    bio: 'Former national track & field heptathlete. Elena develops our proprietary high-intensity conditioning circuits designed to elevate metabolic ceiling without compromising lean muscle.',
    certifications: ['NASM Master Trainer', 'Precision Nutrition L2', 'Oxygen Advantage Coach'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'darius-sterling',
    name: 'Darius Sterling',
    role: 'Master Coach — Olympic Weightlifting',
    specialties: ['Snatch & C&J Kinetics', 'Barbell Dynamics', 'Power Output'],
    bio: 'National Olympic weightlifting medalist with over 15 years on the platform. Darius teaches precision bar mechanics, explosive hip hinge mechanics, and neuromuscular velocity.',
    certifications: ['USAW Level 3', 'CrossFit Weightlifting', 'FMS Certified'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'maya-lin',
    name: 'Dr. Maya Lin, PT, DPT',
    role: 'Lead Physiotherapist & Longevity Director',
    specialties: ['Neuro-Fascial Release', 'Spine Mechanics', 'Contrast Hydrotherapy'],
    bio: 'Doctor of Physical Therapy specializing in orthopedic performance and athletic restoration. Maya bridges the gap between strenuous heavy training and cellular recovery.',
    certifications: ['Doctor of Physical Therapy', 'FRCms', 'Dry Needling Certified'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kai-tanaka',
    name: 'Kai Tanaka',
    role: 'Striking Dynamics & Tactical Conditioning',
    specialties: ['Combative Conditioning', 'Rotational Power', 'Agility Systems'],
    bio: 'Championship muay thai practitioner and tactical conditioning advisor. Kai conditions reactive rotational velocity, core stability, and intense cardiovascular output.',
    certifications: ['ISSA Tactical Conditioning', 'Kettlebell Athletics L2'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
];

export default function TrainersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTrainer, setActiveTrainer] = useState<(typeof TRAINERS_DATA)[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xTransform = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-30%']);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-aura-black relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal>
            <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-aura-ember" />
              <span>Coaching Faculty</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-aura-bone tracking-tight">
              Master Coaches & Bio-Mechanists
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-aura-mist text-sm max-w-md">
              Our specialists are not floor staff — they are credentialed sports scientists and world-class athletes dedicated to your physical evolution.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal Scroll Strip */}
      <div className="w-full overflow-x-auto pb-8 pt-4 px-6 md:px-12 scrollbar-none">
        <motion.div
          style={{ x: xTransform }}
          className="flex gap-6 w-max"
        >
          {TRAINERS_DATA.map((trainer) => (
            <div
              key={trainer.id}
              onClick={() => setActiveTrainer(trainer)}
              className="w-[300px] sm:w-[340px] bg-aura-graphite border border-white/5 rounded-card overflow-hidden group cursor-pointer transition-all duration-300 hover:border-aura-ember/40 hover:shadow-aura-glow"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-[380px] w-full overflow-hidden bg-[#121215]">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 340px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aura-graphite via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-heading px-2.5 py-1 rounded-full bg-aura-black/80 backdrop-blur-md text-aura-ember border border-aura-ember/30">
                    {trainer.specialties[0]}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-aura-ember/20 text-aura-ember flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-aura-bone group-hover:text-aura-ember transition-colors">
                  {trainer.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-aura-mist mt-1 font-mono">
                  {trainer.role}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {trainer.specialties.slice(1).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-aura-mist font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bio Slide-over Drawer */}
      <AnimatePresence>
        {activeTrainer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTrainer(null)}
              className="fixed inset-0 bg-aura-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md bg-aura-graphite border-l border-white/10 h-full p-8 overflow-y-auto z-10 flex flex-col justify-between"
            >
              <div>
                <button
                  onClick={() => setActiveTrainer(null)}
                  className="p-2 text-aura-mist hover:text-aura-bone rounded-full hover:bg-white/5 transition-colors mb-6"
                  aria-label="Close bio drawer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-6">
                  <Image
                    src={activeTrainer.image}
                    alt={activeTrainer.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aura-graphite via-transparent to-transparent" />
                </div>

                <div className="text-xs uppercase tracking-widest text-aura-ember font-mono mb-1">
                  Faculty Specialist
                </div>
                <h3 className="font-heading font-black text-2xl text-aura-bone">
                  {activeTrainer.name}
                </h3>
                <p className="text-xs font-mono text-aura-mist mt-1 mb-6">
                  {activeTrainer.role}
                </p>

                <h4 className="text-xs uppercase tracking-widest font-heading text-aura-bone mb-2">
                  Biography & Background
                </h4>
                <p className="text-sm text-aura-mist leading-relaxed mb-6">
                  {activeTrainer.bio}
                </p>

                <h4 className="text-xs uppercase tracking-widest font-heading text-aura-bone mb-2">
                  Credentials & Certifications
                </h4>
                <ul className="space-y-2">
                  {activeTrainer.certifications.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-aura-bone font-mono">
                      <Award className="w-4 h-4 text-aura-ember shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
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
