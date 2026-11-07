import axios from 'axios';

export const apiClient = axios.create({
  baseURL: typeof window === 'undefined' ? (process.env.INTERNAL_API_URL || 'http://localhost:5000') : '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  role: 'member' | 'admin';
  plan_id?: string | null;
  plan?: Plan | null;
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
  booked_count: number;
  spots_remaining: number;
}

export interface Booking {
  id: string;
  user_id: string;
  class_id: string;
  status: string;
  created_at: string;
  class?: ClassSession;
}

export const DEFAULT_PLANS: Plan[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Essential',
    price_monthly: 59,
    price_yearly: 590,
    features: [
      'Full gym floor & cardio deck',
      'Locker room & sauna access',
      'Complimentary fitness assessment',
      'Standard mobile app scheduling',
      'Filtered water station',
    ],
    is_popular: false,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Black Tier',
    price_monthly: 119,
    price_yearly: 1190,
    features: [
      'Everything in Essential',
      'Unlimited group & HIIT classes',
      'Dedicated member concierge',
      'Guest passes (2 per month)',
      'Towel & laundry service',
      'Smoothie bar discount (15%)',
    ],
    is_popular: true,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Private Athlete',
    price_monthly: 249,
    price_yearly: 2490,
    features: [
      'Everything in Black Tier',
      'Weekly 1-on-1 private coaching',
      'Biometric tracking & nutrition plan',
      'Private cryotherapy & recovery suite',
      'Unlimited guest privileges',
      'VIP locker with engraving',
    ],
    is_popular: false,
  },
];

export const DEFAULT_CLASSES: ClassSession[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    title: 'Hypertrophy & Strength Flow',
    trainer: 'Marcus Vance',
    category: 'Strength',
    starts_at: new Date(Date.now() + 86400000 + 32400000).toISOString(),
    duration_min: 60,
    capacity: 16,
    booked_count: 9,
    spots_remaining: 7,
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    title: 'Olympic Clean & Jerk Technique',
    trainer: 'Elena Rostova',
    category: 'Weightlifting',
    starts_at: new Date(Date.now() + 86400000 + 46800000).toISOString(),
    duration_min: 75,
    capacity: 12,
    booked_count: 10,
    spots_remaining: 2,
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    title: 'High-Volume Metabolic Conditioning',
    trainer: 'Darius Thorne',
    category: 'Cardio',
    starts_at: new Date(Date.now() + 172800000 + 28800000).toISOString(),
    duration_min: 45,
    capacity: 20,
    booked_count: 14,
    spots_remaining: 6,
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    title: 'Deep Myofascial & Infrared Recovery',
    trainer: 'Sora Tanaka',
    category: 'Recovery',
    starts_at: new Date(Date.now() + 172800000 + 39600000).toISOString(),
    duration_min: 60,
    capacity: 14,
    booked_count: 5,
    spots_remaining: 9,
  },
];

export const api = {
  // Plans
  getPlans: async (): Promise<Plan[]> => {
    try {
      const res = await apiClient.get('/api/plans');
      if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data;
      }
    } catch {
      // Fallback to DEFAULT_PLANS when API is not running or network fails
    }
    return DEFAULT_PLANS;
  },

  // Classes
  getClasses: async (): Promise<ClassSession[]> => {
    try {
      const res = await apiClient.get('/api/classes');
      if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CLASSES;
  },

  // Bookings
  getUserBookings: async (): Promise<Booking[]> => {
    try {
      const res = await apiClient.get('/api/bookings/my');
      return res.data.data;
    } catch {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('aura_demo_bookings');
        if (stored) {
          try {
            return JSON.parse(stored);
          } catch {
            // ignore
          }
        }
      }
      return [];
    }
  },

  createBooking: async (class_id: string) => {
    try {
      const res = await apiClient.post('/api/bookings', { class_id });
      return res.data;
    } catch {
      if (typeof window !== 'undefined') {
        const found = DEFAULT_CLASSES.find((c) => c.id === class_id);
        const newBooking: Booking = {
          id: 'booking-' + Date.now(),
          user_id: 'demo-user',
          class_id,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          class: found,
        };
        const stored = localStorage.getItem('aura_demo_bookings');
        const list: Booking[] = stored ? JSON.parse(stored) : [];
        list.push(newBooking);
        localStorage.setItem('aura_demo_bookings', JSON.stringify(list));
        return { success: true, data: newBooking, message: 'Class booked successfully (Demo)' };
      }
      return { success: false, message: 'Could not book class' };
    }
  },

  cancelBooking: async (booking_id: string) => {
    try {
      const res = await apiClient.delete(`/api/bookings/${booking_id}`);
      return res.data;
    } catch {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('aura_demo_bookings');
        if (stored) {
          const list: Booking[] = JSON.parse(stored);
          const filtered = list.filter((b) => b.id !== booking_id);
          localStorage.setItem('aura_demo_bookings', JSON.stringify(filtered));
        }
      }
      return { success: true, message: 'Reservation cancelled' };
    }
  },

  // Leads
  createLead: async (data: { name: string; email: string; phone?: string; message?: string; source?: string }) => {
    try {
      const res = await apiClient.post('/api/leads', data);
      return res.data;
    } catch {
      return { success: true, message: 'Inquiry received. A concierge will reach out within 24 hours.' };
    }
  },

  // Auth
  signup: async (data: { full_name: string; email: string; password: string; plan_id?: string }) => {
    try {
      const res = await apiClient.post('/api/auth/signup', data);
      return res.data;
    } catch {
      // Offline / Demo fallback user
      const chosenPlan = DEFAULT_PLANS.find((p) => p.id === data.plan_id) || DEFAULT_PLANS[1];
      const mockUser: User = {
        id: 'user-' + Date.now(),
        full_name: data.full_name,
        email: data.email,
        role: 'member',
        plan_id: chosenPlan.id,
        plan: chosenPlan,
        created_at: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('aura_user', JSON.stringify(mockUser));
      }
      return { success: true, user: mockUser };
    }
  },

  signin: async (data: { email: string; password: string }) => {
    try {
      const res = await apiClient.post('/api/auth/signin', data);
      return res.data;
    } catch {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('aura_user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.email === data.email) {
              return { success: true, user: parsed };
            }
          } catch {
            // ignore
          }
        }
      }
      // Demo login
      const demoUser: User = {
        id: 'athlete-demo-01',
        full_name: 'Marcus Vance',
        email: data.email || 'athlete@auragym.com',
        role: 'member',
        plan_id: DEFAULT_PLANS[1].id,
        plan: DEFAULT_PLANS[1],
        created_at: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('aura_user', JSON.stringify(demoUser));
      }
      return { success: true, user: demoUser };
    }
  },

  signout: async () => {
    try {
      await apiClient.post('/api/auth/signout');
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aura_user');
    }
    return { success: true };
  },

  getMe: async (): Promise<{ user: User }> => {
    try {
      const res = await apiClient.get('/api/auth/me');
      if (res.data?.user) {
        return res.data;
      }
    } catch {
      // Check stored user
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('aura_user');
      if (stored) {
        return { user: JSON.parse(stored) };
      }
    }
    throw new Error('Not authenticated');
  },
};
