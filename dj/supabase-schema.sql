-- ============================================================================
--  Dj Aco — schema Supabase per la classifica condivisa
--  Da incollare per intero nel SQL Editor di Supabase ed eseguire una volta.
--  Rieseguirlo e' sicuro: e' idempotente (non cancella le richieste esistenti).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Tabella richieste
--    `ts` e' epoch in millisecondi, esattamente come lo usa gia' il client.
-- ---------------------------------------------------------------------------
create table if not exists public.requests (
  id        uuid primary key default gen_random_uuid(),
  title     text   not null,
  artist    text   not null,
  album     text,
  color     text,
  requester text   not null default 'Anon',
  votes     int    not null default 1,
  status    text   not null default 'queued' check (status in ('queued', 'played')),
  ts        bigint not null,
  vote_log  jsonb  not null default '[]'::jsonb
);

create index if not exists requests_ts_idx on public.requests (ts desc);

-- ---------------------------------------------------------------------------
-- 2. PIN del dj (tabella privata: nessuna policy => invisibile ai visitatori)
--
--    >>> PRIMA DI ESEGUIRE: sostituisci CAMBIA-QUESTO-PIN con il tuo PIN. <<<
--
--    Questo file finisce su GitHub in chiaro, quindi il PIN vero non va scritto
--    qui e poi committato: mettilo, esegui, e rimetti il segnaposto. Oppure
--    lascia il segnaposto ed esegui a parte:
--       update public.dj_settings set pin = 'il-tuo-pin' where id = 1;
--
--    Non usare 'aco': e' il ripiego offline scritto nel sorgente del sito, ed e'
--    quindi pubblico. Il PIN qui sotto e' quello che protegge davvero le
--    operazioni distruttive (segna suonata / cancella).
-- ---------------------------------------------------------------------------
create table if not exists public.dj_settings (
  id  int primary key default 1 check (id = 1),
  pin text not null
);

insert into public.dj_settings (id, pin)
values (1, 'CAMBIA-QUESTO-PIN')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 3. Row Level Security
--    Gli ospiti possono SOLO leggere. Ogni scrittura passa dalle funzioni
--    security definer qui sotto, cosi' nessuno puo' cancellare la classifica
--    chiamando l'API a mano.
-- ---------------------------------------------------------------------------
alter table public.requests    enable row level security;
alter table public.dj_settings enable row level security;

drop policy if exists "lettura pubblica delle richieste" on public.requests;
create policy "lettura pubblica delle richieste"
  on public.requests for select
  to anon, authenticated
  using (true);

revoke all on public.requests    from anon, authenticated;
revoke all on public.dj_settings from anon, authenticated;
grant select on public.requests to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4. request_track — inserisce una richiesta o incrementa i voti, in modo
--    atomico. Il lock consultivo serializza le richieste sullo stesso brano:
--    due telefoni che votano nello stesso istante non si sovrascrivono.
-- ---------------------------------------------------------------------------
create or replace function public.request_track(
  p_title     text,
  p_artist    text,
  p_album     text default null,
  p_color     text default null,
  p_requester text default 'Anon'
) returns public.requests
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now       bigint := (extract(epoch from now()) * 1000)::bigint;
  v_title     text   := btrim(coalesce(p_title, ''));
  v_artist    text   := btrim(coalesce(p_artist, ''));
  v_requester text;
  v_entry     jsonb;
  v_row       public.requests;
begin
  if v_title = '' or v_artist = '' then
    raise exception 'titolo e artista sono obbligatori';
  end if;

  v_title     := left(v_title, 200);
  v_artist    := left(v_artist, 200);
  v_requester := left(coalesce(nullif(btrim(coalesce(p_requester, '')), ''), 'Anon'), 24);
  v_entry     := jsonb_build_array(jsonb_build_object('ts', v_now, 'requester', v_requester));

  -- serializza i voti concorrenti sullo stesso brano
  perform pg_advisory_xact_lock(hashtext(lower(v_title) || '§' || lower(v_artist)));

  select r.* into v_row
  from public.requests r
  where lower(r.title)  = lower(v_title)
    and lower(r.artist) = lower(v_artist)
    and r.status <> 'played'
    and r.ts >= v_now - 86400000
  order by r.ts desc
  limit 1;

  if found then
    update public.requests
       set votes    = votes + 1,
           vote_log = vote_log || v_entry
     where id = v_row.id
    returning * into v_row;
  else
    insert into public.requests (title, artist, album, color, requester, votes, status, ts, vote_log)
    values (v_title, v_artist, left(coalesce(p_album, ''), 200), p_color, v_requester, 1, 'queued', v_now, v_entry)
    returning * into v_row;
  end if;

  return v_row;
end;
$$;

-- ---------------------------------------------------------------------------
-- 5. Funzioni riservate al dj (richiedono il PIN, verificato lato server)
-- ---------------------------------------------------------------------------
create or replace function public.dj_check(p_pin text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.dj_settings where id = 1 and pin = p_pin);
$$;

create or replace function public.dj_set_status(p_pin text, p_id uuid, p_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.dj_check(p_pin) then
    raise exception 'PIN dj non valido';
  end if;
  if p_status not in ('queued', 'played') then
    raise exception 'stato non valido: %', p_status;
  end if;
  update public.requests set status = p_status where id = p_id;
end;
$$;

create or replace function public.dj_delete(p_pin text, p_ids uuid[])
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.dj_check(p_pin) then
    raise exception 'PIN dj non valido';
  end if;
  delete from public.requests where id = any(p_ids);
end;
$$;

-- ---------------------------------------------------------------------------
-- 6. Permessi di esecuzione
-- ---------------------------------------------------------------------------
revoke all on function public.request_track(text, text, text, text, text) from public;
revoke all on function public.dj_check(text)                              from public;
revoke all on function public.dj_set_status(text, uuid, text)             from public;
revoke all on function public.dj_delete(text, uuid[])                     from public;

grant execute on function public.request_track(text, text, text, text, text) to anon, authenticated;
grant execute on function public.dj_check(text)                              to anon, authenticated;
grant execute on function public.dj_set_status(text, uuid, text)             to anon, authenticated;
grant execute on function public.dj_delete(text, uuid[])                     to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 7. Realtime: il monitor si aggiorna da solo a ogni richiesta
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'requests'
  ) then
    alter publication supabase_realtime add table public.requests;
  end if;
end;
$$;
