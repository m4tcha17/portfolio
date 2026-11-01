import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { stripHighlights } from "@/lib/highlight";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ThemeProvider } from "@/components/site/theme-provider";
import { ParticlesBackground } from "@/components/site/particles-background";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { ReloadHomeScript } from "@/components/site/reload-home";

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = stripHighlights(site.name);

export const metadata: Metadata = {
  title: {
    default: `${siteName} · ${stripHighlights(site.role)}`,
    template: `%s | ${siteName}`,
  },
  description: stripHighlights(site.description),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Smooth scrolling comes from Lenis (SmoothScroll), not CSS scroll-behavior, which would fight its scroll updates.
    // suppressHydrationWarning: next-themes sets the theme class on <html> before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", publicSans.variable)}
    >
      {/* min-h-svh, not min-h-full: Lenis's CSS sets html height to auto, so a percentage height no longer reaches
          the viewport. With main as flex-1, the footer sits at the bottom of short pages. */}
      <body className="min-h-svh flex flex-col bg-background text-foreground md:pl-56">
        {/* A reload anywhere sends the visitor back to the top of the home page. */}
        <ReloadHomeScript />
        <ThemeProvider>
          <SmoothScroll />
          <ParticlesBackground />
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
          {/* Top edge: translucent blur fading downward, so content softens as it scrolls out. Sits under the mobile top bar
              (h-14 + 1px border); from md, at the very top beside the sidebar. Named so it stays on top of sliding pages
              (see page transitions in globals.css). */}
          <div
            aria-hidden
            className="vt-edge-blur pointer-events-none fixed inset-x-0 top-[calc(3.5rem+1px)] z-30 h-16 bg-linear-to-b from-background/80 to-transparent backdrop-blur mask-b-from-50% md:top-0 md:left-56"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
