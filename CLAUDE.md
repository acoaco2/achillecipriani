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
| `/aco/rasp` | «Rasp»: stato della Raspberry (servizi, attività pianificate, backup) ed elenco dei progetti | pagina `index.html` **qui**; `dati.json` **cifrato e generato** dalla rasp alle 09:15, 16:15 e 22:15 (`~/.local/bin/pubblica-stato-rasp`, copia di riferimento in `acoprogetti/rasp/pubblica_stato.py`; stesso `SITO_TOKEN`), solo se cambia qualcosa. Non modificare `dati.json` a mano |

Prima di un push da qui fai `git pull --rebase`: la rasp committa `aco/libri/dati.json` ogni notte (`aco/sport/dati.json` ogni mattina, `aco/rasp/dati.json` fino a 3 volte al giorno).

## Anteprima locale

```bash
python -m http.server 8000    # poi http://127.0.0.1:8000/ (Web Crypto richiede https o localhost)
```
