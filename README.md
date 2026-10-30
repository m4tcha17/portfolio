# Portfolio

Personal portfolio of James Ang, Software Developer. A fully static site built with Next.js and deployed on Vercel.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) with TypeScript
- React 19
- Tailwind CSS v4 + [shadcn](https://ui.shadcn.com) (Base UI primitives)
- [React Bits](https://reactbits.dev) + GSAP for animations
- MDX via `@next/mdx` for content
- Phosphor icons
- pnpm

## Pages

- `/` — Hero, skills marquee, featured projects, contact
- `/about` — profile photo, bio, skills
- `/projects` — all projects
- `/projects/[slug]` — project detail page

## Getting Started

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script       | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start the dev server         |
| `pnpm build` | Build for production         |
| `pnpm start` | Serve the production build   |
| `pnpm lint`  | Run ESLint                   |

## Editing Content

| What                                | Where                         |
| ----------------------------------- | ----------------------------- |
| Name, role, tagline, email, socials, skills | `content/site.ts`     |
| About bio                           | `content/about.mdx`           |
| Projects                            | `content/projects/<slug>.mdx` |
| Images                              | `public/`                     |

### Adding a project

Create `content/projects/<slug>.mdx`. It exports `metadata`, and its body is the long description (4–5 sentences max):

```mdx
export const metadata = {
  title: "Project Name",
  summary: "One-line summary shown on home cards and the detail page.",
  image: "/images/project-name.jpg",
  tech: ["Next.js", "TypeScript"],
  github: "https://github.com/<user>/<repo>",
  featured: true, // shown on the home page (max 3)
  order: 1,       // sort order
  date: "2026",   // optional, shown on the detail page only
}

Long description of the project.
```

The detail page is generated at build time from the filename slug.

## Deployment

The site is hosted on [Vercel](https://vercel.com).

1. Push the repository to GitHub.
2. In Vercel, select **Add New → Project** and import the repository.
3. Keep the defaults. Vercel detects Next.js and uses pnpm from `pnpm-lock.yaml`:
   - Framework Preset: **Next.js**
   - Install Command: `pnpm install`
   - Build Command: `pnpm build`
4. Select **Deploy**.

No environment variables are required. Every push to `main` triggers a production deployment, and pushes to other branches or pull requests get preview deployments.

To check a build locally before pushing:

```bash
pnpm build && pnpm start
```
