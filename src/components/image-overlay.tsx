import type { ReactNode } from "react";

/*
 * Inverse text block laid over photography. `.inverse` paints a solid black
 * background and sits outside Tailwind's layers, so a utility can't clear it;
 * the inline style does, leaving a gradient scrim to hold contrast.
 */
export function ImageOverlay({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inverse absolute inset-0 flex bg-linear-to-t from-black/60 via-black/10 to-transparent ${className}`}
      style={{ backgroundColor: "transparent" }}
    >
      {children}
    </div>
  );
}
