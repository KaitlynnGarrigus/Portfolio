-- Run this once in Supabase: SQL Editor > New query > paste > Run

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('solidworks','biology','vetmed')),
  title text not null,
  description text,
  model_path text,
  pdf_path text,
  image_path text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;

-- Anyone can view posts; only logged-in users (you) can add, edit, star, or delete.
create policy "public read posts" on public.posts for select using (true);
create policy "owner write posts" on public.posts for all to authenticated using (true) with check (true);

-- Public file bucket for uploads
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "public read files" on storage.objects for select using (bucket_id = 'portfolio');
create policy "owner write files" on storage.objects for all to authenticated
  using (bucket_id = 'portfolio') with check (bucket_id = 'portfolio');
