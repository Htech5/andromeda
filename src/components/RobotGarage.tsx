"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { garage, type Unit, type Variant } from "@/data/robot";
import RobotStatIcon from "./RobotStatIcon";

type Frame = { unit: Unit; unitIndex: number; variant?: Variant };

/** Perseus Ultimate's two builds get one frame each instead of a button to
   toggle between them — scrolling past Core Andro Bot lands on Fun Bot. */
const frames: Frame[] = garage.flatMap((unit, unitIndex) =>
  unit.variants?.length
    ? unit.variants.map((variant) => ({ unit, unitIndex, variant }))
    : [{ unit, unitIndex }],
);

type LenisLike = { scrollTo: (target: number, opts?: Record<string, unknown>) => void };

/**
 * Game-style unit select, driven entirely by scroll. The section pins
 * (same technique as RoadStrip's timeline) and the travel underneath it is
 * split evenly across every frame; scrolling down steps forward, up steps
 * back, and running off either end releases the pin to ordinary page scroll.
 */
export default function RobotGarage() {
  const [frame, setFrame] = useState(frames.length - 1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { unit, unitIndex, variant } = frames[frame];

  const shot = { src: variant?.src ?? unit.src, width: variant?.width ?? unit.width, height: variant?.height ?? unit.height };
  const years = variant?.years ?? unit.years;
  const stats = variant?.stats ?? unit.stats;
  const pointed = useMemo(
    () => stats?.filter((s): s is typeof s & { point: { x: number; y: number } } => !!s.point),
    [stats],
  );

  // Jump straight to a frame (thumbnail click, arrow keys): scrolls the
  // pinned travel to that frame's slice instead of setting state directly —
  // the measure loop below is the single source of truth for which frame
  // is showing, so a direct setFrame would just get overwritten next tick.
  const jumpTo = (target: number) => {
    const el = wrapRef.current;
    const last = frames.length - 1;
    target = Math.min(Math.max(target, 0), last);
    if (!el || last <= 0) {
      setFrame(target);
      return;
    }
    const pin = el.querySelector<HTMLElement>(".garage__pin");
    const offset = pin ? parseFloat(getComputedStyle(pin).top) || 0 : 0;
    const rect = el.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    const documentTop = rect.top + window.scrollY;
    const targetY = documentTop - offset + (target / last) * travel;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.scrollTo(targetY);
    else window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    const el = wrapRef.current;
    const last = frames.length - 1;
    if (!el || last <= 0) return;

    let current = -1;
    const show = (step: number) => {
      if (step === current) return;
      current = step;
      setFrame(step);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;
    const pin = el.querySelector<HTMLElement>(".garage__pin");
    const offset = pin ? parseFloat(getComputedStyle(pin).top) || 0 : 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return show(last);
      const past = Math.min(Math.max(offset - rect.top, 0), travel);
      show(Math.round((past / travel) * last));
    };

    const tick = () => {
      measure();
      raf = requestAnimationFrame(tick);
    };

    measure();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="garage"
      ref={wrapRef}
      style={{ "--frames": frames.length } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") jumpTo(frame - 1);
        if (e.key === "ArrowRight") jumpTo(frame + 1);
      }}
    >
      <div className="garage__pin">
        <div className="garage__stage">
          {/* No key here on purpose: scroll can step through frames in
             rapid succession, and a remount per step would restart the
             entrance animation on every one and strobe. */}
          <figure className={`garage__shot${unit.soon ? " garage__shot--soon" : ""}`}>
            <Image
              src={shot.src}
              alt={`Robot ${variant?.name ?? unit.name}`}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 900px) 46vw, 90vw"
              priority={unit.soon}
            />
            {unit.soon && <figcaption className="garage__soon pixel">See you soon</figcaption>}

            {/* Mobile only (CSS-gated): the same features as leader-line
               callouts on the photo instead of the card list, which the CSS
               moves off-screen (not display:none) so it stays in the
               accessibility tree at every width. */}
            {pointed && pointed.length > 0 && (
              <>
                <svg
                  className="garage__callouts"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {pointed.map((s) => (
                    <line
                      key={s.label}
                      x1={s.point.x}
                      y1={s.point.y}
                      x2={s.point.x < 50 ? 3 : 97}
                      y2={s.point.y}
                    />
                  ))}
                  {pointed.map((s) => (
                    <circle key={s.label} cx={s.point.x} cy={s.point.y} r="1.3" />
                  ))}
                </svg>
                <div className="garage__calloutLabels" aria-hidden="true">
                  {pointed.map((s) => (
                    <span
                      key={s.label}
                      className={`garage__calloutLabel garage__calloutLabel--${s.point.x < 50 ? "left" : "right"}`}
                      style={{ top: `${s.point.y}%` }}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </>
            )}
          </figure>

          <div className="garage__panel" aria-live="polite">
            <div className="garage__card">
              <div className="garage__cardAccent" aria-hidden="true" />

              <div className="garage__plate">
                <span className="garage__tag">{unit.tag}</span>
                <h3 className="garage__name">
                  {(() => {
                    const words = unit.name.split(" ");
                    const last = words.pop();
                    return (
                      <>
                        {words.length > 0 && words.join(" ") + " "}
                        <span className="garage__name__accent">{last}</span>
                      </>
                    );
                  })()}
                </h3>
                {years && <span className="garage__years">{years}</span>}
                {unit.era && <span className="garage__era">{unit.era}</span>}
                {variant && <span className="garage__era">{variant.name}</span>}
              </div>

              {stats && (
                <dl className="garage__stats">
                  {stats.map((s) => (
                    <div className="garage__stat" key={s.label}>
                      <dt className="garage__statIcon">
                        <RobotStatIcon name={s.icon} />
                      </dt>
                      <dd className="garage__statText">
                        <strong className="garage__statLabel">{s.label}</strong>
                        <span className="garage__statBody">{s.body}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>

        <div className="garage__row" role="tablist" aria-label="Pilih robot">
          {garage.map((u, n) => (
            <button
              key={u.id}
              type="button"
              role="tab"
              aria-selected={n === unitIndex}
              className="garage__slot"
              onClick={() => jumpTo(frames.findIndex((f) => f.unitIndex === n))}
              title={u.name}
            >
              <Image src={u.src} alt="" width={120} height={120} sizes="120px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
