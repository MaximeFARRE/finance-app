-- ============================================================
-- Finance App — Schéma Supabase
-- À exécuter dans l'éditeur SQL de ton projet Supabase
-- ============================================================

-- ------------------------------------------------------------
-- Extensions
-- ------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- CONTENU
-- ------------------------------------------------------------

create table public.tracks (
  id           text primary key,
  title        text not null,
  description  text not null,
  emoji        text not null,
  color        text not null,
  created_at   timestamptz default now()
);

create table public.lessons (
  id                 text primary key,
  track_id           text not null references public.tracks(id) on delete cascade,
  slug               text not null,
  title              text not null,
  description        text not null,
  estimated_minutes  integer not null default 10,
  "order"            integer not null default 0,
  created_at         timestamptz default now()
);

create table public.cards (
  id          text primary key,
  lesson_id   text not null references public.lessons(id) on delete cascade,
  type        text not null check (type in ('definition','intuition','example','formula','trap','interview-question','model-answer')),
  front       text not null,
  back        text not null,
  detail      text,
  difficulty  integer not null check (difficulty in (1, 2, 3)),
  tags        text[] not null default '{}',
  created_at  timestamptz default now()
);

-- ------------------------------------------------------------
-- PROFILS UTILISATEURS
-- ------------------------------------------------------------

create table public.profiles (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null unique references auth.users(id) on delete cascade,
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz default now()
);

-- Création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- PROGRESSION UTILISATEUR
-- ------------------------------------------------------------

create table public.user_progress (
  user_id               uuid primary key references auth.users(id) on delete cascade,
  xp                    integer not null default 0,
  streak                integer not null default 0,
  last_session_at       timestamptz,
  completed_lesson_ids  text[] not null default '{}',
  lesson_stars          jsonb not null default '{}',
  learned_card_ids      text[] not null default '{}',
  learn_session_ids     text[] not null default '{}',
  updated_at            timestamptz default now()
);

create table public.card_progress (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  card_id           text not null references public.cards(id) on delete cascade,
  repetitions       integer not null default 0,
  ease_factor       float not null default 2.5,
  interval          integer not null default 0,
  next_review_at    timestamptz not null default now(),
  last_reviewed_at  timestamptz,
  unique (user_id, card_id)
);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------

-- Tracks : lecture publique, écriture admin
alter table public.tracks enable row level security;
create policy "tracks_read" on public.tracks for select using (true);
create policy "tracks_write" on public.tracks for all
  using (exists (select 1 from public.profiles where user_id = auth.uid() and role = 'admin'));

-- Lessons : lecture publique, écriture admin
alter table public.lessons enable row level security;
create policy "lessons_read" on public.lessons for select using (true);
create policy "lessons_write" on public.lessons for all
  using (exists (select 1 from public.profiles where user_id = auth.uid() and role = 'admin'));

-- Cards : lecture publique, écriture admin
alter table public.cards enable row level security;
create policy "cards_read" on public.cards for select using (true);
create policy "cards_write" on public.cards for all
  using (exists (select 1 from public.profiles where user_id = auth.uid() and role = 'admin'));

-- Profiles : chaque user voit et modifie uniquement son profil
alter table public.profiles enable row level security;
create policy "profiles_own" on public.profiles for all
  using (user_id = auth.uid());

-- User progress : chaque user accède uniquement à sa progression
alter table public.user_progress enable row level security;
create policy "user_progress_own" on public.user_progress for all
  using (user_id = auth.uid());

-- Card progress : chaque user accède uniquement à sa progression
alter table public.card_progress enable row level security;
create policy "card_progress_own" on public.card_progress for all
  using (user_id = auth.uid());

-- ------------------------------------------------------------
-- INDEX (performances)
-- ------------------------------------------------------------

create index lessons_track_id_idx on public.lessons(track_id);
create index lessons_order_idx on public.lessons(track_id, "order");
create index cards_lesson_id_idx on public.cards(lesson_id);
create index card_progress_user_id_idx on public.card_progress(user_id);
create index card_progress_next_review_idx on public.card_progress(user_id, next_review_at);
