import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

import { getFeaturedProjects } from "@/lib/projects";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Projects</h2>
        <Link href="/projects" className={buttonVariants({ size: "lg", variant: "quiet" })}>
          All projects
          <ArrowRightIcon
            data-icon="inline-end"
            aria-hidden
            className="transition-transform duration-300 group-hover/button:translate-x-1 group-focus-visible/button:translate-x-1 motion-reduce:transition-none motion-reduce:translate-x-0!"
          />
        </Link>
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
