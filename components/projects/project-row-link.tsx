"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * Makes a whole `/projects` row clickable without covering its text, so the text stays selectable.
 * A click that ends a text selection, or lands on a link/button inside the row, does not navigate.
 */
export function ProjectRowLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLElement>) {
    if ((event.target as Element).closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    if (event.metaKey || event.ctrlKey) {
      window.open(href, "_blank", "noopener");
      return;
    }
    router.push(href);
  }

  return (
    <article className={className} onClick={handleClick}>
      {children}
    </article>
  );
}
