import { readdirSync } from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";

export type ProjectMeta = {
  title: string;
  /** Short blurb shown only on the home Featured Projects cards. */
  summary: string;
  /** Path under /public, e.g. "/projects/filmshelf.png". */
  image: string;
  tech: string[];
  github: string;
  featured: boolean;
  order: number;
  /** Free text, e.g. "2025" or "Jan–Mar 2025". Shown only on the detail page. */
  date?: string;
  /** What the author did on the project, one bullet per item. Shown only on the detail page. */
  contribution?: string[];
};

export type Project = ProjectMeta & {
  slug: string;
  /** MDX body: the long description, shown only on /projects rows. */
  Description: MDXContent;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const FEATURED_LIMIT = 3;

function getProjectSlugs(): string[] {
  return readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    getProjectSlugs().map(async (slug) => {
      const mod: { default: MDXContent; metadata: ProjectMeta } = await import(
        `@/content/projects/${slug}.mdx`
      );
      return { ...mod.metadata, slug, Description: mod.default };
    }),
  );

  return projects.sort((a, b) => a.order - b.order);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, FEATURED_LIMIT);
}
