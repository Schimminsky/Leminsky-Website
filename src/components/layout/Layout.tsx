import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type LayoutProps = {
  /** Wird als <h1> der Seite gerendert – nicht zu verwechseln mit dem <title> im HTML-Kopf. */
  title: string;
  /** Pfad der aktuellen Seite, markiert den passenden Eintrag in der Navigation. */
  activePath?: string;
  children: ReactNode;
};

/**
 * Gemeinsames Seitengerüst: Skip-Link, Navbar, Hauptbereich, Footer.
 * Ohne diese Klammer müssten Landmarks und Skip-Link in jeder der zehn
 * Seiten dupliziert werden.
 */
export function Layout({ title, activePath, children }: LayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface-raised focus:px-4 focus:py-2 focus:text-content"
      >
        Zum Hauptinhalt springen
      </a>

      <Navbar activePath={activePath} />

      {/* tabIndex={-1}: sonst versetzt der Skip-Link den Fokus nicht wirklich. */}
      <main id="inhalt" tabIndex={-1}>
        <Container>
          <h1 className="pt-12 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <div className="pt-4 pb-16 text-content-muted">{children}</div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
