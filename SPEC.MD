# Persönliche Homepage – Lasten- und Pflichtenheft

Im klassischen Projektmanagement beschreibt das **Lastenheft** das *Was* (Anforderungen), während das **Pflichtenheft** das *Wie* (technische Umsetzung) beschreibt.

Leitgedanke des Projekts: professionelles Ergebnis bei bewusst einfacher Architektur. Die Seite ist gleichzeitig Lernprojekt, deshalb wird auf jede Abhängigkeit verzichtet, die sich mit Bordmitteln ersetzen lässt.

---

# Lastenheft

## 1. Projektziel

* Erstellung einer modernen persönlichen Homepage
* Vorstellung der eigenen Person
* Präsentation von Fähigkeiten und Projekten
* Bereitstellung eines digitalen Lebenslaufs
* Zentrale Anlaufstelle für externe Profile (GitHub, Instagram usw.)
* Langfristig eigenständiges Hosting auf einem privaten Server
* Moderne, responsive und wartbare Webanwendung

**Ausdrücklich kein Ziel:** Suchmaschinenoptimierung. Die Seite wird über direkt geteilte Links erreicht, nicht über Google-Rankings. Meta-Tags, Sitemap, OpenGraph und strukturierte Daten entfallen daher vollständig.

---

## 2. Zielgruppe

* Freunde und Bekannte
* Recruiter
* Arbeitgeber
* Entwickler
* Interessierte Besucher

---

## 3. Priorisierung

Die Anforderungen sind nach MoSCoW priorisiert, damit bei knapper Zeit klar ist, was zuerst entsteht.

| Priorität | Umfang |
| --- | --- |
| **Must** | Startseite, Über mich, Projekte, Kontakt, Footer, Datenschutz, 404-Seite |
| **Should** | Lebenslauf, Skills |
| **Could** | Galerie, PDF-Download des Lebenslaufs, Light-/Dark-Umschalter |
| **Won't (vorerst)** | sämtliche Punkte aus Abschnitt 7 |
| **Offen** | Impressum – hängt an der ungeklärten Frage in Abschnitt 5 |

---

## 4. Funktionale Anforderungen

### Startseite

* Begrüßung
* Kurzvorstellung
* Profilbild
* Call-to-Action
* Navigation zu allen Bereichen

### Über mich

* Persönliche Beschreibung
* Interessen
* Hobbys
* Ausbildung
* Beruflicher Werdegang

### Lebenslauf

* Chronologische Timeline
* Ausbildung
* Berufserfahrung
* Zertifikate
* Download als PDF (optional)

> **Datenschutz in eigener Sache:** Adresse, Geburtsdatum und Telefonnummer werden nicht veröffentlicht. Die öffentliche Fassung enthält ausschließlich beruflich relevante Angaben; eine vollständige Version wird nur auf Anfrage per E-Mail versendet.

### Projekte

Für jedes Projekt:

* Titel
* Beschreibung
* verwendete Technologien
* Bilder
* GitHub-Link
* Live-Demo (optional)

### Skills

Darstellung der Kenntnisse, beispielsweise:

* Programmiersprachen
* Frameworks
* Datenbanken
* DevOps
* Betriebssysteme
* Soft Skills

### Galerie

* Fotos
* Videos
* Lightbox
* Kategorien

### Kontakt

* E-Mail (verschleiert dargestellt, siehe Pflichtenheft)
* GitHub
* Instagram
* LinkedIn (optional)

### Fehlerseite

* Eigene 404-Seite im Layout der Website
* Rückweg zur Startseite

### Footer

* Copyright
* Impressum
* Datenschutz
* Social Links

---

## 5. Rechtliche Anforderungen

* **Datenschutzerklärung** als eigene Seite (Hosting, Server-Logfiles, ggf. Kontaktaufnahme)
* **Keine externen Ressourcen zur Laufzeit.** Schriftarten, Icons und Skripte werden selbst gehostet. Das Einbinden von Google Fonts per CDN überträgt die IP-Adresse der Besucher in die USA und ist abmahnfähig.
* **Bildrechte** klären: nur eigene Aufnahmen oder Material mit passender Lizenz
* **EXIF-Daten** aus allen veröffentlichten Fotos entfernen (enthalten häufig GPS-Koordinaten)
* Keine Cookies und kein Tracking – dadurch entfällt die Notwendigkeit eines Consent-Banners

