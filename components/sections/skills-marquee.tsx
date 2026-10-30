import { site } from "@/content/site";

/** Thin static strip of `site.skills` between Hero and Featured Projects. */
export function SkillsMarquee() {
  return (
    <section aria-label="Skills" className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-6">
        {site.skills.map((skill) => (
          <li key={skill} className="font-heading text-lg font-medium whitespace-nowrap text-muted-foreground">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
