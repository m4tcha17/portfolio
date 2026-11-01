"use client";

import { useLenis } from "lenis/react";
import type { ComponentProps } from "react";

/**
 * "Back to top" link: animates the scroll through Lenis (instant under prefers-reduced-motion, which Lenis honors).
 * Lenis only handles `#id` anchors, so a bare `#` would jump. Falls back to native smooth scroll without Lenis, and to
 * the plain `#` link without JavaScript.
 */
export function BackToTop({ onClick, ...props }: Omit<ComponentProps<"a">, "href">) {
  const lenis = useLenis();

  return (
    <a
      href="#"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        if (lenis) {
          lenis.scrollTo(0);
          return;
        }
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      {...props}
    />
  );
}