### Datenschutzerklärung: unstrittig erforderlich

Sie hängt nicht an der Impressumsfrage weiter unten. Der Server verarbeitet IP-Adressen in Logfiles, und das allein löst die Informationspflicht aus Art. 13 DSGVO aus – unabhängig davon, ob die Seite geschäftsmäßig betrieben wird. Die Seite bleibt damit **Must-have**.

### Impressum: offene Entscheidung

> **Ungeklärt. Vor Phase 2 zu entscheiden, im Zweifel anwaltlich.** Diese Fassung des Dokuments beantwortet die Frage bewusst nicht.

Die frühere Fassung setzte die Impressumspflicht als feststehend voraus. Das kollidiert direkt mit der Vorgabe aus Abschnitt 4, die Wohnanschrift nicht zu veröffentlichen – § 5 DDG verlangt eine **ladungsfähige Anschrift**, und ein Postfach genügt dafür nicht. Beides zugleich geht nicht.

Zu klären ist deshalb, woran § 5 DDG anknüpft: an *geschäftsmäßige, in der Regel gegen Entgelt angebotene* Telemedien. Zwei Lesarten stehen im Raum:

* **Geschäftsmäßig.** Ein Portfolio, das sich ausdrücklich an Recruiter und Arbeitgeber richtet, wird überwiegend so eingeordnet – es dient der Anbahnung eines Erwerbsverhältnisses. Folge: vollständige Anbieterkennzeichnung inklusive ladungsfähiger Anschrift. Abschnitt 4 muss dann angepasst werden, nicht umgekehrt.
* **Rein privat.** Eine Seite ohne jede Erwerbsabsicht braucht kein Impressum. Diese Einordnung wird durch die in Abschnitt 2 genannte Zielgruppe allerdings erkennbar erschwert.

Die Entscheidung hat Konsequenzen über den Seiteninhalt hinaus: fällt sie auf „geschäftsmäßig", ist die Anschrift öffentlich, und das ist nicht rückholbar. Bis zur Klärung bleibt `/impressum` eine Platzhalterseite.

---

## 6. Nichtfunktionale Anforderungen

Formuliert als überprüfbare Zielwerte, damit die Abnahme messbar ist.

### Performance

* Largest Contentful Paint unter 2,5 s bei simulierter 4G-Verbindung
* JavaScript-Bundle pro Seite unter 150 KB (gzip)
* Lighthouse-Score Performance ≥ 95
* Lazy Loading für Bilder und Videos außerhalb des sichtbaren Bereichs
* optimierte Bilder (siehe Pflichtenheft)

### Responsivität

Fehlerfreie Darstellung ab 320 px Viewport-Breite auf:

* Smartphone
* Tablet
* Desktop

### Barrierefreiheit

Ziel: WCAG 2.2 Level AA.

* semantisches HTML
* vollständige Tastaturbedienung, sichtbarer Fokus-Indikator
* Skip-Link zum Hauptinhalt
* Kontrastverhältnis mindestens 4,5:1 für Fließtext, 3:1 für große Schrift
* Alt-Texte für alle inhaltstragenden Bilder
* `prefers-reduced-motion` wird respektiert – bei aktivierter Einstellung entfallen alle Bewegungsanimationen
* Lighthouse-Score Accessibility ≥ 95

### Wartbarkeit

* sauber strukturierter Code
* wiederverwendbare Komponenten
* klare Ordnerstruktur, die mit dem Projekt mitwächst
* Inhalte von Darstellung getrennt

### Sicherheit

* HTTPS mit automatischer Weiterleitung von HTTP
* keine Secrets oder API-Keys im Frontend
* Schutz vor XSS durch React-Standards, kein `dangerouslySetInnerHTML`
* sichere externe Links (`rel="noopener noreferrer"`)

---

## 7. Erweiterungsmöglichkeiten

Die folgenden Punkte sind bewusst nicht Teil des Basisumfangs.

**Ohne zusätzliche Infrastruktur umsetzbar:**

* Blog (als weitere statische Seiten)
* RSS Feed
* Mehrsprachigkeit

**Erfordert einen Server-Prozess** – der Bun-Server aus `src/index.ts` kann diese Rolle übernehmen, API-Keys bleiben dabei serverseitig:

* Kontaktformular (inkl. Spam-Schutz)
* GitHub API
* Spotify API
* Discord Status

