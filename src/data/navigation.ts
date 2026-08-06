import type { NavItem } from "@/types/navigation";

/** Hauptnavigation in der Navbar. */
export const mainNav = [
  { href: "/", label: "Start" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/lebenslauf", label: "Lebenslauf" },
  { href: "/skills", label: "Skills" },
  { href: "/projekte", label: "Projekte" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
] satisfies NavItem[];

/**
 * Rechtliches im Footer. Datenschutz ist verpflichtend (Art. 13 DSGVO),
 * das Impressum ist eine offene Frage – siehe SPEC.MD §5.
 */
export const legalNav = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] satisfies NavItem[];
