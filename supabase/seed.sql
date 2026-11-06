-- Seed Plans
insert into plans (id, name, price_monthly, price_yearly, features, is_popular)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Essential',
    59.00,
    590.00,
    '[
      "Full gym floor & cardio deck access",
      "Locker room & sauna access",
      "1 Complimentary fitness assessment",
      "Standard mobile app features",
      "Water station access"
    ]'::jsonb,
    false
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Black Tier',
    119.00,
    1190.00,
    '[
      "Everything in Essential",
      "Unlimited group conditioning & HIIT classes",
      "Dedicated member concierge",
      "Guest passes (2 per month)",
      "Towel & laundry service",
      "Smoothie bar discount (15%)"
    ]'::jsonb,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Private Athlete',
    249.00,
    2490.00,
    '[
      "Everything in Black Tier",
      "Weekly 1-on-1 private coaching sessions",
      "Personalized bio-metric tracking & nutrition",
      "Private recovery suite & cryotherapy",
      "Unlimited guest privileges",
      "VIP locker with custom engraving"
    ]'::jsonb,
    false
  )
on conflict (id) do nothing;

-- Seed Classes
insert into classes (id, title, trainer, category, starts_at, duration_min, capacity)
values
  (
    'a1111111-1111-1111-1111-111111111111',
    'Hypertrophy & Strength Flow',
    'Marcus Vance',
    'Strength',
    now() + interval '1 day 9 hours',
    60,
    16
  ),
  (
    'a2222222-2222-2222-2222-222222222222',
    'Aura Athletic Conditioning (HIIT)',
    'Elena Rostova',
    'Cardio & HIIT',
    now() + interval '1 day 17 hours',
    45,
    20
  ),
  (
    'a3333333-3333-3333-3333-333333333333',
    'Olympic Weightlifting Mastery',
    'Darius Sterling',
    'Strength',
    now() + interval '2 days 10 hours',
    75,
    12
  ),
  (
    'a4444444-4444-4444-4444-444444444444',
    'Deep Mobility & Fascial Release',
    'Dr. Maya Lin',
    'Recovery & Mobility',
    now() + interval '2 days 18 hours',
    50,
    15
  ),
  (
    'a5555555-5555-5555-5555-555555555555',
    'Pure Boxing & Power Dynamics',
    'Kai Tanaka',
    'Cardio & HIIT',
    now() + interval '3 days 8 hours',
    60,
    14
  ),
  (
    'a6666666-6666-6666-6666-666666666666',
    'Breathwork & Cold Contrast Immersion',
    'Dr. Maya Lin',
    'Recovery & Mobility',
    now() + interval '3 days 19 hours',
    45,
    10
  )
on conflict (id) do nothing;
