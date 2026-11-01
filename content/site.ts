export type SocialPlatform = "github" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  organization: string;
  /** Free text, e.g. "2024 – Present". */
  period: string;
  description: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  socials: SocialLink[];
  /** Home hero: skills grouped into categories. */
  skillGroups: SkillGroup[];
  /** Experience page: newest first. */
  experience: ExperienceItem[];
};

export const site: SiteConfig = {
  name: "James Ang",
  role: "Software Developer",
  tagline: "Engineering digital [experiences] from [screen] to [foundation.]",
  description: "I am a 21 year old software developer [studying at the University of San Carlos], specializing in [frontend development] while learning full-stack development. I daily drive [Linux] for system efficiency and workflow customization, I am also proficient in [core system administration] and [terminal operations].",
  email: "angjames2812@gmail.com",
  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/m4tcha17" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/james-ang-/" },
  ],
  skillGroups: [
    { title: "Languages", items: ["TypeScript", "Javascript", "C", "Python"] },
    { title: "Libraries & Frameworks", items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Expo"] },
    { title: "Backend & Infrastructure", items: ["Node.js", "Supabase", "PostgreSQL / SQL"] },
    { title: "Environment & Tooling", items: ["Linux / Bash", "Git", "pnpm", "Github"] },
  ],
  experience: [
    {
      role: "Placeholder role",
      organization: "Placeholder organization",
      period: "2025 – Present",
      description: "Placeholder description of what you did and what came of it.",
    },
    {
      role: "Placeholder role",
      organization: "Placeholder organization",
      period: "2024 – 2025",
      description: "Placeholder description of what you did and what came of it.",
    },
  ],
};
