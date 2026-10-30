@AGENTS.md

# Project Rules

1. Only use the skills necessary for the task given. Do not invoke unrelated skills.
2. No version control manipulation at any cost (no `git add`, `commit`, `push`, `branch`, `checkout`, `reset`, `stash`, etc.) except when explicitly asked for by the user.
3. Strictly follow the system design and scope in this file to avoid scope creep. Anything outside it (new pages, features, libraries) must be proposed to and approved by the user first.
4. Use React Bits (`@react-bits` registry in `components.json`) for UI animations. Install with `pnpm dlx shadcn@latest add @react-bits/<Component>`.
5. Ask the user to review developed code after each unit of work. Do not make changes that were not approved by the user beforehand.

# Stack

- Next.js 16 (App Router, `cacheComponents`, `partialPrefetching`) with TypeScript
- React 19
- Tailwind CSS v4 + shadcn (`base-mira` style, Base UI primitives); theme tokens live in `app/globals.css`
- Phosphor icons (`@phosphor-icons/react`)
- `next-themes` for light/dark mode
- MDX via `@next/mdx` for content
- pnpm

# Scope

- **Home `/`**: single scrolling page with sections Hero, Skills Marquee, Featured Projects, Contact.
- **First screen**: Hero and Skills Marquee together fill the viewport below the header; Featured Projects starts below the fold.
- **Skills Marquee** (home, between Hero and Featured Projects): thin strip of `site.skills` scrolling horizontally (React Bits `LogoLoop`), static under `prefers-reduced-motion`.
- **`/about`**: bookish layout (layout only, site fonts unchanged), three sections separated by ornament dividers:
  - Intro: name (the page's h1), role · location line, ornament divider, profile photo (`public/profile.jpg`) beside the About bio from `content/about.mdx` (drop cap), then an epigraph quote.
  - Skills: `site.skillGroups` in three categories (Languages, Libraries & Frameworks, Backend & Infrastructure), chips per group.
  - What I'm doing now: `site.now` list of label + text items.
  - Lattice Loader (React Bits `LatticeLoader`) left-aligned under the bio: "Thinking" briefly, then "Thought for Ns", as if the bio was just reasoned out.
- **Featured Projects**: max 3 cards, selected by `featured: true` and sorted by `order`. Each card links to `/projects/[slug]`. A "More works" button links to `/projects`.
- **`/projects`**: one page listing all projects, one project per row. Each row shows image, title, long description (MDX body, 4–5 sentences max), tech stack chips, and a GitHub button. Each row links to `/projects/[slug]`; the GitHub button links to the repo only.
- **`/projects/[slug]`**: one detail page per project showing image, title, summary, date (if set), tech stack, long description, a GitHub button, and a back link to `/projects`. Below the image, the long description sits beside a narrower side column (2:1) with the tech stack, "My contribution" (if set) and the GitHub button.
- **Contact** (home, `#contact`): "Get in touch" heading, short text, and one button (destination TBD; temporary mailto).
- **Footer**: copyright, mailto link, and social links. This is the only place email and socials appear.
- **Theme**: light/dark toggle at the top-right of the header. First visit follows the system setting; the visitor's choice persists across reloads (`next-themes`, `.dark` class on `<html>`). Switching plays a circle reveal from the toggle (View Transitions API), instant under `prefers-reduced-motion` or without browser support.
- **Out of scope**: blog, contact form, CMS, backend, metadata fields beyond those listed under Content.
- Fully static site.

# Roadmap

1. **Base implementation** (phases 1–7): CLAUDE.md, MDX pipeline, layout shell, home sections, project metadata, `/projects` list, `/projects/[slug]` detail page. No animations in this stage.
2. **Fine-tuning**: animations (React Bits) and layout/design adjusted to the user's exact preferences. Each change is proposed and approved before implementation.

# System Design

## Content

- Each project is one file in `content/projects/<slug>.mdx`. It exports `metadata` (`title`, `summary`, `image`, `tech`, `github`, `featured`, `order`, optional `date`, optional `contribution`) and its body is the long description.
- Rendering rule:
  - Home Featured Projects cards: `summary` only.
  - `/projects` rows: long description (MDX body) only.
  - `/projects/[slug]`: both `summary` and long description. `date` and `contribution` (bullet list) are shown only here.
- `lib/projects.ts` holds the `ProjectMeta` type, `getProjects()` (reads `content/projects/` server-side, sorted by `order`), `getFeaturedProjects()` (featured, first 3) and `getProject(slug)`.
- `content/site.ts`: typed profile data (name, role, location, tagline, email, socials, skills for the home marquee, and for `/about`: quote, skillGroups, now).
- `content/about.mdx`: About bio.
- Project images live in `public/projects/<slug>.(png|webp)` and render with `next/image`.

## Structure

```
app/
  layout.tsx            # metadata, SiteHeader, SiteFooter
  page.tsx              # Hero, SkillsMarquee, FeaturedProjects, Contact
  about/page.tsx        # About intro, AboutSkills, AboutNow
  projects/page.tsx     # all projects, one ProjectRow each
  projects/[slug]/page.tsx  # project detail page
components/
  ui/                   # shadcn components
  site/                 # header.tsx, nav-link.tsx, footer.tsx, section-divider.tsx, ornament-divider.tsx, home-link.tsx, theme-provider.tsx, theme-toggle.tsx
  sections/             # hero.tsx, hero-replay.tsx, hero-terminal.tsx, about.tsx, about-thought.tsx, about-skills.tsx, about-now.tsx, skills-marquee.tsx, featured-projects.tsx, contact.tsx
  projects/             # project-card.tsx, project-row.tsx, tech-stack.tsx
  animations/           # React Bits components (logo-loop.tsx, lattice-loader.tsx)
content/                # site.ts, about.mdx, projects/*.mdx
lib/                    # utils.ts, projects.ts
mdx-components.tsx
```

## Conventions

- Server Components by default. Use `"use client"` only for animations and interactive parts.
- Use only theme tokens (`bg-background`, `text-primary`, etc.). No hardcoded colors.
- Animations respect `prefers-reduced-motion`.
- `dynamicParams` is unavailable with `cacheComponents`. Dynamic routes prerender via `generateStaticParams` and call `notFound()` for unknown params.
