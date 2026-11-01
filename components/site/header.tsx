import { NavLink } from "@/components/site/nav-link";
import { ThemeToggle } from "@/components/site/theme-toggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/**
 * Site navigation. From `md` up: a fixed sidebar on the left with the theme toggle top left and
 * the links stacked right-aligned in the vertical center of the full sidebar height; the layout pads content by its width (`md:pl-56`). Below `md`: a sticky
 * top bar, theme toggle on the left and links on the right, since a sidebar would eat the narrow viewport.
 */
export function SiteHeader() {
  return (
    // Named so page slides pass under it instead of over it (page transitions in globals.css).
    <header className="vt-site-header sticky top-0 z-40 bg-background/80 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:w-56 md:border-r md:border-border">
      <div className="flex h-14 w-full items-center justify-between gap-3 px-4 sm:px-6 md:relative md:h-full md:flex-col md:items-stretch md:justify-start md:px-6 md:py-8">
        {/* From md: out of the flow, so the links center on the full sidebar height rather than the space below it.
            Offsets are the sidebar padding (left 24px, top 32px) minus the button's 7px around its 18px icon, so the
            visible icon lines up with the padding like the links do on the right. */}
        <div className="md:absolute md:top-6.25 md:left-4.25 md:z-10">
          <ThemeToggle />
        </div>
        <nav aria-label="Main" className="md:flex md:flex-1 md:flex-col md:justify-center">
          <ul className="flex items-center gap-2.5 text-[0.75rem] font-medium tracking-[0.05em] text-muted-foreground uppercase sm:gap-8 sm:text-xs sm:tracking-[0.2em] md:flex-col md:items-end md:gap-12 md:text-base">
            {navItems.map((item) => (
              <li key={item.href}>
                {/* Hover/focus: text turns primary and, from md, shifts right. NavLink keeps both on the current page. */}
                <NavLink
                  href={item.href}
                  className="inline-block transition-colors duration-300 ease-out hover:text-primary focus-visible:text-primary md:transition-[color,translate] md:hover:translate-x-1.5 md:focus-visible:translate-x-1.5 motion-reduce:transition-colors motion-reduce:md:hover:translate-x-0 motion-reduce:md:focus-visible:translate-x-0"
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
