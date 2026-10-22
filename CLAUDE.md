# achillecipriani.it

Sito statico su **GitHub Pages**, dominio `achillecipriani.it`, repository **pubblico** `acoaco2/achillecipriani` (branch `main`, deploy automatico al push in 1-2 minuti; se GitHub Actions ha problemi il deploy resta in coda o fallisce: `gh run list -R acoaco2/achillecipriani`, e `gh run rerun <id>`).

- **Tutto quello che è qui è pubblico.** Documenti interni e originali riservati stanno in `privato/`, che è un altro repository (**privato**, `acoaco2/achillecipriani-privato`) ed è escluso dal `.gitignore`. Il riepilogo completo del progetto è `privato/RIEPILOGO.md`: leggilo prima di lavorare.
- Design e tono: `DESIGN.md` e `PRODUCT.md` (verde petrolio su crema, Cormorant Garamond, sobrio).
- Nessuna password o token in chiaro: le voci di accesso della home (`ENTRIES` in `index.html`) sono cifrate (PBKDF2 + AES-GCM), le scorciatoie in chiaro (`dj`/`dj`, `jack`/`2707`) portano solo a pagine pubbliche.

## Sezioni

| Percorso | Cosa | Chi la gestisce |
|---|---|---|
| `/` | landing + area riservata | qui |
| `/dj` | sito Dj Aco | qui (`privato/DJ-SETUP.md`) |
| `/spartiti` | spartiti per pianoforte | qui (`privato/SPARTITI.md`) |
| `/aco` | area personale di Aco (login `aco`/`aco`): landing `aco/index.html` | qui |
| `/aco/libri` | «I miei libri»: pagina e dati **cifrati** | **generati** dal progetto `acodev/db_libri_Aco` (`pubblica_sito.py`): `index.html` dal PC quando cambia il template, `dati.json` **ogni notte dalla rasp**, che ha una deploy key con scrittura su questo repo. Non modificarli a mano |

| `/aco/sport` | «Sport»: corsa, apnea, gommone, skate e benessere (Garmin), solo aggregati | pagina `index.html` **qui**; `dati.json` **cifrato e generato** da `acoprogetti/GarminAco/pubblica_sito.py` (stesso `SITO_TOKEN` dei libri), ogni mattina dalla rasp. Non modificare `dati.json` a mano |
| `/aco/spesa` | «Spesa»: storico della spesa online Esselunga (spesa per mese e per categoria, spese, prodotti e ogni quanto si comprano, prezzi che cambiano) | pagina `index.html` **qui**; `dati.json` **cifrato e generato** dal PC con `acodev/spesa_Esselunga/pubblica_sito.py` dopo ogni spesa (stesso `SITO_TOKEN`). Non modificare `dati.json` a mano |
| `/aco/rasp` | «Rasp»: stato della Raspberry (servizi, attività pianificate, backup) ed elenco dei progetti | pagina `index.html` **qui**; `dati.json` **cifrato e generato** dalla rasp alle 09:15, 16:15 e 22:15 (`~/.local/bin/pubblica-stato-rasp`, copia di riferimento in `acoprogetti/rasp/pubblica_stato.py`; stesso `SITO_TOKEN`), solo se cambia qualcosa. Non modificare `dati.json` a mano |
| `/nonna` | «Conti della nonna»: sintesi del conto per la famiglia. Login dalla home con utente `nonna` (la password la sa Achille), che porta **dritto** alla pagina come la vecchia Logofarma, senza passare da `/aco`. Token proprio (`NONNA_TOKEN`), diverso da quello di `/aco` | pagina `index.html` (guscio vuoto) **qui**; `dati.json` **cifrato e generato** dal PC con `acoprogetti/conti nonna/pubblica_sito.py` a ogni estratto conto. Non modificare `dati.json` a mano |
| `/idee` | «Raccolta idee» (fino al 20/10/2026 in `/giorgio`, che ora rimanda qui): modulo di testo libero (500 caratteri) che scrive in un foglio Google di Achille tramite uno script Apps Script. Login dalla home con utente `idee` (dal 20/10/2026, prima `giorgio`; password che sa Achille), pensato per darlo anche ad altri, dritto alla pagina come `/nonna`, token proprio (`GIORGIO_TOKEN`) | pagina `idee/index.html` **qui**; `idee/dati.json` (indirizzo dello script, **cifrato**) generato da `OneDrive/acoprogetti/raccolta idee/pubblica_sito.py`. Dettagli nel `CLAUDE.md` di quel progetto. Non modificare `dati.json` a mano |

Prima di un push da qui fai `git pull --rebase`: la rasp committa `aco/libri/dati.json` ogni notte (`aco/sport/dati.json` ogni mattina, `aco/rasp/dati.json` fino a 3 volte al giorno).

## Anteprima locale

```bash
python -m http.server 8000    # poi http://127.0.0.1:8000/ (Web Crypto richiede https o localhost)
```
