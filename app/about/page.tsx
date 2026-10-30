import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { AboutSkills } from "@/components/sections/about-skills";
import { AboutNow } from "@/components/sections/about-now";
import { SectionDivider } from "@/components/site/section-divider";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <SectionDivider />
      <AboutSkills />
      <SectionDivider />
      <AboutNow />
    </>
  );
}
