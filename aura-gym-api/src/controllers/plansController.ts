import { Request, Response } from 'express';
import { supabase, isSupabaseConfigured, inMemoryDB } from '../lib/supabase.js';

export async function getPlans(req: Request, res: Response): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price_monthly', { ascending: true });

    if (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }

    res.status(200).json({ success: true, data });
    return;
  }

  // Fallback
  res.status(200).json({ success: true, data: inMemoryDB.plans });
}
