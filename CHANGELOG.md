# Changelog - GrundstücksManager

## [0.1.0] - 2026-03-02 (MVP Release)

### 🎉 Erstveröffentlichung - MVP

#### ✨ Features

**Core Features:**
- ✅ **Dashboard** mit Statistiken (Gesamtfläche, nach Typ, Anzahl)
- ✅ **Grundstücke** (Properties) verwalten
  - Create, Read, Update, Delete (CRUD)
  - Flurstücksnummer, Grundbuchblatt
  - Größe (Hektar/m²)
  - Nutzungsart (Acker, Wiese, Wald, etc.)
  - Bodengüte, Bewässerung
  - Lage (Gemeinde, Gemarkung, Flur)
  - Eigentümer & Pächter
  - Pachtverträge (Start/Ende, Preis)
  - Kaufdaten (Datum, Preis)
  - Tags & Notizen
- ✅ **Kontakte** verwalten
  - Eigentümer, Pächter, Nachbarn
  - Bankdaten (IBAN, BIC)
  - Kontaktinfos
- ✅ **Filter & Suche**
  - Nach Art, Gemeinde, Eigentümer
  - Volltextsuche
- ✅ **Detailansichten**
  - Alle Infos auf einen Blick
  - Dokumente, Aktivitäten

#### 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Prisma ORM + PostgreSQL
- **Deployment:** Vercel

#### 📱 UI/UX

- Modernes, cleanes Design
- Green/Nature Theme passend zur Landwirtschaft
- Responsive (Mobile, Tablet, Desktop)
- Deutsche Lokalisierung
- Schnelle Performance

#### 🗄️ Datenbank

**5 Models:**
- Properties (Grundstücke)
- Contacts (Kontakte)
- Documents (Dokumente)
- Activities (Aktivitäten)
- Subsidies (Subventionen)

**8 Property Types:**
- Acker
- Wiese
- Wald
- Weide
- Obst
- Weinberg
- Gebäude
- Sonstiges

#### 📊 Seed Data

- 6 Demo-Grundstücke
- 2 Kontakte (Eigentümer + Pächter)
- Dokumente, Aktivitäten, Subventionen

---

## [0.2.0] - Geplant (Q2 2025)

### 🔮 In Planung

- 🗺️ **Kartenansicht** (OpenStreetMap)
  - Interaktive Karte
  - Grundstücke anzeigen
  - Farbcodierung nach Art
  - Polygon-Zeichnung

- 📄 **Dokumenten-Upload**
  - PDF, Bilder, etc.
  - Vercel Blob Storage
  - Vorschau

- 🔐 **Authentifizierung**
  - NextAuth.js
  - Login/Register
  - Multi-User Support

- 💰 **Finanz-Übersicht**
  - Pachteinnahmen
  - Grundsteuer
  - Investitionen

- 📤 **Export**
  - CSV Export
  - PDF Berichte
  - Flächennachweis

---

## [0.3.0] - Geplant (Q3 2025)

### 🚀 Advanced Features

- 📱 **Mobile App** (React Native)
- 🇩🇪 **Subventionen** tracking
- 🔔 **Erinnerungen** (Fristen, Verträge)
- 📊 **Erweiterte Statistiken**
- 🤖 **KI-Features** (Erntevorhersage)
- 📡 **API** für Drittanbieter

---

## 🐛 Bug Fixes

### 0.1.0
- Keine bekannten Bugs (MVP ist stabil!)

---

## 📝 Notes

- MVP in einer Nacht gebaut (2. März 2026)
- Erstes "Gesellenstück"
- Deployment zu Vercel erfolgreich
- Open Source auf GitHub

---

**Gebaut mit ❤️ für deutsche Landwirtschaft**
