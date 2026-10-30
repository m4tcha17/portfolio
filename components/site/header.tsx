import { FileTextIcon } from "@phosphor-icons/react/ssr";

import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "@/components/site/nav-link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      {/* Three columns: an empty left track matching the right one keeps the nav centered on the page, not between siblings. */}
      <div className="mx-auto grid h-14 w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        {/* Phones keep only the résumé button; every section is one scroll away on the home page. */}
        <nav aria-label="Main" className="col-start-2 hidden sm:block">
          <ul className="flex items-center gap-8 text-sm text-muted-foreground">
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
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ className: "col-start-3 justify-self-end" })}
        >
          <FileTextIcon data-icon="inline-start" aria-hidden />
          Résumé
        </a>
      </div>
    </header>
  );
}
