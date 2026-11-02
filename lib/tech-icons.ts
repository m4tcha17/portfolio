import type { IconType } from "react-icons";
import {
  SiC,
  SiCss,
  SiExpo,
  SiGit,
  SiGithub,
  SiHtml5,
  SiLinux,
  SiMysql,
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
  html5: SiHtml5,
  css3: SiCss,
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
  mysql: SiMysql,
  "linux / bash": SiLinux,
  git: SiGit,
  pnpm: SiPnpm,
  github: SiGithub,
};

export function getTechIcon(name: string): IconType | undefined {
  return icons[name.toLowerCase()];
}
