import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { supabase, isSupabaseConfigured, inMemoryDB, User } from '../lib/supabase.js';
import { signToken, setTokenCookie, clearTokenCookie } from '../lib/jwt.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export async function signup(req: Request, res: Response): Promise<void> {
  const { full_name, email, password, plan_id } = req.body;

  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = await bcrypt.hash(password, 10);

  if (isSupabaseConfigured && supabase) {
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (existingUser) {
      res.status(409).json({ success: false, message: 'An account with this email already exists' });
      return;
    }

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        full_name,
        email: normalizedEmail,
        password_hash: passwordHash,
        role: 'member',
        plan_id: plan_id || null,
      })
      .select('id, full_name, email, role, plan_id, created_at')
      .single();

    if (error || !newUser) {
      res.status(500).json({ success: false, message: error?.message || 'Failed to create user account' });
      return;
    }

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    setTokenCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
    });
    return;
  }

  // Fallback to in-memory store
  const existing = inMemoryDB.users.find((u) => u.email === normalizedEmail);
  if (existing) {
    res.status(409).json({ success: false, message: 'An account with this email already exists' });
    return;
  }

  const newUser: User = {
    id: randomUUID(),
    full_name,
    email: normalizedEmail,
    password_hash: passwordHash,
    role: 'member',
    plan_id: plan_id || null,
    created_at: new Date().toISOString(),
  };

  inMemoryDB.users.push(newUser);

  const token = signToken({
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });

  setTokenCookie(res, token);

  const { password_hash, ...safeUser } = newUser;
  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    user: safeUser,
  });
}

export async function signin(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  let user: any = null;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (error || !data) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }
    user = data;
  } else {
    user = inMemoryDB.users.find((u) => u.email === normalizedEmail);
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  setTokenCookie(res, token);

  const { password_hash, ...safeUser } = user;
  res.status(200).json({
    success: true,
    message: 'Signed in successfully',
    user: safeUser,
  });
}

export function signout(req: Request, res: Response): void {
  clearTokenCookie(res);
  res.status(200).json({ success: true, message: 'Signed out successfully' });
}

export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  let user: any = null;
  let activePlan: any = null;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('users')
      .select('id, full_name, email, role, plan_id, created_at')
      .eq('id', req.user.userId)
      .maybeSingle();

    if (error || !data) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    user = data;

    if (user.plan_id) {
      const { data: planData } = await supabase
        .from('plans')
        .select('*')
        .eq('id', user.plan_id)
        .maybeSingle();
      activePlan = planData;
    }
  } else {
    user = inMemoryDB.users.find((u) => u.id === req.user!.userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    const { password_hash, ...safeUser } = user;
    user = safeUser;

    if (user.plan_id) {
      activePlan = inMemoryDB.plans.find((p) => p.id === user.plan_id) || null;
    }
  }

  res.status(200).json({
    success: true,
    user: {
      ...user,
      plan: activePlan,
    },
  });
}
