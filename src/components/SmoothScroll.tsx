"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll on the window scroller. Adds `.lenis` to <html>, which is
 * what globals.css uses to stand down its native `scroll-behavior: smooth`.
 * Skipped entirely when the user asks for reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };

    // Dynamic import keeps Lenis out of the first paint path.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      // offset matches html { scroll-padding-top: 5rem } so anchors clear the navbar.
      lenis = new Lenis({ anchors: { offset: -80 } });
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
