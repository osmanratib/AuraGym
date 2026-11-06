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

export const api = {
  // Plans
  getPlans: async (): Promise<Plan[]> => {
    const res = await apiClient.get('/api/plans');
    return res.data.data;
  },

  // Classes
  getClasses: async (): Promise<ClassSession[]> => {
    const res = await apiClient.get('/api/classes');
    return res.data.data;
  },

  // Bookings
  getUserBookings: async (): Promise<Booking[]> => {
    const res = await apiClient.get('/api/bookings/my');
    return res.data.data;
  },

  createBooking: async (class_id: string) => {
    const res = await apiClient.post('/api/bookings', { class_id });
    return res.data;
  },

  cancelBooking: async (booking_id: string) => {
    const res = await apiClient.delete(`/api/bookings/${booking_id}`);
    return res.data;
  },

  // Leads
  createLead: async (data: { name: string; email: string; phone?: string; message?: string; source?: string }) => {
    const res = await apiClient.post('/api/leads', data);
    return res.data;
  },

  // Auth
  signup: async (data: { full_name: string; email: string; password: string; plan_id?: string }) => {
    const res = await apiClient.post('/api/auth/signup', data);
    return res.data;
  },

  signin: async (data: { email: string; password: string }) => {
    const res = await apiClient.post('/api/auth/signin', data);
    return res.data;
  },

  signout: async () => {
    const res = await apiClient.post('/api/auth/signout');
    return res.data;
  },

  getMe: async (): Promise<{ user: User }> => {
    const res = await apiClient.get('/api/auth/me');
    return res.data;
  },
};
