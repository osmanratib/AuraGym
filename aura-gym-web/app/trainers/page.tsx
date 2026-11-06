'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import Button from '@/components/ui/Button';
import { X, Award, ChevronRight, Sparkles } from 'lucide-react';
import { TRAINERS_DATA } from '@/components/sections/Trainers';

export default function TrainersPage() {
  const [selectedTrainer, setSelectedTrainer] = useState<(typeof TRAINERS_DATA)[0] | null>(null);

  return (
    <div className="pt-32 pb-24 bg-aura-black">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="mb-16">
          <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-aura-ember" />
            <span>Coaching Roster</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-aura-bone tracking-tight max-w-3xl mb-6">
            Elite Coaches. Sports Scientists. Platform Champions.
          </h1>
          <p className="text-lg text-aura-mist max-w-2xl leading-relaxed">
            Every coach on the Aura Gym floor holds advanced biomechanics certifications, competitive backgrounds, and a personal commitment to your athletic trajectory.
          </p>
        </Reveal>

        {/* Coaches Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRAINERS_DATA.map((trainer) => (
            <StaggerItem key={trainer.id}>
              <div
                onClick={() => setSelectedTrainer(trainer)}
                className="bg-aura-graphite border border-white/5 rounded-card overflow-hidden group cursor-pointer transition-all duration-300 hover:border-aura-ember/40 hover:shadow-aura-glow flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-[360px] w-full overflow-hidden bg-[#121215]">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aura-graphite via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 right-4">
                    <span className="p-2 rounded-full bg-aura-black/80 text-aura-ember border border-aura-ember/30 inline-flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-aura-bone group-hover:text-aura-ember transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs uppercase font-mono text-aura-mist mt-1 mb-4">
                      {trainer.role}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {trainer.specialties.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-aura-mist border border-white/5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-heading uppercase tracking-widest text-aura-ember group-hover:text-aura-bone transition-colors">
                    <span>View Specialist Dossier</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Bio Drawer */}
      <AnimatePresence>
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrainer(null)}
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
                  onClick={() => setSelectedTrainer(null)}
                  className="p-2 text-aura-mist hover:text-aura-bone rounded-full hover:bg-white/5 transition-colors mb-6"
                  aria-label="Close bio drawer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-6">
                  <Image
                    src={selectedTrainer.image}
                    alt={selectedTrainer.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aura-graphite via-transparent to-transparent" />
                </div>

                <div className="text-xs uppercase tracking-widest text-aura-ember font-mono mb-1">
                  Master Specialist
                </div>
                <h3 className="font-heading font-black text-2xl text-aura-bone">
                  {selectedTrainer.name}
                </h3>
                <p className="text-xs font-mono text-aura-mist mt-1 mb-6">
                  {selectedTrainer.role}
                </p>

                <h4 className="text-xs uppercase tracking-widest font-heading text-aura-bone mb-2">
                  Biography & Background
                </h4>
                <p className="text-sm text-aura-mist leading-relaxed mb-6">
                  {selectedTrainer.bio}
                </p>

                <h4 className="text-xs uppercase tracking-widest font-heading text-aura-bone mb-2">
                  Certifications & Credentials
                </h4>
                <ul className="space-y-2">
                  {selectedTrainer.certifications.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-aura-bone font-mono">
                      <Award className="w-4 h-4 text-aura-ember shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <Button href="/contact" className="w-full">
                  Request 1-on-1 Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
