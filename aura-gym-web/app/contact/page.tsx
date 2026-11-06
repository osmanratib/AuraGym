'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Reveal from '@/components/motion/Reveal';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import AuraImage from '@/components/ui/AuraImage';
import { AuraAlert } from '@/lib/alerts';
import { api } from '@/lib/api';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const res = await api.createLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: 'contact_trial_form',
      });

      if (res.success) {
        AuraAlert.success(
          'Pass Reserved',
          'Your complimentary 1-day pass has been registered. An athletic concierge will reach out shortly to schedule your arrival.'
        );
        reset();
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to submit request. Please try again.';
      AuraAlert.error('Submission Error', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-aura-canvas">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="mb-14">
          <div className="text-[11px] uppercase tracking-[0.25em] font-heading font-semibold text-aura-ember mb-3 flex items-center gap-3">
            <span className="w-8 h-[1.5px] bg-aura-ember" />
            <span>Connect & Visit</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-6xl text-aura-ink tracking-[-0.04em] max-w-3xl mb-5 leading-tight">
            Claim your free trial pass.
          </h1>
          <p className="text-base sm:text-lg text-aura-slate max-w-2xl leading-relaxed font-light">
            Step inside Aura Gym. Experience our biomechanical equipment, recovery suites, and private training atmosphere first-hand.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Trial Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-black/[0.08] rounded-2xl p-8 md:p-10 shadow-aura-card relative">
            <div className="flex items-center gap-2 mb-7">
              <Sparkles className="w-4 h-4 text-aura-ember" />
              <h2 className="font-heading font-bold text-lg text-aura-ink uppercase tracking-[0.14em]">
                1-Day Pass Request
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Marcus Aurelius"
                {...register('name')}
                error={errors.name?.message}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="athlete@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                />

                <Input
                  label="Phone Number (Optional)"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-aura-slate">
                  Fitness Goals & Preferred Training Times
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your background, primary strength/conditioning objectives, or questions..."
                  className="w-full bg-[#FAF9F6] border border-black/10 rounded-xl px-4 py-3 text-aura-ink placeholder:text-aura-mist text-sm transition-all duration-200 outline-none focus:bg-white focus:border-aura-ember focus:ring-1 focus:ring-aura-ember shadow-sm"
                  {...register('message')}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
              >
                Confirm Pass Registration
              </Button>
            </form>
          </div>

          {/* Details & Location (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-7 space-y-5 shadow-aura-card">
              <h3 className="font-heading font-bold text-base text-aura-ink uppercase tracking-[0.14em]">
                Sanctuary Location
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-aura-subtle border border-black/[0.06] flex items-center justify-center text-aura-ember shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-aura-ink text-sm">Aura Gym Headquarters</p>
                    <p className="text-aura-slate text-xs leading-relaxed mt-0.5 font-light">
                      420 Vanguard Avenue, District 7<br />
                      Metropolis, NY 10012
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-aura-subtle border border-black/[0.06] flex items-center justify-center text-aura-ember shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-aura-ink text-sm">Direct Concierge</p>
                    <p className="text-aura-slate text-xs mt-0.5 font-mono">+1 (800) 890-AURA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-aura-subtle border border-black/[0.06] flex items-center justify-center text-aura-ember shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-aura-ink text-sm">Private Inquiries</p>
                    <p className="text-aura-slate text-xs mt-0.5 font-mono">concierge@auragym.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-7 space-y-3.5 shadow-aura-card">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-aura-ember" />
                <h3 className="font-heading font-bold text-xs uppercase tracking-[0.14em] text-aura-ink">
                  Floor Operating Hours
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-black/[0.05]">
                  <span className="text-aura-slate">Mon – Fri</span>
                  <span className="text-aura-ink font-semibold">05:00 – 23:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.05]">
                  <span className="text-aura-slate">Saturday</span>
                  <span className="text-aura-ink font-semibold">06:00 – 21:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.05]">
                  <span className="text-aura-slate">Sunday</span>
                  <span className="text-aura-ink font-semibold">07:00 – 20:00</span>
                </div>
              </div>
            </div>

            {/* Turf Photo with AuraImage */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-black/[0.08] shadow-aura-card group">
              <AuraImage
                src="/images/facility-turf.jpg"
                alt="Aura Gym Turf Track"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                containerClassName="w-full h-full"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-30">
                <div>
                  <p className="font-heading font-bold text-sm">District 7 Facility</p>
                  <p className="text-[11px] text-white/80 font-light">Valet parking at entrance</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
                  Open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
