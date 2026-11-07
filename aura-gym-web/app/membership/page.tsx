'use client';

import React, { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { Check, Minus, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { PLANS_DATA } from '@/components/sections/Pricing';

const COMPARISON_FEATURES = [
  {
    category: 'Facility & Equipment Access',
    items: [
      { name: 'Full Performance Floor & Cardio Deck', essential: true, black: true, athlete: true },
      { name: 'Finnish Cedar Dry Saunas', essential: true, black: true, athlete: true },
      { name: 'Locker Rooms & Rain Showers', essential: true, black: true, athlete: true },
      { name: 'Filtered Electrolyte Stations', essential: true, black: true, athlete: true },
      { name: '24/7 Biometric Keycard Access', essential: false, black: false, athlete: true },
      { name: 'Permanent Engraved VIP Locker', essential: false, black: false, athlete: true },
    ],
  },
  {
    category: 'Coaching & Group Programs',
    items: [
      { name: 'Complimentary Onboarding Assessment', essential: true, black: true, athlete: true },
      { name: 'Unlimited HIIT & Conditioning Classes', essential: false, black: true, athlete: true },
      { name: 'Olympic Weightlifting Clinics', essential: false, black: true, athlete: true },
      { name: 'Weekly 1-on-1 Private Coaching Session', essential: false, black: false, athlete: true },
      { name: 'Customized Macro & Nutrition Protocol', essential: false, black: false, athlete: true },
    ],
  },
  {
    category: 'Recovery Sanctuary & Perks',
    items: [
      { name: 'Towel & Laundry Valet Service', essential: false, black: true, athlete: true },
      { name: 'Monthly Guest Passes', essential: 'None', black: '2 per month', athlete: 'Unlimited' },
      { name: 'Cold Plunge Immersion Pools (38°F)', essential: false, black: true, athlete: true },
      { name: 'Private Infrared Cryo Suite Access', essential: false, black: false, athlete: true },
      { name: 'Smoothie Bar & Supplement Discount', essential: '0%', black: '15%', athlete: '25%' },
    ],
  },
];

const FAQS = [
  {
    question: 'Can I test the facilities before committing to a membership tier?',
    answer:
      'Yes. We offer a complimentary 1-Day Trial Pass for local residents. You receive unrestricted access to the strength floor, recovery suite, and any group conditioning class on that day.',
  },
  {
    question: 'Are memberships tied to long-term contracts?',
    answer:
      'No. Aura Gym operates on flexible month-to-month memberships with no cancellation fees, provided a 14-day written notice before your renewal date. We also offer annual plans with an 18% savings discount.',
  },
  {
    question: 'What is included in the Private Athlete coaching tier?',
    answer:
      'Private Athlete includes weekly 60-minute one-on-one sessions with your assigned Master Coach, biometric DEXA/metabolic tracking, private recovery room reservations, 24/7 keycard floor access, and nutrition periodization.',
  },
  {
    question: 'How do guest passes work?',
    answer:
      'Black Tier members receive 2 guest passes every month. Private Athletes enjoy unlimited guest access (one guest per visit). Guests have access to the gym floor and recovery thermal zones.',
  },
  {
    question: 'What are the floor operating hours?',
    answer:
      'General floor hours are Monday to Friday 05:00 – 23:00, Saturday 06:00 – 21:00, and Sunday 07:00 – 20:00. Private Athlete members have biometric keyless access 24 hours a day, 365 days a year.',
  },
];

export default function MembershipPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pt-28 pb-24 bg-aura-canvas">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-aura-ember" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-heading font-bold text-aura-ember">
              Membership Protocol
            </span>
            <span className="w-2 h-2 rounded-full bg-aura-ember" />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-aura-ink tracking-[-0.035em] uppercase mb-5 leading-[0.96]">
            Transparent
            <br />
            <span className="text-aura-slate/80">Investment Tiers.</span>
          </h1>
          <p className="text-base sm:text-lg text-aura-slate leading-relaxed font-light">
            Choose the tier tailored to your training frequency and recovery requirements.
          </p>

          {/* Toggle */}
          <div className="mt-7 inline-flex items-center p-1 rounded-full bg-white border border-black/[0.08] shadow-aura-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={clsx(
                'px-5 py-2 rounded-full text-[11px] font-heading font-semibold uppercase tracking-[0.14em] transition-all duration-200',
                !isYearly ? 'bg-aura-ink text-white shadow-sm' : 'text-aura-slate hover:text-aura-ink'
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={clsx(
                'px-5 py-2 rounded-full text-[11px] font-heading font-semibold uppercase tracking-[0.14em] transition-all duration-200 flex items-center gap-1.5',
                isYearly ? 'bg-aura-ink text-white shadow-sm' : 'text-aura-slate hover:text-aura-ink'
              )}
            >
              <span>Annual</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-aura-ember text-white font-bold">
                Save 18%
              </span>
            </button>
          </div>
        </Reveal>

        {/* 3 Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-28">
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
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-aura-ember text-white text-[10px] font-heading font-bold uppercase tracking-[0.18em] shadow-aura-glow flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
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
                      <span className="text-xs text-aura-slate ml-1 font-heading uppercase tracking-wider">
                        / month
                      </span>
                    </div>

                    <ul className="space-y-3 mb-7">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-aura-slate">
                          <Check className="w-4 h-4 text-aura-ember shrink-0 mt-0.5" />
                          <span>{feature}</span>
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

        {/* Comparison Table */}
        <section className="mb-28">
          <Reveal className="mb-8 text-center md:text-left">
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-aura-ink tracking-[-0.03em]">
              Feature Matrix
            </h2>
            <p className="text-sm text-aura-slate mt-1 font-light">
              Detailed technical breakdown of entitlements and coaching tiers.
            </p>
          </Reveal>

          <div className="overflow-x-auto border border-black/[0.06] rounded-card bg-white shadow-aura-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-aura-subtle">
                  <th className="p-4 font-heading text-xs uppercase tracking-wider text-aura-ink w-2/5">
                    Tier Feature
                  </th>
                  <th className="p-4 font-heading text-xs uppercase tracking-wider text-aura-slate text-center w-1/5">
                    Essential
                  </th>
                  <th className="p-4 font-heading text-xs uppercase tracking-wider text-aura-ember text-center w-1/5">
                    Black Tier
                  </th>
                  <th className="p-4 font-heading text-xs uppercase tracking-wider text-aura-ink text-center w-1/5">
                    Private Athlete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] text-xs">
                {COMPARISON_FEATURES.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    <tr className="bg-aura-canvas">
                      <td colSpan={4} className="p-3 px-5 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-aura-ember">
                        {group.category}
                      </td>
                    </tr>
                    {group.items.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-aura-subtle/50 transition-colors">
                        <td className="p-3.5 px-5 text-aura-ink font-sans text-sm">
                          {row.name}
                        </td>
                        <td className="p-3.5 text-center">
                          {typeof row.essential === 'boolean' ? (
                            row.essential ? (
                              <Check className="w-4 h-4 text-aura-ember mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-aura-mist mx-auto" />
                            )
                          ) : (
                            <span className="text-aura-slate">{row.essential}</span>
                          )}
                        </td>
                        <td className="p-3.5 text-center bg-aura-ember/5">
                          {typeof row.black === 'boolean' ? (
                            row.black ? (
                              <Check className="w-4 h-4 text-aura-ember mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-aura-mist mx-auto" />
                            )
                          ) : (
                            <span className="text-aura-ink font-semibold">{row.black}</span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          {typeof row.athlete === 'boolean' ? (
                            row.athlete ? (
                              <Check className="w-4 h-4 text-aura-ember mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-aura-mist mx-auto" />
                            )
                          ) : (
                            <span className="text-aura-ink font-semibold">{row.athlete}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-2">
              Common Questions
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-aura-ink tracking-[-0.03em]">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <Accordion items={FAQS} />
        </section>
      </div>
    </div>
  );
}
