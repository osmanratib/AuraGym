'use client';

import React from 'react';
import Counter from '../motion/Counter';
import Reveal from '../motion/Reveal';

const STATS = [
  { value: 1250, suffix: '+', label: 'Active Members' },
  { value: 24, suffix: '', label: 'Master Coaches' },
  { value: 48, suffix: '/wk', label: 'Weekly Classes' },
  { value: 99, suffix: '%', label: 'Goal Attainment' },
];

export default function StatsSection() {
  return (
    <section className="py-20 md:py-24 bg-white border-y border-black/[0.06] relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <Reveal key={i} delay={i * 0.08} className="text-center">
              <div className="font-heading font-bold text-4xl sm:text-5xl md:text-[3.5rem] text-aura-ink tracking-tight mb-2">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] font-heading font-semibold text-aura-slate">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
