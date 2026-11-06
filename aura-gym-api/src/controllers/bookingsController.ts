import { Response } from 'express';
import { randomUUID } from 'crypto';
import { supabase, isSupabaseConfigured, inMemoryDB } from '../lib/supabase.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export async function getUserBookings(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, class:classes(*)')
      .eq('user_id', userId)
      .eq('status', 'booked')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }

    res.status(200).json({ success: true, data });
    return;
  }

  // Fallback
  const userBookings = inMemoryDB.bookings
    .filter((b) => b.user_id === userId && b.status === 'booked')
    .map((b) => {
      const classInfo = inMemoryDB.classes.find((c) => c.id === b.class_id);
      return {
        ...b,
        class: classInfo,
      };
    });

  res.status(200).json({ success: true, data: userBookings });
}

export async function createBooking(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const { class_id } = req.body;

  if (isSupabaseConfigured && supabase) {
    // 1. Check class exists & spots remain
    const { data: classData, error: classErr } = await supabase
      .from('classes')
      .select('*')
      .eq('id', class_id)
      .single();

    if (classErr || !classData) {
      res.status(404).json({ success: false, message: 'Class not found' });
      return;
    }

    // Check existing booking
    const { data: existingBooking } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .eq('class_id', class_id)
      .eq('status', 'booked')
      .maybeSingle();

    if (existingBooking) {
      res.status(400).json({ success: false, message: 'You have already reserved a spot in this class' });
      return;
    }

    // Check capacity
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('class_id', class_id)
      .eq('status', 'booked');

    if ((count || 0) >= classData.capacity) {
      res.status(400).json({ success: false, message: 'Class is completely booked out' });
      return;
    }

    const { data: newBooking, error: bookErr } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        class_id,
        status: 'booked',
      })
      .select('*, class:classes(*)')
      .single();

    if (bookErr) {
      res.status(500).json({ success: false, message: bookErr.message });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Spot booked successfully! See you on the floor.',
      data: newBooking,
    });
    return;
  }

  // Fallback
  const targetClass = inMemoryDB.classes.find((c) => c.id === class_id);
  if (!targetClass) {
    res.status(404).json({ success: false, message: 'Class not found' });
    return;
  }

  const existingBooking = inMemoryDB.bookings.find(
    (b) => b.user_id === userId && b.class_id === class_id && b.status === 'booked'
  );

  if (existingBooking) {
    res.status(400).json({ success: false, message: 'You have already reserved a spot in this class' });
    return;
  }

  const bookedCount = inMemoryDB.bookings.filter(
    (b) => b.class_id === class_id && b.status === 'booked'
  ).length;

  if (bookedCount >= targetClass.capacity) {
    res.status(400).json({ success: false, message: 'Class is completely booked out' });
    return;
  }

  const newBooking = {
    id: randomUUID(),
    user_id: userId,
    class_id,
    status: 'booked',
    created_at: new Date().toISOString(),
  };

  inMemoryDB.bookings.push(newBooking);

  res.status(201).json({
    success: true,
    message: 'Spot booked successfully! See you on the floor.',
    data: {
      ...newBooking,
      class: targetClass,
    },
  });
}

export async function cancelBooking(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.userId;
  const bookingId = req.params.id;

  if (isSupabaseConfigured && supabase) {
    // Only allow canceling member's own booking
    const { data: booking, error: findErr } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .maybeSingle();

    if (findErr || !booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    if (booking.user_id !== userId && req.user!.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Forbidden: You can only cancel your own bookings' });
      return;
    }

    const { error: delErr } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    if (delErr) {
      res.status(500).json({ success: false, message: delErr.message });
      return;
    }

    res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
    return;
  }

  // Fallback
  const bookingIndex = inMemoryDB.bookings.findIndex((b) => b.id === bookingId);
  if (bookingIndex === -1) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }

  const booking = inMemoryDB.bookings[bookingIndex];
  if (booking.user_id !== userId && req.user!.role !== 'admin') {
    res.status(403).json({ success: false, message: 'Forbidden: You can only cancel your own bookings' });
    return;
  }

  inMemoryDB.bookings.splice(bookingIndex, 1);
  res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
}
