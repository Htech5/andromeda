"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Achievement } from "@/data/achievements";

/**
 * Pinned roadmap. The section sticks to the viewport and the page scroll inside
 * it is spent stepping the robot from one year to the next, one stop per step.
 *
 * JS only decides which stop is active and writes `--step`; CSS does the rest,
 * so the robot and the trail can never drift apart.
 */
export default function RoadStrip({
  head,
  items,
}: {
  head?: React.ReactNode;
  items: Achievement[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Read off the roster itself, so a new line in the data updates the tally.
  const tally = [
    `${items.length} musim`,
    `${items.filter((item) => /^juara/i.test(item.result)).length} podium`,
    `${items.filter((item) => /terbaik/i.test(item.result)).length} penghargaan`,
  ].join("  ·  ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stops = el.querySelectorAll<HTMLElement>(".road__stop");
    const ghost = el.querySelector<HTMLElement>(".road__ghost");
    const last = items.length - 1;
    let current = -1;

    const show = (step: number) => {
      if (step === current) return;
      current = step;
      el.style.setProperty("--step", String(step));
      // The watermark is the one piece of text that cannot be derived in CSS,
      // so it is written here alongside the step the whole band reads from.
      if (ghost) ghost.textContent = items[step].year;
      stops.forEach((stop, i) => {
        stop.dataset.state = i < step ? "past" : i === step ? "now" : "ahead";
      });
    };

    // Both layouts pin and step; only the axis differs, and that is CSS.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show(last);
      return;
    }

    let frame = 0;
    let running = false;

    const pin = el.querySelector<HTMLElement>(".road__pin");
    // Where the pin parks, so step 0 lasts until it actually sticks.
    const offset = pin ? parseFloat(getComputedStyle(pin).top) || 0 : 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      // Travel is the wrapper height minus the one viewport it stays pinned for.
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return show(last);
      const past = Math.min(Math.max(offset - rect.top, 0), travel);
      show(Math.round((past / travel) * last));
    };

    const tick = () => {
      measure();
      frame = requestAnimationFrame(tick);
    };

    measure();

    // Only measure while the section is on screen.
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
  }, [items.length]);

  return (
    <div
      className="road"
      ref={ref}
      style={{ "--stops": items.length } as React.CSSProperties}
    >
      <div className="road__pin">
        <div className="road__ember" aria-hidden="true" />
        <p className="road__ghost" aria-hidden="true">
          {items[0].year}
        </p>

        <div className="road__frame">
          {head}
          <ol className="road__strip">
            {items.map((item, i) => (
              <li className="road__stop" key={`${item.year}-${i}`}>
                <p className="road__year mono">{item.year}</p>
                <h3 className="road__event">{item.event}</h3>
                <p className="road__result mono accent">{item.result}</p>
                <p className="road__note">{item.note}</p>
              </li>
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

          <p className="road__tally mono">{tally}</p>
        </div>
      </div>
    </div>
  );
}
