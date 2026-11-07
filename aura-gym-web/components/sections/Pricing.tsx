'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';

export const PLANS_DATA = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Essential',
    code: 'TIER // 01',
    priceMonthly: 59,
    priceYearly: 590,
    desc: 'Unrestricted floor access and essential wellness amenities.',
    features: [
      'Full gym floor & cardio deck',
      'Locker room & Finnish cedar sauna access',
      'Complimentary fitness assessment',
      'Standard mobile app scheduling',
      'Filtered electrolyte hydration station',
    ],
    isPopular: false,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Black Tier',
    code: 'TIER // 02',
    priceMonthly: 119,
    priceYearly: 1190,
    desc: 'Complete athletic experience with unlimited group conditioning.',
    features: [
      'Everything in Essential',
      'Unlimited group & HIIT classes',
      'Dedicated member concierge',
      'Guest passes (2 per month)',
      'Towel & laundry valet service',
      'Smoothie bar discount (15%)',
    ],
    isPopular: true,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Private Athlete',
    code: 'TIER // 03',
    priceMonthly: 249,
    priceYearly: 2490,
    desc: 'Bespoke individual coaching and exclusive recovery suites.',
    features: [
      'Everything in Black Tier',
      'Weekly 1-on-1 private coaching',
      'Biometric tracking & nutrition plan',
      'Private cryotherapy & recovery suite',
      'Unlimited guest privileges',
      'VIP locker with engraving',
    ],
    isPopular: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-aura-canvas relative border-b border-black/[0.08]">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-10 border-b border-black/[0.08]">
          <Reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-aura-ember" />
              <span className="text-[11px] uppercase tracking-[0.28em] font-heading font-bold text-aura-ember">
                04 // Membership Protocol
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-aura-ink tracking-[-0.035em] uppercase leading-[0.96]">
              Transparent
              <br />
              <span className="text-aura-slate/80">Investment Tiers.</span>
            </h2>
          </Reveal>

          {/* Toggle */}
          <Reveal delay={0.15} className="flex flex-col items-start md:items-end gap-3">
            <span className="text-[11px] font-heading uppercase tracking-[0.22em] text-aura-slate font-medium">
              Flexible Monthly · Zero Hidden Contracts
            </span>
            <div className="inline-flex items-center p-1 rounded-full bg-white border border-black/[0.08] shadow-aura-sm">
              <button
                onClick={() => setIsYearly(false)}
                className={clsx(
                  'px-5 py-2 rounded-full text-[11px] font-heading font-semibold uppercase tracking-[0.16em] transition-all duration-200',
                  !isYearly ? 'bg-aura-ink text-white shadow-sm' : 'text-aura-slate hover:text-aura-ink'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={clsx(
                  'px-5 py-2 rounded-full text-[11px] font-heading font-semibold uppercase tracking-[0.16em] transition-all duration-200 flex items-center gap-1.5',
                  isYearly ? 'bg-aura-ink text-white shadow-sm' : 'text-aura-slate hover:text-aura-ink'
                )}
              >
                <span>Annual</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-aura-ember text-white font-bold">-18%</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS_DATA.map((plan, i) => {
            const price = isYearly ? Math.round(plan.priceYearly / 12) : plan.priceMonthly;

            return (
              <Reveal key={plan.id} delay={i * 0.1} className="flex">
                <div
                  className={clsx(
                    'relative w-full rounded-[24px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 bg-white border shadow-aura-card',
                    plan.isPopular
                      ? 'border-aura-ember shadow-aura-glow ring-1 ring-aura-ember/30'
                      : 'border-black/[0.08] hover:border-black/20 hover:shadow-aura-card-hover'
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-aura-ember text-white text-[10px] font-heading font-bold uppercase tracking-[0.22em] shadow-aura-glow">
                      Recommended Athlete Spec
                    </div>
                  )}

                  <div>
                    <div className="text-[10px] font-heading font-semibold uppercase tracking-[0.24em] text-aura-ember mb-1">
                      {plan.code}
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-aura-ink tracking-tight mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-aura-slate leading-relaxed font-light mb-6">
                      {plan.desc}
                    </p>

                    <div className="flex items-baseline gap-2 pb-6 border-b border-black/[0.06] mb-6">
                      <span className="font-display font-black text-5xl sm:text-6xl text-aura-ink tracking-tight">
                        ${price}
                      </span>
                      <span className="text-xs text-aura-slate font-heading uppercase tracking-wider font-semibold">
                        / month
                      </span>
                    </div>

                    <div className="space-y-3.5 mb-8">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-aura-ink font-light">
                          <div className="w-4 h-4 rounded-full bg-aura-ember/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-aura-ember stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    href={`/signup?plan=${plan.id}`}
                    variant={plan.isPopular ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    Select {plan.name}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
