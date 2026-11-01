import { ViewTransition, type ReactNode } from "react";

/** Transition types set by links (`transitionTypes` on next/link, `router.push`): deeper into the site vs back out. */
export const NAV_FORWARD = ["nav-forward"];
export const NAV_BACK = ["nav-back"];

const directions = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

/**
 * Wraps a page's content so route changes slide it horizontally (CSS in globals.css): forward slides right, away from
 * the sidebar, back slides left. Must sit in each page, not the layout: layouts persist, so enter/exit never fire there.
 * Navigations without a type (browser back/forward, refresh) swap instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directions} exit={directions} default="none">
      {children}
    </ViewTransition>
  );
}
