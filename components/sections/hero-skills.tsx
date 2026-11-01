import { site } from "@/content/site";
import { TechStack } from "@/components/projects/tech-stack";

/** Bottom of the hero: `site.skillGroups`, one column of chips per category. */
export function HeroSkills() {
  return (
    <section aria-labelledby="skills-heading" className="mt-14 border-t border-border pt-8">
      <h2 id="skills-heading" className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Skills
      </h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
