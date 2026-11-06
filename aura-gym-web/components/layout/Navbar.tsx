'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import clsx from 'clsx';
import Button from '../ui/Button';
import { useAuth } from '@/lib/auth';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Trainers', href: '/trainers' },
  { name: 'Membership', href: '/membership' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, signout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-black/[0.06] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-content mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-aura-ink flex items-center justify-center font-heading font-black text-white text-xs group-hover:bg-aura-ember transition-colors duration-300">
            A
          </div>
          <span className="font-heading font-bold text-lg tracking-[-0.04em] text-aura-ink">
            AURA<span className="text-aura-ember ml-0.5">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'text-[11px] uppercase tracking-[0.18em] font-heading font-semibold transition-colors duration-200 relative py-1',
                  isActive ? 'text-aura-ember' : 'text-aura-slate hover:text-aura-ink'
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-aura-ember rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Button href="/dashboard" variant="secondary" size="sm" className="flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5 text-aura-ember" />
                <span>Dashboard</span>
              </Button>
              <button
                onClick={signout}
                className="p-2 text-aura-slate hover:text-aura-ink hover:bg-black/5 rounded-full transition-colors"
                title="Sign Out"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-[11px] uppercase tracking-[0.16em] font-heading font-semibold text-aura-ink hover:text-aura-ember transition-colors px-2 py-1"
              >
                Sign In
              </Link>
              <Button href="/contact" variant="primary" size="sm">
                Claim Trial Pass
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-aura-ink hover:text-aura-ember transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[62px] bg-white/95 backdrop-blur-xl border-b border-black/[0.08] px-6 py-6 flex flex-col gap-5 shadow-xl">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'text-sm uppercase tracking-[0.16em] font-heading font-semibold transition-colors py-2 border-b border-black/[0.04]',
                    isActive ? 'text-aura-ember font-bold' : 'text-aura-slate hover:text-aura-ink'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            {user ? (
              <>
                <Button href="/dashboard" variant="secondary" onClick={() => setIsOpen(false)}>
                  Go to Dashboard
                </Button>
                <Button variant="ghost" onClick={() => { setIsOpen(false); signout(); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button href="/signin" variant="secondary" onClick={() => setIsOpen(false)}>
                  Sign In
                </Button>
                <Button href="/contact" variant="primary" onClick={() => setIsOpen(false)}>
                  Claim Trial Pass
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
