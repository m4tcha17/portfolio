import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";

import type { Project } from "@/lib/projects";
import { buttonVariants } from "@/components/ui/button";
import { ProjectRowLink } from "@/components/projects/project-row-link";
import { NAV_FORWARD } from "@/components/site/page-transition";
import { cn } from "@/lib/utils";

/**
 * `/projects` list row: image, title, summary, and two buttons ("Case study" to the detail page, "View on GitHub" to the repo).
 * Hovering (or focusing inside) the row zooms the image in its frame and tints index and title primary; the Case study
 * arrow nudges right only when the button itself is hovered/focused. CSS only; no zoom or nudge under prefers-reduced-motion.
 * The whole row navigates on click (ProjectRowLink) but its text stays selectable; the title link is kept for keyboard users.
 * Image and text swap sides on every other row from `sm` up; phones stay stacked, image first.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <ProjectRowLink
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative grid cursor-pointer gap-6 rounded-lg p-4 transition-colors has-[a[data-row-link]:focus-visible]:ring-2 has-[a[data-row-link]:focus-visible]:ring-ring sm:items-center sm:gap-10",
        flipped ? "sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
      )}
    >
      {/* Out of the tab order and hidden from screen readers: the title link already covers this destination. */}
      <Link href={`/projects/${project.slug}`} transitionTypes={NAV_FORWARD} data-row-link tabIndex={-1} aria-hidden className={cn("block overflow-hidden rounded-md", flipped && "sm:order-last")}>
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={640}
          height={360}
          className="aspect-video w-full bg-muted object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105 motion-reduce:transition-none motion-reduce:scale-100!"
        />
      </Link>
      <div className="flex flex-col gap-4">
        <h2 className="flex items-baseline gap-3 font-heading text-2xl font-semibold tracking-tight text-foreground">
          <span aria-hidden className="font-mono text-sm font-normal text-muted-foreground tabular-nums transition-colors duration-300 group-hover:text-primary group-focus-within:text-primary motion-reduce:transition-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Link
            href={`/projects/${project.slug}`}
            transitionTypes={NAV_FORWARD}
            data-row-link
            className="outline-none transition-colors duration-300 group-hover:text-primary group-focus-within:text-primary motion-reduce:transition-none"
          >
            {project.title}
          </Link>
        </h2>
        <p className="text-base text-muted-foreground">{project.summary}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            transitionTypes={NAV_FORWARD}
            className={buttonVariants({ size: "lg" })}
          >
            Case study
            <ArrowRightIcon
              data-icon="inline-end"
              aria-hidden
              className="transition-transform duration-300 group-hover/button:translate-x-1 group-focus-visible/button:translate-x-1 motion-reduce:transition-none motion-reduce:translate-x-0!"
            />
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "hover:bg-transparent hover:text-primary focus-visible:text-primary dark:hover:bg-transparent",
            )}
          >
            <GithubLogoIcon
              data-icon="inline-start"
              aria-hidden
              className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-focus-visible/button:-translate-y-0.5 motion-reduce:transition-none motion-reduce:translate-y-0!"
            />
            View on GitHub
          </a>
        </div>
      </div>
    </ProjectRowLink>
  );
}
