'use client';

import React from 'react';
import Counter from '../motion/Counter';
import Reveal from '../motion/Reveal';

const STATS = [
  { code: 'MMXXVI · 01', value: 1250, suffix: '+', label: 'Active Athletes', sub: 'Capped Floor Density' },
  { code: 'MMXXVI · 02', value: 24, suffix: '', label: 'Master Coaches', sub: 'CSCS & Olympic Specialists' },
  { code: 'MMXXVI · 03', value: 48, suffix: '/WK', label: 'Periodized Sessions', sub: 'Biomechanical Circuits' },
  { code: 'MMXXVI · 04', value: 99, suffix: '%', label: 'Retention Rate', sub: 'Zero Long Contracts' },
];

export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#111114] text-white border-y border-white/10 relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <Reveal key={i} delay={i * 0.08} className="py-6 sm:py-0 px-0 sm:px-6 lg:px-8 text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-aura-ember" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember">
                  {stat.code}
                </span>
              </div>
              <div className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-[-0.04em] mb-2 leading-none">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[12px] uppercase tracking-[0.18em] font-heading font-bold text-white mb-1">
                {stat.label}
              </div>
              <p className="text-[11px] text-neutral-400 font-light tracking-wide">
                {stat.sub}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
