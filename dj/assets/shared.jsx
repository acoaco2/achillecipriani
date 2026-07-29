// Shared components for DJ Aco site

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Hash router ----------
function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace("#", "") || "home");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [route, (r) => { window.location.hash = r; }];
}

// ---------- Request store ----------
// Modalita' "cloud": tabella condivisa su Supabase, cosi' le richieste fatte dai
// telefoni degli ospiti arrivano al monitor del dj. Aggiornamento in realtime,
// con un refresh periodico di sicurezza se la connessione balla.
// Modalita' "local": se Supabase non e' configurato o non e' raggiungibile si
// ricade su localStorage (come prima: classifica valida solo su quel device).

const STORAGE_KEY = "dj_aco_requests_v1";
const PIN_KEY = "dj_aco_pin";
const DAY_MS = 86400000;

const SB = (() => {
  const cfg = window.DJ_CONFIG || {};
  if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) return null;
  if (!window.supabase || !window.supabase.createClient) return null;
  try {
    return window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (e) {
    return null;
  }
})();

const rowToReq = (r) => ({
  id: r.id,
  title: r.title,
  artist: r.artist,
  album: r.album,
  color: r.color,
  requester: r.requester,
  votes: r.votes,
  status: r.status,
  ts: Number(r.ts),
  voteLog: Array.isArray(r.vote_log) ? r.vote_log : [],
});

const getPin = () => { try { return sessionStorage.getItem(PIN_KEY) || ""; } catch (e) { return ""; } };
const setPin = (pin) => { try { sessionStorage.setItem(PIN_KEY, pin); } catch (e) {} };

// Verifica il PIN del dj sul server; se il cloud non c'e', ricade sul valore locale.
async function verifyDjPin(pin) {
  if (!SB) return pin === "aco";
  try {
    const { data, error } = await SB.rpc("dj_check", { p_pin: pin });
    if (error) return pin === "aco";
    return data === true;
  } catch (e) {
    return pin === "aco";
  }
}

