'use client';

import React from 'react';
import Counter from '../motion/Counter';
import Reveal from '../motion/Reveal';

const STATS = [
  { value: 1250, suffix: '+', label: 'Active Performance Members' },
  { value: 24, suffix: '', label: 'Master Elite Coaches' },
  { value: 48, suffix: '/wk', label: 'Calibrated Weekly Classes' },
  { value: 99, suffix: '%', label: 'Member Retention & Goal Attainment' },
];

export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0e0e12] border-y border-white/5 relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center md:text-left">
              <div className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-aura-bone tracking-tight mb-2">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest font-heading text-aura-mist">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
