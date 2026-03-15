# Istruzioni Agente

Questo file è duplicato in CLAUDE.md, GEMINI.md e AGENTS.md in modo che queste istruzioni siano valide indipendentemente dal modello utilizzato.

Operi all'interno di un'architettura a 3 livelli che separa le responsabilità per massimizzare l'affidabilità. Gli LLM sono probabilistici, mentre la maggior parte della logica di business è deterministica e richiede coerenza. Questo sistema risolve il problema.

## Architettura a 3 Livelli

**Livello 1: Direttiva (Cosa fare)**

- Fondamentalmente SOP scritte in Markdown, che vivono in `directives/`
- Definiscono gli obiettivi, gli input, i tool/script da usare, gli output e i casi limite
- Istruzioni in linguaggio naturale, come le daresti a un dipendente di medio livello

**Livello 2: Orchestrazione (Decisioni)**

- Il tuo lavoro: routing intelligente.
- Leggi le direttive, chiama gli strumenti di esecuzione nell'ordine giusto, gestisci gli errori, chiedi chiarimenti, aggiorna le direttive con ciò che impari
- Sei il collante tra intenzione ed esecuzione. Per esempio, non provi a fare scraping di siti web tu stesso—leggi `directives/scrape_website.md` e definisci input/output e poi esegui `execution/scrape_single_site.py`

**Livello 3: Esecuzione (Fare il lavoro)**

- Script Python deterministici in `execution/`
- Variabili d'ambiente, token API, ecc sono salvati in `.env`
- Gestiscono chiamate API, elaborazione dati, operazioni su file, interazioni con database
- Affidabili, testabili, veloci. Usa script invece di lavoro manuale. Ben commentati.

**Perché funziona:** se fai tutto tu stesso, gli errori si sommano. 90% di accuratezza per step = 59% di successo su 5 step. La soluzione è spingere la complessità in codice deterministico. Così tu ti concentri solo sul decision-making.

## Principi Operativi

**1. Controlla prima i tool esistenti**
Prima di scrivere uno script, controlla `execution/` secondo la tua direttiva. Crea nuovi script solo se non ne esistono.

**2. Auto-correggiti quando qualcosa si rompe**

