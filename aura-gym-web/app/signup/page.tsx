'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import { api, Plan } from '@/lib/api';
import { Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';

const signupSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  plan_id: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

function SignupForm() {
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get('plan') || '';
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      plan_id: preselectedPlan,
    },
  });

  useEffect(() => {
    api.getPlans().then((data) => {
      setPlans(data || []);
      if (preselectedPlan) {
        setValue('plan_id', preselectedPlan);
      } else if (data && data.length > 0) {
        setValue('plan_id', data[0].id);
      }
    }).catch(() => {});
  }, [preselectedPlan, setValue]);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    await signup({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      plan_id: data.plan_id || undefined,
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-aura-black px-6 md:px-12">
      <div className="w-full max-w-5xl bg-aura-graphite border border-white/10 rounded-card overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left Ambient Side */}
        <div className="lg:col-span-5 bg-[#0e0e12] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-aura-ember/15 blur-3xl pointer-events-none rounded-full" />

          <div>
            <div className="w-10 h-10 rounded-full bg-aura-ember flex items-center justify-center font-heading font-black text-aura-black text-base shadow-aura-glow mb-8">
              A
            </div>
            <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-2">
              Membership Enlistment
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-aura-bone tracking-tight leading-tight">
              Begin Your Evolution.
            </h2>
          </div>

          <div className="relative z-10 space-y-3 pt-8 text-xs text-aura-mist">
            <div className="flex items-center gap-2 text-aura-bone font-mono">
              <ShieldCheck className="w-4 h-4 text-aura-ember" />
              <span>Full Access to Member App & Bookings</span>
            </div>
            <div className="flex items-center gap-2 text-aura-bone font-mono">
              <ShieldCheck className="w-4 h-4 text-aura-ember" />
              <span>No Annual Locked Contracts</span>
            </div>
            <p className="text-aura-mist/60 pt-2">
              All credentials are cryptographically hashed using salted bcrypt protocols.
            </p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-aura-bone tracking-tight">
              Create Member Account
            </h1>
            <p className="text-sm text-aura-mist mt-1">
              Select your membership tier and enter your registration details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <Input
                label="Full Name"
                placeholder="Marcus Vance"
                {...register('full_name')}
                error={errors.full_name?.message}
              />
              <User className="w-4 h-4 text-aura-mist/40 absolute right-4 top-9 pointer-events-none" />
            </div>

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
                label="Password (min. 6 characters)"
                type="password"
                placeholder="••••••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
              <Lock className="w-4 h-4 text-aura-mist/40 absolute right-4 top-9 pointer-events-none" />
            </div>

            {/* Plan Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-aura-mist">
                Select Membership Tier
              </label>
              <select
                {...register('plan_id')}
                className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-3 text-aura-bone text-sm outline-none focus:border-aura-ember focus:ring-1 focus:ring-aura-ember transition-all"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${p.price_monthly}/month
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full shadow-aura-glow mt-2"
            >
              <span>Complete Enrollment</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-aura-mist">
            Already have an active account?{' '}
            <Link
              href="/signin"
              className="text-aura-ember font-semibold hover:underline ml-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aura-black" />}>
      <SignupForm />
    </Suspense>
  );
}
