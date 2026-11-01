import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Home Featured Projects bento tile. Shows `summary`, never the long description. */
export function ProjectCard({
  project,
  large = false,
  className,
}: {
  project: Project;
  /** The big bento tile gets a larger title and image `sizes`. */
  large?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block h-full overflow-hidden rounded-lg bg-muted ring-1 ring-inset ring-foreground/10 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes={large ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {/* Progressive blur: softens image detail behind the text, fading out upward, so any screenshot stays readable. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 backdrop-blur-sm mask-t-from-40%" />
      {/* Gradient scrim: fades the image under the text instead of a boxed band. */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-scrim/70 via-scrim/40 via-50% to-transparent px-6 pt-10 pb-5 text-scrim-foreground">
        <h3
          className={cn(
            "flex items-center gap-1.5 font-heading font-medium transition-colors duration-300 group-hover:text-primary-on-scrim group-focus-visible:text-primary-on-scrim",
            large ? "text-2xl" : "text-lg",
          )}
        >
          {project.title}
          <ArrowUpRightIcon aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-0" />
        </h3>
        {/* Summary reveals on hover/focus; always visible on touch screens (no hover). */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 pointer-coarse:grid-rows-[1fr] pointer-coarse:opacity-100 motion-reduce:transition-none">
          <p className="min-h-0 line-clamp-1 pt-1 text-sm">{project.summary}</p>
        </div>
      </div>
    </Link>
  );
}
