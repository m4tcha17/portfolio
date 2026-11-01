import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { TechStack } from "@/components/projects/tech-stack";
import { NAV_FORWARD } from "@/components/site/page-transition";

/**
 * Home Featured Projects panel. Collapsed: dimmed grayscale image with index and title.
 * Expanded (`panel-open`, see globals.css): full color, darker bottom gradient, tech stack.
 * Touch screens (no hover) always show color and, from sm, the tech stack. Below sm the tech stack is hidden.
 */
export function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  /** 1-based position, shown as "01". */
  index: number;
  className?: string;
}) {
  const tone =
    "grayscale brightness-75 transition-[filter] duration-500 panel-open:grayscale-0 panel-open:brightness-100 pointer-coarse:grayscale-0 pointer-coarse:brightness-100 motion-reduce:transition-none";

  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={NAV_FORWARD}
      className={cn(
        "group relative block h-full overflow-hidden bg-muted ring-1 ring-inset ring-foreground/10 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes="(min-width: 640px) 60vw, 100vw"
        className={cn("object-cover", tone)}
        style={{ objectPosition: project.imagePosition }}
      />
      {/* Bottom darkening: one light gradient, same at rest and expanded, keeps the text readable. Taller when stacked (below sm). */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-4/5 sm:h-3/5 bg-linear-to-t from-scrim/90 via-scrim/50 via-35% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-5 pb-5 text-scrim-foreground">
        <p className="font-mono text-sm font-bold tracking-widest">{String(index).padStart(2, "0")}</p>
        <h3 className="group/title mt-1 flex items-center gap-1.5 font-heading text-2xl font-medium">
          <span className="truncate">{project.title}</span>
          <ArrowUpRightIcon
            aria-hidden
            className="size-5 shrink-0 opacity-0 transition-[opacity,translate] duration-300 group-hover/title:translate-x-1 group-hover/title:-translate-y-1 panel-open:opacity-100 pointer-coarse:opacity-100 motion-reduce:transition-none motion-reduce:translate-0!"
          />
        </h3>
        {/* Tech stack unrolls when expanded. From sm with a mouse, its width is fixed to the open panel's final content width
            (3/5 of the row (100cqw, the .panels container) minus the two 0.375rem gaps, minus px-5), so chips wrap the
            same way throughout the widen animation; collapsed panels clip it. Touch from sm: the card's width. Hidden below sm. */}
        <div className="grid max-sm:hidden grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 panel-open:grid-rows-[1fr] panel-open:opacity-100 panel-open:delay-150 pointer-coarse:grid-rows-[1fr] pointer-coarse:opacity-100 motion-reduce:transition-none motion-reduce:delay-0!">
          <div className="min-h-0 w-full overflow-hidden sm:pointer-fine:w-[calc((100cqw-0.75rem)*0.6-2.5rem)]">
            <div className="pt-3">
              <TechStack tech={project.tech} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
