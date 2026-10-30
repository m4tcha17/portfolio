"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";

/**
 * Light/dark toggle. The new theme grows from the button as a circle (View Transitions API, keyframes in globals.css);
 * instant under prefers-reduced-motion or in browsers without `startViewTransition`.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionRef = useRef<ViewTransition | null>(null);

  function toggle() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce || !buttonRef.current) {
      setTheme(next);
      return;
    }

    // Circle centered on the button, large enough to reach the farthest viewport corner.
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const root = document.documentElement;
    root.style.setProperty("--reveal-x", `${x}px`);
    root.style.setProperty("--reveal-y", `${y}px`);
    root.style.setProperty("--reveal-r", `${radius}px`);
    // Scopes the reveal CSS in globals.css to this transition only.
    root.classList.add("theme-reveal");
    const transition = document.startViewTransition(() => {
      // The new snapshot is taken when this callback returns, so the theme class must already be on <html>.
      // next-themes applies it in an effect; flushSync runs it now, and the class swap guarantees it.
      flushSync(() => setTheme(next));
      root.classList.toggle("dark", next === "dark");
    });
    transitionRef.current = transition;
    // A click mid-reveal skips this transition and starts a new one; only the latest may drop the scoping class.
    transition.finished.finally(() => {
      if (transitionRef.current !== transition) return;
      transitionRef.current = null;
      root.classList.remove("theme-reveal");
    });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-300 outline-none hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring/30"
    >
      {/* Both icons render and the `.dark` class picks one, so server and client markup match before the theme is known.
          Showing an icon (display none to inline) restarts its enter animation: the sun or moon spins in on each switch. */}
      <SunIcon
        weight="bold"
        aria-hidden
        className="size-4.5 animate-in spin-in-90 zoom-in-50 fade-in duration-500 dark:hidden motion-reduce:animate-none"
      />
      <MoonIcon
        weight="bold"
        aria-hidden
        className="hidden size-4.5 animate-in -spin-in-90 zoom-in-50 fade-in duration-500 dark:block motion-reduce:animate-none"
      />
    </button>
  );
}
