import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/site/section-divider";

export default function Home() {
  return (
    <>
      {/* First screen: hero and skills centered vertically as one group, filling the viewport below the sticky header (h-14 + 1px border). */}
      <div className="flex min-h-[calc(100svh-3.5rem-1px)] flex-col justify-center gap-16 py-8">
        <Hero />
        <Skills />
      </div>
      <SectionDivider />
      <FeaturedProjects />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Contact />
    </>
  );
}
