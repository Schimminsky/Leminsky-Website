import { type ReactNode, useId } from "react";

type SectionProps = {
  /** Optionale Überschrift. Ist sie gesetzt, benennt sie die Section auch für Screenreader. */
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ title, children, className = "" }: SectionProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={title ? headingId : undefined} className={`py-8 ${className}`.trim()}>
      {title && (
        <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-content">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
