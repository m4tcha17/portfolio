import { ArrowUpRightIcon, CertificateIcon, TrophyIcon } from "@phosphor-icons/react/ssr";

import { site, type Achievement, type TimelineItem } from "@/content/site";

/** Home Experience & Education: one vertical timeline per list, then certificates and awards. An empty list renders nothing, heading included. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:px-6"
    >
      <h2 id="experience-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Experience &amp; Education
      </h2>
      <div className="mt-10 flex flex-col gap-12">
        <Timeline title="Experience" items={site.experience} />
        <Timeline title="Education" items={site.education} />
        <Achievements items={site.achievements} />
      </div>
    </section>
  );
}

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">{title}</h3>
      {/* Left rule with a dot per entry; the dot sits on the rule (-left offset = half the dot plus the border). */}
      <ol className="mt-6 flex flex-col gap-8 border-l border-border pl-6">
        {items.map((item) => (
          <li key={`${item.org}-${item.title}-${item.start}`} className="relative">
            <span aria-hidden className="absolute top-2 -left-7.25 size-2.5 rounded-full bg-primary ring-4 ring-background" />
            <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h4 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                {item.title} <span className="font-normal text-muted-foreground">· {item.org}</span>
              </h4>
              <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                {item.start} – {item.end ?? "Present"}
              </p>
            </div>
            {item.location && <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-3 max-w-prose list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const achievementIcons = { certificate: CertificateIcon, award: TrophyIcon } satisfies Record<Achievement["kind"], unknown>;

function Achievements({ items }: { items: Achievement[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Certifications &amp; Awards</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = achievementIcons[item.kind];
          return (
            <li
              key={`${item.issuer}-${item.title}`}
              className="flex gap-4 rounded-lg bg-card p-4 ring-1 ring-foreground/10"
            >
              <Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-primary" />
              <div className="min-w-0">
                <h4 className="font-heading font-semibold tracking-tight text-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.issuer} · <span className="tabular-nums">{item.date}</span>
                </p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {item.kind === "certificate" ? "View credential" : "View details"}
                    <ArrowUpRightIcon aria-hidden className="size-3.5" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
