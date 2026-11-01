"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useLenis } from "lenis/react";

import { NAV_BACK } from "@/components/site/page-transition";

/**
 * Link to `/`. Clicking it while already on the home page is a same-route navigation, so React keeps the hero
 * mounted and the page does not scroll: this scrolls back to the top (through Lenis when running). From another page
 * it slides back (leftward).
 */
export function HomeLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();
  const lenis = useLenis();

  return (
    <Link
      href="/"
      transitionTypes={NAV_BACK}
      onClick={(event) => {
        onClick?.(event);
        if (pathname === "/") {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (lenis) lenis.scrollTo(0, { immediate: reduce });
          else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }
      }}
      {...props}
    />
  );
}