**Erfordert zusätzlich eine Datenbank und Moderation** – ab hier wird aus dem Portfolio ein Backend-Projekt mit entsprechendem Betriebsaufwand. Als Datenbank ist `bun:sqlite` vorgesehen:

* Gästebuch
* Besucherstatistik (self-hosted, z. B. Umami – kein Google Analytics, sonst wird ein Consent-Banner nötig)
* Adminbereich

---

# Pflichtenheft

## 1. Technologie

* **Bun** als Runtime, Paketmanager, Bundler und Testrunner
* **React 19**
* **TypeScript** im `strict`-Modus
* **Tailwind CSS 4** über `bun-plugin-tailwind`

Kein Vite: Bun bringt einen eigenen Bundler mit, der HTML-Dateien als Einstiegspunkte versteht und `.tsx` sowie CSS automatisch verarbeitet. Ein zweites Build-Werkzeug wäre reine Redundanz.

Kein React Router: siehe Abschnitt 2.

Tailwind 4 benötigt keine `tailwind.config.js` mehr. Farben, Schriftarten und Abstände werden per `@theme`-Block direkt in `src/styles/main.css` definiert.

---

## 2. Architektur: Multi-Page-Application

Jeder Bereich der Website ist eine eigene HTML-Datei mit eigenem Einstiegspunkt. Es gibt kein clientseitiges Routing.

Begründung:

* Der Browser übernimmt die Navigation – kein Router als Abhängigkeit, kein History-Handling, keine Scroll-Restoration von Hand
* Jede Seite lädt nur ihr eigenes JavaScript
* Ausfall oder Fehler auf einer Seite legt nicht die gesamte Anwendung lahm
* `build.ts` erfasst über `src/**/*.html` bereits heute automatisch alle Seiten

Preis dieser Entscheidung: Beim Seitenwechsel gibt es einen vollständigen Reload, weiche Seitenübergänge per Animation entfallen. Bei statischen Seiten dieser Größe ist der Reload jedoch kaum wahrnehmbar.

### Entwicklung

`src/index.ts` registriert die Seiten als Routen:

```ts
import home from "./pages/index.html";
import about from "./pages/about.html";

Bun.serve({
  routes: {
    "/": home,
    "/about": about,
    // ...
  },
  development: process.env.NODE_ENV !== "production" && { hmr: true, console: true },
});
```

### Produktion

`bun run build.ts` erzeugt statisches HTML/CSS/JS in `dist/`. Ausgeliefert wird ausschließlich dieser Ordner; ein laufender Bun-Prozess ist im Basisumfang nicht nötig. Der Webserver löst URLs ohne Dateiendung auf (`try_files {path} {path}.html`).

Zwei Optionen in `build.ts` sind dafür Voraussetzung und keine Geschmacksfrage:

* **`root: "src/pages"`** – Bun leitet den Build-Root sonst aus dem gemeinsamen Vorfahren aller beteiligten Dateien ab. Sobald ein Asset außerhalb von `pages/` referenziert wird, rutscht der Root nach oben und die Seiten landen in `dist/src/pages/` statt flach in `dist/`. `try_files` findet sie dann nicht.
* **`splitting: true`** – ohne Code-Splitting bündelt jede Seite ihre eigene React-Kopie (~184 KB je Seite). Mit Splitting teilen sich alle Seiten einen Chunk, den der Browser über den Seitenwechsel hinweg im Cache behält. Genau das entschärft den vollständigen Reload, der der Preis der MPA-Entscheidung ist.

---

## 3. Projektstruktur

Angelegt wird, was tatsächlich gebraucht wird. Ordner kommen dazu, sobald sich die zweite oder dritte Datei einer Art ansammelt – leere Verzeichnisse verleiten dazu, Code zu verteilen statt ihn zu finden.

**Startstruktur:**

