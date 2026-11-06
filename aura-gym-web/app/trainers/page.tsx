'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import Button from '@/components/ui/Button';
import AuraImage from '@/components/ui/AuraImage';
import { X, Award, ChevronRight } from 'lucide-react';
import { TRAINERS_DATA } from '@/components/sections/Trainers';

export default function TrainersPage() {
  const [selectedTrainer, setSelectedTrainer] = useState<(typeof TRAINERS_DATA)[0] | null>(null);

  return (
    <div className="pt-28 pb-24 bg-aura-canvas">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="mb-14">
          <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-3 flex items-center gap-3">
            <span className="w-8 h-[1.5px] bg-aura-ember" />
            <span>Coaching Faculty</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-6xl text-aura-ink tracking-[-0.04em] max-w-3xl mb-5 leading-tight">
            Elite coaches. Sports scientists.
          </h1>
          <p className="text-base sm:text-lg text-aura-slate max-w-2xl leading-relaxed font-light">
            Every coach on the Aura Gym floor holds advanced biomechanics credentials, competitive backgrounds, and a personal commitment to your trajectory.
          </p>
        </Reveal>

        {/* Coaches Grid with user photos */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAINERS_DATA.map((trainer) => (
            <StaggerItem key={trainer.id}>
              <div
                onClick={() => setSelectedTrainer(trainer)}
                className="bg-white border border-black/[0.08] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:border-black/20 hover:shadow-aura-card-hover hover:-translate-y-1 shadow-aura-card flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-[360px] w-full overflow-hidden bg-neutral-100">
                  <AuraImage
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                    containerClassName="w-full h-full"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-20" />
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-aura-ink group-hover:text-aura-ember transition-colors tracking-tight">
                      {trainer.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-aura-slate mt-0.5 mb-4 font-heading font-medium">
                      {trainer.role}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {trainer.specialties.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-heading font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-aura-subtle text-aura-slate border border-black/[0.04]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-aura-ember group-hover:text-aura-ink transition-colors">
                    <span>View Specialist Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
                  onClick={() => setSelectedTrainer(null)}
                  className="p-2 text-aura-slate hover:text-aura-ink rounded-full hover:bg-black/5 transition-colors mb-5"
                  aria-label="Close bio drawer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-6 border border-black/[0.06]">
                  <AuraImage
                    src={selectedTrainer.image}
                    alt={selectedTrainer.name}
                    fill
                    className="object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>

                <div className="text-[11px] uppercase tracking-[0.2em] text-aura-ember font-heading font-semibold mb-0.5">
                  Master Specialist
                </div>
                <h3 className="font-heading font-bold text-2xl text-aura-ink tracking-tight">
                  {selectedTrainer.name}
                </h3>
                <p className="text-xs text-aura-slate mt-0.5 mb-5 font-heading font-medium uppercase tracking-[0.1em]">
                  {selectedTrainer.role}
                </p>

                <h4 className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-ink mb-2">
                  Biography & Background
                </h4>
                <p className="text-sm text-aura-slate leading-relaxed mb-6 font-light">
                  {selectedTrainer.bio}
                </p>

                <h4 className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-ink mb-2">
                  Certifications & Credentials
                </h4>
                <ul className="space-y-2">
                  {selectedTrainer.certifications.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-aura-ink">
                      <Award className="w-3.5 h-3.5 text-aura-ember shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06]">
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
