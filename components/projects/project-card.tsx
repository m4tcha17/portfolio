import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TechStack } from "@/components/projects/tech-stack";
import { ProjectRowLink } from "@/components/projects/project-row-link";

/**
 * Home Featured Projects card. Shows `summary`, never the long description; everything is visible without hover.
 * The whole card opens the detail page (ProjectRowLink) while its text stays selectable; the GitHub link goes to the repo only.
 */
export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <ProjectRowLink
      href={href}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-card ring-1 ring-foreground/10 transition-shadow hover:ring-primary/40 has-[a[data-row-link]:focus-visible]:ring-2 has-[a[data-row-link]:focus-visible]:ring-ring"
    >
      {/* Out of the tab order and hidden from screen readers: the title link already covers this destination. */}
      <Link href={href} data-row-link tabIndex={-1} aria-hidden>
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={640}
          height={360}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full bg-muted object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={href}
            data-row-link
            className="outline-none transition-colors duration-300 group-hover:text-primary focus-visible:text-primary motion-reduce:transition-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-auto pt-2">
          <TechStack tech={project.tech} />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "default" }),
              "-ml-2 text-muted-foreground hover:bg-transparent hover:text-primary focus-visible:text-primary",
            )}
          >
            <GithubLogoIcon data-icon="inline-start" aria-hidden />
            GitHub
          </a>
          {/* Visual cue only: the card itself is the link. */}
          <span aria-hidden className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            Details
            <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </span>
        </div>
      </div>
    </ProjectRowLink>
  );
}
