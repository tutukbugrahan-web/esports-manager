-- ESports Manager: schema başlangıcı
-- Supabase SQL Editor'da çalıştırın. RLS tüm tablolarda açık tutulur.
create extension if not exists pgcrypto;

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  game text not null default 'PUBG Mobile',
  logo_url text,
  description text,
  status text not null default 'active' check (status in ('active','inactive','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete set null,
  real_name text,
  nickname text not null,
  player_id text,
  role text,
  phone text,
  email text,
  discord text,
  monthly_salary numeric(12,2) not null default 0,
  payment_day int check (payment_day between 1 and 31),
  joined_at date,
  left_at date,
  status text not null default 'active' check (status in ('active','reserve','left')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete set null,
  player_id uuid references public.players(id) on delete set null,
  kind text not null check (kind in ('income','expense')),
  category text not null,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'TRY',
  transaction_date date not null default current_date,
  counterparty text,
  description text,
  payment_status text not null default 'completed' check (payment_status in ('pending','completed','cancelled')),
  attachment_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete set null,
  player_id uuid references public.players(id) on delete set null,
  item_name text not null,
  quantity int not null default 1 check (quantity > 0),
  unit_cost numeric(12,2) not null default 0,
  direction text not null default 'owned' check (direction in ('owned','given','received','to_buy','returned')),
  item_status text not null default 'active',
  given_at date,
  returned_at date,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  title text not null,
  details text,
  due_at timestamptz not null,
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  player_id uuid references public.players(id) on delete cascade,
  title text not null,
  body text,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  name text not null,
  organizer text,
  start_date date,
  end_date date,
  entry_fee numeric(12,2) not null default 0,
  prize_money numeric(12,2) not null default 0,
  placement text,
  status text not null default 'planned',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  player_id uuid references public.players(id) on delete cascade,
  title text not null,
  start_date date,
  end_date date,
  monthly_amount numeric(12,2) not null default 0,
  document_url text,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now()
);

-- İlk sürüm tek yönetici kullanımına göre tasarlanır.
-- Güvenlik için anon erişimi açmayın. Supabase Auth ile giriş eklendikten sonra
-- aşağıdaki politikaları auth.uid() tabanlı sahiplik modeline yükseltin.
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.transactions enable row level security;
alter table public.inventory_items enable row level security;
alter table public.reminders enable row level security;
alter table public.notes enable row level security;
alter table public.tournaments enable row level security;
alter table public.contracts enable row level security;

-- Not: Bu şema tabloları oluşturur ancak henüz istemci erişim politikası tanımlamaz.
-- Auth/owner bağlantısı tamamlanmadan gerçek kişisel verileri yüklemeyin.
