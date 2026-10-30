import { EnvelopeSimpleIcon, FileTextIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";

/** "Get in touch" call to action: email and résumé. Social links live in the Hero and SiteFooter. */
export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:px-6">
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Get in touch</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Open to internships and junior roles. I reply within 48 hours.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className={buttonVariants({ size: "lg" })}>
          <EnvelopeSimpleIcon data-icon="inline-start" aria-hidden />
          Email me
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
      </div>
    </section>
  );
}
