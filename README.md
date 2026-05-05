# Tierphysio Klauser – Website

Die offizielle Website für **Tierphysio Klauser** – Sara Klausers mobile Tierphysiotherapie-Praxis in Rheurdt, NRW.

---

## 🚀 Schnellstart (für Entwickler)

### Voraussetzungen
- Node.js 18 oder höher
- npm oder yarn
- Ein Sanity-Konto (kostenlos unter sanity.io)

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Umgebungsvariablen einrichten

Kopiere die Beispieldatei und fülle deine Werte ein:

```bash
cp .env.example .env.local
```

Öffne `.env.local` und trage deine Zugangsdaten ein (Anleitung siehe unten).

### 3. Entwicklungsserver starten

```bash
npm run dev
```

Die Website ist dann unter **http://localhost:3000** erreichbar.
Das Sanity Studio ist unter **http://localhost:3000/studio** erreichbar.

---

## ⚙️ Umgebungsvariablen einrichten

Bearbeite die Datei `.env.local` mit diesen Werten:

| Variable | Wo bekomme ich sie? |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity-Dashboard → Projekt-Einstellungen |
| `NEXT_PUBLIC_SANITY_DATASET` | Normalerweise `production` |
| `SANITY_API_TOKEN` | Sanity-Dashboard → API → Token erstellen |
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `RESEND_API_KEY` | resend.com → API Keys |
| `CONTACT_EMAIL` | Deine E-Mail-Adresse (wohin Formulare gehen) |

---

## 📝 So erstellt Sara neue News Stories

*(Schritt-für-Schritt-Anleitung)*

1. **Studio öffnen:** Gehe zu `https://tierphysio-klauser.de/studio`
2. **Einloggen** mit deinem Sanity-Konto
3. Klicke links auf **"News & Tipps"**
4. Klicke oben rechts auf **"+ Neu erstellen"**
5. Fülle die Felder aus:
   - **Titel:** Kurzer, aussagekräftiger Beitragsname
   - **Hauptbild:** Foto hochladen (z.B. vom Handy)
   - **Themen:** Stichworte eingeben (z.B. "Hund", "Massage")
   - **Inhalt:** Text schreiben – oder den **KI-Text-Button** nutzen!
6. **KI-Text generieren** (optional):
   - Oben im Dokument erscheint ein Button "🤖 KI-Text generieren"
   - Gib Titel und Themen ein
   - Die KI schreibt einen herzlichen, deutschen Text für dich
   - Du kannst ihn danach noch bearbeiten
7. Klicke auf **"Veröffentlichen"** – der Beitrag erscheint sofort auf der Website!

---

## 💰 Preise und Leistungen aktualisieren

1. Gehe zu `https://tierphysio-klauser.de/studio`
2. Klicke links auf **"Preise"** oder **"Leistungen"**
3. Bestehenden Eintrag anklicken und bearbeiten **oder** neuen erstellen
4. Auf **"Veröffentlichen"** klicken

---

## 🎨 Website-Einstellungen (Telefon, E-Mail, etc.)

1. Studio öffnen
2. Klicke links auf **"Website-Einstellungen"** (ganz oben)
3. Trage deine Kontaktdaten ein:
   - Telefonnummer
   - E-Mail
   - Adresse / Einzugsgebiet
   - Social-Media-Links
4. Bilder hochladen:
   - **Startseiten-Headerbild:** Das große Foto oben auf der Startseite
   - **Über-mich-Bild:** Dein Foto auf der Über-mich-Seite
5. Auf **"Veröffentlichen"** klicken

---

## 🚢 Deployment auf Vercel

### Erstmaliges Deployment

1. Pushe den Code auf GitHub (oder GitLab/Bitbucket)
2. Gehe zu [vercel.com](https://vercel.com) und melde dich an
3. Klicke auf **"New Project"**
4. Wähle dein Repository aus
5. Füge die **Umgebungsvariablen** hinzu (aus deiner `.env.local`)
6. Klicke auf **"Deploy"**

### Updates deployen

Jedes Mal, wenn du Code auf deinen Haupt-Branch pushst, wird Vercel die Website automatisch aktualisieren.

### Sanity-Inhalte werden sofort aktiv

Neue News Stories und andere Inhalte aus dem Sanity Studio erscheinen **sofort** auf der Website (kein Deployment nötig).

---

## 🗂️ Projektstruktur (Übersicht)

```
tierphysio-klauser/
├── app/                    # Next.js Seiten (App Router)
│   ├── (site)/             # Öffentliche Website-Seiten
│   ├── api/                # Backend-API (Formulare, KI)
│   └── studio/             # Sanity Studio
├── components/             # React-Komponenten
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Seitenabschnitte (Hero, Formulare, etc.)
│   ├── social-share/       # Social-Share-Buttons
│   └── ui/                 # Basis-Komponenten (Button, Badge)
├── sanity/
│   ├── schemas/            # Datenbankschemas (News, Preise, etc.)
│   └── lib/                # Sanity-Client und Abfragen
├── lib/                    # Hilfsfunktionen (E-Mail, KI)
├── docs/                   # Dokumentation
├── .env.example            # Vorlage für Umgebungsvariablen
└── sanity.config.ts        # Sanity Studio Konfiguration
```

---

## 🎨 Design anpassen

Die Farben können einfach in `tailwind.config.ts` und `app/globals.css` geändert werden:

```css
/* app/globals.css */
:root {
  --color-primary: #2D5016;    /* Dunkelgrün – Hauptfarbe */
  --color-accent: #F5F0E8;     /* Beige – Hintergrund */
  --color-highlight: #C8956C;  /* Gold/Terrakotta – Akzente */
  --color-text: #2C1810;       /* Dunkelbraun – Text */
}
```

Sobald das echte Logo verfügbar ist, die Farben entsprechend anpassen.

---

## 📧 Formulare testen

Stelle sicher, dass `RESEND_API_KEY` und `CONTACT_EMAIL` in `.env.local` gesetzt sind.
Fülle dann das Kontaktformular aus – du solltest eine E-Mail erhalten.

Für Tests ohne echten API-Key kann Resend im Sandbox-Modus genutzt werden.

---

## ❓ Probleme & Support

Bei Fragen oder Problemen:
- Öffne ein Issue auf GitHub
- Oder schreib direkt an den Entwickler
