"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { NAV_FORWARD } from "@/components/site/page-transition";
import { HomeLink } from "@/components/site/home-link";

/**
 * Nav link marked `aria-current="page"` while on its page or a page below it
 * (`/projects/[slug]` keeps Projects active). Hash links (e.g. `/#projects`) only scroll, so they never
 * count as the current page.
 *
 * On the home page, a hash link scrolls to its section itself: next/link skips a navigation to the
 * URL already shown, so a second click on a hash link would otherwise do nothing.
 *
 * Page links slide forward (rightward) unless the caller passes its own `transitionTypes`. The home link (`/`) renders
 * as HomeLink instead: it slides back (leftward) and, on the home page, scrolls to the top.
 */
export function NavLink({ href, className, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const active = !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  if (href === "/") {
    return (
      <HomeLink
        onClick={onClick}
        aria-current={pathname === "/" ? "page" : undefined}
        className={cn(className, pathname === "/" && "md:translate-x-1.5 text-primary")}
        {...props}
      />
    );
  }

  return (
    <Link
      href={href}
      transitionTypes={NAV_FORWARD}
      onClick={(event) => {
        onClick?.(event);
        const [path, hash] = href.split("#");
        const section = hash && pathname === path ? document.getElementById(hash) : null;
        if (event.defaultPrevented || !section) return;
        event.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        // Keep Next's history state so back/forward still work.
        window.history.replaceState(window.history.state, "", href);
      }}
      aria-current={active ? "page" : undefined}
      className={cn(className, active && "md:translate-x-1.5 text-primary")}
      {...props}
    />
  );
}
