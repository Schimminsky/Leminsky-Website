import { serve } from "bun";

import notFound from "./pages/404.html";
import datenschutz from "./pages/datenschutz.html";
import galerie from "./pages/galerie.html";
import impressum from "./pages/impressum.html";
import home from "./pages/index.html";
import kontakt from "./pages/kontakt.html";
import lebenslauf from "./pages/lebenslauf.html";
import projekte from "./pages/projekte.html";
import skills from "./pages/skills.html";
import ueberMich from "./pages/ueber-mich.html";

/**
 * Entwicklungsserver. In Produktion läuft kein Bun-Prozess – Caddy liefert
 * das gebaute `dist/` aus (SPEC.MD, Pflichtenheft §2 und §10).
 *
 * Jede Seite wird ausdrücklich registriert. Keine `"/*"`-Catch-all-Route:
 * unbekannte Pfade sollen auch in der Entwicklung als 404 auffallen.
 */
const server = serve({
  routes: {
    "/": home,
    "/ueber-mich": ueberMich,
    "/lebenslauf": lebenslauf,
    "/skills": skills,
    "/projekte": projekte,
    "/galerie": galerie,
    "/kontakt": kontakt,
    "/impressum": impressum,
    "/datenschutz": datenschutz,

    // In Produktion bindet Caddy `dist/404.html` an `handle_errors`.
    // Hier bleibt die Seite über ihren eigenen Pfad zum Ansehen erreichbar.
    "/404": notFound,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server läuft auf ${server.url}`);
