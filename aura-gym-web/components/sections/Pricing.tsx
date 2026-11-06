'use client';

import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';

export const PLANS_DATA = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Essential',
    priceMonthly: 59,
    priceYearly: 590,
    desc: 'Unrestricted access to the performance floor and essential wellness amenities.',
    features: [
      'Full gym floor & cardio deck access',
      'Locker room & Finnish sauna access',
      '1 Complimentary fitness assessment',
      'Standard mobile app scheduling',
      'Electrolyte & filtered water station',
    ],
    isPopular: false,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Black Tier',
    priceMonthly: 119,
    priceYearly: 1190,
    desc: 'The complete athletic experience including unlimited group conditioning and priority recovery.',
    features: [
      'Everything in Essential',
      'Unlimited group conditioning & HIIT classes',
      'Dedicated member concierge',
      'Guest passes (2 per month)',
      'Eucalyptus towel & laundry service',
      'Smoothie bar & recovery lounge discount (15%)',
    ],
    isPopular: true,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Private Athlete',
    priceMonthly: 249,
    priceYearly: 2490,
    desc: 'Bespoke individual coaching, private biometric analysis, and exclusive recovery suites.',
    features: [
      'Everything in Black Tier',
      'Weekly 1-on-1 private coaching sessions',
      'Biometric metabolic tracking & nutrition plan',
      'Private cryotherapy & infrared recovery suite',
      'Unlimited guest privileges',
      'Reserved luxury locker with personalized engraving',
    ],
    isPopular: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-[#0e0e12] relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-aura-ember" />
              <span>Investment</span>
              <span className="w-6 h-[1px] bg-aura-ember" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-aura-bone tracking-tight mb-4">
              Membership Tiers
            </h2>
            <p className="text-aura-mist text-sm sm:text-base leading-relaxed">
              Transparent access to world-class coaching, equipment, and restoration facilities with zero hidden fees.
            </p>
          </Reveal>

          {/* Billing Frequency Toggle */}
          <Reveal delay={0.2} className="mt-8 inline-flex items-center p-1.5 rounded-full bg-aura-graphite border border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={clsx(
                'px-5 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300',
                !isYearly ? 'bg-aura-ember text-aura-black font-bold shadow-aura-glow' : 'text-aura-mist hover:text-aura-bone'
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={clsx(
                'px-5 py-2 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5',
                isYearly ? 'bg-aura-ember text-aura-black font-bold shadow-aura-glow' : 'text-aura-mist hover:text-aura-bone'
              )}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-aura-black/40 text-aura-bone font-mono">Save 18%</span>
            </button>
          </Reveal>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS_DATA.map((plan, i) => {
            const price = isYearly ? Math.round(plan.priceYearly / 12) : plan.priceMonthly;

            return (
              <Reveal key={plan.id} delay={i * 0.15} className="flex">
                <div
                  className={clsx(
                    'relative w-full rounded-card p-8 flex flex-col justify-between transition-all duration-300 bg-aura-graphite border',
                    plan.isPopular
                      ? 'border-aura-ember shadow-aura-glow ring-1 ring-aura-ember/50'
                      : 'border-white/5 hover:border-white/15'
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-aura-ember text-aura-black text-[10px] font-heading font-black uppercase tracking-widest flex items-center gap-1 shadow-aura-glow">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="font-heading font-bold text-2xl text-aura-bone mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-aura-mist leading-relaxed mb-6">
                      {plan.desc}
                    </p>

                    <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/5">
                      <span className="text-sm text-aura-mist font-mono">$</span>
                      <span className="font-heading font-black text-5xl text-aura-bone tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-aura-mist font-mono uppercase tracking-widest ml-1">
                        / month
                      </span>
                    </div>

                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-aura-mist">
                          <Check className="w-4 h-4 text-aura-ember shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    href={`/signup?plan=${plan.id}`}
                    variant={plan.isPopular ? 'primary' : 'secondary'}
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
