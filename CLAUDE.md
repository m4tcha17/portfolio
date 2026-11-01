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
- Phosphor icons (`@phosphor-icons/react`); tech logos from Simple Icons via `react-icons/si`
- `next-themes` for light/dark mode
- Lenis (`lenis/react`) for smooth scrolling
- MDX via `@next/mdx` for content
- pnpm

# Scope

- **Home `/`**: single scrolling page with sections Hero, Featured Projects.
- **Hero**: typed availability line (`site.availability`) with a pulsing green dot (`--available` token, static under `prefers-reduced-motion`), name (the page's h1), a small location · timezone · live local time line (`site.location`, `site.timezone`, `LocalTime` in Asia/Manila), description, two buttons ("View projects", and "Resume" opening `site.resume` (`public/resume.pdf`) in a new tab), then Skills at the bottom: `site.skillGroups` in four categories (Languages, Libraries & Frameworks, Backend & Infrastructure, Environment & Tooling), chips per group.
- **Tech chips** (`TechStack`, used in hero Skills, Featured Projects panels, and detail pages): square (no rounding), logo left and name right; logos are monochrome Simple Icons mapped in `lib/tech-icons.ts`, names without a logo stay text-only.
- **Reload**: reloading any page lands on the home page at the top (`ReloadHomeScript`, inline before paint). Direct visits and shared links to other pages still open them.
- **Text selection**: disabled site-wide (`select-none` on `body`).
- **First screen**: Hero fills the viewport (below the mobile top bar); Featured Projects starts below the fold.
- **Touch**: `hover:` styles apply while pressed and held on touch screens (overridden `hover` variant in `app/globals.css`); the hero Magnet follows a held finger.
- **Motion**: no scroll-triggered animations. Above-the-fold content fades in on load (`FadeIn`, CSS only). No GSAP or other animation library (Lenis for smooth scroll is the one exception). Kept simple and recruiter friendly.
- **Smooth scroll**: Lenis on the window (`SmoothScroll` in the layout), handles `#anchor` links, and stops smoothing under `prefers-reduced-motion`. No CSS `scroll-behavior: smooth`.
- **Page transitions**: each page wraps its content in `PageTransition` (React `<ViewTransition>`), CSS in `app/globals.css`. Forward links (nav links, project cards/rows, "More works") pass `transitionTypes={NAV_FORWARD}` and slide right; back links (`HomeLink`/`BackButton`, "All projects") pass `NAV_BACK` and slide left. Nav and top edge blur stay fixed above the slide. Browser back/forward swaps instantly. Instant under `prefers-reduced-motion`.
- **Navigation**: from `md` up, a fixed left sidebar (translucent, backdrop blur, right border): theme toggle at the top left, then the nav links (Home, Experience, Projects, Contact; uppercase, larger, widely spaced) centered vertically on the full viewport height (not the space below the toggle) and right-aligned. Below `md`, a sticky top bar (translucent, backdrop blur, no border) with theme toggle left, links right. Links turn primary on hover/focus and stay that way on the current page; from `md` up they also shift right (no shift in the mobile top bar). Home is a `HomeLink`: slides back, replays the hero animations, and scrolls to the top when already home. Below `md` the links are slightly smaller and tighter so all four fit.
- **`/experience`**: heading, then two sections, Education (default) and Achievements (`site.education`, `site.achievements`, newest first), period on the left. Education rows: school (largest), degree · location below, then honors (bullet list). Achievement rows: title and organization, no description; with `href` the row links out (new tab, up-right arrow), with `certificate` (image in `public/certificates/`) it opens the photo in a modal (`CertificateDialog`, native `<dialog>`). Sections switch in place (no URL) with a directional slide + fade (`ExperiencePanels`): picking a tab to the right slides content in from the right, to the left from the left (CSS only, instant under `prefers-reduced-motion`). The switch is a centered bar under the heading (`ExperienceNav`): rounded bordered pill, uppercase tracked labels like the main nav (smaller), hover/focus primary, selected label on a primary-tinted pill that morphs (slides and resizes) to the new label on switch (instant under `prefers-reduced-motion`).
- **Edge blur**: from `md` up only, a fixed strip at the top of the content area (gradient + backdrop blur, fading downward), matching the nav's translucent blur, softens content scrolling out. No bottom strip.
- **Home sections**: no separator between Hero and Featured Projects.
- **Featured Projects**: header row with "Featured Projects" (left) and a "More works" button linking to `/projects` (right). Max 3 cards, selected by `featured: true` and sorted by `order`, shown as three side-by-side panels (stacked below `sm`). Collapsed panels show a dimmed grayscale image with an index ("01") and the title over a light bottom gradient. The open panel (hovered/focused, else the first) is 3x wider, full color, and shows the tech stack (same light gradient as collapsed, no extra blur; gradient taller below `sm`); hovering the title shifts its arrow up-right. Touch screens always show color, and the tech stack from `sm` up; below `sm` the tech stack is hidden. CSS only (`panel-open` variant in `app/globals.css`). Each card links to `/projects/[slug]`.
- **`/projects`**: one page listing all projects, one project per row. Each row shows image, title, summary, and two buttons: "Case study" (to `/projects/[slug]`) and "View on GitHub" (to the repo). The row also links to `/projects/[slug]`. Hovering a row zooms its image (1.05x, clipped to its frame), and turns index and title primary; the Case study arrow nudges right only when the button itself is hovered (CSS only).
- **`/projects/[slug]`**: one detail page per project showing image, title, date (if set), tech stack, long description, a GitHub button, and a `BackButton` to `/projects` left of the title. Below the image, the long description sits beside a narrower side column (2:1) with the tech stack, "My contribution" (if set) and the GitHub button.
- **`/contact`**: no visible heading or copy (visually hidden h1). Back arrow, then big full-width link rows (uppercase label, up-right arrow right, divided by lines): Email (mailto), then `site.socials` (GitHub, LinkedIn, Facebook; new tab). Hover/focus turns the row primary, shifts the label right (like the nav links) and nudges the arrow up-right. Below, a centered plain-text "Download resume" link (`site.resume`, `download`): big, uppercase, light weight, muted, no border, fill or magnet; hover/focus brightens it and enlarges it slightly.
- **Back button**: `/experience`, `/projects` and `/contact` show a simple bold back arrow (`BackButton`, Phosphor `ArrowLeft`) left of the page title (on `/contact`, above the links), linking home; `/projects/[slug]` shows the same arrow linking to `/projects`. Hover/focus: the arrow grows and turns primary.
- **Footer**: copyright, mailto link, social links, and a "Back to top" link (`BackToTop`, smooth scroll through Lenis). Email and socials appear only here and on `/contact`. Hidden on `/contact` (`FooterVisibility`, by pathname).
- **Theme**: light/dark toggle at the top of the nav. First visit follows the system setting; the visitor's choice persists across reloads (`next-themes`, `.dark` class on `<html>`). Switching plays a circle reveal from the toggle (View Transitions API), instant under `prefers-reduced-motion` or without browser support.
- **Typography**: Tailwind type scale bumped one step larger via `--text-*` overrides in `app/globals.css`.
- **Dark mode background**: React Bits `Particles` fixed behind the whole site, tinted with theme tokens, dark mode only, static under `prefers-reduced-motion`.
- **Out of scope**: blog, contact form, CMS, backend, metadata fields beyond those listed under Content.
- Fully static site.

# Roadmap

1. **Base implementation** (phases 1–7): CLAUDE.md, MDX pipeline, layout shell, home sections, project metadata, `/projects` list, `/projects/[slug]` detail page. No animations in this stage.
2. **Fine-tuning**: animations (React Bits) and layout/design adjusted to the user's exact preferences. Each change is proposed and approved before implementation.

# System Design

## Content

- Each project is one file in `content/projects/<slug>.mdx`. It exports `metadata` (`title`, `summary`, `image`, optional `imagePosition` (cover crop focus), `tech`, `github`, `featured`, `order`, optional `date`, optional `contribution`) and its body is the long description, written as a case study: `## Problem` then `## Solution` sections (MDX `h2`, styled in `mdx-components.tsx` as small uppercase primary labels).
- Rendering rule:
  - Home Featured Projects cards: title and tech stack only (`imagePosition` applies here).
  - `/projects` rows: title and `summary` (no long description).
  - `/projects/[slug]`: long description only (`summary` is used just for the page metadata). `date` and `contribution` (bullet list) are shown only here.
- `lib/projects.ts` holds the `ProjectMeta` type, `getProjects()` (reads `content/projects/` server-side, sorted by `order`), `getFeaturedProjects()` (featured, first 3) and `getProject(slug)`.
- `content/site.ts`: typed profile data (name, role, availability, location, timezone, tagline, description, email, resume, socials, skillGroups, education, achievements).
- Project images live in `public/projects/<slug>.(png|webp)` and render with `next/image`.

## Structure

```
app/
  layout.tsx            # metadata, SiteHeader, SiteFooter
  page.tsx              # Hero, FeaturedProjects
  experience/page.tsx   # Education / Achievements sections
  contact/page.tsx      # email/social link rows, Download resume button
  projects/page.tsx     # all projects, one ProjectRow each
  projects/[slug]/page.tsx  # project detail page
components/
  ui/                   # shadcn components
  site/                 # header.tsx, nav-link.tsx, footer.tsx, back-to-top.tsx, footer-visibility.tsx, home-link.tsx, back-button.tsx, theme-provider.tsx, theme-toggle.tsx, experience-tabs.tsx, certificate-dialog.tsx, smooth-scroll.tsx, page-transition.tsx, reload-home.tsx, particles-background.tsx, fade-in.tsx, local-time.tsx
  sections/             # hero.tsx, hero-replay.tsx, hero-skills.tsx, featured-projects.tsx
  projects/             # project-card.tsx, project-row.tsx, tech-stack.tsx
  animations/           # React Bits components (particles.tsx, text-type.tsx, magnet.tsx)
content/                # site.ts, projects/*.mdx
lib/                    # utils.ts, projects.ts, tech-icons.ts
mdx-components.tsx
```

## Conventions

- Server Components by default. Use `"use client"` only for animations and interactive parts.
- Use only theme tokens (`bg-background`, `text-primary`, etc.). No hardcoded colors.
- Animations respect `prefers-reduced-motion`.
- `dynamicParams` is unavailable with `cacheComponents`. Dynamic routes prerender via `generateStaticParams` and call `notFound()` for unknown params.
