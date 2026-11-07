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
    num: '01',
    title: 'Hypertrophy & Kinetic Power',
    category: 'Strength Protocol',
    icon: Flame,
    intensity: 'High Tier',
    duration: '60 MIN',
    image: '/images/athlete-biceps.jpg',
    desc: 'Periodized progressive overload with biomechanical machines and calibrated free weights for maximum muscular density.',
    details: 'Focuses on tension time, mechanical drop sets, and eccentric overload under the direct oversight of elite strength coaches. Includes post-session intra-workout recovery shake and targeted myofascial release.',
  },
  {
    id: 'athletic-conditioning',
    num: '02',
    title: 'Athletic Conditioning & HIIT',
    category: 'Cardio Protocol',
    icon: Zap,
    intensity: 'Max Effort',
    duration: '45 MIN',
    image: '/images/facility-cardio.jpg',
    desc: 'Metabolic threshold training using curved treadmills, air bikes, sled pulls, and heart rate telemetry to forge unyielding endurance.',
    details: 'Live heart-rate telemetry tracking keeps athletes in target anaerobic zones. Designed to spike VO2 max and burn caloric reserves for up to 36 hours post-training.',
  },
  {
    id: 'olympic-lifting',
    num: '03',
    title: 'Olympic Weightlifting Mastery',
    category: 'Power Protocol',
    icon: Shield,
    intensity: 'Elite Spec',
    duration: '75 MIN',
    image: '/images/athlete-triceps.jpg',
    desc: 'Precision coaching on the snatch, clean & jerk, bar path trajectory analysis, and triple extension kinetics.',
    details: 'High-speed camera bar-path velocity feedback, custom wooden platforms, and competition Eleiko spec bars. Ideal for athletes seeking explosive kinetic output.',
  },
  {
    id: 'fascial-recovery',
    num: '04',
    title: 'Fascial Release & Mobility Flow',
    category: 'Restoration',
    icon: Activity,
    intensity: 'Deliberate',
    duration: '50 MIN',
    image: '/images/athlete-back.jpg',
    desc: 'Decompress compressed joints, restore hip and spine kinematics, and downregulate CNS fatigue with guided mobility.',
    details: 'Blends functional range conditioning (FRC), infrared thermal pads, pneumatic compression sleeves, and targeted breathwork to down-regulate the nervous system.',
  },
];

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<(typeof PROGRAMS_DATA)[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-aura-canvas relative border-b border-black/[0.08]">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-10 border-b border-black/[0.08]">
          <Reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-aura-ember" />
              <span className="text-[11px] uppercase tracking-[0.28em] font-heading font-bold text-aura-ember">
                02 // Disciplines
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-aura-ink tracking-[-0.035em] uppercase leading-[0.96]">
              Calibrated
              <br />
              <span className="text-aura-slate/80">Training Architecture.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="text-[11px] font-heading uppercase tracking-[0.22em] text-aura-slate font-medium">
                Four Biomechanical Pathways
              </span>
              <Button href="/programs" variant="secondary" size="md">
                View All Programs
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROGRAMS_DATA.map((prog) => {
            const Icon = prog.icon;
            return (
              <StaggerItem key={prog.id}>
                <div
                  onClick={() => setSelectedProgram(prog)}
                  className="group relative bg-white border border-black/[0.08] rounded-[22px] overflow-hidden shadow-aura-card hover:shadow-aura-card-hover hover:border-black/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-100">
                    <AuraImage
                      src={prog.image}
                      alt={prog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      containerClassName="w-full h-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent z-20" />

                    <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/95 text-aura-ink shadow-sm">
                        {prog.num} · {prog.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-aura-ember flex items-center justify-center text-white shadow-sm">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-heading font-semibold uppercase tracking-wider">{prog.duration}</span>
                      </div>
                      <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-neutral-300">{prog.intensity}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-aura-ink group-hover:text-aura-ember transition-colors tracking-tight mb-2.5">
                        {prog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-aura-slate leading-relaxed font-light mb-6">
                        {prog.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] text-xs font-heading font-semibold uppercase tracking-[0.16em] text-aura-ink group-hover:text-aura-ember transition-colors">
                      <span>Inspect Biomechanical Protocol</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Program Details Modal */}
      <Modal
        isOpen={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title}
      >
        {selectedProgram && (
          <div className="space-y-6">
            <div className="relative h-60 rounded-xl overflow-hidden">
              <AuraImage
                src={selectedProgram.image}
                alt={selectedProgram.title}
                fill
                className="object-cover"
                containerClassName="w-full h-full"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-aura-ember">
                  {selectedProgram.category}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg text-aura-ink mb-2">Protocol Overview</h4>
              <p className="text-sm text-aura-slate leading-relaxed font-light mb-4">
                {selectedProgram.desc}
              </p>
              <p className="text-sm text-aura-slate leading-relaxed font-light">
                {selectedProgram.details}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/[0.08]">
              <div className="p-4 rounded-xl bg-aura-canvas border border-black/[0.06]">
                <div className="text-[10px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-slate mb-1">
                  Session Duration
                </div>
                <div className="text-lg font-heading font-bold text-aura-ink">
                  {selectedProgram.duration}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-aura-canvas border border-black/[0.06]">
                <div className="text-[10px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-slate mb-1">
                  Kinetic Intensity
                </div>
                <div className="text-lg font-heading font-bold text-aura-ember">
                  {selectedProgram.intensity}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button href="/contact" size="lg" className="w-full">
                Book Initial Assessment Session
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
