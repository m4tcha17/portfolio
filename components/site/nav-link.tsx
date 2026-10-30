"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Header nav link marked `aria-current="page"` while on its page or a page below it
 * (`/projects/[slug]` keeps Projects active). Hash links (`/#contact`) only scroll, so they never
 * count as the current page. `/` is active only on the home page itself.
 *
 * On the home page, a hash link scrolls to its section itself and `/` scrolls back to the top:
 * next/link skips a navigation to the URL already shown, so a second click would otherwise do nothing.
 */
export function NavLink({ href, className, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const isHome = href === "/";
  const active = !href.includes("#") && (pathname === href || (!isHome && pathname.startsWith(`${href}/`)));

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        const [path, hash] = href.split("#");
        if (event.defaultPrevented || pathname !== (path || "/")) return;
        const section = hash ? document.getElementById(hash) : null;
        if (!section && !isHome) return;
        event.preventDefault();
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        if (section) section.scrollIntoView({ behavior });
        else window.scrollTo({ top: 0, behavior });
        // Keep Next's history state so back/forward still work.
        window.history.replaceState(window.history.state, "", href);
      }}
      aria-current={active ? "page" : undefined}
      className={cn(className, active && "text-primary after:scale-x-100")}
      {...props}
    />
  );
}
