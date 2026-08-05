# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for leminsky.net. Site content and all planning documents are in **German**.

`SPEC.MD` is the authoritative Lastenheft/Pflichtenheft — scope, priorities (MoSCoW), phase-by-phase roadmap and acceptance criteria. Read it before making architectural decisions; update it when a decision changes.

Current state: `src/` is still largely the unmodified `bun init` React template (`App.tsx`, `APITester.tsx`, `logo.svg`, `react.svg`, the `/api/hello` demo routes). Roadmap Phase 1 removes all of it. Don't build on the demo code.

## Commands

```bash
bun dev                  # dev server with HMR (bun --hot src/index.ts)
bun start                # run the server in production mode
bun run build            # static build into dist/
bun test                 # run all tests
bun test src/foo.test.ts # run one file
bun test -t "substring"  # run tests whose name matches
bunx tsc --noEmit        # typecheck (tsconfig has noEmit; there is no tsc build step)
```

## Architecture

**Multi-page application, no client-side routing.** Each page is its own `.html` entrypoint with a matching `.tsx` that mounts its own React root, under `src/pages/`. Pages are registered explicitly in `src/index.ts` via `Bun.serve({ routes })`. Do not introduce React Router, and do not restore a `"/*"` catch-all route — full page loads are the intended navigation model. See `SPEC.MD` §2 of the Pflichtenheft for the reasoning and trade-offs.

**Build.** `build.ts` discovers entrypoints by globbing `src/**/*.html`, so a new page needs no build config. After bundling it copies `public/` verbatim into `dist/`; that is the only path for static files that must keep their name and location (`robots.txt`, favicon).

**Deployment.** Production serves the static `dist/` directory through Caddy — no Bun process runs in production. That only changes if a feature from the "requires a server process" tier of `SPEC.MD` §7 gets built, in which case API keys stay server-side in `src/index.ts`.

**Styling.** Tailwind CSS 4 through `bun-plugin-tailwind` (wired into the bundler in `build.ts`, and into dev static serving via `bunfig.toml`). There is no `tailwind.config.js` and there should not be one — theme values go in an `@theme` block in the main CSS file.

**Content.** Site content lives in `src/data/*.ts` as typed TypeScript with `satisfies`, not JSON, so types and autocomplete apply. Types in `src/types/`.

**Prefer platform primitives over dependencies.** `<dialog>` instead of a modal component, `<video controls>` instead of a player, `IntersectionObserver` instead of an animation library. Every new dependency needs a reason.

## Hard constraints

These are deliberate decisions that look like omissions or bugs. Do not "fix" them.

- **No SEO.** OpenGraph, sitemap, JSON-LD and meta descriptions are an explicit non-goal. `<title>`, favicon, `lang="de"` and viewport stay — they are usability, not ranking.
- **Excluded from search on purpose.** Every page carries `<meta name="robots" content="noindex, nofollow">`, and Caddy sets `X-Robots-Tag`. `public/robots.txt` permits crawling *by design*: a `Disallow: /` would stop crawlers from ever reading the `noindex`, letting the URL land in the index anyway.
- **No external resources at runtime.** Fonts, icons and scripts are self-hosted. Loading Google Fonts from a CDN leaks visitor IPs and is legally actionable in Germany.
- **Accessibility is a build-time requirement, not a later pass.** Target WCAG 2.2 AA: semantic HTML, visible focus, skip link, 4.5:1 contrast in both colour schemes. Every animation must be disabled under `@media (prefers-reduced-motion: reduce)`.
- **Impressum and Datenschutz pages are legally required** (§ 5 DDG) and count as Must-have scope.
- Strip EXIF from published photos; they often carry GPS coordinates.
- No cookies, no tracking — this is what keeps a consent banner unnecessary.

## Tooling conventions

Use Bun for everything; it is the runtime, package manager, bundler and test runner.

- `bun <file>`, `bun install`, `bun run <script>`, `bunx <pkg>`, `bun test`
- No Vite, no webpack/esbuild, no jest/vitest, no express — `Bun.serve()` covers HTTP and WebSockets
- `bun:sqlite`, `Bun.redis`, `Bun.sql` over `better-sqlite3` / `ioredis` / `pg`
- `Bun.file` over `node:fs` read/write; `Bun.$` over execa
- Bun loads `.env` automatically — no dotenv
- Planned but not yet set up (Phase 1): Biome for lint/format, a `core.hooksPath` pre-commit hook, GitHub Actions running typecheck + build

Bun API docs are available offline in `node_modules/bun-types/docs/**.mdx`.
