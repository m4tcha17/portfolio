"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Keeps the hero's load fades to the first load. With `cacheComponents` the home route stays hidden in `<Activity>`
 * (`display: none`) while another page is shown, and showing it again would restart the CSS fades. The effect cleanup
 * runs when the route is hidden and sets `data-hero-played`, which switches the fades off (`app/globals.css`).
 */
export function HeroOnce({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    return () => node?.setAttribute("data-hero-played", "");
  }, []);

  return <div ref={root}>{children}</div>;
}
