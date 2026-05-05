# Social Media API Integration – Phase 2

## Übersicht

Dieses Dokument beschreibt, wie Phase 2 der Social-Media-Integration implementiert werden kann.
Phase 1 (manuelle Share-Buttons) ist bereits aktiv. Phase 2 ermöglicht das **direkte automatische Posten**.

---

## Phase 1 (aktiv) – Manueller Share-Helper

Implementiert in: `components/social-share/ShareButtons.tsx`

| Kanal | Methode |
|---|---|
| Facebook | `facebook.com/sharer` URL-Share |
| WhatsApp | `wa.me` URL-Share mit vorformatiertem Text |
| Google Business | Link zur "Neuen Beitrag erstellen"-Seite |
| Instagram | Caption + Link in Zwischenablage kopieren |

---

## Phase 2 – Automatisches Posten über APIs

### Voraussetzungen

- Ein **Facebook Business Manager Account** mit einer verknüpften **Facebook Page**
- Ein **Instagram Business Account**, der mit der Facebook Page verknüpft ist
- Ein **Google Business Profile** mit verknüpftem Google-Konto
- Entsprechende API-Berechtigungen (Tokens)

---

## 2.1 Facebook Graph API

### Ziel
Beiträge direkt auf der Facebook-Seite veröffentlichen.

### Schritte
1. Eine Facebook App im [Meta Developer Portal](https://developers.facebook.com) erstellen
2. Die App mit der Facebook Page verknüpfen
3. Berechtigungen: `pages_manage_posts`, `pages_read_engagement`
4. Einen **Page Access Token** generieren (langlebig)

### API-Aufruf
```typescript
// In lib/facebook.ts (noch zu erstellen)
export async function postToFacebook(pageId: string, token: string, payload: {
  message: string;
  link?: string;
}) {
  const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, access_token: token }),
  });
  return res.json();
}
```

### Env-Variablen hinzufügen (zu .env.example)
```
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_PAGE_ACCESS_TOKEN=your_long_lived_token
```

### Integration in API Route
In `app/api/social/facebook/route.ts` implementieren, aufgerufen aus dem Sanity Studio oder nach dem Speichern einer News Story.

---

## 2.2 Instagram Graph API

### Ziel
Bilder mit Caption auf Instagram posten (Business Account erforderlich).

### Schritte
1. Instagram Business Account mit Facebook Page verknüpfen
2. Gleiche Facebook App nutzen wie oben
3. Berechtigungen: `instagram_basic`, `instagram_content_publish`
4. Instagram Business Account ID ermitteln

### API-Aufruf (2 Schritte)
```typescript
// Schritt 1: Container erstellen
async function createInstagramContainer(igUserId: string, token: string, payload: {
  image_url: string;
  caption: string;
}) {
  const res = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media`, {
    method: 'POST',
    body: new URLSearchParams({ ...payload, access_token: token }),
  });
  return res.json(); // { id: "creation_id" }
}

// Schritt 2: Container veröffentlichen
async function publishInstagramContainer(igUserId: string, token: string, creationId: string) {
  const res = await fetch(`https://graph.facebook.com/v19.0/${igUserId}/media_publish`, {
    method: 'POST',
    body: new URLSearchParams({ creation_id: creationId, access_token: token }),
  });
  return res.json();
}
```

### Wichtig
- Das Bild muss über eine **öffentlich zugängliche URL** verfügbar sein (z.B. Sanity CDN-URL)
- Nur Bilder (kein Text-only), Mindestgröße 320px

---

## 2.3 Google Business Profile API

### Ziel
Beiträge im Google Business Profil automatisch erstellen.

### Schritte
1. Google Cloud Console: Projekt erstellen
2. **My Business Business Information API** und **My Business Posts API** aktivieren
3. OAuth2-Anmeldedaten erstellen (Service Account oder OAuth Client)
4. Scopes: `https://www.googleapis.com/auth/business.manage`

### API-Aufruf
```typescript
// In lib/googleBusiness.ts (noch zu erstellen)
export async function postToGoogleBusiness(locationName: string, accessToken: string, payload: {
  summary: string;
  callToAction?: { actionType: string; url: string };
  media?: { mediaFormat: 'PHOTO'; sourceUrl: string };
}) {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${locationName}/localPosts`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, topicType: 'STANDARD' }),
    }
  );
  return res.json();
}
```

### Env-Variablen
```
GOOGLE_BUSINESS_LOCATION_NAME=accounts/ACCOUNT_ID/locations/LOCATION_ID
GOOGLE_SERVICE_ACCOUNT_KEY=base64_encoded_service_account_json
```

---

## Sanity Studio Integration

### KI-Text + direktes Posten

Im Sanity Studio kann ein **Document Action** hinzugefügt werden:

```typescript
// In sanity.config.ts, zu den plugins hinzufügen:
import { definePlugin } from 'sanity';

const socialPostAction = definePlugin({
  name: 'social-post-action',
  document: {
    actions: (prev, context) => {
      if (context.schemaType !== 'newsStory') return prev;
      return [...prev, SocialShareAction];
    },
  },
});
```

Der Button ruft dann `POST /api/social/publish` auf mit der Story-ID.

---

## Sicherheitshinweise

- Access Tokens **niemals** im Frontend oder im Code-Repository speichern
- Alle Tokens als **Vercel Environment Variables** (encrypted) anlegen
- Regelmäßiges Token-Refresh implementieren (Facebook Tokens laufen ab)
- Rate Limits der APIs beachten (besonders Instagram: 25 Beiträge/24h)

---

## Empfohlene Reihenfolge für Phase 2

1. Facebook Graph API (einfachster Einstieg)
2. Instagram (baut auf Facebook API auf)
3. Google Business (separate Auth, aber gut dokumentiert)
