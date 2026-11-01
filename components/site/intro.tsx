"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";

import { HERO_REPLAY_EVENT } from "@/components/site/home-link";

/** sessionStorage key: set once the welcome screen has been dismissed in this tab. */
const SEEN_KEY = "intro-seen";
/** Fade-out length (matches `duration-500`). */
const FADE_MS = 500;

/**
 * Runs before hydration (see `IntroScript`): marks <html> with `data-intro` when the welcome screen should show,
 * so it is visible from the first paint and never flashes for visitors who already dismissed it.
 */
const SCRIPT = `try{if(!sessionStorage.getItem("${SEEN_KEY}"))document.documentElement.dataset.intro=""}catch(e){}`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}

/**
 * Once-per-session welcome screen: "Welcome to my Portfolio" with a prompt. Scrolling, clicking, tapping or
 * pressing a key fades it out to reveal the site.
 */
export function Intro() {
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!("intro" in root.dataset)) return;
    buttonRef.current?.focus({ preventScroll: true });

    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const events = ["wheel", "touchmove", "pointerdown", "keydown"] as const;
    const leave = () => {
      if (fadeTimer) return;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setLeaving(true);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      fadeTimer = setTimeout(
        () => {
          delete root.dataset.intro;
          // Replay the hero's entrance now that it is visible.
          window.dispatchEvent(new Event(HERO_REPLAY_EVENT));
        },
        reduce ? 0 : FADE_MS,
      );
      events.forEach((name) => window.removeEventListener(name, leave));
    };

    events.forEach((name) => window.addEventListener(name, leave, { passive: true }));
    return () => {
      clearTimeout(fadeTimer);
      events.forEach((name) => window.removeEventListener(name, leave));
    };
  }, []);

  return (
    // Hidden unless <html data-intro> (set by IntroScript before paint); covers everything, header included.
    <div
      className={`intro-overlay fixed inset-0 z-100 bg-background transition-opacity duration-500 motion-reduce:transition-none ${leaving ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-10 px-4 text-center">
        <p className="font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Welcome to my <span className="text-primary">Portfolio</span>
        </p>
        {/* Window listeners handle the dismissal; the button gives keyboard and screen reader users a clear target. */}
        <button
          ref={buttonRef}
          type="button"
          className="flex flex-col items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Scroll or click to continue
          <CaretDownIcon aria-hidden className="size-5 text-primary motion-safe:animate-bounce" />
        </button>
      </div>
    </div>
  );
}
