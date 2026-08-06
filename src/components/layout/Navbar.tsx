import { Container } from "@/components/layout/Container";
import { mainNav } from "@/data/navigation";

type NavbarProps = {
  /** Pfad der aktuellen Seite. Ohne clientseitiges Routing weiß nur die Seite selbst, wo sie steht. */
  activePath?: string;
};

export function Navbar({ activePath }: NavbarProps) {
  return (
    <header className="border-b border-line">
      <Container>
        <nav aria-label="Hauptnavigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 py-4">
            {mainNav.map((item) => {
              const isActive = item.href === activePath;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "rounded-sm text-sm font-medium text-accent underline decoration-2 underline-offset-8"
                        : "rounded-sm text-sm font-medium text-content-muted transition-colors hover:text-content"
                    }
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
