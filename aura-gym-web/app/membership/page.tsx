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
    <div className="pt-32 pb-24 bg-aura-black">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-aura-ember" />
            <span>Membership Plans</span>
            <span className="w-8 h-[1px] bg-aura-ember" />
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-aura-bone tracking-tight mb-6">
            Transparent Pricing. Peak Performance.
          </h1>
          <p className="text-base sm:text-lg text-aura-mist leading-relaxed">
            Choose the tier tailored to your intensity, scheduling frequency, and recovery requirements.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-aura-graphite border border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={clsx(
                'px-6 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300',
                !isYearly ? 'bg-aura-ember text-aura-black font-bold shadow-aura-glow' : 'text-aura-mist hover:text-aura-bone'
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={clsx(
                'px-6 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider transition-all duration-300 flex items-center gap-2',
                isYearly ? 'bg-aura-ember text-aura-black font-bold shadow-aura-glow' : 'text-aura-mist hover:text-aura-bone'
              )}
            >
              <span>Annual</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-aura-black/40 text-aura-bone font-mono">
                Save 18%
              </span>
            </button>
          </div>
        </Reveal>

        {/* 3 Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-32">
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

        {/* Comparison Table */}
        <section className="mb-32">
          <Reveal className="mb-10 text-center md:text-left">
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-aura-bone tracking-tight">
              Detailed Feature Matrix
            </h2>
            <p className="text-sm text-aura-mist mt-1">
              Side-by-side technical breakdown of entitlements and coaching tiers.
            </p>
          </Reveal>

          <div className="overflow-x-auto border border-white/5 rounded-card bg-aura-graphite shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#121215]">
                  <th className="p-5 font-heading text-xs uppercase tracking-wider text-aura-bone w-2/5">
                    Tier Feature
                  </th>
                  <th className="p-5 font-heading text-xs uppercase tracking-wider text-aura-mist text-center w-1/5">
                    Essential
                  </th>
                  <th className="p-5 font-heading text-xs uppercase tracking-wider text-aura-ember text-center w-1/5">
                    Black Tier
                  </th>
                  <th className="p-5 font-heading text-xs uppercase tracking-wider text-aura-bone text-center w-1/5">
                    Private Athlete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-xs">
                {COMPARISON_FEATURES.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    <tr className="bg-[#141418]/60">
                      <td colSpan={4} className="p-3.5 px-5 font-heading text-xs uppercase tracking-widest text-aura-ember">
                        {group.category}
                      </td>
                    </tr>
                    {group.items.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 px-5 text-aura-bone font-sans text-sm">
                          {row.name}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.essential === 'boolean' ? (
                            row.essential ? (
                              <Check className="w-4 h-4 text-aura-ember mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-aura-mist/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-aura-mist">{row.essential}</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-aura-ember/5">
                          {typeof row.black === 'boolean' ? (
                            row.black ? (
                              <Check className="w-4 h-4 text-aura-ember mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-aura-mist/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-aura-bone font-bold">{row.black}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.athlete === 'boolean' ? (
                            row.athlete ? (
                              <Check className="w-4 h-4 text-aura-ember mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-aura-mist/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-aura-bone font-bold">{row.athlete}</span>
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
          <Reveal className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-2">
              Common Inquiries
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-aura-bone tracking-tight">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <Accordion items={FAQS} />
        </section>
      </div>
    </div>
  );
}
