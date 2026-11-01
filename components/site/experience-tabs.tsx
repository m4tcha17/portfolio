"use client";

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** `/experience` sections, in nav order. Add an entry here (and a panel on the page) for a new section. */
export const EXPERIENCE_SECTIONS = [
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
] as const;

export type ExperienceSection = (typeof EXPERIENCE_SECTIONS)[number]["id"];

/** Panel id the section buttons control (`aria-controls`). */
const PANELS_ID = "experience-panels";

// Selected section, shared by ExperienceNav and ExperiencePanels. Switches in place, no URL.
let current: ExperienceSection = "education";
const listeners = new Set<() => void>();

function select(section: ExperienceSection) {
  current = section;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function useSection() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "education" as const,
  );
}

/**
 * Section switch under the page heading: centered, rounded bordered bar with uppercase tracked labels (main nav
 * typography, smaller). Hover/focus turns a label primary. The selected one sits on a primary-tinted pill that morphs
 * (slides and resizes) to the next label on switch; instant under prefers-reduced-motion.
 *
 * The pill is measured from the selected button and moved by writing styles directly (no state, no extra render).
 * Until that first measurement (server HTML, before hydration) the selected button carries the tint itself;
 * `data-ready` hands it to the pill, and `data-animate` turns on its transition a frame later so it doesn't slide in
 * from the left edge on load.
 */
export function ExperienceNav() {
  const section = useSection();
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;

    const place = () => {
      const button = bar.querySelector<HTMLElement>(`[data-section="${section}"]`);
      if (!button) return;
      // Offset from the bar's padding edge (where the pill's `left-0` sits), not offsetLeft: the button's offsetParent
      // is the relative <ul>, which starts inside the bar's padding.
      const left = button.getBoundingClientRect().left - bar.getBoundingClientRect().left - bar.clientLeft;
      pill.style.width = `${button.offsetWidth}px`;
      pill.style.transform = `translateX(${left}px)`;
    };
    place();

    bar.dataset.ready = "";
    // Checked on every run, not just the first: a cleanup (e.g. Strict Mode's double effect) may cancel this frame.
    let frame = 0;
    if (!("animate" in bar.dataset)) {
      frame = requestAnimationFrame(() => {
        bar.dataset.animate = "";
      });
    }

    // Labels change width when the web font loads or the text size changes.
    const observer = new ResizeObserver(place);
    observer.observe(bar);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [section]);

  return (
    <nav aria-label="Experience sections" className="mt-8 flex justify-center">
      <div
        ref={barRef}
        className="group/bar relative rounded-full border border-border bg-background/60 p-1 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase backdrop-blur"
      >
        <span
          ref={pillRef}
          aria-hidden
          className="absolute inset-y-1 left-0 rounded-full bg-primary/10 opacity-0 group-data-ready/bar:opacity-100 group-data-animate/bar:transition-[translate,transform,width] group-data-animate/bar:duration-400 group-data-animate/bar:ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none!"
        />
        <ul className="relative flex gap-1">
          {EXPERIENCE_SECTIONS.map((item) => {
            const active = item.id === section;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  data-section={item.id}
                  onClick={() => select(item.id)}
                  aria-controls={PANELS_ID}
                  aria-pressed={active}
                  className={cn(
                    "cursor-pointer rounded-full px-5 py-2 uppercase outline-none transition-colors duration-300 ease-out hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring/30 motion-reduce:transition-none",
                    active && "bg-primary/10 text-primary group-data-ready/bar:bg-transparent",
                  )}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/**
 * One panel per section, stacked in the same grid cell. Each inactive panel waits faded out on the side matching its
 * place in the nav (left of the selected tab: left; right of it: right), so switching slides the new panel in from
 * its side while the old one slides out the other way. CSS only; under prefers-reduced-motion it swaps instantly with
 * no movement. The hidden panel is inert, so it can't be focused or read. The wrapper clips the sideways offset
 * (padded out into the page gutter so the clip sits just beyond the text) to avoid a horizontal scrollbar.
 */
export function ExperiencePanels({ panels }: { panels: Record<ExperienceSection, ReactNode> }) {
  const section = useSection();
  const selected = EXPERIENCE_SECTIONS.findIndex(({ id }) => id === section);

  return (
    <div className="-mx-4 overflow-x-clip px-4">
      <div id={PANELS_ID} className="grid">
        {EXPERIENCE_SECTIONS.map(({ id }, index) => (
          <div
            key={id}
            inert={index !== selected}
            className={cn(
              "col-start-1 row-start-1 transition-[opacity,translate] duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:translate-x-0! motion-reduce:transition-none",
              index === selected && "translate-x-0 opacity-100",
              index < selected && "pointer-events-none -translate-x-12 opacity-0",
              index > selected && "pointer-events-none translate-x-12 opacity-0",
            )}
          >
            {panels[id]}
          </div>
        ))}
      </div>
    </div>
  );
}
