# 🧪 Testing Guide - GrundstücksManager

## Manual Testing Checklist

### 1. Dashboard (🏠 Startseite)

**URL:** `/dashboard`

**Tests:**
- [ ] Dashboard lädt ohne Fehler
- [ ] Statistiken werden angezeigt:
  - [ ] Gesamtfläche (ha)
  - [ ] Anzahl Grundstücke
  - [ ] Aktiv in Nutzung
  - [ ] Durchschnittsgröße
- [ ] Flächen nach Nutzungsart (Karten)
  - [ ] Acker
  - [ ] Wiese
  - [ ] Wald
  - [ ] etc.
- [ ] Schnellaktionen funktionieren:
  - [ ] "Neues Grundstück" leitet zu `/grundstuecke/new`
  - [ ] "Neuer Kontakt" leitet zu `/kontakte/new`
  - [ ] "Kartenansicht" leitet zu `/karte`

---

### 2. Grundstücke Liste (📋 Übersicht)

**URL:** `/grundstuecke`

**Tests:**
- [ ] Liste lädt ohne Fehler
- [ ] Alle Grundstücke werden angezeigt
- [ ] Suchfunktion funktioniert:
  - [ ] Suche nach Flurstück
  - [ ] Suche nach Gemeinde
  - [ ] Suche nach Grundbuch
- [ ] Filter funktioniert:
  - [ ] Filter nach Art (Acker, Wiese, etc.)
- [ ] Karten anzeigen:
  - [ ] Typ-Label (Farbe korrekt)
  - [ ] Status-Label
  - [ ] Flurstücksnummer
  - [ ] Grundbuch
  - [ ] Gemeinde
  - [ ] Größe
  - [ ] Eigentümer
- [ ] Click auf Card → Detailseite

---

### 3. Neues Grundstück anlegen (➕ Create)

**URL:** `/grundstuecke/new`

**Tests:**
- [ ] Formular lädt ohne Fehler
- [ ] Alle Felder sichtbar:
  - [ ] Identifikation (Flurstück, Grundbuch)
  - [ ] Lage (Gemeinde, Gemarkung, Flur)
  - [ ] Fläche & Art (Größe, Typ)
  - [ ] Eigentum & Pacht
  - [ ] Notizen & Tags
- [ ] Validierung funktioniert:
  - [ ] Pflichtfelder (required)
  - [ ] Zahlen-Eingaben (Hektar, Preise)
- [ ] "Speichern" erstellt Grundstück
  - [ ] Erfolgsmeldung
  - [ ] Weiterleitung zur Detailseite
- [ ] "Abbrechen" zurück zur Liste

---

### 4. Grundstück Details (📄 Detailansicht)

**URL:** `/grundstuecke/[id]`

**Tests:**
- [ ] Detailseite lädt ohne Fehler
- [ ] Alle Sektionen angezeigt:
  - [ ] Hauptinfo (Größe, Lage, Eigentümer)
  - [ ] Pacht & Kauf
  - [ ] Bodendaten
  - [ ] Notizen
  - [ ] Dokumente
  - [ ] Aktivitäten
- [ ] "Bearbeiten" Button → Edit Page
- [ ] "Zurück" Button → Liste
- [ ] Formatierungen korrekt:
  - [ ] Größen (ha, m²)
  - [ ] Währungen (€)
  - [ ] Daten

---

### 5. Grundstück Bearbeiten (✏️ Edit)

**URL:** `/grundstuecke/[id]/edit`

**Tests:**
- [ ] Formular mit vorhandenen Daten lädt
- [ ] Änderungen möglich
- [ ] "Speichern" aktualisiert Grundstück
- [ ] "Abbrechen" ohne Änderungen zurück

---

### 6. Responsive Design (📱 Mobile)

**Tests:**
- [ ] Desktop (>1024px)
  - [ ] 3-Spalten Layout
  - [ ] SidebarNavigation
- [ ] Tablet (768px-1024px)
  - [ ] 2-Spalten Layout
  - [ ] Touch-freundlich
- [ ] Mobile (<768px)
  - [ ] 1-Spalte Layout
  - [ ] Hamburger Menu
  - [ ] Scrollbar wo nötig

---

### 7. API Routes (🔧 Backend)

**Tests:**

**GET /api/properties**
```bash
curl http://localhost:3000/api/properties
```
- [ ] 200 OK
- [ ] Array von Properties
- [ ] Inkludiert owner, tenant

**GET /api/properties/[id]**
```bash
curl http://localhost:3000/api/properties/UUID
```
- [ ] 200 OK
- [ ] Single Property
- [ ] Inkludiert alle Relationen

**POST /api/properties**
```bash
curl -X POST http://localhost:3000/api/properties \\
  -H "Content-Type: application/json" \\
  -d '{"parcelNumber":"Test 123","landRegistry":"GB 123",...}'
```
- [ ] 201 Created
- [ ] Returns new Property

**PUT /api/properties/[id]**
```bash
curl -X PUT http://localhost:3000/api/properties/UUID \\
  -H "Content-Type: application/json" \\
  -d '{"areaHa":10}'
```
- [ ] 200 OK
- [ ] Updated Property

**DELETE /api/properties/[id]**
```bash
curl -X DELETE http://localhost:3000/api/properties/UUID
```
- [ ] 200 OK
- [ ] Property deleted

**GET /api/dashboard/stats**
```bash
curl http://localhost:3000/api/dashboard/stats
```
- [ ] 200 OK
- [ ] Stats Object

**GET /api/contacts**
```bash
curl http://localhost:3000/api/contacts
```
- [ ] 200 OK
- [ ] Array von Contacts

---

### 8. Database (🗄️ Prisma)

**Tests:**

**Schema:**
```bash
npx prisma generate
npx prisma db push
```
- [ ] Generiert ohne Fehler
- [ ] Pushed ohne Fehler

**Seed:**
```bash
npm run db:seed
```
- [ ] Seed ohne Fehler
- [ ] 6 Grundstücke erstellt
- [ ] 2 Kontakte erstellt

**Studio:**
```bash
npx prisma studio
```
- [ ] Studio öffnet
- [ ] Alle Tabellen sichtbar
- [ ] Daten bearbeitbar

---

### 9. Build & Deploy (🚀 Production)

**Tests:**

**Local Build:**
```bash
npm run build
```
- [ ] Build ohne Fehler
- [ ] Keine TypeScript Errors
- [ ] Keine ESLint Errors

**Production Start:**
```bash
npm start
```
- [ ] Server startet
- [ ] Seite erreichbar

**Vercel Deploy:**
- [ ] Repo zu GitHub gepusht
- [ ] Vercel verknüpft
- [ ] Deploy erfolgreich
- [ ] Live URL funktioniert

---

## 🐛 Known Issues

### MVP 0.1.0
- Keine Authentifizierung (folgt in 0.2.0)
- Keine Kartenansicht (folgt in 0.2.0)
- Kein Dokumenten-Upload (folgt in 0.2.0)
- Kontakt-Selector TODO (wartet auf Contacts Page)

---

## ✅ Success Criteria

MVP gilt als erfolgreich wenn:
- [x] Dashboard zeigt korrekte Statistiken
- [x] Grundstücke können erstellt/gelesen/bearbeitet/gelöscht werden
- [x] Suche & Filter funktionieren
- [x] Responsive auf allen Geräten
- [x] Deploy zu Vercel erfolgreich
- [x] Seed Data funktioniert

---

**Happy Testing! 🧪**
