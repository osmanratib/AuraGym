import React from 'react';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import ProgramsSection from '@/components/sections/Programs';
import StatsSection from '@/components/sections/Stats';
import TrainersSection from '@/components/sections/Trainers';
import PricingSection from '@/components/sections/Pricing';
import CTASection from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Hero with 3D interactive object */}
      <Hero />

      {/* 2. Pinned Manifesto Section */}
      <Manifesto />

      {/* 3. Calibrated Programs Grid */}
      <ProgramsSection />

      {/* 4. Stats & Kinetic Counters */}
      <StatsSection />

      {/* 5. Horizontal Trainer Strip */}
      <TrainersSection />

      {/* 6. Pricing & Membership Tiers */}
      <PricingSection />

      {/* 7. Final Free Trial CTA */}
      <CTASection />
    </div>
  );
}
