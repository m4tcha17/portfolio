import type { IconType } from "react-icons";
import {
  SiC,
  SiExpo,
  SiGit,
  SiGithub,
  SiLinux,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPnpm,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/**
 * Tech name (as written in `site.skillGroups` and project `tech`) to its Simple Icons logo.
 * Keys are lowercase; names with no logo here (e.g. NativeWind) render as text-only chips.
 */
const icons: Record<string, IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  c: SiC,
  python: SiPython,
  react: SiReact,
  "react native": SiReact,
  "next.js": SiNextdotjs,
  "tailwind css": SiTailwindcss,
  "shadcn/ui": SiShadcnui,
  expo: SiExpo,
  "node.js": SiNodedotjs,
  supabase: SiSupabase,
  "postgresql / sql": SiPostgresql,
  postgresql: SiPostgresql,
  "linux / bash": SiLinux,
  git: SiGit,
  pnpm: SiPnpm,
  github: SiGithub,
};

export function getTechIcon(name: string): IconType | undefined {
  return icons[name.toLowerCase()];
}
