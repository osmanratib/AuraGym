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
          ? 'bg-aura-black/85 backdrop-blur-md border-b border-white/5 py-4 shadow-xl'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-content mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-aura-ember flex items-center justify-center font-heading font-black text-aura-black text-sm shadow-aura-glow transition-transform duration-300 group-hover:scale-105">
            A
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-aura-bone">
            AURA<span className="text-aura-ember font-light">GYM</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'text-xs uppercase tracking-widest font-heading transition-colors duration-200 relative py-1',
                  isActive ? 'text-aura-ember' : 'text-aura-mist hover:text-aura-bone'
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-aura-ember rounded-full shadow-aura-glow" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Button href="/dashboard" variant="secondary" size="sm" className="flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5 text-aura-ember" />
                <span>Dashboard</span>
              </Button>
              <button
                onClick={signout}
                className="p-2 text-aura-mist hover:text-aura-ember transition-colors rounded-full hover:bg-white/5"
                title="Sign Out"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-xs uppercase tracking-wider font-heading text-aura-bone hover:text-aura-ember transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Button href="/contact" variant="primary" size="sm">
                Claim Free Trial
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-aura-bone hover:text-aura-ember transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-aura-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'text-base uppercase tracking-widest font-heading transition-colors py-2 border-b border-white/5',
                    isActive ? 'text-aura-ember font-bold' : 'text-aura-mist hover:text-aura-bone'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            {user ? (
              <>
                <Button href="/dashboard" variant="secondary" onClick={() => setIsOpen(false)}>
                  Go to Member Dashboard
                </Button>
                <Button variant="ghost" onClick={() => { setIsOpen(false); signout(); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button href="/signin" variant="secondary" onClick={() => setIsOpen(false)}>
                  Member Sign In
                </Button>
                <Button href="/contact" variant="primary" onClick={() => setIsOpen(false)}>
                  Claim Free Trial
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
