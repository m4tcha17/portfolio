import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRightIcon, CertificateIcon } from "@phosphor-icons/react/ssr";

import { site, type AchievementItem, type EducationItem } from "@/content/site";
import { cn } from "@/lib/utils";
import { CertificateDialog } from "@/components/site/certificate-dialog";
import { FadeIn } from "@/components/site/fade-in";
import { BackButton } from "@/components/site/back-button";
import { PageTransition } from "@/components/site/page-transition";
import { ExperienceNav, ExperiencePanels } from "@/components/site/experience-tabs";

export const metadata: Metadata = {
  title: "Experience",
};

/** Shared row: period on the left (top on phones), content on the right. */
const rowSpacing = "py-8 first:pt-0";
const rowGrid = "grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8";
const period = "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase sm:pt-1.5";

/** School as the largest text, degree · location below it, then honors. */
function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <ol className="flex flex-col divide-y divide-border">
      {items.map((item) => (
        <li key={`${item.school}-${item.degree}-${item.period}`} className={cn(rowSpacing, rowGrid)}>
          <p className={period}>{item.period}</p>
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">{item.school}</h2>
            <p className="mt-1 text-sm font-medium text-primary">
              {item.degree}
              {item.location && (
                <span className="font-normal text-muted-foreground">
                  <span aria-hidden> · </span>
                  {item.location}
                </span>
              )}
            </p>
            {item.honors && item.honors.length > 0 && (
              <ul aria-label="Honors" className="mt-3 list-disc space-y-1 pl-5 text-base text-muted-foreground marker:text-primary">
                {item.honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Clickable achievement rows: hover/focus turns the title primary and moves its icon. */
const clickableRow = cn(
  rowGrid,
  "group/ach w-full cursor-pointer text-left outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring/30",
);
const titleClass =
  "font-heading text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover/ach:text-primary group-focus-visible/ach:text-primary motion-reduce:transition-none";
const iconClass =
  "ml-2 inline-block size-4.5 align-[-0.1em] text-muted-foreground transition-[color,translate] duration-300 group-hover/ach:text-primary group-focus-visible/ach:text-primary motion-reduce:transition-none";

/**
 * Title above organization, no description. A row with `href` links out (new tab, up-right arrow that shifts on hover);
 * one with `certificate` opens the photo in a modal (certificate icon); otherwise it is plain text.
 */
function AchievementList({ items }: { items: AchievementItem[] }) {
  return (
    <ol className="flex flex-col divide-y divide-border">
      {items.map((item) => {
        // The icon follows the title's last word (kept on the same line), so it stays beside the text when it wraps.
        const lastSpace = item.title.lastIndexOf(" ");
        const content = (icon?: ReactNode) => (
          <>
            <p className={period}>{item.period}</p>
            <div>
              <h2 className={titleClass}>
                {item.title.slice(0, lastSpace + 1)}
                <span className="whitespace-nowrap">
                  {item.title.slice(lastSpace + 1)}
                  {icon}
                </span>
              </h2>
              <p className="mt-1 text-sm font-medium text-primary">{item.organization}</p>
            </div>
          </>
        );

        return (
          <li key={`${item.organization}-${item.title}-${item.period}`} className={rowSpacing}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={clickableRow}>
                {content(
                  <ArrowUpRightIcon
                    weight="bold"
                    aria-label="(opens in a new tab)"
                    className={cn(iconClass, "group-hover/ach:translate-x-0.5 group-hover/ach:-translate-y-0.5 motion-reduce:translate-0!")}
                  />,
                )}
              </a>
            ) : item.certificate ? (
              <CertificateDialog src={item.certificate} alt={`${item.title} certificate`} className={clickableRow}>
                {content(<CertificateIcon weight="bold" aria-label="(view certificate)" className={iconClass} />)}
              </CertificateDialog>
            ) : (
              <div className={rowGrid}>{content()}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Education and Achievements, switched by the centered bar under the heading. Switching slides the lists left or right, matching the tab's side.
 */
export default function ExperiencePage() {
  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <FadeIn>
          {/* -ml cancels the button's inner padding so the arrow lines up with the content edge. */}
          <div className="-ml-2 flex items-center gap-2 sm:-ml-3 sm:gap-3">
            <BackButton />
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Experience</h1>
          </div>
          <ExperienceNav />
        </FadeIn>
        <div className="mt-10">
          <ExperiencePanels
            panels={{
              education: <EducationList items={site.education} />,
              achievements: <AchievementList items={site.achievements} />,
            }}
          />
        </div>
      </section>
    </PageTransition>
  );
}
