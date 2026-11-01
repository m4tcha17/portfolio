import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Fades its content in on mount (CSS `.fade-in` in globals.css; replays on remount). */
export function FadeIn({
  delay = 0,
  className,
  children,
}: {
  /** Seconds before the fade starts. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("fade-in", className)}
      style={delay ? ({ "--fade-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
