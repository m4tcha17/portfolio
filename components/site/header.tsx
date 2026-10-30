import { site } from "@/content/site";
import { HomeLink } from "@/components/site/home-link";
import { NavLink } from "@/components/site/nav-link";
import { ThemeToggle } from "@/components/site/theme-toggle";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <HomeLink className="font-heading text-base font-semibold tracking-tight text-foreground" data-cursor-padding="5">
          {site.siteName}
        </HomeLink>
        <div className="flex items-center gap-4 sm:gap-10">
          <nav aria-label="Main">
            <ul className="flex items-center gap-4 text-sm text-muted-foreground sm:gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  {/* Hover/focus: text turns primary and an underline grows left to right (scale-x from origin-left). NavLink keeps both on the current page. */}
                  <NavLink
                    href={item.href}
                    data-cursor-padding="8"
                    className="relative inline-block transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 focus-visible:text-primary focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
