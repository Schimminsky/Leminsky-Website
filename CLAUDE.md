# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for leminsky.net. Site content and all planning documents are in **German**.

`SPEC.MD` is the authoritative Lastenheft/Pflichtenheft — scope, priorities (MoSCoW), phase-by-phase roadmap and acceptance criteria. Read it before making architectural decisions; update it when a decision changes.

Keep your replies extremely concise and focus on conveying the key information. No unnecessary fluff, no long code snippets.

Whenever working with any third-party library or something similar, you MUST look up the official documentation to ensure that you're workin with up-to-date information.
Use the DocsExplorer subagent for efficient documentation lookup.

Current state: the `bun init` template is gone. The MPA skeleton from Roadmap Phase 1 exists — ten pages under `src/pages/`, the `components/layout/` set, and `styles/main.css` — but every page holds only an `<h1>` and a placeholder sentence. Real content is Phase 2/3. Still open from Phase 1: Biome, the pre-commit hook, GitHub Actions, and self-hosted `.woff2` fonts.

## Commands

```bash
bun dev                  # dev server with HMR (bun --hot src/index.ts)
bun start                # run the server in production mode
bun run build            # static build into dist/
bun test                 # run all tests
bun test src/foo.test.ts # run one file
bun test -t "substring"  # run tests whose name matches
bun run typecheck        # bunx tsc --noEmit (tsconfig has noEmit; there is no tsc build step)
bun run lint             # biome check .
bun run format           # biome check --write .
bun run hooks            # one-time per clone: git config core.hooksPath .githooks
```

## Architecture

**Multi-page application, no client-side routing.** Each page is its own `.html` entrypoint with a matching `.tsx` that mounts its own React root, under `src/pages/`. Pages are registered explicitly in `src/index.ts` via `Bun.serve({ routes })`. Do not introduce React Router, and do not restore a `"/*"` catch-all route — full page loads are the intended navigation model. See `SPEC.MD` §2 of the Pflichtenheft for the reasoning and trade-offs.

**Build.** `build.ts` discovers entrypoints by globbing `src/**/*.html`, so a new page needs no build config. Two options in it are load-bearing and must not be dropped: `root: "src/pages"` keeps the pages flat in `dist/` (Caddy's `try_files` needs that), and `splitting: true` stops every page from bundling its own copy of React. After bundling it copies `public/` verbatim into `dist/`; that is the only path for static files that must keep their name and location (`robots.txt`, gallery media under `public/media/`, later the CV PDF). The favicon is *not* one of them — Bun cannot resolve an absolute `/favicon.svg` in an HTML head and fails the build, so it lives at `src/assets/icons/favicon.svg` and is referenced relatively.

**Deployment.** Production serves the static `dist/` directory through Caddy — no Bun process runs in production. That only changes if a feature from the "requires a server process" tier of `SPEC.MD` §7 gets built, in which case API keys stay server-side in `src/index.ts`.

**Styling.** Tailwind CSS 4 through `bun-plugin-tailwind` (wired into the bundler in `build.ts`, and into dev static serving via `bunfig.toml`). There is no `tailwind.config.js` and there should not be one — theme values go in an `@theme` block in the main CSS file.

**Content.** Site content lives in `src/data/*.ts` as typed TypeScript with `satisfies`, not JSON, so types and autocomplete apply. Types in `src/types/`.

**Media.** Split by whether the bundler should touch the file, not by size. Images imported from a component go in `src/assets/images/` — Bun hashes them, so they cache forever. Gallery photos and all videos go in `public/media/`, which keeps names and URLs stable. Never `import` a video; that pushes the whole file through the bundler on every build for nothing. See `SPEC.MD` §7.

**Prefer platform primitives over dependencies.** `<dialog>` instead of a modal component, `<video controls>` instead of a player, `IntersectionObserver` instead of an animation library. Every new dependency needs a reason.

## Hard constraints

These are deliberate decisions that look like omissions or bugs. Do not "fix" them.

- **No SEO.** OpenGraph, sitemap, JSON-LD and meta descriptions are an explicit non-goal. `<title>`, favicon, `lang="de"` and viewport stay — they are usability, not ranking.
- **Excluded from search on purpose.** Every page carries `<meta name="robots" content="noindex, nofollow">`, and Caddy sets `X-Robots-Tag`. `public/robots.txt` permits crawling *by design*: a `Disallow: /` would stop crawlers from ever reading the `noindex`, letting the URL land in the index anyway.
- **No external resources at runtime.** Fonts, icons and scripts are self-hosted. Loading Google Fonts from a CDN leaks visitor IPs and is legally actionable in Germany.
- **Accessibility is a build-time requirement, not a later pass.** Target WCAG 2.2 AA: semantic HTML, visible focus, skip link, 4.5:1 contrast in both colour schemes. Every animation must be disabled under `@media (prefers-reduced-motion: reduce)`.
- **Datenschutz is legally required** (Art. 13 DSGVO — the server logs IP addresses) and is Must-have scope. **Impressum is an open question**, deliberately unanswered: § 5 DDG would require a ladungsfähige Anschrift, which contradicts the decision not to publish the address. See SPEC.MD §5. Do not write Impressum content, and do not invent the answer — `/impressum` stays a placeholder until it is decided.
- Strip EXIF from published photos; they often carry GPS coordinates.
- No cookies, no tracking — this is what keeps a consent banner unnecessary.

## Tooling conventions

Use Bun for everything; it is the runtime, package manager, bundler and test runner.

- `bun <file>`, `bun install`, `bun run <script>`, `bunx <pkg>`, `bun test`
- No Vite, no webpack/esbuild, no jest/vitest, no express — `Bun.serve()` covers HTTP and WebSockets
- `bun:sqlite`, `Bun.redis`, `Bun.sql` over `better-sqlite3` / `ioredis` / `pg`
- `Bun.file` over `node:fs` read/write; `Bun.$` over execa
- Bun loads `.env` automatically — no dotenv

Biome, the pre-commit hook and GitHub Actions are set up. `core.hooksPath` is a per-clone git setting and does not travel with the repo — run `bun run hooks` once after cloning or the hook silently never fires. Still open from Phase 1: self-hosted `.woff2` fonts.

Bun API docs are available offline in `node_modules/bun-types/docs/**.mdx`.
