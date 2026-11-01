import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";

import { getProject, getProjects } from "@/lib/projects";
import { buttonVariants } from "@/components/ui/button";
import { TechStack } from "@/components/projects/tech-stack";
import { FadeIn } from "@/components/site/fade-in";
import { PageTransition } from "@/components/site/page-transition";
import { BackButton } from "@/components/site/back-button";

export const instant = false;

/** Side column headings: small uppercase tracked labels. */
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

/** Project detail page. Shows the long description (no `summary`, which lives on the /projects rows); `date` only appears here. */
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { Description } = project;

  return (
    <PageTransition>
      <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        {/* Date, back arrow and title fade in on load. Every block blurs out as it scrolls off the top. */}
        <header>
          {project.date && (
            <FadeIn>
              <p className="text-sm font-medium text-primary">{project.date}</p>
            </FadeIn>
          )}
          <FadeIn>
            {/* Same back arrow as the other pages, here back to /projects. -ml cancels the button's inner padding so
                the arrow lines up with the content edge. */}
            <div className="mt-2 -ml-2 flex items-center gap-2 sm:-ml-3 sm:gap-3">
              <BackButton href="/projects" label="Back to all projects" />
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {project.title}
              </h1>
            </div>
          </FadeIn>
        </header>

        <div>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={1280}
            height={720}
            preload
            className="mt-10 aspect-video w-full rounded-lg bg-muted object-cover"
          />
        </div>

        {/* Description beside a narrower side column (2:1); stacked on phones, description first. */}
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <Description />
          </div>

          <aside className="flex flex-col gap-8">
            <div>
              <h2 className={sideHeading}>Tech stack</h2>
              <div className="mt-3">
                <TechStack tech={project.tech} icons={false} />
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
    </PageTransition>
  );
}
