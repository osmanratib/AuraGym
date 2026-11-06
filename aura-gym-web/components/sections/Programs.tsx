'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Flame, Shield, Zap, Activity } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../motion/Stagger';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import AuraImage from '../ui/AuraImage';

export const PROGRAMS_DATA = [
  {
    id: 'hypertrophy',
    title: 'Hypertrophy & Kinetic Power',
    category: 'Strength',
    icon: Flame,
    intensity: 'High',
    duration: '60 min',
    image: '/images/athlete-biceps.jpg',
    desc: 'Periodized progressive overload with biomechanical machines and calibrated free weights for maximum muscular density.',
    details: 'Focuses on tension time, mechanical drop sets, and eccentric overload under the direct oversight of elite strength coaches. Includes post-session intra-workout recovery shake and targeted myofascial release.',
  },
  {
    id: 'athletic-conditioning',
    title: 'Athletic Conditioning & HIIT',
    category: 'Cardio & Conditioning',
    icon: Zap,
    intensity: 'Max',
    duration: '45 min',
    image: '/images/facility-cardio.jpg',
    desc: 'Metabolic threshold training using curved treadmills, air bikes, sled pulls, and heart rate telemetry to forge unyielding endurance.',
    details: 'Live heart-rate telemetry tracking keeps athletes in target anaerobic zones. Designed to spike VO2 max and burn caloric reserves for up to 36 hours post-training.',
  },
  {
    id: 'olympic-lifting',
    title: 'Olympic Weightlifting Mastery',
    category: 'Technique & Power',
    icon: Shield,
    intensity: 'High',
    duration: '75 min',
    image: '/images/athlete-triceps.jpg',
    desc: 'Precision coaching on the snatch, clean & jerk, bar path trajectory analysis, and triple extension kinetics.',
    details: 'High-speed camera bar-path velocity feedback, custom wooden platforms, and competition Eleiko spec bars. Ideal for athletes seeking explosive kinetic output.',
  },
  {
    id: 'fascial-recovery',
    title: 'Fascial Release & Mobility Flow',
    category: 'Longevity & Recovery',
    icon: Activity,
    intensity: 'Moderate',
    duration: '50 min',
    image: '/images/athlete-back.jpg',
    desc: 'Decompress compressed joints, restore hip and spine kinematics, and downregulate CNS fatigue with guided mobility.',
    details: 'Blends functional range conditioning (FRC), infrared thermal pads, pneumatic compression sleeves, and targeted breathwork to down-regulate the nervous system.',
  },
];

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<(typeof PROGRAMS_DATA)[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-aura-canvas relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-3 flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-aura-ember" />
              <span>Disciplines</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-aura-ink tracking-[-0.03em]">
              Calibrated Programs
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <Button href="/programs" variant="secondary" size="md">
              View All Programs
            </Button>
          </Reveal>
        </div>

        {/* Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS_DATA.map((prog) => {
            const Icon = prog.icon;
            return (
              <StaggerItem key={prog.id}>
                <div
                  onClick={() => setSelectedProgram(prog)}
                  className="group relative bg-white border border-black/[0.08] rounded-2xl overflow-hidden shadow-aura-card hover:shadow-aura-card-hover hover:border-black/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Photo Container with AuraImage */}
                  <div className="relative h-60 w-full overflow-hidden bg-neutral-100">
                    <AuraImage
                      src={prog.image}
                      alt={prog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      containerClassName="w-full h-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />

                    <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                      <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-aura-ink shadow-sm">
                        {prog.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-aura-ember flex items-center justify-center text-white shadow-sm">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-mono font-medium">Duration: {prog.duration}</span>
                      </div>
                      <span className="text-xs font-mono font-medium">Intensity: {prog.intensity}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-heading font-bold text-xl text-aura-ink mb-2 group-hover:text-aura-ember transition-colors flex items-center justify-between tracking-tight">
                      <span>{prog.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-aura-slate group-hover:text-aura-ember transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>

                    <p className="text-sm text-aura-slate leading-relaxed font-light mb-4">
                      {prog.desc}
                    </p>

                    <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-heading uppercase tracking-wider text-aura-ember font-semibold">
                      <span>Inspect Biomechanical Protocol</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Program Detail Modal */}
      <Modal
        isOpen={Boolean(selectedProgram)}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title}
      >
        {selectedProgram && (
          <div className="space-y-5">
            <div className="relative h-48 w-full rounded-xl overflow-hidden">
              <AuraImage
                src={selectedProgram.image}
                alt={selectedProgram.title}
                fill
                className="object-cover"
                containerClassName="w-full h-full"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-aura-ember/10 text-aura-ember font-heading font-semibold uppercase tracking-wider">
                {selectedProgram.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-aura-ink font-heading font-medium">
                {selectedProgram.duration}
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-aura-ink font-heading font-medium">
                {selectedProgram.intensity}
              </span>
            </div>

            <p className="text-sm md:text-base text-aura-ink leading-relaxed">
              {selectedProgram.desc}
            </p>

            <div className="p-4 rounded-xl bg-neutral-50 border border-black/[0.06]">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-ember mb-2">
                Biomechanical Architecture
              </h4>
              <p className="text-xs md:text-sm text-aura-slate leading-relaxed font-light">
                {selectedProgram.details}
              </p>
            </div>

            <div className="pt-2">
              <Button href="/contact" className="w-full">
                Book Trial In This Program
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
