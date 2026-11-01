import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";
import { HomeLink } from "@/components/site/home-link";

/**
 * Simple back arrow beside a page title, linking to the home page (HomeLink, so the hero replays).
 * Hover/focus: the arrow grows and turns primary; no growth under prefers-reduced-motion.
 */
export function BackButton({ className }: { className?: string }) {
  return (
    <HomeLink
      aria-label="Back to home"
      className={cn(
        "group/back inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-300 outline-none hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring/30 sm:size-12",
        className,
      )}
    >
      <ArrowLeftIcon
        weight="bold"
        aria-hidden
        className="size-7 transition-transform duration-300 ease-out group-hover/back:scale-125 group-focus-visible/back:scale-125 motion-reduce:transition-none motion-reduce:group-hover/back:scale-100 motion-reduce:group-focus-visible/back:scale-100 sm:size-8"
      />
    </HomeLink>
  );
}
