export type SocialPlatform = "github" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type Quote = {
  text: string;
  attribution?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type NowItem = {
  label: string;
  text: string;
};

export type SiteConfig = {
  siteName: string;
  name: string;
  role: string;
  location: string;
  tagline: string;
  description: string;
  /** About page: catchy line shown above the bio. */
  bioTitle: string;
  /** About page: bio beside the profile photo. Separate from `description` on the home hero. */
  bio: string;
  email: string;
  socials: SocialLink[];
  skills: string[];
  /** About page: epigraph under the bio. */
  quote: Quote;
  /** About page: skills grouped into categories. `skills` above feeds the home marquee. */
  skillGroups: SkillGroup[];
  /** About page: "What I'm doing now" list. */
  now: NowItem[];
};

export const site: SiteConfig = {
  siteName: "ang.dev",
  name: "James Ang",
  role: "Software Developer",
  location: "Cebu City, Philippines",
  tagline: "Engineering digital [experiences] from [screen] to [foundation.]",
  description: "I build to solve problems I and many others face daily. I’m all about learning and understanding software from the bottom-up.",
  bioTitle: "If it runs, I want to know why.",
  bio: "lorem ipsum dolor sit amet consectetur adipiscing elit atque at anim ullamco in aute est libero dolore eiusmod aliquip nulla iusto quo libero reprehenderit temporibus illum dignissimos et est similique ut molestias tempore odio quidem eiusmod officia dolorum ex dolore quos laborum amet dolore irure qui est quod id adipiscing quidem commodo proident voluptas consequat est corrupti ullamco dolorum sed in velit do proident laborum laborum minim incididunt sunt consequatur similique dolorem placeat anim odio do magna animi reprehenderit est est blanditiis aute quibusdam et do occaecat id odio repellendus molestias soluta vero cillum fuga expedita magna dolor et odio eos et nulla dolor enim et quo voluptas molestias eum in laboris voluptate est mollit nam in eu non eos eum eu sunt nulla nostrud amet lorem et sunt pariatur sunt culpa nisi provident deserunt quod laborum quas similique sed lorem eligendi excepteur eiusmod velit odio qui harum exercitation deserunt.",
  email: "angjames2812@gmail.com",
  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/m4tcha17" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/james-ang-/" },
  ],
  skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "C", "Javascript", ],
  quote: {
    text: "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
    attribution: "Larry Wall",
  },
  skillGroups: [
    { title: "Languages", items: ["TypeScript", "Javascript", "C"] },
    { title: "Libraries & Frameworks", items: ["React", "Next.js", "Tailwind CSS"] },
    { title: "Backend & Infrastructure", items: ["Placeholder"] },
  ],
  now: [
    { label: "Education", text: "completing my undergraduate degree in Computer Science in University of San Carlos" },
    { label: "Building", text: "Placeholder project" },
    { label: "Learning", text: "Placeholder topic" },
  ],
};
