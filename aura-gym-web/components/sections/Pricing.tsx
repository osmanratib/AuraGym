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
    priceMonthly: 59,
    priceYearly: 590,
    desc: 'Unrestricted floor access and essential wellness amenities.',
    features: [
      'Full gym floor & cardio deck',
      'Locker room & sauna access',
      'Complimentary fitness assessment',
      'Standard mobile app scheduling',
      'Filtered water station',
    ],
    isPopular: false,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Black Tier',
    priceMonthly: 119,
    priceYearly: 1190,
    desc: 'Complete athletic experience with unlimited group conditioning.',
    features: [
      'Everything in Essential',
      'Unlimited group & HIIT classes',
      'Dedicated member concierge',
      'Guest passes (2 per month)',
      'Towel & laundry service',
      'Smoothie bar discount (15%)',
    ],
    isPopular: true,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Private Athlete',
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
    <section className="py-24 md:py-32 bg-aura-subtle relative border-t border-black/[0.06]">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-3">
              Membership
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-aura-ink tracking-[-0.03em] mb-4">
              Transparent Pricing
            </h2>
            <p className="text-aura-slate text-sm sm:text-base leading-relaxed font-light">
              World-class coaching, equipment, and restoration — zero hidden fees.
            </p>
          </Reveal>

          {/* Toggle */}
          <Reveal delay={0.15} className="mt-7 inline-flex items-center p-1 rounded-full bg-white border border-black/[0.08] shadow-aura-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={clsx(
                'px-5 py-2 rounded-full text-[11px] font-heading font-semibold uppercase tracking-[0.14em] transition-all duration-200',
                !isYearly ? 'bg-aura-ink text-white shadow-sm' : 'text-aura-slate hover:text-aura-ink'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={clsx(
                'px-5 py-2 rounded-full text-[11px] font-heading font-semibold uppercase tracking-[0.14em] transition-all duration-200 flex items-center gap-1.5',
                isYearly ? 'bg-aura-ink text-white shadow-sm' : 'text-aura-slate hover:text-aura-ink'
              )}
            >
              <span>Annual</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-aura-ember text-white font-bold">-18%</span>
            </button>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PLANS_DATA.map((plan, i) => {
            const price = isYearly ? Math.round(plan.priceYearly / 12) : plan.priceMonthly;

            return (
              <Reveal key={plan.id} delay={i * 0.1} className="flex">
                <div
                  className={clsx(
                    'relative w-full rounded-card p-7 flex flex-col justify-between transition-all duration-300 bg-white border shadow-aura-card',
                    plan.isPopular
                      ? 'border-aura-ember shadow-aura-glow ring-1 ring-aura-ember/20'
                      : 'border-black/[0.06] hover:border-black/15 hover:shadow-aura-card-hover'
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-aura-ember text-white text-[10px] font-heading font-bold uppercase tracking-[0.18em] shadow-aura-glow">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="font-heading font-bold text-xl text-aura-ink mb-1 tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-aura-slate leading-relaxed mb-5 font-light">
                      {plan.desc}
                    </p>

                    <div className="flex items-baseline gap-0.5 mb-7 pb-5 border-b border-black/[0.06]">
                      <span className="text-sm text-aura-slate font-mono">$</span>
                      <span className="font-heading font-bold text-[2.75rem] text-aura-ink tracking-tighter leading-none">
                        {price}
                      </span>
                      <span className="text-xs text-aura-slate ml-1 font-heading uppercase tracking-wider">/mo</span>
                    </div>

                    <ul className="space-y-3 mb-7">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-aura-slate">
                          <Check className="w-4 h-4 text-aura-ember shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    href={`/signup?plan=${plan.id}`}
                    variant={plan.isPopular ? 'ember' : 'secondary'}
                    size="md"
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
