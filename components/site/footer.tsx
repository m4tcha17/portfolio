import { ArrowUpIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { stripHighlights } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { socialIcons } from "@/components/site/social-icons";

/** Subtle lift + primary tint for footer icons, driven by the parent link's `group`. */
const ICON_LIFT =
  "transition-[color,translate] duration-300 group-hover:-translate-y-0.5 group-hover:text-primary group-focus-visible:-translate-y-0.5 group-focus-visible:text-primary motion-reduce:transition-none motion-reduce:translate-y-0!";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p>
            <span className="font-heading font-medium text-foreground">{stripHighlights(site.name)}</span>
            {" · "}
            {stripHighlights(site.role)}
          </p>
          <p>© {stripHighlights(site.name)}. All rights reserved.</p>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-4">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              {/* Icon lifts and turns primary on hover/focus; the email text keeps its own hover color. */}
              <EnvelopeSimpleIcon className={`size-5 ${ICON_LIFT}`} aria-hidden />
              {site.email}
            </a>
          </li>
          {site.socials.map(({ platform, label, href }) => {
            const Icon = socialIcons[platform];
            return (
              <li key={platform}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group block"
                >
                  <Icon className={`size-5 ${ICON_LIFT}`} aria-hidden />
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hover:bg-transparent hover:text-primary focus-visible:text-primary",
              )}
            >
              Back to top
              <ArrowUpIcon
                data-icon="inline-end"
                aria-hidden
                className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-focus-visible/button:-translate-y-0.5 motion-reduce:transition-none motion-reduce:translate-y-0!"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
