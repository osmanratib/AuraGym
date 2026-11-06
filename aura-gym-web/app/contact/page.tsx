'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Reveal from '@/components/motion/Reveal';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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
          'Thank you! Your complimentary 1-day pass has been registered. An athletic concierge will reach out to schedule your arrival.'
        );
        reset();
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to submit form. Please try again.';
      AuraAlert.error('Submission Error', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-aura-black">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <Reveal className="mb-16">
          <div className="text-xs uppercase tracking-widest font-heading text-aura-ember mb-3 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-aura-ember" />
            <span>Connect & Visit</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-aura-bone tracking-tight max-w-3xl mb-6">
            Claim Your Free Trial Pass.
          </h1>
          <p className="text-lg text-aura-mist max-w-2xl leading-relaxed">
            Step inside Aura Gym. Experience our biomechanical equipment, thermal sauna suites, and high-performance atmosphere first-hand.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Trial Lead Form (7 Cols) */}
          <div className="lg:col-span-7 bg-aura-graphite border border-white/5 rounded-card p-8 md:p-10 shadow-2xl relative">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-4 h-4 text-aura-ember" />
              <h2 className="font-heading font-bold text-xl text-aura-bone uppercase tracking-wider">
                1-Day Pass Request
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Marcus Aurelius"
                {...register('name')}
                error={errors.name?.message}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-aura-mist">
                  Fitness Goals & Preferred Training Times
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your background, primary strength/conditioning objectives, or specific questions..."
                  className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-3 text-aura-bone placeholder:text-aura-mist/40 text-sm transition-all duration-200 outline-none focus:border-aura-ember focus:ring-1 focus:ring-aura-ember"
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

          {/* Details & Location Map View (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Details */}
            <div className="bg-aura-graphite border border-white/5 rounded-card p-8 space-y-6">
              <h3 className="font-heading font-bold text-lg text-aura-bone uppercase tracking-wider">
                Sanctuary Location
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-aura-black border border-white/10 flex items-center justify-center text-aura-ember shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-aura-bone">Aura Gym Headquarters</p>
                    <p className="text-aura-mist text-xs leading-relaxed mt-0.5">
                      420 Vanguard Avenue, District 7<br />
                      Metropolis, NY 10012
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-aura-black border border-white/10 flex items-center justify-center text-aura-ember shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-aura-bone">Direct Concierge</p>
                    <p className="text-aura-mist font-mono text-xs mt-0.5">+1 (800) 890-AURA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-aura-black border border-white/10 flex items-center justify-center text-aura-ember shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-aura-bone">Private Inquiries</p>
                    <p className="text-aura-mist font-mono text-xs mt-0.5">concierge@auragym.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-aura-graphite border border-white/5 rounded-card p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-aura-ember" />
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-aura-bone">
                  Floor Operating Hours
                </h3>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-aura-mist">Mon – Fri</span>
                  <span className="text-aura-bone font-medium">05:00 – 23:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-aura-mist">Saturday</span>
                  <span className="text-aura-bone font-medium">06:00 – 21:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-aura-mist">Sunday</span>
                  <span className="text-aura-bone font-medium">07:00 – 20:00</span>
                </div>
              </div>
            </div>

            {/* Stylized Dark Architectural Map Graphic */}
            <div className="relative h-48 rounded-card overflow-hidden border border-white/10 bg-[#121216] flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF5A1F_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-aura-ember/20 border border-aura-ember flex items-center justify-center text-aura-ember shadow-aura-glow animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xs uppercase tracking-widest text-aura-bone mt-2">
                  Metropolis District 7
                </span>
                <span className="text-[10px] text-aura-mist font-mono">Valet Parking Available At Entrance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
