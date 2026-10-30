import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";

import { getProject, getProjects } from "@/lib/projects";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TechStack } from "@/components/projects/tech-stack";

export const instant = false;

/** Side column headings, styled like the /about role · location line. */
const sideHeading = "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase";

// `dynamicParams` is unavailable with cacheComponents; unknown slugs hit notFound().
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

/** Project detail page. Shows both `summary` and the long description; `date` only appears here. */
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { Description } = project;

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2 hover:bg-transparent hover:text-primary focus-visible:text-primary dark:hover:bg-transparent",
        )}
      >
        <ArrowLeftIcon
          data-icon="inline-start"
          aria-hidden
          className="transition-transform duration-300 group-hover/button:-translate-x-0.5 group-focus-visible/button:-translate-x-0.5 motion-reduce:transition-none motion-reduce:translate-x-0!"
        />
        All projects
      </Link>

      <header className="mt-8">
        {project.date && <p className="text-sm font-medium text-primary">{project.date}</p>}
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>
      </header>

      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        width={1280}
        height={720}
        preload
        className="mt-10 aspect-video w-full rounded-lg bg-muted object-cover"
      />

      {/* Description beside a narrower side column (2:1); stacked on phones, description first. */}
      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <Description />
        </div>

        <aside className="flex flex-col gap-8">
          <div>
            <h2 className={sideHeading}>Tech stack</h2>
            <div className="mt-3">
              <TechStack tech={project.tech} />
            </div>
          </div>

          {project.contribution && project.contribution.length > 0 && (
            <div>
              <h2 className={sideHeading}>My contribution</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
                {project.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              <GithubLogoIcon
                data-icon="inline-start"
                aria-hidden
                className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-focus-visible/button:-translate-y-0.5 motion-reduce:transition-none motion-reduce:translate-y-0!"
              />
              View on GitHub
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
