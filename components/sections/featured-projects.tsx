import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

import { getFeaturedProjects } from "@/lib/projects";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Featured Projects</h2>
        <Link href="/projects" className={buttonVariants({ variant: "quiet" })}>
          More works
          <ArrowRightIcon
            data-icon="inline-end"
            aria-hidden
            className="transition-transform duration-300 group-hover/button:translate-x-1 group-focus-visible/button:translate-x-1 motion-reduce:transition-none motion-reduce:translate-x-0!"
          />
        </Link>
      </div>
      {/* Expanding panels (`panels`/`panel` drive the `panel-open` variant in globals.css):
          the hovered/focused panel widens to 3x; with none, the first stays open. Stacked below sm. */}
      <ul className="panels mt-8 flex flex-col gap-1.5 sm:h-112 sm:flex-row">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="panel aspect-3/2 transition-[flex] duration-500 ease-out sm:aspect-auto sm:min-w-0 sm:flex-1 sm:panel-open:flex-3 motion-reduce:transition-none"
          >
            <ProjectCard project={project} index={index + 1} />
          </li>
        ))}
      </ul>
    </section>
  );
}
