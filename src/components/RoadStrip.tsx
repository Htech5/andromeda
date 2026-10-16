"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import type { Achievement } from "@/data/achievements";

/**
 * The walk. Scroll position through the section becomes `--walk` (0 to 1);
 * CSS turns that into the robot's travel and the length of the trail behind it.
 */
export default function RoadStrip({ items }: { items: Achievement[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const set = (v: number) => el.style.setProperty("--walk", v.toFixed(4));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }

    let frame = 0;
    let running = false;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the strip enters from the bottom, 1 once it has left the top.
      set(Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height))));
    };

    const tick = () => {
      measure();
      frame = requestAnimationFrame(tick);
    };

    // Set it once up front, or the robot sits at its default spot until the
    // first intersection and then jumps backwards.
    measure();

    // Only measure while the strip is on screen: no work the rest of the page.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="road">
      <ol className="road__strip" ref={ref}>
        {items.map((item, i) => (
          <Reveal as="li" key={`${item.year}-${i}`} delay={i * 90}>
            <article className="road__stop">
              <p className="road__year mono">{item.year}</p>
              <h3 className="road__event">{item.event}</h3>
              <p className="road__result mono accent">{item.result}</p>
              <p className="road__note">{item.note}</p>
            </article>
          </Reveal>
        ))}

        <li className="road__walker" aria-hidden="true">
          <Image
            src="/images/m31-top.webp"
            alt=""
            width={700}
            height={583}
            sizes="140px"
          />
        </li>
      </ol>
    </div>
  );
}
