create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text,
  ip text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages add column if not exists source text;
alter table public.contact_messages add column if not exists ip text;
alter table public.contact_messages add column if not exists created_at timestamptz not null default now();

create table if not exists public.signup_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  plan text not null,
  referrer text,
  ip text,
  created_at timestamptz not null default now()
);

alter table public.signup_requests add column if not exists referrer text;
alter table public.signup_requests add column if not exists ip text;
alter table public.signup_requests add column if not exists created_at timestamptz not null default now();

create table if not exists public.feedback_messages (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  message text not null,
  rating text,
  ip text,
  created_at timestamptz not null default now()
);

alter table public.feedback_messages add column if not exists user_id text;
alter table public.feedback_messages add column if not exists rating text;
alter table public.feedback_messages add column if not exists ip text;
alter table public.feedback_messages add column if not exists created_at timestamptz not null default now();
