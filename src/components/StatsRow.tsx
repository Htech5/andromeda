"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { stats } from "@/data/team";

const DURATION = 1400;
/** Fast at first, settling at the end. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function StatsRow() {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cells = Array.from(
      el.querySelectorAll<HTMLElement>("[data-count]"),
    ).map((node) => ({
      node,
      target: Number(node.dataset.count),
      suffix: node.dataset.suffix ?? "",
    }));

    const paint = (progress: number) => {
      for (const cell of cells) {
        cell.node.textContent = Math.round(cell.target * progress) + cell.suffix;
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }

    let frame = 0;
    let start = 0;

    const run = (now: number) => {
      start ||= now;
      const t = Math.min(1, (now - start) / DURATION);
      paint(ease(t));
      if (t < 1) frame = requestAnimationFrame(run);
    };

    // Counts again on every return to the viewport, like the reveals do.
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame);
        if (entry.isIntersecting) {
          start = 0;
          frame = requestAnimationFrame(run);
        } else {
          paint(0);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <dl className="statsRow" ref={ref}>
      {stats.map((item, i) => (
        <Reveal className="statsRow__cell" delay={i * 140} key={item.label}>
          <dt
            className="statsRow__value mono"
            data-count={item.value}
            data-suffix={item.suffix}
          >
            {item.value}
            {item.suffix}
          </dt>
          <dd className="statsRow__label mono">{item.label}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
