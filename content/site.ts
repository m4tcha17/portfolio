export type SocialPlatform = "github" | "linkedin" | "facebook";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

/** `/experience` Education entry: period beside school, degree · location and honors. */
export type EducationItem = {
  school: string;
  degree: string;
  /** School location, e.g. "Cebu City, PHL". Shown beside the degree. */
  location?: string;
  /** Free text, e.g. "2022 – Present". */
  period: string;
  /** Honors and distinctions, e.g. "Consistent Dean's Lister". */
  honors?: string[];
};

/**
 * `/experience` Achievements entry: period beside title and organization. Set `href` to link the row to a page
 * (e.g. the exam's results), or `certificate` to open a photo of the certificate in a modal. `href` wins if both are set.
 */
export type AchievementItem = {
  /** Award or result. */
  title: string;
  /** Event or organization. */
  organization: string;
  /** Free text, e.g. "2025". */
  period: string;
  /** External page about the achievement; opens in a new tab. */
  href?: string;
  /** Certificate photo in public/, e.g. "/certificates/philnits.jpg"; opens in a modal. */
  certificate?: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  /** Home hero: typed line above the name. */
  availability: string;
  /** Home hero: small line below the name, beside the timezone. */
  location: string;
  timezone: string;
  description: string;
  /** Home hero: rest of the description, shown by the "More about me" toggle. */
  descriptionMore: string;
  email: string;
  /** Hero "Resume" button: PDF path in public/. */
  resume: string;
  socials: SocialLink[];
  /** Home hero: skills grouped into categories. */
  skillGroups: SkillGroup[];
  /** Experience page, Education section: newest first. */
  education: EducationItem[];
  /** Experience page, Achievements section: newest first. */
  achievements: AchievementItem[];
};

export const site: SiteConfig = {
  name: "James Ang",
  role: "Software Developer",
  availability: "Open to internships & junior roles",
  location: "Cebu City, PHL",
  timezone: "GMT+8",
  description: "I am a 21 year old [software developer] based in the [Philippines] and is currently studying at the [University of San Carlos], specializing in [frontend development] while learning full-stack development.",
  descriptionMore: "I daily drive [Linux] for system efficiency and workflow customization, and I am also familiar in [core system administration] and [terminal operations].",
  email: "angjames2812@gmail.com",
  resume: "/resume.pdf",
  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/m4tcha17" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/james-ang-/" },
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/james.ang.33046/" },
  ],
  skillGroups: [
    { title: "Languages", items: ["TypeScript", "Javascript", "C"] },
    { title: "Libraries & Frameworks", items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Expo"] },
    { title: "Backend & Infrastructure", items: ["Node.js", "Supabase", "PostgreSQL / SQL"] },
    { title: "Environment & Tooling", items: ["Linux / Bash", "Git", "Github"] },
  ],
  education: [
    {
      school: "University of San Carlos",
      degree: "BS Computer Science",
      location: "Talamban, Cebu City",
      period: "2024 – Present",
      honors: ["Consistent Dean's Lister", "Relevant Coursework: Data Structures & Algorithms, Algorithms & Complexity, Object-Oriented Programming, ",],
    },
    {
      school: "Cathedral School of La Naval",
      degree: "STEM Senior High School",
      location: "Naval, Biliran",
      period: "2022 – 2024",
    },
  ],
  achievements: [
    {
      title: "AI in Language Research International Conference 2026 Atendee",
      organization: "De La Salle University • University of San Carlos • University of Cebu",
      period: "2026",
      certificate: "/images/ailric.png",
    },
    {
      title: "PhilNITS FE Passer",
      organization: "PhilNITS Foundation, Inc",
      period: "2026",
      href: "https://itpec.org/statsandresults/all-passers-information/Philippines/2026S_FE.pdf",
    },
    {
      title: "CCNA: Introduction to Networks",
      organization: "CISCO • University of San Carlos",
      period: "2025",
      certificate: "/images/ccna.png",
    },
  ],
};
