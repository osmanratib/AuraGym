'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { api, ClassSession, Booking } from '@/lib/api';
import { AuraAlert } from '@/lib/alerts';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Reveal from '@/components/motion/Reveal';
import {
  User,
  Shield,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Sparkles,
  Flame,
  XCircle,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading, signout } = useAuth();
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [classesData, bookingsData] = await Promise.all([
        api.getClasses(),
        api.getUserBookings(),
      ]);
      setClasses(classesData || []);
      setMyBookings(bookingsData || []);
    } catch {
      // Data load error handled
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBookClass = async (classSession: ClassSession) => {
    const confirmed = await AuraAlert.confirm(
      'Reserve Spot',
      `Book a spot in "${classSession.title}" with ${classSession.trainer}?`,
      'Reserve Spot'
    );
    if (!confirmed) return;

    setBookingInProgress(classSession.id);
    try {
      const res = await api.createBooking(classSession.id);
      if (res.success) {
        AuraAlert.success('Spot Confirmed', res.message || 'You have successfully reserved your spot!');
        await fetchData();
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Could not reserve class spot.';
      AuraAlert.error('Booking Failed', msg);
    } finally {
      setBookingInProgress(null);
    }
  };

  const handleCancelBooking = async (booking: Booking) => {
    const confirmed = await AuraAlert.confirm(
      'Cancel Spot',
      `Are you sure you want to release your reservation in ${booking.class?.title || 'this class'}?`,
      'Yes, Cancel'
    );
    if (!confirmed) return;

    try {
      const res = await api.cancelBooking(booking.id);
      if (res.success) {
        AuraAlert.success('Cancelled', 'Your reservation was released.');
        await fetchData();
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Could not cancel booking.';
      AuraAlert.error('Cancellation Failed', msg);
    }
  };

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-aura-canvas flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-aura-slate">
          <div className="w-8 h-8 border-2 border-aura-ember border-t-transparent rounded-full animate-spin" />
          <span className="font-heading text-xs uppercase tracking-[0.2em]">
            Synchronizing Member Data...
          </span>
        </div>
      </div>
    );
  }

  const isClassBookedByMe = (classId: string) => {
    return myBookings.some((b) => b.class_id === classId);
  };

  return (
    <div className="pt-28 pb-24 bg-aura-canvas min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Top Header / Profile Ribbon */}
        <Reveal className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white border border-black/10 flex items-center justify-center text-aura-ember shadow-sm">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-2xl sm:text-3xl text-aura-ink tracking-tight">
                  {user?.full_name || 'Member'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-aura-subtle text-aura-ember border border-aura-ember/20 text-[10px] font-heading font-semibold uppercase tracking-[0.14em]">
                  {user?.role === 'admin' ? 'Executive' : 'Active Member'}
                </span>
              </div>
              <p className="text-xs text-aura-slate mt-0.5">
                {user?.email} · Member ID: {user?.id?.slice(0, 8)}...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={signout}
              variant="secondary"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </Reveal>

        {/* Member Plan & Summary Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          {/* Active Tier Card */}
          <Card className="lg:col-span-2 border-black/[0.06] shadow-aura-card relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase font-heading font-semibold tracking-[0.18em] text-aura-ember flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Current Membership Protocol
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-heading font-semibold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-aura-ink mb-1.5 tracking-tight">
                {user?.plan?.name || 'Black Tier Membership'}
              </h2>
              <p className="text-xs text-aura-slate mb-5 font-light">
                Billed monthly · Unrestricted performance floor & thermal sanctuary access
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {(user?.plan?.features || [
                  'Full gym floor & cardio deck access',
                  'Unlimited group conditioning & HIIT classes',
                  'Locker room & Finnish sauna access',
                  'Towel & laundry valet service',
                ]).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-aura-ink">
                    <CheckCircle2 className="w-3.5 h-3.5 text-aura-ember shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-aura-slate">
              <span>Renewal: Next Cycle</span>
              <span className="text-aura-ink font-bold text-sm">
                ${user?.plan?.price_monthly || 119}.00 / month
              </span>
            </div>
          </Card>

          {/* Quick Metrics */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-2 text-aura-slate text-[11px] uppercase font-heading font-semibold tracking-wider">
                <Flame className="w-4 h-4 text-aura-ember" />
                <span>Reserved Classes</span>
              </div>
              <div className="font-heading font-bold text-3xl text-aura-ink">
                {myBookings.length}
              </div>
              <p className="text-[11px] text-aura-slate mt-1 font-light">
                Scheduled floor sessions
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-2 text-aura-slate text-[11px] uppercase font-heading font-semibold tracking-wider">
                <Shield className="w-4 h-4 text-aura-ember" />
                <span>Sanctuary Check-In</span>
              </div>
              <div className="font-heading font-bold text-xl text-aura-ink">
                Access Granted
              </div>
              <p className="text-[11px] text-aura-slate mt-1 font-light">
                Floor entry token active
              </p>
            </Card>
          </div>
        </div>

        {/* Section: My Reserved Classes */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-xl text-aura-ink flex items-center gap-2">
              <Calendar className="w-4 h-4 text-aura-ember" />
              <span>My Active Bookings</span>
            </h2>
            <span className="text-xs text-aura-slate">
              {myBookings.length} reserved
            </span>
          </div>

          {myBookings.length === 0 ? (
            <Card className="p-8 text-center border-dashed border-black/15 bg-white/60">
              <AlertCircle className="w-7 h-7 text-aura-slate/50 mx-auto mb-2.5" />
              <p className="font-heading text-aura-ink font-medium text-sm">No Upcoming Reservations</p>
              <p className="text-xs text-aura-slate mt-1 max-w-sm mx-auto font-light">
                Explore the weekly schedule below to reserve your spot in strength, HIIT, or mobility sessions.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myBookings.map((b) => (
                <Card key={b.id} className="p-5 flex flex-col justify-between border-black/[0.06]">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-heading font-semibold uppercase px-2 py-0.5 rounded bg-aura-ember/10 text-aura-ember">
                        {b.class?.category || 'Session'}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmed
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-aura-ink mb-1">
                      {b.class?.title || 'Class Session'}
                    </h3>
                    <p className="text-xs text-aura-slate mb-3 font-light">
                      Coach: {b.class?.trainer}
                    </p>

                    <div className="space-y-1.5 text-xs text-aura-slate">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-aura-ember" />
                        <span>
                          {b.class?.starts_at
                            ? new Date(b.class.starts_at).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Upcoming'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-aura-ember" />
                        <span>
                          {b.class?.starts_at
                            ? new Date(b.class.starts_at).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : ''}{' '}
                          ({b.class?.duration_min || 60} min)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/[0.06]">
                    <button
                      onClick={() => handleCancelBooking(b)}
                      className="w-full py-2 px-4 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-heading font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel Spot</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Section: Live Class Schedule & Booking */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading font-bold text-xl text-aura-ink">
                Floor Schedule & Reservations
              </h2>
              <p className="text-xs text-aura-slate mt-0.5 font-light">
                Real-time capacity tracking. Reserve your spot below.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((c) => {
              const bookedByMe = isClassBookedByMe(c.id);
              const isFull = c.spots_remaining <= 0;

              return (
                <Card
                  key={c.id}
                  className="p-5 flex flex-col justify-between hover:border-black/15 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-heading font-semibold uppercase px-2.5 py-0.5 rounded bg-aura-subtle text-aura-slate border border-black/[0.04]">
                        {c.category}
                      </span>
                      <span
                        className={`text-[11px] font-medium ${
                          isFull
                            ? 'text-red-500'
                            : c.spots_remaining <= 3
                            ? 'text-aura-ember font-semibold'
                            : 'text-aura-slate'
                        }`}
                      >
                        {isFull ? 'Booked Out' : `${c.spots_remaining} spots left`}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-aura-ink mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-aura-slate mb-3 font-light">
                      Coach: <strong className="text-aura-ink font-semibold">{c.trainer}</strong>
                    </p>

                    <div className="space-y-1 text-xs text-aura-slate">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-aura-ember" />
                        <span>
                          {new Date(c.starts_at).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-aura-ember" />
                        <span>
                          {new Date(c.starts_at).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          ({c.duration_min} min)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/[0.06]">
                    {bookedByMe ? (
                      <div className="w-full py-2 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-heading font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Booked</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleBookClass(c)}
                        disabled={isFull || bookingInProgress === c.id}
                        isLoading={bookingInProgress === c.id}
                        variant={isFull ? 'secondary' : 'primary'}
                        size="sm"
                        className="w-full"
                      >
                        {isFull ? 'Class Full' : 'Reserve Spot'}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
