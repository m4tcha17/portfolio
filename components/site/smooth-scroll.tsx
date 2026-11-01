"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Lenis smooth scrolling on the window. Handles in-page anchor links (`#projects`) and stops inertia when an internal
 * link is clicked. Lenis disables smoothing itself under prefers-reduced-motion.
 */
export function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
