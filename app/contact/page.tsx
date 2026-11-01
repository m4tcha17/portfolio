import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { FadeIn } from "@/components/site/fade-in";
import { BackButton } from "@/components/site/back-button";
import { PageTransition } from "@/components/site/page-transition";

export const metadata: Metadata = {
  title: "Contact",
};

/** Email first, then every social profile. Only email stays in the same tab. */
const links = [
  { label: "Email", href: `mailto:${site.email}`, external: false },
  ...site.socials.map(({ label, href }) => ({ label, href, external: true })),
];

/**
 * Contact page: no copy, just big link rows (label, arrow) for email and socials, then a centered plain-text
 * Download resume link.
 * The h1 is visually hidden for screen readers. SiteFooter hides itself here (`FooterVisibility`).
 */
export default function ContactPage() {
  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <FadeIn>
          <h1 className="sr-only">Contact</h1>
          {/* -ml cancels the button's inner padding so the arrow lines up with the content edge. */}
          <BackButton className="-ml-2 sm:-ml-3" />

          <ul className="mt-8">
            {links.map(({ label, href, external }) => (
              <li key={label} className="border-b border-border last:border-b-0">
                {/* Hover/focus: label turns primary and shifts right (like the nav links), and the arrow moves up-right. */}
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-6 font-heading text-4xl font-semibold tracking-tight text-foreground uppercase transition-colors duration-300 outline-none hover:text-primary focus-visible:text-primary sm:py-8 sm:text-6xl"
                >
                  <span className="transition-[translate] duration-300 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transition-none motion-reduce:translate-x-0!">
                    {label}
                  </span>
                  <ArrowUpRightIcon
                    weight="bold"
                    aria-hidden
                    className="size-8 shrink-0 text-muted-foreground transition-[color,translate] duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:text-primary motion-reduce:transition-colors motion-reduce:translate-0! sm:size-10"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Plain text, light weight; hover/focus brightens it and enlarges it slightly. */}
          <div className="mt-16 flex justify-center">
            <a
              href={site.resume}
              download
              className="inline-block font-heading text-3xl font-semibold tracking-tight text-muted-foreground uppercase transition-[color,scale] duration-300 ease-out outline-none hover:scale-110 hover:text-foreground focus-visible:scale-110 focus-visible:text-foreground motion-reduce:transition-colors motion-reduce:scale-100! sm:text-4xl"
            >
              Download resume
            </a>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
