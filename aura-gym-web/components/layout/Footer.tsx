import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-aura-subtle border-t border-black/[0.08] pt-20 pb-12 text-aura-slate">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-2 h-2 rounded-full bg-aura-ember" />
              <span className="font-display font-black text-xl tracking-[-0.03em] uppercase text-aura-ink group-hover:text-aura-ember transition-colors">
                AURA<span className="text-aura-ember ml-0.5">(01)</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-aura-slate font-light">
              A private athletic performance sanctuary fusing calibrated biomechanics, sports science, and active cellular recovery.
            </p>
            <div className="text-[10px] uppercase tracking-[0.24em] text-aura-ember font-heading font-bold pt-1">
              EST. MMXXVI · METROPOLIS
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3.5">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-aura-ink font-bold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
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
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-aura-ink font-bold">
              Sanctuary Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-light">
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

          {/* Location & Legal */}
          <div className="space-y-3.5">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-aura-ink font-bold">
              Sanctuary Location
            </h4>
            <div className="space-y-1.5 text-xs sm:text-sm font-light">
              <p className="text-aura-ink font-medium">Metropolis Performance Deck</p>
              <p>440 Obsidian Boulevard, District 7</p>
              <p>Metropolis, NY 10012</p>
              <p className="pt-2 text-xs text-aura-ember font-mono">concierge@auragym.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-heading uppercase tracking-[0.18em] text-aura-slate">
          <div>
            © {new Date().getFullYear()} AURA GYM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-aura-ink transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/contact" className="hover:text-aura-ink transition-colors">
              Terms of Enlistment
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
