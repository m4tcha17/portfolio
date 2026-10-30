import { site } from "@/content/site";
import { TechStack } from "@/components/projects/tech-stack";

/** Home skills under the hero, one column of chips per category, so keywords are scannable at a glance. */
export function Skills() {
  return (
    <section aria-labelledby="skills-heading" className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <h2 id="skills-heading" className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Skills
      </h2>
      <div className="mt-4 grid gap-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {site.skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-medium text-foreground">{group.title}</h3>
            <TechStack tech={group.items} />
          </div>
        ))}
      </div>
    </section>
  );
}
