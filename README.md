# 🌾 GrundstücksManager

**Enterprise-grade Land & Property Management für Landwirtschaft**

## 🎯 Vision

Ein modernes, professionelles System zur Verwaltung von landwirtschaftlichen Grundstücken - Äcker, Wiesen, Wälder und mehr. Inspiriert von den besten Farm-Management-Tools, aber einfacher und fokussierter auf deutsche Landwirte.

## ✨ Features

### Phase 1 - MVP (Tonight)
- ✅ Grundstücke verwalten (CRUD)
- ✅ Flurstück, Grundbuch, Größe, Art
- ✅ Kontakte (Eigentümer, Pächter)
- ✅ Filter & Suche
- ✅ Modernes UI (shadcn/ui)
- ✅ Responsive Design

### Phase 2 - Advanced (Tomorrow)
- 🗺️ Kartenansicht (OpenStreetMap)
- 📄 Dokumenten-Upload
- 📊 Dashboard mit Statistiken
- 💰 Pacht-Verwaltung
- 📤 Export (CSV/PDF)

### Phase 3 - Pro
- 🇩🇪 Subventionen tracking
- 💬 Finanz-Übersicht
- 📱 Mobile Optimierung
- 🔔 Erinnerungen & Fristen

## 🛠️ Tech Stack

```yaml
Frontend:  Next.js 16 (App Router)
Language:  TypeScript
Styling:   Tailwind CSS
UI:        shadcn/ui
Database:  Prisma + PostgreSQL (Vercel)
Auth:      NextAuth.js v5
Maps:      React-Leaflet (OSM)
Charts:    Recharts
Deploy:    Vercel
```

## 📋 Datenmodell

### Properties (Grundstücke)
- Flurstücknummer, Grundbuchblatt
- Größe (ha/m²)
- Art (Acker, Wiese, Wald, etc.)
- Lage (Gemeinde, Gemarkung, Flur)
- Eigentümer & Pächter
- Geo-Koordinaten
- Dokumente

### Contacts
- Eigentümer, Pächter, Nachbarn
- Bankdaten für Pachtzahlungen

### Documents
- Grundbuchauszüge
- Karten
- Pachtverträge
- Luftbilder

## 🚀 Quick Start

```bash
# Install
npm install

# Database
npx prisma generate
npx prisma db push

# Dev
npm run dev

# Build
npm run build
```

## 📂 Projektstruktur

```
grundstuecks-manager/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard
│   │   ├── grundstuecke/       # Grundstücke
│   │   ├── karte/              # Kartenansicht
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── ui/                 # shadcn/ui
│   │   ├── property-card.tsx
│   │   └── stats-card.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── utils.ts
│   └── types/
├── prisma/
│   └── schema.prisma
└── public/
```

## 🎨 Design Philosophy

- **Clean & Modern** - Weniger ist mehr
- **Mobile First** - Auch im Feld nutzbar
- **Schnell** - Sofortige Aktionen
- **Intuitiv** - Keine Schulung nötig
- **Hochwertig** - Enterprise-grade UI/UX

## 📊 Roadmap

- [x] Projekt Setup
- [ ] Prisma Schema
- [ ] UI Components
- [ ] Grundstücke CRUD
- [ ] Dashboard
- [ ] Kartenansicht
- [ ] Dokumente
- [ ] Tests
- [ ] Deploy

## 👥 Für wen?

- 🌾 Landwirte
- 🏡 Grundbesitzer
- 📋 Forstwirte
- 🏞️ Naturpark-Verwalter
- 👨‍💼 Landwirtschafts-Unternehmen

## 📄 Lizenz

MIT

---

**Gebaut mit ❤️ für deutsche Landwirtschaft**
