import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-aura-subtle border-t border-black/[0.06] pt-20 pb-12 text-aura-slate">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-aura-ink flex items-center justify-center font-heading font-black text-white text-[10px]">
                A
              </div>
              <span className="font-heading font-bold text-base tracking-[-0.04em] text-aura-ink">
                AURA<span className="text-aura-ember">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-aura-slate">
              A private athletic performance sanctuary fusing calibrated biomechanics, sports science, and active cellular recovery.
            </p>
            <div className="text-[11px] uppercase tracking-[0.2em] text-aura-ember font-heading font-semibold pt-1">
              EST. 2026 · METROPOLIS
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3.5">
            <h4 className="font-heading text-xs uppercase tracking-[0.18em] text-aura-ink font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-aura-ink transition-colors">
                  Philosophy & Architecture
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-aura-ink transition-colors">
                  Disciplines & Programs
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-aura-ink transition-colors">
                  Coaching Faculty
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-aura-ink transition-colors">
                  Membership Protocols
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-aura-ink transition-colors">
                  1-Day Pass Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3.5">
            <h4 className="font-heading text-xs uppercase tracking-[0.18em] text-aura-ink font-semibold">
              Sanctuary Hours
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-black/[0.05] pb-1.5">
                <span>Mon – Fri</span>
                <span className="text-aura-ink font-medium">05:00 – 23:00</span>
              </div>
              <div className="flex justify-between border-b border-black/[0.05] pb-1.5">
                <span>Saturday</span>
                <span className="text-aura-ink font-medium">06:00 – 21:00</span>
              </div>
              <div className="flex justify-between border-b border-black/[0.05] pb-1.5">
                <span>Sunday</span>
                <span className="text-aura-ink font-medium">07:00 – 20:00</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3.5">
            <h4 className="font-heading text-xs uppercase tracking-[0.18em] text-aura-ink font-semibold">
              Location
            </h4>
            <div className="space-y-1.5 text-sm">
              <p className="text-aura-ink font-medium">420 Vanguard Avenue, District 7</p>
              <p>Metropolis, NY 10012</p>
              <p className="text-aura-ink text-xs font-mono pt-2">concierge@auragym.com</p>
              <p className="text-aura-ink text-xs font-mono">+1 (800) 890-AURA</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Aura Gym Performance Systems. All rights reserved.</p>
          <div className="flex items-center gap-6 text-aura-slate">
            <Link href="/membership" className="hover:text-aura-ink transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/membership" className="hover:text-aura-ink transition-colors">
              Membership Terms
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
