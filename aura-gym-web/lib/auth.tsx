'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, User } from './api';
import { AuraAlert } from './alerts';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  signin: (credentials: { email: string; password: string }) => Promise<boolean>;
  signup: (data: { full_name: string; email: string; password: string; plan_id?: string }) => Promise<boolean>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const signin = async (credentials: { email: string; password: string }) => {
    try {
      const res = await api.signin(credentials);
      if (res.success) {
        setUser(res.user);
        AuraAlert.success('Welcome back', `Good to see you, ${res.user.full_name}`);
        router.push('/dashboard');
        return true;
      }
      return false;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Invalid email or password';
      AuraAlert.error('Sign In Failed', message);
      return false;
    }
  };

  const signup = async (data: { full_name: string; email: string; password: string; plan_id?: string }) => {
    try {
      const res = await api.signup(data);
      if (res.success) {
        setUser(res.user);
        AuraAlert.success('Account Created', 'Welcome to Aura Gym.');
        router.push('/dashboard');
        return true;
      }
      return false;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Could not complete registration';
      AuraAlert.error('Sign Up Failed', message);
      return false;
    }
  };

  const signout = async () => {
    const confirmed = await AuraAlert.confirm(
      'Sign Out',
      'Are you sure you want to end your session?',
      'Yes, Sign Out'
    );
    if (!confirmed) return;

    try {
      await api.signout();
      setUser(null);
      router.push('/signin');
      AuraAlert.success('Signed Out', 'You have been safely signed out.');
    } catch {
      setUser(null);
      router.push('/signin');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
