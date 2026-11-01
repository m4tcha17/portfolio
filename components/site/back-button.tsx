import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";
import { HomeLink } from "@/components/site/home-link";
import { NAV_BACK } from "@/components/site/page-transition";

/**
 * Simple back arrow beside a page title. Links home by default (HomeLink, so the hero replays); pass `href` and `label`
 * to go back elsewhere (e.g. `/projects` from a project page). Either way the page slides back (leftward).
 * Hover/focus: the arrow grows and turns primary; no growth under prefers-reduced-motion.
 */
export function BackButton({
  href,
  label = "Back to home",
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  const props = {
    "aria-label": label,
    className: cn(
      "group/back inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-300 outline-none hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring/30 sm:size-12",
      className,
    ),
    children: (
      <ArrowLeftIcon
        weight="bold"
        aria-hidden
        className="size-7 transition-transform duration-300 ease-out group-hover/back:scale-125 group-focus-visible/back:scale-125 motion-reduce:transition-none motion-reduce:group-hover/back:scale-100 motion-reduce:group-focus-visible/back:scale-100 sm:size-8"
      />
    ),
  };

  return href ? <Link href={href} transitionTypes={NAV_BACK} {...props} /> : <HomeLink {...props} />;
}
