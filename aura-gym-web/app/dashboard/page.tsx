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
      // Data load error silently handled or logged
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
      <div className="min-h-screen pt-36 pb-24 bg-aura-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-aura-mist">
          <div className="w-10 h-10 border-2 border-aura-ember border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest">
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
    <div className="pt-32 pb-24 bg-aura-black min-h-screen">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Top Header / Profile Ribbon */}
        <Reveal className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-aura-graphite border-2 border-aura-ember/50 flex items-center justify-center text-aura-ember shadow-aura-glow">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-2xl sm:text-3xl text-aura-bone">
                  {user?.full_name || 'Member'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-aura-ember/15 text-aura-ember border border-aura-ember/30 text-[10px] font-mono uppercase tracking-widest font-bold">
                  {user?.role === 'admin' ? 'Executive Director' : 'Active Member'}
                </span>
              </div>
              <p className="text-xs text-aura-mist font-mono mt-1">
                {user?.email} · Member ID: {user?.id?.slice(0, 8)}...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={signout}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </Reveal>

        {/* Member Plan & Summary Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Active Tier Card */}
          <Card className="lg:col-span-2 border-aura-ember/30 shadow-aura-glow relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aura-ember/10 blur-3xl pointer-events-none rounded-full" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-widest text-aura-ember flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Current Membership Protocol
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase">
                  Active Status
                </span>
              </div>

              <h2 className="font-heading font-black text-3xl text-aura-bone mb-2">
                {user?.plan?.name || 'Black Tier Membership'}
              </h2>
              <p className="text-xs text-aura-mist mb-6 font-mono">
                Billed monthly · Unrestricted performance floor & thermal sanctuary access
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {(user?.plan?.features || [
                  'Full gym floor & cardio deck access',
                  'Unlimited group conditioning & HIIT classes',
                  'Locker room & Finnish sauna access',
                  'Eucalyptus towel & laundry valet',
                ]).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-aura-bone">
                    <CheckCircle2 className="w-3.5 h-3.5 text-aura-ember shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-aura-mist font-mono">
              <span>Renewal: Next Cycle</span>
              <span className="text-aura-bone font-bold">
                ${user?.plan?.price_monthly || 119}.00 / mo
              </span>
            </div>
          </Card>

          {/* Quick Metrics */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2 text-aura-mist text-xs uppercase font-heading tracking-wider">
                <Flame className="w-4 h-4 text-aura-ember" />
                <span>Reserved Classes</span>
              </div>
              <div className="font-heading font-black text-4xl text-aura-bone">
                {myBookings.length}
              </div>
              <p className="text-[11px] text-aura-mist font-mono mt-1">
                Active scheduled floor sessions
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2 text-aura-mist text-xs uppercase font-heading tracking-wider">
                <Shield className="w-4 h-4 text-aura-ember" />
                <span>Biometric Check-In</span>
              </div>
              <div className="font-heading font-black text-2xl text-aura-bone">
                Access Granted
              </div>
              <p className="text-[11px] text-aura-mist font-mono mt-1">
                Sanctuary entry token valid
              </p>
            </Card>
          </div>
        </div>

        {/* Section: My Reserved Classes */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-black text-2xl text-aura-bone flex items-center gap-2">
              <Calendar className="w-5 h-5 text-aura-ember" />
              <span>My Active Bookings</span>
            </h2>
            <span className="text-xs font-mono text-aura-mist">
              {myBookings.length} session(s) reserved
            </span>
          </div>

          {myBookings.length === 0 ? (
            <Card className="p-8 text-center border-dashed border-white/10">
              <AlertCircle className="w-8 h-8 text-aura-mist/60 mx-auto mb-3" />
              <p className="font-heading text-aura-bone font-medium">No Upcoming Reservations</p>
              <p className="text-xs text-aura-mist mt-1 max-w-sm mx-auto">
                Explore the weekly schedule below to reserve your spot in strength, HIIT, or mobility sessions.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myBookings.map((b) => (
                <Card key={b.id} className="p-6 flex flex-col justify-between border-white/10">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-aura-ember/15 text-aura-ember font-bold">
                        {b.class?.category || 'Session'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmed
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-aura-bone mb-1">
                      {b.class?.title || 'Class Session'}
                    </h3>
                    <p className="text-xs text-aura-mist font-mono mb-4">
                      Coach: {b.class?.trainer}
                    </p>

                    <div className="space-y-1.5 text-xs text-aura-mist font-mono">
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

                  <div className="pt-6 mt-4 border-t border-white/5">
                    <button
                      onClick={() => handleCancelBooking(b)}
                      className="w-full py-2 px-4 rounded-full border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-heading uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-black text-2xl text-aura-bone">
                Performance Floor Schedule
              </h2>
              <p className="text-xs text-aura-mist font-mono mt-0.5">
                Reserve your calibrated spot. Real-time capacity tracked.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((c) => {
              const bookedByMe = isClassBookedByMe(c.id);
              const isFull = c.spots_remaining <= 0;

              return (
                <Card
                  key={c.id}
                  className="p-6 flex flex-col justify-between hover:border-aura-ember/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-white/5 text-aura-mist border border-white/5">
                        {c.category}
                      </span>
                      <span
                        className={`text-[11px] font-mono ${
                          isFull
                            ? 'text-red-400'
                            : c.spots_remaining <= 3
                            ? 'text-aura-ember font-bold'
                            : 'text-aura-mist'
                        }`}
                      >
                        {isFull ? 'Booked Out' : `${c.spots_remaining} spots left`}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-aura-bone mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-aura-mist font-mono mb-4">
                      Coach: <strong className="text-aura-bone">{c.trainer}</strong>
                    </p>

                    <div className="space-y-1.5 text-xs text-aura-mist font-mono">
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

                  <div className="pt-6 mt-4 border-t border-white/5">
                    {bookedByMe ? (
                      <div className="w-full py-2.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-heading uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Already Booked</span>
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
