import { ArrowRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { stripHighlights } from "@/lib/highlight";
import { Highlight } from "@/components/site/highlight";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 sm:px-6"
    >
      <p className="text-sm font-medium text-primary">{stripHighlights(site.role)}</p>
      <h1 className="mt-3 max-w-lg font-heading text-6xl font-semibold tracking-tight text-foreground sm:text-6xl">
        <Highlight text={site.tagline} />
      </h1>
      <p className="mt-6 w-fit max-w-xl text-lg text-muted-foreground">
        <Highlight text={site.description} />
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        {/* Plain anchors for both buttons: the hero is only on "/", and a native fragment jump scrolls again even when
            the URL already ends in the same hash (next/link skips same-URL navigations). */}
        <a href="#projects" className={buttonVariants({ size: "lg" })}>
          View projects
          <ArrowRightIcon data-icon="inline-end" aria-hidden />
        </a>
        <a href="#contact" className={buttonVariants({ size: "lg", variant: "quiet" })}>
          <EnvelopeSimpleIcon
            data-icon="inline-start"
            aria-hidden
            className="transition-transform duration-300 group-hover/button:-translate-y-1 group-focus-visible/button:-translate-y-1 motion-reduce:transition-none motion-reduce:translate-y-0!"
          />
          Contact me
        </a>
      </div>
    </section>
  );
}
