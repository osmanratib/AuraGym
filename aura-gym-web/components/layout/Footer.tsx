import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0e0e12] border-t border-white/5 pt-20 pb-12 text-aura-mist">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-aura-ember flex items-center justify-center font-heading font-black text-aura-black text-xs shadow-aura-glow">
                A
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-aura-bone">
                AURA<span className="text-aura-ember font-light">GYM</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-aura-mist/80">
              A high-performance sanctuary engineered for athletic transformation, longevity, and peak physical conditioning.
            </p>
            <div className="text-xs uppercase tracking-widest text-aura-ember font-mono pt-2">
              EST. 2026 · METROPOLIS
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-widest text-aura-bone font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-aura-bone transition-colors">
                  Our Philosophy & Story
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-aura-bone transition-colors">
                  Specialized Programs
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-aura-bone transition-colors">
                  Master Coaches & Specialists
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-aura-bone transition-colors">
                  Membership Plans & Tiers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-aura-bone transition-colors">
                  Claim Free Trial Pass
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-widest text-aura-bone font-semibold">
              Floor Hours
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Monday – Friday</span>
                <span className="text-aura-bone font-medium">05:00 – 23:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Saturday</span>
                <span className="text-aura-bone font-medium">06:00 – 21:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Sunday & Recovery</span>
                <span className="text-aura-bone font-medium">07:00 – 20:00</span>
              </div>
              <p className="text-xs text-aura-mist/60 pt-2">
                Private Athlete keyholders receive 24/7 biometric sanctuary access.
              </p>
            </div>
          </div>

          {/* Location & Support */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-widest text-aura-bone font-semibold">
              Sanctuary
            </h4>
            <div className="space-y-2 text-sm">
              <p>420 Vanguard Avenue, District 7</p>
              <p>Metropolis, NY 10012</p>
              <p className="text-aura-bone pt-2 font-mono text-xs">concierge@auragym.com</p>
              <p className="text-aura-bone font-mono text-xs">+1 (800) 890-AURA</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Aura Gym Performance Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/membership" className="hover:text-aura-bone transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/membership" className="hover:text-aura-bone transition-colors">
              Terms of Membership
            </Link>
            <Link href="/signin" className="hover:text-aura-ember transition-colors">
              Member Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
