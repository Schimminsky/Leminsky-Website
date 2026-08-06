import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Begrenzt die Zeilenlänge und hält den seitlichen Abstand konsistent. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`.trim()}>{children}</div>
  );
}
