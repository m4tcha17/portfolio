import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { stripHighlights } from "@/lib/highlight";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

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
    // Smooth scrolling for in-page anchors (#projects, #contact, back to top), off under prefers-reduced-motion.
    // data-scroll-behavior lets Next.js disable it during route navigations so page changes still jump to the top.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", "motion-safe:scroll-smooth", geistSans.variable, geistMono.variable, "font-sans", publicSans.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
