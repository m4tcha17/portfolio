import type { Metadata } from "next";

import { site } from "@/content/site";
import { FadeIn } from "@/components/site/fade-in";
import { BackButton } from "@/components/site/back-button";

export const metadata: Metadata = {
  title: "Experience",
};

/** One entry per `site.experience` item, newest first: period beside role, organization and description. */
export default function ExperiencePage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn>
        {/* -ml cancels the button's inner padding so the arrow lines up with the content edge. */}
        <div className="-ml-2 flex items-center gap-2 sm:-ml-3 sm:gap-3">
          <BackButton />
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Experience</h1>
        </div>
      </FadeIn>
      <ol className="mt-10 flex flex-col divide-y divide-border">
        {site.experience.map((item) => (
          <li key={`${item.organization}-${item.period}`} className="grid gap-2 py-8 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase sm:pt-1.5">{item.period}</p>
            <div>
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">{item.role}</h2>
              <p className="mt-1 text-sm font-medium text-primary">{item.organization}</p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
