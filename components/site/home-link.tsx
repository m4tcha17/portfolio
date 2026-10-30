"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Link to `/`. Clicking it while already on the home page is a same-route navigation, so the page
 * does not scroll; this scrolls back to the top instead.
 */
export function HomeLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={(event) => {
        onClick?.(event);
        if (pathname === "/") {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }
      }}
      {...props}
    />
  );
}
