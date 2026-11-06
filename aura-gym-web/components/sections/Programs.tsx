'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Flame, Shield, Zap, Activity } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../motion/Stagger';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export const PROGRAMS_DATA = [
  {
    id: 'hypertrophy',
    title: 'Hypertrophy & Kinetic Power',
    category: 'Strength',
    icon: Flame,
    intensity: 'High',
    duration: '60 min',
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
    desc: 'Metabolic threshold training using curved treadmills, air bikes, sled pulls, and heart rate telemetry to forge endurance.',
    details: 'Live heart-rate telemetry tracking keeps athletes in target anaerobic zones. Designed to spike VO2 max and burn caloric reserves for up to 36 hours post-training.',
  },
  {
    id: 'olympic-lifting',
    title: 'Olympic Weightlifting Mastery',
    category: 'Technique & Power',
    icon: Shield,
    intensity: 'High',
    duration: '75 min',
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
    desc: 'Decompress joints, restore range of motion, and reset neural fatigue with guided mobility protocols.',
    details: 'Blends functional range conditioning (FRC), infrared thermal pads, pneumatic compression sleeves, and targeted breathwork to down-regulate the nervous system.',
  },
];

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<(typeof PROGRAMS_DATA)[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-aura-canvas relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-3 flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-aura-ember" />
              <span>Disciplines</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-aura-ink tracking-[-0.03em]">
              Performance Programs
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <Button href="/programs" variant="secondary" size="md">
              View All Programs
            </Button>
          </Reveal>
        </div>

        {/* Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {PROGRAMS_DATA.map((prog) => {
            const Icon = prog.icon;
            return (
              <StaggerItem key={prog.id}>
                <div
                  onClick={() => setSelectedProgram(prog)}
                  className="group relative bg-white border border-black/[0.06] rounded-card p-7 transition-all duration-300 hover:border-black/15 hover:shadow-aura-card-hover hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between h-full shadow-aura-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-full bg-aura-subtle border border-black/[0.06] flex items-center justify-center text-aura-ember group-hover:bg-aura-ember group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-aura-subtle text-aura-slate border border-black/[0.04]">
                        {prog.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-aura-ink mb-2.5 group-hover:text-aura-ember transition-colors duration-200 flex items-center justify-between tracking-tight">
                      <span>{prog.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-aura-mist group-hover:text-aura-ember group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-2" />
                    </h3>

                    <p className="text-aura-slate text-sm leading-relaxed mb-5">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-black/[0.06] text-[11px] text-aura-slate font-heading font-medium uppercase tracking-[0.14em]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-aura-ember" />
                      {prog.intensity}
                    </span>
                    <span>{prog.duration}</span>
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
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-aura-ember/10 text-aura-ember font-heading font-semibold uppercase tracking-wider">
                {selectedProgram.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-aura-subtle text-aura-ink font-heading font-medium">
                {selectedProgram.duration}
              </span>
              <span className="px-3 py-1 rounded-full bg-aura-subtle text-aura-ink font-heading font-medium">
                {selectedProgram.intensity}
              </span>
            </div>

            <p className="text-sm md:text-base text-aura-ink leading-relaxed">
              {selectedProgram.desc}
            </p>

            <div className="p-4 rounded-2xl bg-aura-subtle border border-black/[0.04]">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-ember mb-2">
                Session Details
              </h4>
              <p className="text-xs md:text-sm text-aura-slate leading-relaxed">
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
