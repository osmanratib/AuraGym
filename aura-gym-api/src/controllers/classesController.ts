import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured, inMemoryDB } from '../lib/supabase.js';

export async function getClasses(req: Request, res: Response): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { data: classes, error: classErr } = await supabase
      .from('classes')
      .select('*')
      .order('starts_at', { ascending: true });

    if (classErr) {
      res.status(500).json({ success: false, message: classErr.message });
      return;
    }

    const { data: bookings, error: bookErr } = await supabase
      .from('bookings')
      .select('class_id')
      .eq('status', 'booked');

    if (bookErr) {
      res.status(500).json({ success: false, message: bookErr.message });
      return;
    }

    // Count bookings per class
    const bookingCounts: Record<string, number> = {};
    bookings?.forEach((b) => {
      bookingCounts[b.class_id] = (bookingCounts[b.class_id] || 0) + 1;
    });

    const enrichedClasses = (classes || []).map((c) => {
      const booked = bookingCounts[c.id] || 0;
      return {
        ...c,
        booked_count: booked,
        spots_remaining: Math.max(0, c.capacity - booked),
      };
    });

    res.status(200).json({ success: true, data: enrichedClasses });
    return;
  }

  // Fallback
  const enrichedClasses = inMemoryDB.classes.map((c) => {
    const booked = inMemoryDB.bookings.filter((b) => b.class_id === c.id && b.status === 'booked').length;
    return {
      ...c,
      booked_count: booked,
      spots_remaining: Math.max(0, c.capacity - booked),
    };
  });

  res.status(200).json({ success: true, data: enrichedClasses });
}
