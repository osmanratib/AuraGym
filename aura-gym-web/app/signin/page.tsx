'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import { Lock, Mail, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-aura-canvas px-6 md:px-12">
      <div className="w-full max-w-4xl bg-white border border-black/[0.08] rounded-[24px] overflow-hidden shadow-aura-card-hover grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
        {/* Left Side: Photo & Brand Panel (5 Cols) */}
        <div className="lg:col-span-5 relative overflow-hidden bg-aura-ink text-white p-8 md:p-10 flex flex-col justify-between">
          <Image
            src="/images/athlete-curls.jpg"
            alt="Athlete Training"
            fill
            className="object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aura-ink via-aura-ink/60 to-transparent" />

          <div className="relative z-10">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-heading font-black text-aura-ink text-xs mb-6">
              A
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-2">
              Member Sanctuary
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-[-0.03em] leading-tight">
              Return to your discipline.
            </h2>
          </div>

          <div className="relative z-10 pt-10 text-xs text-white/70 space-y-1 font-light">
            <p>Access your training schedule, active membership protocol, and session bookings.</p>
          </div>
        </div>

        {/* Right Side: Form (7 Cols) */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-aura-ink tracking-tight">
              Member Access
            </h1>
            <p className="text-xs sm:text-sm text-aura-slate mt-1 font-light">
              Enter your credentials to access the member portal.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <Input
                label="Email Address"
                type="email"
                placeholder="athlete@domain.com"
                {...register('email')}
                error={errors.email?.message}
              />
              <Mail className="w-4 h-4 text-aura-mist absolute right-4 top-9 pointer-events-none" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
              <Lock className="w-4 h-4 text-aura-mist absolute right-4 top-9 pointer-events-none" />
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              <span>Authenticate</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/[0.06] text-center text-xs text-aura-slate">
            Do not have an active membership yet?{' '}
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
