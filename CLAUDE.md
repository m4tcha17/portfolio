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
- MDX via `@next/mdx` for content
- pnpm

# Scope

Audience: recruiters. A visitor should judge fit in under a minute: who, what role, availability, skills, proof (projects, experience), résumé, contact. Minimal animation.

- **Home `/`**: single scrolling overview page with sections Hero, Skills, Featured Projects, Experience & Education (`#experience`), Contact (`#contact`), separated by `SectionDivider`.
- **First screen**: Hero and Skills together fill the viewport below the header; Featured Projects starts below the fold.
- **Hero**: round profile photo (`public/profile.jpg`; right of the text from `sm`, above it on phones), name (the page's h1), role line, availability line (`site.availability`), 1–2 sentence value statement (`site.description`), buttons View projects (`#projects`), Résumé (`site.resume`, new tab) and Contact (`#contact`), plus small GitHub and LinkedIn icon links.
- **Skills**: `site.skillGroups` in four categories (Languages, Libraries & Frameworks, Backend & Infrastructure, Environment & Tooling), static chips per group; 4 columns from `lg`, 2 from `sm`.
- **Featured Projects** (`#projects`): max 3 cards, selected by `featured: true` and sorted by `order`, in an equal-width grid. Each card always shows image, title, `summary`, tech stack chips and a GitHub link (no hover-only content). The card links to `/projects/[slug]`; the GitHub link goes to the repo only. An "All projects" button links to `/projects`.
- **Experience & Education**: vertical timeline of `site.experience` then `site.education`. Each item shows title, org, date range, location (if set) and bullets (if set). Then a Certifications & Awards grid (`site.achievements`, 2 columns from `sm`): icon by kind, title, issuer · date, and a credential link (if set). Each block is hidden when its list is empty.
- **`/projects`**: one page listing all projects, one project per row. Each row shows image, title, long description (MDX body, 4–5 sentences max), tech stack chips, and a GitHub button. Each row links to `/projects/[slug]`; the GitHub button links to the repo only.
- **`/projects/[slug]`**: one in-depth page per project showing image, title, summary, date (if set), tech stack, long description, a GitHub button, and a back link to `/projects`. Below the image, the long description sits beside a narrower side column (2:1) with "My contribution" (if set), the tech stack and the GitHub button.
- **Header**: centered nav Home (`/`, scrolls to top on the home page), Projects (`/projects`), Experience, Contact (home hash links), and a Résumé button at the top-right. No name or logo (the Hero has it). Below `sm` only the Résumé button shows.
- **Contact**: "Get in touch" heading, one line of text, Email (mailto) and Résumé buttons.
- **Footer**: copyright, mailto link, and social links. Socials appear only here and in the Hero.
- **Theme**: light mode only, regardless of system setting. No theme toggle, no `.dark` styles.
- **Out of scope**: blog, contact form, CMS, backend, metadata fields beyond those listed under Content.
- Fully static site.

# Roadmap

1. **Base implementation** (phases 1–7): CLAUDE.md, MDX pipeline, layout shell, home sections, project metadata, `/projects` list, `/projects/[slug]` detail page. No animations in this stage.
2. **Fine-tuning**: animations (React Bits) and layout/design adjusted to the user's exact preferences. Each change is proposed and approved before implementation.
3. **Professional rework** (current): recruiter-focused layout, light mode only, `/about` removed (photo moved to the Hero). Animations stay minimal.

# System Design

## Content

- Each project is one file in `content/projects/<slug>.mdx`. It exports `metadata` (`title`, `summary`, `image`, `tech`, `github`, `featured`, `order`, optional `date`, optional `contribution`) and its body is the long description.
- Rendering rule:
  - Home Featured Projects cards: `summary` only.
  - `/projects` rows: long description (MDX body) only.
  - `/projects/[slug]`: both `summary` and long description. `date` and `contribution` (bullet list) are shown only here.
- `lib/projects.ts` holds the `ProjectMeta` type, `getProjects()` (reads `content/projects/` server-side, sorted by `order`), `getFeaturedProjects()` (featured, first 3) and `getProject(slug)`.
- `content/site.ts`: typed profile data (name, role, location, availability, resume, description, email, socials, skillGroups, experience, education, achievements). In the Hero strings, `[bracketed]` words render bold in the primary color (`Highlight`); plain-text uses (metadata, footer, alt text) strip the brackets with `stripHighlights`.
- `public/resume.pdf`: résumé, linked from Hero, Header and Contact.
- Project images live in `public/projects/<slug>.(png|webp)` and render with `next/image`.

## Structure

```
app/
  layout.tsx            # metadata, SiteHeader, SiteFooter
  page.tsx              # Hero, Skills, FeaturedProjects, Experience, Contact
  projects/page.tsx     # all projects, one ProjectRow each
  projects/[slug]/page.tsx  # project detail page
components/
  ui/                   # shadcn components
  site/                 # header.tsx, nav-link.tsx, footer.tsx, section-divider.tsx, social-icons.ts, highlight.tsx
  sections/             # hero.tsx, skills.tsx, featured-projects.tsx, experience.tsx, contact.tsx
  projects/             # project-card.tsx, project-row.tsx, project-row-link.tsx, tech-stack.tsx
content/                # site.ts, projects/*.mdx
lib/                    # utils.ts, projects.ts, highlight.ts
mdx-components.tsx
```

## Conventions

- Server Components by default. Use `"use client"` only for animations and interactive parts.
- Use only theme tokens (`bg-background`, `text-primary`, etc.). No hardcoded colors.
- Animations respect `prefers-reduced-motion`.
- `dynamicParams` is unavailable with `cacheComponents`. Dynamic routes prerender via `generateStaticParams` and call `notFound()` for unknown params.