```text
src/
│
├── index.ts            # Bun.serve, registriert jede Seite als Route
│
├── pages/              # je Seite: name.html + gleichnamige name.tsx
│   ├── index.html      #   /
│   ├── index.tsx
│   ├── ueber-mich.html #   /ueber-mich
│   ├── ueber-mich.tsx
│   ├── ...             #   lebenslauf, skills, projekte, galerie, kontakt,
│   ├── 404.html        #   impressum, datenschutz
│   └── 404.tsx
│
├── components/
│   ├── layout/         # Layout, Navbar, Footer, Container, Section
│   └── ui/             # Button, Badge, Card, ...
│
├── data/               # Inhalte als typisierte .ts-Dateien
│
├── lib/
│   └── mount.tsx       # HMR-sicherer React-Root, von jeder Seite benutzt
│
├── styles/
│   └── main.css        # Tailwind-Import + @theme
│
├── types/
│
└── assets/
    ├── images/
    ├── videos/
    ├── icons/          # favicon.svg
    └── fonts/          # selbst gehostete .woff2
```

Die Slugs sind durchgehend deutsch. `/impressum` und `/datenschutz` sind rechtlich feste Begriffe und ließen sich ohnehin nicht übersetzen – ein gemischtes `/about` daneben wäre inkonsequent.

**Später bei Bedarf:** `hooks/`, `utils/`

Der Alias `@/*` auf `./src/*` ist in `tsconfig.json` bereits konfiguriert.

---

## 4. Komponenten

### Layout

* Layout – klammert Skip-Link, Navbar, `<main>` und Footer. Ohne diese Klammer müssten Landmarks und Skip-Link in jeder Seite dupliziert werden. Nimmt `title` (wird zur `<h1>`) und `activePath` entgegen; letzteres ersetzt das, was ein Router sonst von selbst wüsste.
* Navbar
* Footer
* Container
* Section
* Card

### UI

* Button
* Badge
* Timeline
* SkillCard
* SocialButton
* ProjectCard
* Lightbox

### Bewusst nicht als eigene Komponente

* **Modal** → natives `<dialog>`-Element. Bringt Fokus-Falle, Escape-Handling und Backdrop von sich aus mit und ist damit korrekter als die meisten Eigenbauten.
* **VideoPlayer** → natives `<video controls>`. Liefert Vollbildmodus und Tastaturbedienung ohne Bundle-Kosten.

Sektionen (Hero, About, Resume, Projects, Skills, Gallery, Contact) sind keine eigene Kategorie neben `pages/`, sondern liegen als Komponenten bei der Seite, die sie verwendet. Erst bei Mehrfachverwendung wandern sie nach `components/`.

---

## 5. Datenhaltung

Keine Datenbank. Alle Inhalte werden lokal als TypeScript gepflegt:

```text
data/
├── projects.ts
├── skills.ts
├── timeline.ts
├── socials.ts
└── gallery.ts
```

Gegenüber JSON gewinnt man Typisierung, Autovervollständigung und Hilfsfunktionen. Die Typen liegen in `types/`, die Daten werden mit `satisfies` geprüft – so bleibt der konkrete Literaltyp erhalten und Tippfehler fallen beim Typecheck auf:

```ts
export const projects = [
  { title: "...", tech: ["Bun", "React"], github: "..." },
] satisfies Project[];
```

---

## 6. Design

Grundprinzipien:

* modernes minimalistisches Design
* große Überschriften
* viel Weißraum
* Kartenlayout
* weiche Schatten
* dezente Animationen
* konsistente Farben
* abgerundete Ecken

### Farbschema

Dark Mode ist die Standarddarstellung, die Seite respektiert jedoch `prefers-color-scheme`. Ein Umschalter mit Speicherung in `localStorage` ist als *Could* eingeplant. Beide Modi müssen die Kontrastvorgaben aus dem Lastenheft erfüllen – zu geringer Kontrast im Dark Mode ist der häufigste Barrierefreiheitsfehler.

**Primär:** Slate / Zinc / Gray
**Akzent:** Cyan / Emerald / Indigo (eine Farbe wählen und konsequent durchhalten)

Definiert wird die Palette einmalig als `@theme`-Block in `src/styles/main.css`, nicht als verstreute Utility-Klassen.

### Schriftarten

Inter, Geist oder Manrope – **selbst gehostet** als `.woff2` unter `assets/fonts/`, eingebunden per `@font-face` mit `font-display: swap`. Kein Google-Fonts-CDN (siehe Lastenheft, Abschnitt 5).

### Animationen

* Fade-In beim Scrollen (`IntersectionObserver`, keine Animationsbibliothek)
* Hover-Animationen
* weiche Übergänge
* animierte Navigation

Sämtliche Animationen werden in `@media (prefers-reduced-motion: reduce)` deaktiviert.

---

## 7. Medien

### Bilder

