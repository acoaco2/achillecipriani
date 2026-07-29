// Configurazione Supabase per la classifica condivisa tra dispositivi.
//
// Compila i due valori qui sotto, li trovi in Supabase:
//   Project Settings -> Data API -> Project URL
//   Project Settings -> API Keys  -> anon / public
//
// Questa chiave e' pubblica per progetto: e' pensata per stare nel browser.
// La protezione vera sono le policy RLS in dj/supabase-schema.sql (gli ospiti
// possono solo leggere; scrivere e cancellare passa da funzioni sul server).
//
// Finche' i campi restano vuoti il sito funziona come prima, ma la classifica
// resta locale al singolo dispositivo.

window.DJ_CONFIG = {
  SUPABASE_URL: "https://oezedbfwvzjemxavlcog.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_d72Kt4FwfkotvWKhifl1RQ_0WwpVyAB",
};
