import { Hero } from "@/components/sections/hero";
import { SkillsMarquee } from "@/components/sections/skills-marquee";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/site/section-divider";

export default function Home() {
  return (
    <>
      {/* First screen: hero, terminal and marquee centered vertically as one group, filling the viewport below the sticky header (h-14 + 1px border). */}
      <div className="flex min-h-[calc(100svh-3.5rem-1px)] flex-col justify-center gap-16 py-8">
        <Hero />
        <SkillsMarquee />
      </div>
      <SectionDivider />
      <FeaturedProjects />
      <SectionDivider />
      <Contact />
    </>
  );
}
