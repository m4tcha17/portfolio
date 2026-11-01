import { ArrowRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";

import Link from "next/link";

import { site } from "@/content/site";
import { stripHighlights } from "@/lib/highlight";
import { Highlight } from "@/components/site/highlight";
import TextType from "@/components/animations/text-type";
import Magnet from "@/components/animations/magnet";
import { FadeIn } from "@/components/site/fade-in";
import { HeroReplay } from "@/components/sections/hero-replay";
import { HeroSkills } from "@/components/sections/hero-skills";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 sm:px-6"
    >
      <div>
        {/* HeroReplay remounts all hero animations when the header home link is clicked. */}
        <HeroReplay>
          {/* TextType types plain characters, so brackets are stripped; the whole line is already primary. */}
          {/* Block wrapper: TextType renders inline-block. */}
          <div>
            <TextType
              as="p"
              text={stripHighlights(site.role)}
              loop={false}
              cursorStyle="underscore"
              mistakes={0.2}
              typingSpeed={30}
              deletingSpeed={30}
              className="text-[1.25rem] font-medium text-primary"
            />
          </div>
          <FadeIn delay={0.15}>
            <h1 className="mt-3 w-fit font-heading text-6xl font-semibold tracking-tight text-foreground sm:text-[5.25rem] sm:leading-none">
              <Highlight text={site.name} />
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-6 w-fit max-w-3xl text-[1.5rem] leading-snug text-muted-foreground">
              <Highlight text={site.description} />
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-3">
              {/* Plain anchor for #projects: the hero is only on "/", and a native fragment jump scrolls again even when
                  the URL already ends in the same hash (next/link skips same-URL navigations). Contact is its own page. */}
              {/* padding 0: the pull only engages while the cursor is on the button itself. */}
              <Magnet padding={0} magnetStrength={2} maxOffset={5}>
                <a href="#projects" className={buttonVariants({ size: "lg" })}>
                  View projects
                  <ArrowRightIcon data-icon="inline-end" aria-hidden />
                </a>
              </Magnet>
              <Link href="/contact" className={buttonVariants({ size: "lg", variant: "quiet" })}>
                <EnvelopeSimpleIcon
                  data-icon="inline-start"
                  aria-hidden
                  className="transition-transform duration-300 group-hover/button:-translate-y-1 group-focus-visible/button:-translate-y-1 motion-reduce:transition-none motion-reduce:translate-y-0!"
                />
                Contact me
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <HeroSkills />
          </FadeIn>
        </HeroReplay>
      </div>
    </section>
  );
}
