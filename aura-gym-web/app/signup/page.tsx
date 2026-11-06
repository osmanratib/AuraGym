'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AuraImage from '@/components/ui/AuraImage';
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
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-aura-canvas px-6 md:px-12">
      <div className="w-full max-w-4xl bg-white border border-black/[0.08] rounded-[24px] overflow-hidden shadow-aura-card-hover grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Side: Photo & Brand Panel */}
        <div className="lg:col-span-5 relative overflow-hidden bg-aura-ink text-white p-8 md:p-10 flex flex-col justify-between">
          <AuraImage
            src="/images/athlete-back.jpg"
            alt="Athlete Training"
            fill
            priority
            className="object-cover opacity-40 mix-blend-luminosity"
            containerClassName="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aura-ink via-aura-ink/60 to-transparent z-10" />

          <div className="relative z-20">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-heading font-black text-aura-ink text-xs mb-6">
              A
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-2">
              Membership Enlistment
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-[-0.03em] leading-tight">
              Begin your athletic evolution.
            </h2>
          </div>

          <div className="relative z-20 pt-8 text-xs text-white/70 space-y-2 font-light">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-aura-ember shrink-0" />
              <span>Full Access to Member App & Floor Schedule</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-aura-ember shrink-0" />
              <span>No Long-Term Locked Contracts</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-aura-ink tracking-tight">
              Create Member Account
            </h1>
            <p className="text-xs sm:text-sm text-aura-slate mt-1 font-light">
              Select your membership tier and enter your registration details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Input
                label="Full Name"
                placeholder="Marcus Vance"
                {...register('full_name')}
                error={errors.full_name?.message}
              />
              <User className="w-4 h-4 text-aura-mist absolute right-4 top-9 pointer-events-none" />
            </div>

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
                label="Password (min. 6 characters)"
                type="password"
                placeholder="••••••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
              <Lock className="w-4 h-4 text-aura-mist absolute right-4 top-9 pointer-events-none" />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-aura-slate">
                Select Membership Tier
              </label>
              <select
                {...register('plan_id')}
                className="w-full bg-[#FAF9F6] border border-black/10 rounded-xl px-4 py-3 text-aura-ink text-sm outline-none focus:bg-white focus:border-aura-ember focus:ring-1 focus:ring-aura-ember transition-all"
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
              className="w-full mt-2"
            >
              <span>Complete Enrollment</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-black/[0.06] text-center text-xs text-aura-slate">
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
    <Suspense fallback={<div className="min-h-screen bg-aura-canvas" />}>
      <SignupForm />
    </Suspense>
  );
}