function useRequestStore() {
  const readLocal = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  };

  const [requests, setRequests] = useState(() => (SB ? [] : readLocal()));
  // null = in connessione, true = cloud attivo, false = solo questo dispositivo
  const [online, setOnline] = useState(SB ? null : false);

  // ---- modalita' locale: sincronizzazione tra schede dello stesso browser ----
  useEffect(() => {
    if (SB) return;
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setRequests(JSON.parse(e.newValue)); } catch (e) {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const saveLocal = (next) => {
    setRequests(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
  };

  // ---- modalita' cloud ----
  const refresh = React.useCallback(async () => {
    if (!SB) return;
    try {
      const { data, error } = await SB
        .from("requests")
        .select("*")
        .gte("ts", Date.now() - DAY_MS)
        .order("ts", { ascending: false });
      if (error) { setOnline(false); return; }
      setRequests(data.map(rowToReq));
      setOnline(true);
    } catch (e) {
      setOnline(false);
    }
  }, []);

  useEffect(() => {
    if (!SB) return;
    let alive = true;
    const tick = () => { if (alive) refresh(); };

    tick();

    // Realtime: a ogni inserimento/voto/cancellazione ricarichiamo la lista.
    // Ricaricare invece di applicare la patch tiene il codice semplice e non
    // lascia stati divergenti se un evento si perde.
    const channel = SB
      .channel("requests-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "requests" }, tick)
      .subscribe();

    // Rete da locale: se il realtime cade, questi due lo coprono.
    const poll = setInterval(tick, 15000);
    const onVisible = () => { if (document.visibilityState === "visible") tick(); };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", tick);

    return () => {
      alive = false;
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", tick);
      SB.removeChannel(channel);
    };
  }, [refresh]);

  // Richiesta o voto: una sola operazione atomica lato server, cosi' due
  // telefoni che votano insieme non si annullano a vicenda.
  const request = async (track, requester) => {
    const who = (requester || "").trim() || "Anon";

    if (!SB) {
      const now = Date.now();
      const todayStr = new Date().toDateString();
      const existing = requests.find(r =>
        r.title.toLowerCase() === track.title.toLowerCase() &&
        r.artist.toLowerCase() === track.artist.toLowerCase() &&
        new Date(r.ts).toDateString() === todayStr &&
        r.status !== "played"
      );
      if (existing) {
        saveLocal(requests.map(r => r.id === existing.id
          ? { ...r, votes: r.votes + 1, voteLog: [...(r.voteLog || []), { ts: now, requester: who }] }
          : r));
      } else {
        saveLocal([
          { title: track.title, artist: track.artist, album: track.album, color: track.color,
            requester: who, id: now + "-" + Math.random().toString(36).slice(2, 6),
            votes: 1, status: "queued", ts: now, voteLog: [{ ts: now, requester: who }] },
          ...requests,
        ]);
      }
      return;
    }

    const { error } = await SB.rpc("request_track", {
      p_title: track.title,
      p_artist: track.artist,
      p_album: track.album || "",
      p_color: track.color || null,
      p_requester: who,
    });
    if (error) throw new Error(error.message);
    await refresh();
  };

  const update = async (id, patch) => {
    if (!SB) { saveLocal(requests.map(r => r.id === id ? { ...r, ...patch } : r)); return; }
    if (!("status" in patch)) return;
    const { error } = await SB.rpc("dj_set_status", { p_pin: getPin(), p_id: id, p_status: patch.status });
    if (error) throw new Error(error.message);
    await refresh();
  };

  const removeMany = async (ids) => {
    if (!ids || ids.length === 0) return;
    if (!SB) { saveLocal(requests.filter(r => !ids.includes(r.id))); return; }
    const { error } = await SB.rpc("dj_delete", { p_pin: getPin(), p_ids: ids });
    if (error) throw new Error(error.message);
    await refresh();
  };

  const remove = (id) => removeMany([id]);

  return { requests, request, update, remove, removeMany, refresh, online, cloud: !!SB };
}



// ---------- CSV catalog loader ----------
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/['"]/g, ""));
  const col = (row, ...names) => {
    for (const name of names) {
      const idx = headers.indexOf(name);
      if (idx !== -1 && row[idx] != null) return row[idx].replace(/^["']|["']$/g, "").trim();
    }
    return "";
  };
  const COLORS = ["#7C4A2B","#3A6B7A","#2A5260","#4B3E6E","#D46B1F","#C1432B","#8A5A2B","#E8932A","#B8732A","#4B6E3E","#22201E"];
  return lines.slice(1).map((line, i) => {
    const row = parseCSVLine(line);
    const title = col(row, "title", "titolo", "traccia", "track", "nome");
    const artist = col(row, "artist", "artista", "artisti");
    if (!title && !artist) return null;
    return {
      title: title || "Unknown",
      artist: artist || "Unknown",
      album: col(row, "album"),
      dur: col(row, "duration", "durata", "dur", "length", "tempo"),
      color: COLORS[i % COLORS.length],
    };
  }).filter(Boolean);
}

// undefined = loading, null = error/unavailable, array = ok
function useCatalog() {
  const [catalog, setCatalog] = React.useState(undefined);
  React.useEffect(() => {
    fetch("uploads/tracce.csv")
      .then(r => { if (!r.ok) throw new Error(); return r.text(); })
      .then(text => { const parsed = parseCSV(text); setCatalog(parsed.length > 0 ? parsed : null); })
      .catch(() => setCatalog(null));
  }, []);
  return catalog;
}

// ---------- Album art placeholder (no external images) ----------
function AlbumArt({ track, size = 52 }) {
  const initial = (track.title || "?").charAt(0).toUpperCase();
  return (
    <div
      style={{
        width: size, height: size, flexShrink: 0,
        background: track.color || "#3A6B7A",
        borderRadius: 6,
        border: "1.5px solid var(--ink)",
        display: "grid",
        placeItems: "center",
        color: "var(--cream)",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.42,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(135deg, transparent 0 10px, rgba(0,0,0,0.1) 10px 11px)",
        mixBlendMode: "multiply",
      }} />
      <span style={{ position: "relative" }}>{initial}</span>
    </div>
  );
}

// ---------- Vinyl SVG decoration ----------
function Vinyl({ size = 120, spinning = false, accent = "#E8932A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: "block" }}
      className={spinning ? "spin" : ""}>
      <defs>
        <radialGradient id="vg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a2724" />
          <stop offset="50%" stopColor="#22201E" />
          <stop offset="100%" stopColor="#1a1917" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#vg)" stroke="#22201E" strokeWidth="1.5"/>
      {[52, 46, 40, 34, 28].map((r, i) => (
        <circle key={i} cx="60" cy="60" r={r} fill="none" stroke="#1a1917" strokeWidth="0.5" opacity="0.6"/>
      ))}
      <circle cx="60" cy="60" r="16" fill={accent} stroke="#22201E" strokeWidth="1.5"/>
      <circle cx="60" cy="60" r="2.5" fill="#F1E4CE" stroke="#22201E" strokeWidth="1"/>
      <text x="60" y="58" textAnchor="middle" fontFamily="var(--font-display)" fontSize="5" fill="#22201E">Dj Aco</text>
      <text x="60" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="3" fill="#22201E">SIDE A · 33⅓</text>
    </svg>
  );
}

// ---------- QR code (real, scannable) ----------
function QRCode({ size = 160, label, value }) {
  const url = value || (window.location.origin + window.location.pathname + "#request");
  const src = "https://api.qrserver.com/v1/create-qr-code/?size=" + size + "x" + size +
    "&data=" + encodeURIComponent(url) + "&bgcolor=F7ECD8&color=22201E&qzone=1&format=svg";
  return (
    <div style={{ display: "inline-block", background: "#F7ECD8", padding: 10, border: "1.5px solid #22201E", borderRadius: 10 }}>
      <img src={src} width={size} height={size} style={{ display: "block" }} alt="QR Code"/>
      {label && (
        <div style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, marginTop: 6, letterSpacing: "0.1em", color: "#22201E" }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ---------- Top bar ----------
function TopBar({ route, navigate }) {
  return (
    <div className="topbar">
      <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}>
        <img src="assets/dj-aco-logo.png" alt="Dj Aco"/>
        <span style={{ textTransform: "none" }}>Dj Aco</span>
      </a>
      <div className="row" style={{ gap: 6 }}>
        {route === "request" && (
          <a href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }}
             style={{ fontFamily: "var(--font-mono)", fontSize: 12, textDecoration: "none", color: "var(--ink)" }}>
            ← back
          </a>
        )}
      </div>
    </div>
  );
}

// Export to window for other files
Object.assign(window, {
  useHashRoute, useRequestStore, useCatalog, AlbumArt, Vinyl, QRCode, TopBar,
  verifyDjPin, setDjPin: setPin, getDjPin: getPin,
});
