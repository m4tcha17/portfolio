import Image from "next/image";
import { ArrowRightIcon, EnvelopeSimpleIcon, FileTextIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { stripHighlights } from "@/lib/highlight";
import { Highlight } from "@/components/site/highlight";
import { buttonVariants } from "@/components/ui/button";
import { socialIcons } from "@/components/site/social-icons";

/** First thing a recruiter reads: who, what role, availability, and the résumé one click away, beside a round profile photo. */
export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto flex w-full max-w-5xl scroll-mt-16 flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:px-6"
    >
      {/* Text comes first for reading order; the photo moves above it on phones and to the right from `sm` up. */}
      {/* Any `[bracketed]` words in these site.ts strings render bold in the primary color. */}
      <div className="min-w-0">
        <p className="mt-2 text-sm text-muted-foreground"><Highlight text={site.availability} /></p>
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"><Highlight text={site.name} /></h1>
        <p className="mt-3 text-xl font-medium text-primary sm:text-2xl"><Highlight text={site.role} /></p>
        <p className="mt-2 text-sm text-muted-foreground"><Highlight text={site.location} /></p>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground"><Highlight text={site.description} /></p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {/* Plain anchors for the hash buttons: the hero is only on "/", and a native fragment jump scrolls again even when
              the URL already ends in the same hash (next/link skips same-URL navigations). */}
          <a href="#projects" className={buttonVariants({ size: "lg" })}>
            View projects
            <ArrowRightIcon data-icon="inline-end" aria-hidden />
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", variant: "quiet" })}
          >
            <FileTextIcon data-icon="inline-start" aria-hidden />
            Résumé
          </a>
          <a href="#contact" className={buttonVariants({ size: "lg", variant: "quiet" })}>
            <EnvelopeSimpleIcon data-icon="inline-start" aria-hidden />
            Contact
          </a>
          <ul className="flex items-center gap-1 sm:ml-2">
            {site.socials.map(({ platform, label, href }) => {
              const Icon = socialIcons[platform];
              return (
                <li key={platform}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-lg" }),
                      "text-muted-foreground hover:bg-transparent hover:text-primary focus-visible:text-primary",
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Image
        src="/profile.jpg"
        alt={`Portrait of ${stripHighlights(site.name)}`}
        width={900}
        height={1200}
        preload
        sizes="(min-width: 1024px) 352px, (min-width: 640px) 256px, 176px"
        className="order-first aspect-square w-44 shrink-0 rounded-full object-cover ring-1 ring-border sm:order-last sm:w-64 lg:w-88"
      />
    </section>
  );
}