* Format WebP, Original als Fallback
* `loading="lazy"` außerhalb des sichtbaren Bereichs, `loading="eager"` für das Profilbild
* `width` und `height` immer gesetzt, um Layout-Shift zu vermeiden
* responsive Größen über `srcset`
* Alt-Texte
* EXIF-Daten entfernt

### Videos

* MP4 (H.264) und WebM
* `preload="none"` mit Poster-Bild
* optional Autoplay ohne Ton (`muted`, `playsinline`, `loop`)
* natives Vollbild über `<video controls>`
* Richtwert: maximal 10 MB pro Datei – die Auslieferung erfolgt über den eigenen Server und dessen Bandbreite

---

## 8. Browser-Grundlagen

Kein SEO, aber diese Punkte gehören zur Grundqualität jeder Seite:

* aussagekräftiger `<title>` pro Seite (Tab-Beschriftung, Lesezeichen)
* Favicon
* `<html lang="de">`
* `<meta name="viewport">`

### Ausschluss aus Suchmaschinen

Die Seite soll nicht in Suchergebnissen auftauchen. Umgesetzt wird das über zwei Mechanismen:

1. **`<meta name="robots" content="noindex, nofollow">` in jeder Seite.** Das ist die verbindliche Anweisung, die Seite nicht in den Index aufzunehmen.
2. **`X-Robots-Tag: noindex, nofollow` als HTTP-Header** in der Caddy-Konfiguration. Greift zusätzlich für Dateien ohne HTML-Kopf, etwa das Lebenslauf-PDF.

`public/robots.txt` erlaubt das Crawling bewusst weiterhin. Ein `Disallow: /` klingt zwar strenger, verhindert aber genau das Auslesen der `noindex`-Anweisung – die Seite kann dann trotzdem als reiner Link ohne Inhaltsvorschau im Index landen. Crawling erlauben und Indexierung verbieten ist der zuverlässigere Weg.

Dateien unter `public/` werden von `build.ts` unverändert nach `dist/` kopiert. Das gilt für `robots.txt` und später das Lebenslauf-PDF – also für alles, was seinen Namen behalten muss.

Das Favicon gehört **nicht** dazu: Bun kann einen absoluten Pfad wie `/favicon.svg` im HTML-Kopf nicht auflösen und bricht den Build ab. Es liegt deshalb als `src/assets/icons/favicon.svg` und wird relativ referenziert; der Bundler hasht es und schreibt den fertigen Pfad in jede Seite. Vorteil nebenbei: unbegrenzte Cache-Dauer.

---

## 9. Werkzeuge

* **Biome** für Linting und Formatierung – ersetzt ESLint und Prettier durch ein Werkzeug mit einer Konfigurationsdatei. Zwei Einstellungen sind dabei nicht offensichtlich: `css.parser.tailwindDirectives` muss an sein, sonst scheitert Biome am `@theme`- und `@apply`-Syntax von Tailwind 4; und die `a11y`-Regelgruppe ist in `recommended` enthalten, prüft also die Vorgaben aus Lastenheft Abschnitt 6 bereits beim Speichern statt erst beim Lighthouse-Lauf in Phase 5.
* **Git-Pre-Commit-Hook** (`.githooks/`, aktiviert über `git config core.hooksPath`), der `biome check` und `bunx tsc --noEmit` ausführt. Kein Husky nötig.
* **`bun test`** als Testrunner
* **GitHub Actions**: bei jedem Push laufen Typecheck, Biome und Build

`bun-plugin-tailwind` gehört in `devDependencies`, nicht in `dependencies` – es wird nur zur Build-Zeit gebraucht.

### Testumfang

Für eine statische Seite sind Unit-Tests der Datenmodule wenig ergiebig. Sinnvoll sind:

* Konsistenzprüfung der Inhalte (jedes Projekt hat Titel und Beschreibung, jedes Bild einen Alt-Text) als `bun test`
* manuelle Lighthouse-Prüfung vor jedem Deployment
* Tastatur-Durchlauf durch alle Seiten

---

## 10. Deployment

**Entwicklung:** `bun --hot src/index.ts`

**Produktion:**

