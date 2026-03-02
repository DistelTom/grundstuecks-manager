# 🚀 Deployment Guide - GrundstücksManager

## Lokale Entwicklung

```bash
# 1. Dependencies installieren
npm install

# 2. Prisma Client generieren
npx prisma generate

# 3. Database URL setzen (kopiere von .env.example)
cp .env.example .env
# Editiere .env mit deinen Datenbank-Credentials

# 4. Database push (Schema erstellen)
npx prisma db push

# 5. Seed data (optional, für Demo-Daten)
npm run db:seed

# 6. Development server starten
npm run dev
```

Öffne: http://localhost:3000

---

## Vercel Deployment (Empfohlen)

### 1. GitHub Repository erstellen

```bash
# Repository erstellen auf GitHub
git remote add origin https://github.com/DEIN-USERNAME/grundstuecks-manager.git
git branch -M main
git push -u origin main
```

### 2. Vercel Projekt erstellen

1. Gehe zu https://vercel.com
2. "Import Project" → GitHub
3. Wähle `grundstuecks-manager` Repository
4. Konfiguriere Umgebungsvariablen:

```
DATABASE_URL = deine-postgres-connection-string
NEXTAUTH_URL = https://deine-app.vercel.app
NEXTAUTH_SECRET = ein-starker-secret-key
```

### 3. Vercel Postgres erstellen (Optional)

1. In Vercel Dashboard → "Storage"
2. "Create Database" → "Postgres"
3. Connection String kopieren
4. In Project Settings → Environment Variables setzen

### 4. Deploy!

- Vercel deployt automatisch bei jedem Push zu `main`
- Oder: Manuelles Deploy über Vercel Dashboard

### 5. Nach erstem Deploy

```bash
# Seed data ausführen (in Vercel Terminal oder lokal)
npx prisma db push
npm run db:seed
```

---

## Umgebungsvariablen

```bash
# Pflicht
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://..."
NEXTAUTH_SECRET="..."

# Optional
NEXT_PUBLIC_APP_URL="https://..."
```

---

## Datenbank

### Option 1: Vercel Postgres (Empfohlen)
- Kostenloses Tier verfügbar
- Automatische Backups
- Keine Server-Verwaltung

### Option 2: Supabase
- Kostengünstig
- Gutes Free Tier

### Option 3: Lokale PostgreSQL
```bash
# Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:16

# Oder lokal installieren
sudo apt install postgresql
```

---

## Database Migration (nach Deploy)

```bash
# Schema pushen
npx prisma db push

# Seed data (Demo-Daten)
npm run db:seed

# Oder Studio öffnen zum manuellen Hinzufügen
npx prisma studio
```

---

## Troubleshooting

### "Can't reach database server"
- Prüfe `DATABASE_URL` in Environment Variables
- Stelle sicher, dass die Database erreichbar ist

### "Module not found"
- `npm install` ausführen
- `npx prisma generate` ausführen

### Build Fehler
- Prüfe TypeScript-Fehler: `npm run lint`
- Prüfe ob alle dependencies installiert sind

---

## Features nach Deploy

- ✅ Dashboard mit Statistiken
- ✅ Grundstücke verwalten
- ✅ Kontakte verwalten
- ✅ Responsive Design
- ✅ Dark Mode (vorbereitet)
- 📋 Dokumenten-Upload (folgt)
- 🗺️ Kartenansicht (folgt)
- 🔐 Authentifizierung (folgt)

---

**Viel Erfolg beim Deploy! 🚀**
