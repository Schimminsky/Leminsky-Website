# leminsky.net

Persönliche Homepage. Bun + React 19 + Tailwind CSS 4, als Multi-Page-Application ohne clientseitiges Routing.

Umfang, Architekturentscheidungen und Roadmap stehen in [`SPEC.MD`](./SPEC.MD).

## Einrichtung

```bash
bun install
bun run hooks    # einmalig pro Klon: aktiviert den Pre-Commit-Hook

sudo apt install libimage-exiftool-perl   # für den EXIF-Check im Hook
```

`bun run hooks` setzt `core.hooksPath` auf `.githooks`. Das ist eine lokale Git-Einstellung und reist **nicht** mit dem Repository mit – ohne diesen Schritt läuft der Hook stillschweigend nie.

## Entwicklung

```bash
bun dev          # Entwicklungsserver mit HMR
bun run build    # statischer Build nach dist/
bun start        # Server im Produktionsmodus
```

## Prüfungen

```bash
bun run lint       # Biome: Linting und Formatierung
bun run format     # Biome mit --write
bun run typecheck  # tsc --noEmit
bun test           # Testrunner
```

Dieselben Prüfungen laufen im Pre-Commit-Hook und in GitHub Actions.

Der Hook prüft zusätzlich alle Bilder unter `public/media/` und `src/assets/images/` auf GPS-Koordinaten und Geräte-Kennungen (SPEC.MD Abschnitt 5) und bricht bei Treffern ab. Bereinigen mit:

```bash
exiftool -all= -overwrite_original <datei>
```

Fehlt `exiftool`, während Bilddateien im Repo liegen, schlägt der Hook ebenfalls fehl – eine Prüfung, die stillschweigend nichts tut, wäre schlimmer als keine.
