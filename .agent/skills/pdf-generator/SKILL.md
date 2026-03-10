---
name: pdf-generator
description: Genera documenti PDF con intestazione personalizzata della scuola (logo, nome, indirizzo, contatti). Usa questa skill quando l'utente chiede di creare PDF, moduli, certificati, autorizzazioni, o qualsiasi documento stampabile per la scuola. Include campi placeholder per moduli compilabili (es. "Io sottoscritto ______").
---

# PDF Generator

Skill per la generazione di documenti PDF con intestazione della scuola.

## Quando Usare

Usa questa skill quando l'utente:

- Chiede di generare un PDF
- Vuole creare un modulo (autorizzazione, iscrizione, delega, ecc.)
- Necessita di un certificato o documento ufficiale
- Richiede qualsiasi documento stampabile con intestazione della scuola

## Dati Disponibili per l'Intestazione

I dati della scuola sono recuperabili dalla collection `schools` tramite API Payload:

```typescript
interface SchoolData {
  name: string // Nome della scuola
  logo?: Media // Logo (upload media)
  contactInfo?: {
    email?: string // Email scuola
    phone?: string // Telefono scuola
    address?: string // Indirizzo completo
  }
}
```

## Struttura Standard del PDF

Ogni PDF generato DEVE includere:

### 1. Intestazione (Header)

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]   NOME SCUOLA                                       │
│           Indirizzo: Via Roma 123, 00100 Roma               │
│           Tel: 06 1234567 | Email: info@scuola.it           │
├─────────────────────────────────────────────────────────────┤
```

### 2. Titolo del Documento

Centrato, in grassetto, dimensione grande.

### 3. Corpo del Documento

Contenuto specifico richiesto dall'utente.

### 4. Campi Placeholder per Moduli

Quando si genera un **modulo**, usare SEMPRE campi placeholder:

```
Io sottoscritto/a _________________________________

nato/a a _________________________ il ___/___/______

residente in via _________________________________ n. _____

città _________________________________ (___) CAP ________

codice fiscale ________________________________________

in qualità di genitore/tutore di _________________________________
```

### 5. Footer

```
┌─────────────────────────────────────────────────────────────┐
│  Data ___/___/______              Firma ________________    │
│                                                             │
│  Pagina 1 di 1                                              │
└─────────────────────────────────────────────────────────────┘
```

## Script di Generazione

Usa lo script `scripts/generate_pdf.py` per generare i PDF:

```bash
python3 .agent/skills/pdf-generator/scripts/generate_pdf.py \
  --school-name "Nome Scuola" \
  --school-address "Via Roma 123, 00100 Roma" \
  --school-phone "06 1234567" \
  --school-email "info@scuola.it" \
  --school-logo "/path/to/logo.png" \
  --title "Titolo Documento" \
  --content "Contenuto del documento" \
  --output "/path/to/output.pdf" \
  --type "modulo"  # oppure "documento", "certificato"
```

## Tipi di Documento Supportati

### 1. Modulo (`--type modulo`)

Documento con campi compilabili. Include automaticamente:

- Sezione dati anagrafici con placeholder
- Campo firma e data
- Spazio per dichiarazioni

### 2. Documento (`--type documento`)

Documento informativo generico:

- Comunicazioni
- Avvisi
- Circolari

### 3. Certificato (`--type certificato`)

Documento ufficiale con:

- Bordo decorativo
- Numero di protocollo
- Spazio per timbro

## Campi Placeholder Comuni

Usa questi placeholder standard nei moduli:

| Campo          | Placeholder                                   |
| -------------- | --------------------------------------------- |
| Nome cognome   | `_________________________________`           |
| Data           | `___/___/______`                              |
| Luogo          | `_________________________`                   |
| Indirizzo      | `_________________________________ n. _____`  |
| CAP e Città    | `_________ _________________________________` |
| Provincia      | `(_____)`                                     |
| Codice Fiscale | `________________________________________`    |
| Telefono       | `_______________________`                     |
| Email          | `_______________________________`             |
| Firma          | `________________________`                    |

## Esempi di Moduli Comuni

### Autorizzazione Uscita Anticipata

```
Io sottoscritto/a _________________________________
in qualità di genitore/tutore dell'alunno/a _________________________________
classe _______ sezione _______

AUTORIZZO

l'uscita anticipata del/della mio/a figlio/a
il giorno ___/___/______ alle ore _______

Motivazione: _________________________________________________________

Data ___/___/______                    Firma ________________________
```

### Delega Ritiro

```
Io sottoscritto/a _________________________________
genitore/tutore dell'alunno/a _________________________________

DELEGO

il/la Sig./Sig.ra _________________________________
nato/a a _________________________ il ___/___/______
documento d'identità n. _________________________________

al ritiro del/della mio/a figlio/a nei giorni:
□ Tutti i giorni
□ Solo il giorno ___/___/______
□ Dal ___/___/______ al ___/___/______

Data ___/___/______                    Firma ________________________
```

## Workflow di Generazione

1. **Recupera dati scuola** dalla collection `schools`
2. **Prepara il contenuto** usando i placeholder appropriati
3. **Esegui lo script** `generate_pdf.py`
4. **Salva il PDF** nella cartella `public/documents/` o `media/`

## Note Importanti

- Il logo deve essere in formato PNG o JPG
- Dimensione consigliata logo: 100x100 px nell'intestazione
- Font di default: Helvetica
- Margini: 2cm su tutti i lati
- Formato pagina: A4