- Leggi il messaggio di errore e lo stack trace
- Correggi lo script e testalo di nuovo (a meno che non usi token/crediti a pagamento—in quel caso chiedi prima all'utente)
- Aggiorna la direttiva con ciò che hai imparato (limiti API, timing, casi limite)
- Esempio: hai un rate limit API → allora guardi nell'API → trovi un batch endpoint che risolverebbe → riscrivi lo script per adattarlo → testi → aggiorna la direttiva.

**3. Aggiorna le direttive mentre impari**
Le direttive sono documenti vivi. Quando scopri vincoli API, approcci migliori, errori comuni o aspettative di timing—aggiorna la direttiva. Ma non creare o sovrascrivere direttive senza chiedere, a meno che non ti venga esplicitamente detto. Le direttive sono il tuo set di istruzioni e devono essere preservate (e migliorate nel tempo, non usate estemporaneamente e poi scartate).

## Loop di auto-correzione

Gli errori sono opportunità di apprendimento. Quando qualcosa si rompe:

1. Correggilo
2. Aggiorna il tool
3. Testa il tool, assicurati che funzioni
4. Aggiorna la direttiva per includere il nuovo flusso
5. Il sistema ora è più forte

## Sviluppo Applicazioni Web

**Stack tecnologico:**
Quando ti viene chiesto di creare un'app web, usa il seguente stack:

- **Frontend**: Next.js (App Router) + React + Tailwind CSS
- **CMS/Backend**: Payload CMS 3.0
- **Database**: MongoDB (via Payload)

**Brand Guidelines:**
Prima di iniziare lo sviluppo, controlla se esiste `brand-guidelines.md` nella root del progetto. Se presente, usa i font e i colori specificati per mantenere coerenza con il brand.

**Struttura directory per applicazioni:**

```
project-root/
├── src/                # Sorgenti dell'applicazione
│   ├── app/           # Next.js App Router (Frontend & Admin)
│   |   ├── (frontend)/
│   |   |   ├── [school]/
│   |   |   ├── api/
│   |   |   ├── .../
│   |   ├── (payload)/
│   |   |   ├── admin/
│   |   |   ├── api/
│   |   |   ├── .../
│   |   ├── api/
│   |   ├── offline/
│   |   ├── sutemap.xml/
│   ├── collections/   # Collezioni Payload CMS
│   ├── components/    # Componenti React riutilizzabili
│   ├── globals/       # Settaggi Globali Payload CMS
│   ├── hooks/         # Custom React Hooks
│   ├── lib/           # Utility e logica core
│   ├── styles/        # Stili globali CSS
│   └── payload.config.ts # Configurazione principale Payload
├── docs/               # Documentazione, SOP e Guide
├── scripts/            # Script di utilità e migrazione
├── public/             # Asset statici pubblici
├── media/              # File media caricati (local storage)
├── tests/              # Test suite (Unit, Integration, E2E)
└── package.json        # Dipendenze e script npm
```

## Organizzazione File

**Deliverable vs Intermedi:**

- **Deliverable**: Google Sheets, Google Slides o altri output cloud-based a cui l'utente può accedere
- **Intermedi**: File temporanei necessari durante l'elaborazione

**Struttura directory:**

- `.tmp/` - Tutti i file intermedi (dossier, dati scraped, export temporanei). Mai committare, sempre rigenerati.
- `execution/` - Script Python (i tool deterministici)
- `directives/` - SOP in Markdown (il set di istruzioni)
- `.env` - Variabili d'ambiente e chiavi API
- `credentials.json`, `token.json` - Credenziali OAuth Google (file necessari, in `.gitignore`)

**Principio chiave:** I file locali sono solo per l'elaborazione. I deliverable vivono nei servizi cloud (Google Sheets, Slides, ecc.) dove l'utente può accedervi. Tutto in `.tmp/` può essere cancellato e rigenerato.

## Riepilogo

Ti posizioni tra intenzione umana (direttive) ed esecuzione deterministica (script Python). Leggi le istruzioni, prendi decisioni, chiama i tool, gestisci gli errori, migliora continuamente il sistema.

Sii pragmatico. Sii affidabile. Auto-correggiti.

## OneSignal Push Notifications

Quando lavori con OneSignal in questo progetto:

1. **SDK già inizializzato**: L'SDK `react-onesignal` può essere inizializzato solo una volta. Usa sempre un flag a livello di modulo per prevenire doppie inizializzazioni:

   ```typescript
   let oneSignalInitialized = false

   // Nel componente:
   if (!oneSignalInitialized) {
     await OneSignal.init({ ... })
     oneSignalInitialized = true
   }
   ```

2. **Componente unico**: L'inizializzazione avviene solo in `PushSubscriptionCard.tsx`. Non creare altri componenti che chiamano `OneSignal.init()`.

3. **Localhost**: Usa sempre `allowLocalhostAsSecureOrigin: true` per testing locale.

4. **Service Worker**: Il file `public/OneSignalSDKWorker.js` è richiesto per le notifiche in background.

## Interfaccia Manage

**Regola fondamentale**: Ogni modifica al backend o ai pannelli di configurazione (collezioni, blocchi, impostazioni scuola, ecc.) DEVE essere implementata anche graficamente nell'interfaccia `/manage`.

L'interfaccia `/manage` è il pannello di controllo principale per gli school-admin. Quando aggiungi:

- **Nuovi campi a una collection** → Aggiornare il form corrispondente in `src/components/Manage/Fields/`
- **Nuovi blocchi homepage** → Aggiornare `HomepageFormWrapper.tsx` con il nuovo `BlockDef`
- **Nuove impostazioni scuola** → Aggiornare `SchoolFormWrapper.tsx` o i file Fields correlati

I componenti chiave sono:

- `src/components/Manage/Collections/` - Form wrapper per ogni collection
- `src/components/Manage/Fields/` - Definizioni campi riutilizzabili
- `src/app/manage/(private)/` - Route e pagine del pannello

## Pagina FAQ

La pagina FAQ (`src/app/[locale]/(app)/faq/page.tsx`) documenta il funzionamento dell'app per gli utenti. I testi vivono nei file i18n (`src/messages/en.json` e `src/messages/it.json`) sotto la chiave `"faq"`.

**Regola fondamentale**: Quando modifichi una delle seguenti funzionalità, aggiorna ANCHE i testi FAQ corrispondenti in entrambe le lingue:

1. **Aggiunta serie alla lista** → `faq.addShow`
2. **Import da JSON** → `faq.importJson`
3. **Visualizzazione profilo utente** → `faq.viewProfile`
4. **Copia lista di un altro utente** → `faq.copyList`
5. **Votazione serie** → `faq.rateShow`
6. **Riordinamento serie** → `faq.reorder`
7. **Algoritmo di similarità** → `faq.similarity`

Quando aggiungi **nuove funzionalità significative** all'app, aggiungi una nuova voce FAQ:

- Aggiungi la chiave i18n in `en.json` e `it.json` sotto `"faq"` (con `title` e `body`)
- Aggiungi la chiave nell'array `FAQ_KEYS` in `faq/page.tsx`
