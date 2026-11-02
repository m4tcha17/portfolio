"use client";

import { useId, useState, type ReactNode } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";

/** Hero description: `summary` always shown, `more` revealed by a "More about me" toggle (height + fade, CSS only). */
export function HeroDescription({ summary, more }: { summary: ReactNode; more: ReactNode }) {
  const [open, setOpen] = useState(false);
  const moreId = useId();

  return (
    <div className="mt-6 max-w-3xl text-base leading-snug text-muted-foreground sm:text-[1.5rem]">
      <p className="w-fit">{summary}</p>
      {/* grid-rows 0fr -> 1fr animates to the content's natural height; inert keeps hidden text out of tab order and screen readers. */}
      <div
        id={moreId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="w-fit pt-3">{more}</p>
        </div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={moreId}
        onClick={() => setOpen((value) => !value)}
        className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors outline-none hover:text-primary focus-visible:text-primary sm:text-base"
      >
        {open ? "Show less" : "More about me"}
        <CaretDownIcon
          aria-hidden
          className={`size-3.5 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
