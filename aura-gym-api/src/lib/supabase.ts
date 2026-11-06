import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

// In-Memory mock store fallback for standalone zero-configuration local runs
export interface Plan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_popular: boolean;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: 'member' | 'admin';
  plan_id?: string | null;
  created_at: string;
}

export interface ClassSession {
  id: string;
  title: string;
  trainer: string;
  category: string;
  starts_at: string;
  duration_min: number;
  capacity: number;
}

export interface Booking {
  id: string;
  user_id: string;
  class_id: string;
  status: string;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  source: string;
  created_at: string;
}

export const inMemoryDB = {
  plans: [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Essential',
      price_monthly: 59.00,
      price_yearly: 590.00,
      features: [
        'Full gym floor & cardio deck access',
        'Locker room & Finnish sauna access',
        '1 Complimentary fitness assessment',
        'Standard mobile app scheduling',
        'Electrolyte & filtered water station'
      ],
      is_popular: false
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Black Tier',
      price_monthly: 119.00,
      price_yearly: 1190.00,
      features: [
        'Everything in Essential',
        'Unlimited group conditioning & HIIT classes',
        'Dedicated member concierge',
        'Guest passes (2 per month)',
        'Eucalyptus towel & laundry service',
        'Smoothie bar & recovery lounge discount (15%)'
      ],
      is_popular: true
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      name: 'Private Athlete',
      price_monthly: 249.00,
      price_yearly: 2490.00,
      features: [
        'Everything in Black Tier',
        'Weekly 1-on-1 private coaching sessions',
        'Biometric metabolic tracking & customized nutrition',
        'Private cryotherapy & infrared recovery suite',
        'Unlimited guest privileges',
        'Reserved luxury locker with personalized engraving'
      ],
      is_popular: false
    }
  ] as Plan[],

  users: [] as User[],

  classes: [
    {
      id: 'a1111111-1111-1111-1111-111111111111',
      title: 'Hypertrophy & Strength Flow',
      trainer: 'Marcus Vance',
      category: 'Strength',
      starts_at: new Date(Date.now() + 86400000 * 1 + 3600000 * 9).toISOString(),
      duration_min: 60,
      capacity: 16
    },
    {
      id: 'a2222222-2222-2222-2222-222222222222',
      title: 'Aura Athletic Conditioning (HIIT)',
      trainer: 'Elena Rostova',
      category: 'Cardio & HIIT',
      starts_at: new Date(Date.now() + 86400000 * 1 + 3600000 * 17).toISOString(),
      duration_min: 45,
      capacity: 20
    },
    {
      id: 'a3333333-3333-3333-3333-333333333333',
      title: 'Olympic Weightlifting Mastery',
      trainer: 'Darius Sterling',
      category: 'Strength',
      starts_at: new Date(Date.now() + 86400000 * 2 + 3600000 * 10).toISOString(),
      duration_min: 75,
      capacity: 12
    },
    {
      id: 'a4444444-4444-4444-4444-444444444444',
      title: 'Deep Mobility & Fascial Release',
      trainer: 'Dr. Maya Lin',
      category: 'Recovery & Mobility',
      starts_at: new Date(Date.now() + 86400000 * 2 + 3600000 * 18).toISOString(),
      duration_min: 50,
      capacity: 15
    },
    {
      id: 'a5555555-5555-5555-5555-555555555555',
      title: 'Pure Boxing & Power Dynamics',
      trainer: 'Kai Tanaka',
      category: 'Cardio & HIIT',
      starts_at: new Date(Date.now() + 86400000 * 3 + 3600000 * 8).toISOString(),
      duration_min: 60,
      capacity: 14
    },
    {
      id: 'a6666666-6666-6666-6666-666666666666',
      title: 'Breathwork & Cold Contrast Immersion',
      trainer: 'Dr. Maya Lin',
      category: 'Recovery & Mobility',
      starts_at: new Date(Date.now() + 86400000 * 3 + 3600000 * 19).toISOString(),
      duration_min: 45,
      capacity: 10
    }
  ] as ClassSession[],

  bookings: [] as Booking[],

  leads: [] as Lead[],
};
