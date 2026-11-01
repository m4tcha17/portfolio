import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";

export default function Home() {
  return (
    <>
      {/* First screen: hero centered vertically, filling the viewport below the mobile top bar (h-14 + 1px border); the full viewport from md, where nav is a sidebar. */}
      <div className="flex min-h-[calc(100svh-3.5rem-1px)] flex-col md:min-h-svh justify-center py-8">
        <Hero />
      </div>
      <FeaturedProjects />
    </>
  );
}
