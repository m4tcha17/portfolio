import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";

import type { SocialPlatform } from "@/content/site";

export const socialIcons: Record<SocialPlatform, typeof GithubLogoIcon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
};
