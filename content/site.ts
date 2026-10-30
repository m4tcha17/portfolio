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

/** Experience or education entry. `end` missing means "Present". */
export type TimelineItem = {
  title: string;
  org: string;
  location?: string;
  start: string;
  end?: string;
  bullets?: string[];
};

/** Certificate or award. `href` links to the credential or announcement, if public. */
export type Achievement = {
  kind: "certificate" | "award";
  title: string;
  issuer: string;
  date: string;
  href?: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  location: string;
  /** Hero: what roles you're open to, where, and when. */
  availability: string;
  /** Path under /public to the résumé PDF. */
  resume: string;
  description: string;
  email: string;
  socials: SocialLink[];
  /** Home Skills section: skills grouped into categories. */
  skillGroups: SkillGroup[];
  /** Home Experience & Education section. An empty `experience` list hides its heading. */
  experience: TimelineItem[];
  education: TimelineItem[];
  /** Certifications & Awards block under Education. An empty list hides it. */
  achievements: Achievement[];
};

export const site: SiteConfig = {
  name: "James Ang",
  role: "Software Developer",
  location: "Cebu City, Philippines",
  availability: "Open to internships & junior roles · In-person / Remote",
  resume: "/resume.pdf",
  description: "I am a 21 year old software developer [studying at the University of San Carlos], specializing in [full-stack development] to build clean frontend alongside secure backend infrastructure. I daily drive [Linux] for system efficiency and workflow customization, proficient in [core system administration] and [terminal operations].",
  email: "angjames2812@gmail.com",
  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/m4tcha17" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/james-ang-/" },
  ],
  skillGroups: [
    { title: "Languages", items: ["TypeScript", "JavaScript", "C", "Python", "GDScript"] },
    { title: "Libraries & Frameworks", items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "NativeWind", "Expo"] },
    { title: "Backend & Infrastructure", items: ["Node.js", "RESTful APIs", "Supabase", "PostgreSQL / SQL"] },
    { title: "Environment & Tooling", items: ["Git", "GitHub", "Linux / Bash", "Vercel", "Godot Engine"] },
  ],
  experience: [
    {
      title: "Placeholder role",
      org: "Placeholder organization",
      location: "Cebu City",
      start: "Placeholder",
      bullets: ["Placeholder: what you built or owned", "Placeholder: a measurable result"],
    },
  ],
  education: [
    {
      title: "BS Computer Science",
      org: "University of San Carlos",
      location: "Cebu City",
      start: "2024",
      end: "Present",
    },
  ],
  achievements: [
    {
      kind: "certificate",
      title: "Placeholder certificate",
      issuer: "Placeholder issuer",
      date: "Placeholder",
      href: "https://example.com",
    },
    {
      kind: "award",
      title: "Placeholder award",
      issuer: "Placeholder organization",
      date: "Placeholder",
    },
  ],
};
