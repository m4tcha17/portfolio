"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Paths where the footer is hidden. */
const HIDDEN_ON = ["/contact"];

/**
 * Hides the footer on the current path. Based on the URL rather than a marker in the page: with `cacheComponents`,
 * pages you left stay mounted (hidden in `<Activity>`), so a marker from `/contact` would keep hiding the footer
 * on every page visited after it.
 */
export function FooterVisibility({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return HIDDEN_ON.includes(pathname) ? null : children;
}
