import { NavLink } from "@/components/site/nav-link";
import { ThemeMenu } from "@/components/site/theme-menu";

const navItems = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/**
 * Site navigation. From `md` up: a fixed sidebar on the left with the burger (hides the theme toggle) top left and
 * the links stacked right-aligned in the vertical center of the full sidebar height; the layout pads content by its width (`md:pl-56`). Below `md`: a sticky
 * top bar, burger on the left and links on the right, since a sidebar would eat the narrow viewport.
 */
export function SiteHeader() {
  return (
    // Named so page slides pass under it instead of over it (page transitions in globals.css).
    <header className="vt-site-header sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:w-56 md:border-r md:border-b-0">
      <div className="flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6 md:relative md:h-full md:flex-col md:items-stretch md:justify-start md:px-6 md:py-8">
        {/* From md: out of the flow, so the links center on the full sidebar height rather than the space below it. */}
        <ThemeMenu className="md:absolute md:top-8 md:left-6 md:z-10" />
        <nav aria-label="Main" className="md:flex md:flex-1 md:flex-col md:justify-center">
          <ul className="flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase sm:gap-8 md:flex-col md:items-end md:gap-12 md:text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                {/* Hover/focus: text turns primary and shifts right. NavLink keeps both on the current page. */}
                <NavLink
                  href={item.href}
                  className="inline-block transition-[color,translate] duration-300 ease-out hover:translate-x-1.5 hover:text-primary focus-visible:translate-x-1.5 focus-visible:text-primary motion-reduce:transition-colors motion-reduce:hover:translate-x-0 motion-reduce:focus-visible:translate-x-0"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
