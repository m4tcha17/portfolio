"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/theme-toggle";

/**
 * Burger button that hides the theme toggle. Opening turns the three lines upright one after another, top to bottom,
 * into a vertical burger; then the toggle unrolls downward beneath it (clip-path). CSS transitions only; instant
 * under prefers-reduced-motion. While closed the panel is `inert`, so the hidden toggle can't take focus.
 */
export function ThemeMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const line =
    "absolute inset-x-0 mx-auto h-0.5 w-4.5 rounded-full bg-current transition-[translate,rotate] duration-300 ease-out motion-reduce:transition-none";

  return (
    <div
      className={cn("relative", className)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Hide theme toggle" : "Show theme toggle"}
        className="relative inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors duration-300 outline-none hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring/30 aria-expanded:text-primary"
      >
        {/* Each line turns upright and moves to its column (left, middle, right), staggered top to bottom. */}
        <span aria-hidden className={cn(line, "top-2.25", open && "translate-x-[-0.375rem] translate-y-1.5 rotate-90")} />
        <span aria-hidden className={cn(line, "top-3.75", open && "rotate-90 delay-75")} />
        <span
          aria-hidden
          className={cn(line, "top-5.25", open && "translate-x-[0.375rem] -translate-y-1.5 rotate-90 delay-150")}
        />
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "absolute top-full left-0 pt-2 transition-[clip-path,opacity,translate] duration-300 ease-out motion-reduce:transition-none",
          open
            ? "translate-y-0 opacity-100 delay-200 [clip-path:inset(0_0_0_0)]"
            : "-translate-y-1 opacity-0 [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <ThemeToggle />
      </div>
    </div>
  );
}
