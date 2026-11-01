import type { Metadata } from "next";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Magnet from "@/components/animations/magnet";
import { FadeIn } from "@/components/site/fade-in";
import { BackButton } from "@/components/site/back-button";

export const metadata: Metadata = {
  title: "Contact",
};

// Contact button stays one step smaller than the shared `lg` size.
const contactButtonSize =
  "h-10 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4";

// TODO: destination still undecided; mailto is a temporary placeholder.
const getInTouchHref = `mailto:${site.email}`;

/** Simple contact page: heading, short text, one "Get in touch" button. Email and social links live in SiteFooter. */
export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn>
        {/* -ml cancels the button's inner padding so the arrow lines up with the content edge. */}
        <div className="-ml-2 flex items-center gap-2 sm:-ml-3 sm:gap-3">
          <BackButton />
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Have a vision worth creating?
          </h1>
        </div>
        <p className="mt-4 w-fit max-w-2xl text-muted-foreground">
          Turn your vision into reality, built with precision and efficiency.
        </p>
        <div className="mt-8">
          <Magnet padding={0} magnetStrength={4} maxOffset={12}>
            <a href={getInTouchHref} className={cn(buttonVariants({ size: "lg" }), contactButtonSize)}>
              Get in touch
              <ArrowRightIcon data-icon="inline-end" aria-hidden />
            </a>
          </Magnet>
        </div>
      </FadeIn>
    </section>
  );
}
