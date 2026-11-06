import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { supabase, isSupabaseConfigured, inMemoryDB, Lead } from '../lib/supabase.js';

export async function createLead(req: Request, res: Response): Promise<void> {
  const { name, email, phone, message, source = 'website' } = req.body;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        message: message || null,
        source,
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your trial pass request has been confirmed. Our team will contact you shortly.',
      data,
    });
    return;
  }

  // Fallback
  const newLead: Lead = {
    id: randomUUID(),
    name,
    email: email.toLowerCase().trim(),
    phone: phone || null,
    message: message || null,
    source,
    created_at: new Date().toISOString(),
  };

  inMemoryDB.leads.push(newLead);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your trial pass request has been confirmed. Our team will contact you shortly.',
    data: newLead,
  });
}
