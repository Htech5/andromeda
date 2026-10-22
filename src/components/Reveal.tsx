"use client";

import { useEffect, useRef } from "react";

/** Entry directions. Each one only remaps the --reveal-* custom props in CSS,
    so every variant shares the same composited transform/opacity transition. */
type Variant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "tilt"
  | "rise";

type Props = {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "tr";
  className?: string;
  variant?: Variant;
};

/** Scroll reveal. One observer per element, disconnected after first hit. */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  variant = "up",
}: Props) {
  // One element type for the ref; the tag itself stays whatever the caller asked for.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-visible");
      return;
    }

    // Kept observing on purpose: leaving the viewport resets the element, so
    // it plays again on the way back instead of firing once per page load.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
