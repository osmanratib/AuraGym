'use client';

import React, { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Flame, Zap, Shield, Activity, ArrowUpRight, Clock, Users } from 'lucide-react';
import clsx from 'clsx';

const CATEGORIES = ['All', 'Strength', 'Cardio & Conditioning', 'Technique & Power', 'Longevity & Recovery'];

const DETAILED_PROGRAMS = [
  {
    id: 'prog-1',
    title: 'Hypertrophy & Kinetic Power',
    category: 'Strength',
    icon: Flame,
    intensity: 'High',
    duration: '60 min',
    capacity: '16 Athletes',
    coach: 'Marcus Vance',
    desc: 'Heavy compound movements and mechanical tension series designed to build thick muscular density and structural integrity.',
    overview: 'This program targets type II muscle fibers through systematic tempo control, isometric holds, and drop sets. Coaches ensure precise joint stacking to maximize leverage and eliminate injury risks.',
    schedule: 'Mon, Wed, Fri · 07:00, 12:00, 18:00',
  },
  {
    id: 'prog-2',
    title: 'Athletic Conditioning & HIIT',
    category: 'Cardio & Conditioning',
    icon: Zap,
    intensity: 'Maximum',
    duration: '45 min',
    capacity: '20 Athletes',
    coach: 'Elena Rostova',
    desc: 'Metabolic intervals utilizing air resistance bikes, sprint treadmills, and heavy prowler sleds to forge elite anaerobic endurance.',
    overview: 'Using live telemetry monitoring, each athlete operates at 85-95% of maximal heart rate intervals followed by active recovery. Excellent for accelerating fat oxidation and boosting VO2 kinetics.',
    schedule: 'Tue, Thu, Sat · 06:30, 12:30, 17:30',
  },
  {
    id: 'prog-3',
    title: 'Olympic Weightlifting Mastery',
    category: 'Technique & Power',
    icon: Shield,
    intensity: 'High',
    duration: '75 min',
    capacity: '12 Athletes',
    coach: 'Darius Sterling',
    desc: 'Platform mastery in the snatch and clean & jerk with bar path kinetic breakdown and mobility prep.',
    overview: 'Athletes work on competition-grade Eleiko platforms. Every lift is analyzed for bar velocity, hip drive trajectory, and receiving depth. Suitable for intermediate lifters and advanced competitors.',
    schedule: 'Mon, Thu · 10:00 & 19:00',
  },
  {
    id: 'prog-4',
    title: 'Deep Mobility & Fascial Release',
    category: 'Longevity & Recovery',
    icon: Activity,
    intensity: 'Moderate',
    duration: '50 min',
    capacity: '15 Athletes',
    coach: 'Dr. Maya Lin, PT',
    desc: 'Decompress compressed joints, restore hip and spine kinematics, and downregulate CNS fatigue.',
    overview: 'Combines Functional Range Conditioning (FRC), gentle passive traction, and diaphragmatic breathwork. Designed to prevent chronic stiffness and fast-track tissue repair between heavy training bouts.',
    schedule: 'Wed, Fri, Sun · 08:30 & 18:30',
  },
  {
    id: 'prog-5',
    title: 'Combative Dynamics & Boxing',
    category: 'Cardio & Conditioning',
    icon: Zap,
    intensity: 'High',
    duration: '60 min',
    capacity: '14 Athletes',
    coach: 'Kai Tanaka',
    desc: 'Heavy bag rounds, rotational power drills, and footwork agility that condition athletic reaction time.',
    overview: 'Learn true striking mechanics and kinetic rotational whip without head contact. High caloric expenditure, shoulder endurance, and agility footwork.',
    schedule: 'Tue, Fri · 09:00 & 19:30',
  },
  {
    id: 'prog-6',
    title: 'Cold Contrast & Breathwork',
    category: 'Longevity & Recovery',
    icon: Activity,
    intensity: 'Restorative',
    duration: '45 min',
    capacity: '10 Athletes',
    coach: 'Dr. Maya Lin, PT',
    desc: 'Guided thermal cycling: 195°F Finnish sauna rounds paired with 38°F cold immersion plunges.',
    overview: 'Stimulates vascular constriction/dilation, norepinephrine release, and acute cellular reset. Athletes report profound mental clarity and accelerated muscle recovery.',
    schedule: 'Daily · 11:00 & 19:00',
  },
];

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState<(typeof DETAILED_PROGRAMS)[0] | null>(null);

  const filteredPrograms =
    activeCategory === 'All'
      ? DETAILED_PROGRAMS
      : DETAILED_PROGRAMS.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-aura-black">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="mb-12">
          <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-aura-ember" />
            <span>Curriculum</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-aura-bone tracking-tight max-w-3xl mb-6">
            Engineered Programs For Every Goal.
          </h1>
          <p className="text-lg text-aura-mist max-w-2xl leading-relaxed">
            Every session at Aura Gym is periodized and instructed by master coaches. Filter through our disciplines below to explore the schedule and methodology.
          </p>
        </Reveal>

        {/* Filter Pills */}
        <Reveal delay={0.15} className="mb-12 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'px-5 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-200 border',
                activeCategory === cat
                  ? 'bg-aura-ember text-aura-black font-bold border-aura-ember shadow-aura-glow'
                  : 'bg-aura-graphite text-aura-mist border-white/5 hover:border-white/20 hover:text-aura-bone'
              )}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Staggered Programs Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <StaggerItem key={program.id}>
                <div
                  onClick={() => setSelectedProgram(program)}
                  className="bg-aura-graphite border border-white/5 rounded-card p-6 sm:p-8 hover:border-aura-ember/40 hover:shadow-aura-glow transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-aura-black border border-white/10 flex items-center justify-center text-aura-ember group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 text-aura-mist border border-white/5">
                        {program.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-aura-bone group-hover:text-aura-ember transition-colors mb-3 flex items-center justify-between">
                      <span>{program.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-aura-mist group-hover:text-aura-ember transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>

                    <p className="text-sm text-aura-mist leading-relaxed mb-6">
                      {program.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-aura-mist font-mono">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-aura-ember" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-aura-ember" />
                        {program.capacity}
                      </span>
                    </div>
                    <div className="text-[11px] text-aura-bone/80 truncate">
                      Coach: <span className="text-aura-ember">{program.coach}</span>
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
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs uppercase font-heading px-3 py-1 rounded-full bg-aura-ember/15 text-aura-ember">
                {selectedProgram.category}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-aura-mist">
                Duration: {selectedProgram.duration}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-aura-mist">
                Capacity: {selectedProgram.capacity}
              </span>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-2">
                Program Overview
              </h4>
              <p className="text-sm text-aura-bone/90 leading-relaxed">
                {selectedProgram.overview}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-aura-black/60 border border-white/5">
              <div className="text-xs uppercase font-heading text-aura-mist mb-1">
                Lead Specialist
              </div>
              <div className="text-sm font-heading font-bold text-aura-bone">
                {selectedProgram.coach}
              </div>
              <div className="text-xs uppercase font-heading text-aura-mist mt-3 mb-1">
                Weekly Class Times
              </div>
              <div className="text-xs font-mono text-aura-ember">
                {selectedProgram.schedule}
              </div>
            </div>

            <div className="pt-2 flex gap-4">
              <Button href="/contact" className="w-full">
                Claim Trial In This Program
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
