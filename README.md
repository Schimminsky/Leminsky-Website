# leminsky.net

Persönliche Homepage. Bun + React 19 + Tailwind CSS 4, als Multi-Page-Application ohne clientseitiges Routing.

Umfang, Architekturentscheidungen und Roadmap stehen in [`SPEC.MD`](./SPEC.MD).

## Einrichtung

```bash
bun install
bun run hooks    # einmalig pro Klon: aktiviert den Pre-Commit-Hook
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
