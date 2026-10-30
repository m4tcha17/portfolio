"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Light/dark theme via a `.dark` class on <html>. Follows the system setting until the visitor picks one, then persists it in localStorage. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
