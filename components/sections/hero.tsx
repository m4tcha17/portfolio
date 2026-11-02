import { ArrowRightIcon, FileTextIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { Highlight } from "@/components/site/highlight";
import TextType from "@/components/animations/text-type";
import Magnet from "@/components/animations/magnet";
import { FadeIn } from "@/components/site/fade-in";
import { HeroOnce } from "@/components/sections/hero-once";
import { HeroSkills } from "@/components/sections/hero-skills";
import { HeroDescription } from "@/components/sections/hero-description";
import { LocalTime } from "@/components/site/local-time";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 sm:px-6"
    >
      <div>
        {/* HeroOnce keeps the load animations to the first load (no replay when returning home). */}
        <HeroOnce>
          {/* Flex wrapper: green status dot beside the typed line (TextType renders inline-block). */}
          <div className="flex items-center gap-3">
            {/* Pulsing dot: a pinging ring behind a solid dot; static under prefers-reduced-motion. */}
            <span aria-hidden className="relative flex size-2.5 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-available opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-available" />
            </span>
            <TextType
              as="p"
              text={site.availability}
              loop={false}
              cursorStyle="underscore"
              mistakes={0.2}
              typingSpeed={30}
              deletingSpeed={30}
              className="text-base font-medium text-primary sm:text-[1.25rem]"
            />
          </div>
          <FadeIn delay={0.15}>
            <h1 className="mt-3 w-fit font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-[5.25rem] sm:leading-none">
              <Highlight text={site.name} />
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {site.location}
              <span aria-hidden className="mx-2">·</span>
              {site.timezone}
              <span aria-hidden className="mx-2">·</span>
              <LocalTime />
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <HeroDescription
              summary={<Highlight text={site.description} />}
              more={<Highlight text={site.descriptionMore} />}
            />
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-3">
              {/* Plain anchor for #projects: the hero is only on "/", and a native fragment jump scrolls again even when
                  the URL already ends in the same hash (next/link skips same-URL navigations). */}
              {/* padding 0: the pull only engages while the cursor is on the button itself. */}
              <Magnet padding={0} magnetStrength={2} maxOffset={5}>
                <a href="#projects" className={buttonVariants({ size: "lg" })}>
                  View projects
                  <ArrowRightIcon data-icon="inline-end" aria-hidden />
                </a>
              </Magnet>
              {/* Plain anchor: a static PDF in public/, opened in a new tab. */}
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "lg", variant: "quiet" })}
              >
                <FileTextIcon
                  data-icon="inline-start"
                  aria-hidden
                  className="transition-transform duration-300 group-hover/button:-translate-y-1 group-focus-visible/button:-translate-y-1 motion-reduce:transition-none motion-reduce:translate-y-0!"
                />
                Resume
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <HeroSkills />
          </FadeIn>
        </HeroOnce>
      </div>
    </section>
  );
}
