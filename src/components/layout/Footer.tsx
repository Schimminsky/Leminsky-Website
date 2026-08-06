import { Container } from "@/components/layout/Container";
import { legalNav } from "@/data/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-sm text-content-muted">
          <p>© {year} Jean-Luc Leminsky</p>

          {/* Social-Links folgen in Phase 2 mit data/socials.ts. */}
          <nav aria-label="Rechtliches">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-sm transition-colors hover:text-content hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
