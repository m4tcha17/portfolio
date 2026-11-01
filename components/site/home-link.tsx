"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useLenis } from "lenis/react";

import { NAV_BACK } from "@/components/site/page-transition";

/** Fired when a home link is clicked; `HeroReplay` listens and replays the hero animations. */
export const HERO_REPLAY_EVENT = "hero:replay";

/**
 * Set when a home link is clicked from another page. With `cacheComponents` the home page stays
 * mounted but hidden in `<Activity>`, its effects (and so `HeroReplay`'s listener) are cleaned up,
 * and the event would be missed. `HeroReplay` consumes this flag when its effects run again.
 */
let replayPending = false;

/** Returns whether a replay was requested while the hero was hidden, and clears the request. */
export function consumeHeroReplay() {
  const pending = replayPending;
  replayPending = false;
  return pending;
}

/**
 * Link to `/` that also replays the hero animations. Clicking it while already on the home page
 * is a same-route navigation, so React keeps the hero mounted (animations would not rerun) and
 * the page does not scroll, so this also scrolls back to the top (through Lenis when running). From another page it
 * slides back (leftward).
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
          window.dispatchEvent(new Event(HERO_REPLAY_EVENT));
        } else {
          replayPending = true;
        }
      }}
      {...props}
    />
  );
}
