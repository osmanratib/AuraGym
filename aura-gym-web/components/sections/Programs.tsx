'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    desc: 'Periodized progressive overload with custom biomechanical machines and calibrated free weights for maximum muscular density.',
    details: 'Focuses on tension time, mechanical drop sets, and eccentric overload under the direct oversight of elite strength coaches. Includes post-session intra-workout recovery shake and targeted myofascial release.',
    accent: '#FF5A1F',
  },
  {
    id: 'athletic-conditioning',
    title: 'Athletic Conditioning & HIIT',
    category: 'Cardio & Conditioning',
    icon: Zap,
    intensity: 'Max',
    duration: '45 min',
    desc: 'Metabolic threshold training using curved treadmills, air bikes, sled pulls, and heart rate telemetry to forge unyielding endurance.',
    details: 'Live heart-rate telemetry tracking keeps athletes in target anaerobic zones. Designed to spike VO2 max and burn caloric reserves for up to 36 hours post-training.',
    accent: '#FF8A48',
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
    accent: '#FFB38A',
  },
  {
    id: 'fascial-recovery',
    title: 'Fascial Release & Mobility Flow',
    category: 'Longevity & Recovery',
    icon: Activity,
    intensity: 'Moderate',
    duration: '50 min',
    desc: 'Decompress compressed joints, restore hip and thoracic range of motion, and reset neural fatigue with guided mobility.',
    details: 'Blends functional range conditioning (FRC), infrared thermal pads, pneumatic compression sleeves, and targeted breathwork to down-regulate the nervous system.',
    accent: '#9A9AA3',
  },
];

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<(typeof PROGRAMS_DATA)[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-aura-black relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal>
            <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-aura-ember" />
              <span>Disciplines</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-aura-bone tracking-tight">
              Calibrated Performance Programs
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Button href="/programs" variant="secondary" size="md">
              View All Programs
            </Button>
          </Reveal>
        </div>

        {/* Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROGRAMS_DATA.map((prog) => {
            const Icon = prog.icon;
            return (
              <StaggerItem key={prog.id}>
                <div
                  onClick={() => setSelectedProgram(prog)}
                  className="group relative bg-aura-graphite border border-white/5 rounded-card p-8 transition-all duration-500 hover:border-aura-ember/40 hover:shadow-aura-glow cursor-pointer overflow-hidden flex flex-col justify-between h-full"
                >
                  {/* Subtle hover gradient glow */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: prog.accent }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-aura-black border border-white/10 flex items-center justify-center text-aura-ember group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-heading uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-aura-mist border border-white/5">
                        {prog.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-2xl text-aura-bone mb-3 group-hover:text-aura-ember transition-colors duration-300 flex items-center justify-between">
                      <span>{prog.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-aura-mist group-hover:text-aura-ember group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 ml-2" />
                    </h3>

                    <p className="text-aura-mist text-sm leading-relaxed mb-6">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5 text-xs text-aura-mist font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-aura-ember" />
                      Intensity: <strong className="text-aura-bone">{prog.intensity}</strong>
                    </span>
                    <span>Duration: <strong className="text-aura-bone">{prog.duration}</strong></span>
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
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-aura-ember/15 text-aura-ember font-heading uppercase tracking-wider">
                {selectedProgram.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-aura-bone font-mono">
                Duration: {selectedProgram.duration}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-aura-bone font-mono">
                Intensity: {selectedProgram.intensity}
              </span>
            </div>

            <p className="text-sm md:text-base text-aura-bone/90 leading-relaxed">
              {selectedProgram.desc}
            </p>

            <div className="p-4 rounded-xl bg-aura-black/60 border border-white/5">
              <h4 className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-2">
                Biomechanical Architecture
              </h4>
              <p className="text-xs md:text-sm text-aura-mist leading-relaxed">
                {selectedProgram.details}
              </p>
            </div>

            <div className="pt-2 flex gap-4">
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
