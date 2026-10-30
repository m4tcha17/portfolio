import type { Metadata } from "next";

import { getProjects } from "@/lib/projects";
import { ProjectRow } from "@/components/projects/project-row";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Ideas brought to life.</h1>
      {/* -mx-4 cancels ProjectRow's p-4 so row content lines up with the heading; the hover background bleeds into the gutter. */}
      <ul className="mt-10 -mx-4 flex flex-col gap-6">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectRow project={project} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}