* Docker-Image auf Basis eines schlanken Webserver-Images, das `dist/` ausliefert
* **Caddy** als Webserver und Reverse Proxy – konfiguriert HTTPS über Let's Encrypt vollautomatisch und ersetzt die Kombination aus Nginx und Certbot
* HTTP → HTTPS Weiterleitung
* `handle_errors` auf `dist/404.html` – in der Entwicklung gibt es bewusst keine Catch-all-Route, die eigene Fehlerseite ist dort nur unter `/404` erreichbar. Das automatische Ausliefern bei unbekannten Pfaden ist damit allein Aufgabe von Caddy.
* Security-Header: `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`
* `X-Robots-Tag: noindex, nofollow` für alle Antworten (siehe Abschnitt 8)
* Domain: `leminsky.net`

Ein Bun-Container wird erst nötig, wenn Erweiterungen mit Serverbedarf dazukommen (siehe Lastenheft, Abschnitt 7).

---

# Projekt-Roadmap

Barrierefreiheit und Performance sind Bauentscheidungen, keine Nachrüstung – semantisches HTML, Alt-Texte und Fokusreihenfolge entstehen ab Phase 1 mit. In der Optimierungsphase wird nur noch gemessen.

### Phase 0 – Inhalte

* Texte für Startseite und Über mich schreiben
* Projekte auswählen und beschreiben
* Profilbild und Projektbilder auswählen, zuschneiden, EXIF entfernen
* Lebenslaufdaten zusammenstellen

*Der häufigste Grund für steckengebliebene Portfolio-Projekte ist nicht die Technik, sondern fehlender Inhalt. Diese Phase kann parallel zu Phase 1 laufen, aber nicht entfallen.*

**Fertig, wenn:** alle Must-Seiten haben ihren finalen Text.

### Phase 1 – Grundgerüst

* Template aufräumen (`APITester.tsx`, Demo-Assets, Beispiel-API-Routen entfernen)
* Biome, Pre-Commit-Hook und GitHub Actions einrichten
* MPA-Struktur mit `pages/` anlegen, Routen in `index.ts` registrieren
* Tailwind-Theme in `styles/main.css` definieren, Schriftarten selbst hosten
* Grundlayout: Navbar, Footer, Container, Section, Skip-Link
* `noindex`-Meta-Tag in jede neue Seite übernehmen

**Fertig, wenn:** alle Seiten sind leer, aber erreichbar, gebaut und per Tastatur navigierbar.

### Phase 2 – Kerninhalte (Must)

* Hero / Startseite
* Über mich
* Projekte inkl. Projektkarten und GitHub-Verlinkung
* Kontakt
* Impressum, Datenschutz, 404

**Fertig, wenn:** die Seite ist ohne Platzhalter vorzeigbar und rechtlich vollständig.

### Phase 3 – Ergänzende Inhalte (Should)

* Lebenslauf mit Timeline
* Skills

### Phase 4 – Design und Medien (Could)

* Responsives Layout auf echten Geräten prüfen
* Animationen inkl. `prefers-reduced-motion`
* Galerie mit Lightbox
* Dark Theme verfeinern, optional Umschalter
* Feinschliff

### Phase 5 – Optimierung

* Lighthouse: Performance und Accessibility gegen die Zielwerte messen
* Bildgrößen und Bundle-Größe prüfen
* Kontrastwerte prüfen
* Tastatur- und Screenreader-Durchlauf

**Fertig, wenn:** alle Zielwerte aus Abschnitt 6 des Lastenhefts erreicht sind.

### Phase 6 – Deployment

* Dockerfile schreiben
* Caddy konfigurieren, Security-Header setzen
* Domain verbinden, HTTPS prüfen
* Deployment auf eigenem Server
* Backup-Strategie für Inhalte und Konfiguration festlegen

---

# Empfehlungen für den Einstieg

* **Klein anfangen.** Eine funktionierende Startseite ist mehr wert als eine perfekte Ordnerstruktur ohne Inhalt.
* **Inhalte als `.ts`-Dateien** statt JSON – Typen, Hilfsfunktionen und Autovervollständigung inklusive.
* **Bordmittel vor Bibliotheken.** `<dialog>`, `<video>` und `IntersectionObserver` decken hier alles ab, was sonst Abhängigkeiten kosten würde.
* **Jede Abhängigkeit rechtfertigen.** Jedes Paket ist Code, den du weder geschrieben hast noch aktuell hältst.
* **Docker früh vorsehen**, auch wenn das Hosting später kommt. Der Wechsel auf den eigenen Server wird dadurch unkompliziert.
