-- Blockbusters Supabase Setup
-- Einmal vollständig im Supabase SQL Editor ausführen.
-- Das Passwort wird serverseitig nur als Hash gespeichert.
-- Aktuelles Passwort: 4208

create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;

revoke all on schema private from public;
revoke all on schema private from anon;
revoke all on schema private from authenticated;

create table if not exists private.blockbusters_config (
  singleton boolean primary key default true check (singleton = true),
  pin_hash text not null,
  updated_at timestamptz not null default now()
);

insert into private.blockbusters_config (singleton, pin_hash, updated_at)
values (
  true,
  extensions.crypt('4208', extensions.gen_salt('bf')),
  now()
)
on conflict (singleton)
do update set
  pin_hash = excluded.pin_hash,
  updated_at = now();

create table if not exists public.blockbusters_games (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  questions jsonb not null
    check (
      jsonb_typeof(questions) = 'array'
      and jsonb_array_length(questions) >= 25
    ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blockbusters_games enable row level security;

-- Kein direkter Tabellenzugriff über den Publishable Key.
revoke all on table public.blockbusters_games from anon;
revoke all on table public.blockbusters_games from authenticated;

create or replace function public.bb_check_pin(p_pin text)
returns boolean
language sql
stable
security definer
set search_path = public, private, extensions
as $$
  select exists (
    select 1
    from private.blockbusters_config c
    where c.singleton = true
      and c.pin_hash = extensions.crypt(coalesce(p_pin, ''), c.pin_hash)
  );
$$;

create or replace function public.bb_list_games(p_pin text)
returns table (
  id uuid,
  title text,
  questions jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public, private, extensions
as $$
begin
  if not public.bb_check_pin(p_pin) then
    raise exception 'invalid pin' using errcode = '28000';
  end if;

  return query
  select
    g.id,
    g.title,
    g.questions,
    g.created_at,
    g.updated_at
  from public.blockbusters_games g
  order by g.updated_at desc;
end;
$$;

create or replace function public.bb_save_game(
  p_pin text,
  p_title text,
  p_questions jsonb,
  p_id uuid default null
)
returns table (
  id uuid,
  title text,
  questions jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public, private, extensions
as $$
declare
  v_id uuid := coalesce(p_id, gen_random_uuid());
begin
  if not public.bb_check_pin(p_pin) then
    raise exception 'invalid pin' using errcode = '28000';
  end if;

  if p_title is null or length(trim(p_title)) = 0 then
    raise exception 'title required';
  end if;

  if p_questions is null
     or jsonb_typeof(p_questions) <> 'array'
     or jsonb_array_length(p_questions) < 25 then
    raise exception 'at least 25 questions required';
  end if;

  insert into public.blockbusters_games as g (
    id,
    title,
    questions,
    created_at,
    updated_at
  )
  values (
    v_id,
    trim(p_title),
    p_questions,
    now(),
    now()
  )
  on conflict (id)
  do update set
    title = excluded.title,
    questions = excluded.questions,
    updated_at = now();

  return query
  select
    g.id,
    g.title,
    g.questions,
    g.created_at,
    g.updated_at
  from public.blockbusters_games g
  where g.id = v_id;
end;
$$;

create or replace function public.bb_delete_game(
  p_pin text,
  p_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public, private, extensions
as $$
declare
  v_deleted integer;
begin
  if not public.bb_check_pin(p_pin) then
    raise exception 'invalid pin' using errcode = '28000';
  end if;

  delete from public.blockbusters_games
  where id = p_id;

  get diagnostics v_deleted = row_count;
  return v_deleted > 0;
end;
$$;

-- Direkten Funktionszugriff zuerst entziehen und nur für Supabase API Rollen freigeben.
revoke all on function public.bb_check_pin(text) from public;
revoke all on function public.bb_list_games(text) from public;
revoke all on function public.bb_save_game(text, text, jsonb, uuid) from public;
revoke all on function public.bb_delete_game(text, uuid) from public;

grant execute on function public.bb_check_pin(text) to anon, authenticated;
grant execute on function public.bb_list_games(text) to anon, authenticated;
grant execute on function public.bb_save_game(text, text, jsonb, uuid) to anon, authenticated;
grant execute on function public.bb_delete_game(text, uuid) to anon, authenticated;

-- Optionaler Test nach dem Setup:
-- select public.bb_check_pin('4208'); -- sollte true ergeben
-- select * from public.bb_list_games('4208');
