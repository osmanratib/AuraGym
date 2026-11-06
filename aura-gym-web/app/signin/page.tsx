'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import { Lock, Mail, Sparkles, ArrowRight } from 'lucide-react';

const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true);
    await signin(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-aura-black px-6 md:px-12">
      <div className="w-full max-w-5xl bg-aura-graphite border border-white/10 rounded-card overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Side: Ambient Brand Visual (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0e0e12] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-aura-ember/10 blur-3xl pointer-events-none rounded-full" />

          <div>
            <div className="w-10 h-10 rounded-full bg-aura-ember flex items-center justify-center font-heading font-black text-aura-black text-base shadow-aura-glow mb-8">
              A
            </div>
            <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-2">
              Member Sanctuary
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-aura-bone tracking-tight leading-tight">
              Return To Your Discipline.
            </h2>
          </div>

          <div className="relative z-10 space-y-4 pt-12">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-aura-mist space-y-1">
              <div className="flex items-center gap-1.5 text-aura-ember font-heading uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Credentials Ready</span>
              </div>
              <p>Sign up in seconds to access your private member dashboard and schedule bookings.</p>
            </div>
            <p className="text-xs text-aura-mist font-mono">
              Protected by biometric encryption protocols.
            </p>
          </div>
        </div>

        {/* Right Side: Form (7 Cols) */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-aura-bone tracking-tight">
              Member Access
            </h1>
            <p className="text-sm text-aura-mist mt-1">
              Enter your credentials to enter the member portal.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Input
                label="Email Address"
                type="email"
                placeholder="athlete@domain.com"
                {...register('email')}
                error={errors.email?.message}
              />
              <Mail className="w-4 h-4 text-aura-mist/40 absolute right-4 top-9 pointer-events-none" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
              <Lock className="w-4 h-4 text-aura-mist/40 absolute right-4 top-9 pointer-events-none" />
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full shadow-aura-glow"
            >
              <span>Authenticate & Enter</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-aura-mist">
            Do not have a membership yet?{' '}
            <Link
              href="/signup"
              className="text-aura-ember font-semibold hover:underline ml-1"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
