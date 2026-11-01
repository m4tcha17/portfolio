import type { Metadata } from "next";

import { getProjects } from "@/lib/projects";
import { ProjectRow } from "@/components/projects/project-row";
import { FadeIn } from "@/components/site/fade-in";
import { BackButton } from "@/components/site/back-button";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn>
        {/* -ml cancels the button's inner padding so the arrow lines up with the content edge. */}
        <div className="-ml-2 flex items-center gap-2 sm:-ml-3 sm:gap-3">
          <BackButton />
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Projects
          </h1>
        </div>
      </FadeIn>
      {/* -mx-4 cancels ProjectRow's p-4 so row content lines up with the heading; the hover background bleeds into the gutter. */}
      <ul className="mt-10 -mx-4 flex flex-col gap-6">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <div>
              <ProjectRow project={project} index={index} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
