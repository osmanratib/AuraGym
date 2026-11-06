-- Aura Gym Supabase Schema
-- Extensions
create extension if not exists "pgcrypto";

-- 1. Plans Table
create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_monthly numeric(8,2) not null,
  price_yearly numeric(8,2) not null,
  features jsonb default '[]'::jsonb,
  is_popular boolean default false
);

-- 2. Users Table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null default 'member' check (role in ('member','admin')),
  plan_id uuid references plans(id),
  created_at timestamptz default now()
);

-- 3. Classes Table
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  trainer text,
  category text,
  starts_at timestamptz not null,
  duration_min int default 60,
  capacity int not null default 20
);

-- 4. Bookings Table
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  status text default 'booked',
  created_at timestamptz default now(),
  unique (user_id, class_id)
);

-- 5. Leads Table (Trial and Contact forms)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  source text default 'website',
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table plans enable row level security;
alter table users enable row level security;
alter table classes enable row level security;
alter table bookings enable row level security;
alter table leads enable row level security;

-- Public read policies for plans and classes
drop policy if exists "Allow public read on plans" on plans;
create policy "Allow public read on plans" on plans for select using (true);

drop policy if exists "Allow public read on classes" on classes;
create policy "Allow public read on classes" on classes for select using (true);

-- Indexes for performance
create index if not exists idx_bookings_class_id on bookings (class_id);
create index if not exists idx_bookings_user_id on bookings (user_id);
create index if not exists idx_classes_starts_at on classes (starts_at);
create index if not exists idx_users_email on users (email);
