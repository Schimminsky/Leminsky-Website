import { type ReactNode, StrictMode } from "react";
import { createRoot } from "react-dom/client";

/**
 * Hängt eine Seite an `#root`. Jede Seite unter `pages/` bringt ihren eigenen
 * React-Root mit – es gibt kein clientseitiges Routing (siehe SPEC.MD §2).
 */
export function mountPage(page: ReactNode) {
  const elem = document.getElementById("root");
  if (!elem) throw new Error('Kein Element mit id="root" gefunden.');

  const app = <StrictMode>{page}</StrictMode>;

  // https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
  // Ohne das Wiederverwenden des Roots bricht `bun --hot`.
  if (import.meta.hot) {
    // biome-ignore lint/suspicious/noAssignInExpressions: Zuweisung im Ausdruck ist hier Absicht – so dokumentiert Bun das Wiederverwenden des Roots über einen Hot-Reload hinweg.
    (import.meta.hot.data.root ??= createRoot(elem)).render(app);
  } else {
    createRoot(elem).render(app);
  }
}
