"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Header nav link marked `aria-current="page"` while on its page or a page below it
 * (`/projects/[slug]` keeps Projects active). Hash links (`/#contact`) only scroll, so they never
 * count as the current page.
 *
 * On the home page, a hash link scrolls to its section itself: next/link skips a navigation to the
 * URL already shown, so a second click on `/#contact` would otherwise do nothing.
 */
export function NavLink({ href, className, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const active = !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
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
      className={cn(className, active && "text-primary after:scale-x-100")}
      {...props}
    />
  );
}
