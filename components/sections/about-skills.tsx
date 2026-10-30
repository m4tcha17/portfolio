import { site } from "@/content/site";
import { TechStack } from "@/components/projects/tech-stack";

/** About page skills, one column of chips per category. */
export function AboutSkills() {
  return (
    <section aria-labelledby="skills-heading" className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <h2 id="skills-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Skills
      </h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {site.skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">{group.title}</h3>
            <TechStack tech={group.items} />
          </div>
        ))}
      </div>
    </section>
  );
}
