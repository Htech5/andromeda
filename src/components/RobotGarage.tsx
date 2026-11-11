"use client";

import Image from "next/image";
import { useState } from "react";
import { garage } from "@/data/robot";

/** One shared glyph for every stat badge: a generic circuit node, not a
   bespoke icon per feature. ponytail: real per-feature icons if the brief
   ever asks for them; this one covers "ala stat karakter" as asked. */
function StatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M7.5 7.5l2.6 2.6M16.5 7.5l-2.6 2.6M7.5 16.5l2.6-2.6M16.5 16.5l-2.6-2.6" />
    </svg>
  );
}

/** Game-style unit select: one on the stage, the rest in a row below. */
export default function RobotGarage() {
  const [i, setI] = useState(garage.length - 1);
  const unit = garage[i];
  const step = (d: number) => setI((n) => (n + d + garage.length) % garage.length);

  return (
    <div
      className="garage"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
    >
      <div className="garage__stage">
        <button
          type="button"
          className="garage__arrow garage__arrow--prev pixel"
          onClick={() => step(-1)}
          aria-label="Robot sebelumnya"
        >
          ◀
        </button>

        <figure className={`garage__shot${unit.soon ? " garage__shot--soon" : ""}`} key={unit.id}>
          <Image
            src={unit.src}
            alt={`Robot ${unit.name}`}
            width={unit.width}
            height={unit.height}
            sizes="(min-width: 900px) 46vw, 90vw"
            priority={unit.soon}
          />
          {unit.soon && <figcaption className="garage__soon pixel">See you soon</figcaption>}
        </figure>

        <button
          type="button"
          className="garage__arrow garage__arrow--next pixel"
          onClick={() => step(1)}
          aria-label="Robot berikutnya"
        >
          ▶
        </button>

        <div className="garage__panel" aria-live="polite">
          <div className="garage__plate pixel">
            <span className="garage__tag">{unit.tag}</span>
            <span className="garage__name">{unit.name}</span>
            {unit.years && <span className="garage__years">{unit.years}</span>}
            {unit.era && <span className="garage__era">{unit.era}</span>}
          </div>

          {unit.stats && (
            <dl className="garage__stats">
              {unit.stats.map((s) => (
                <div className="garage__stat" key={s.label}>
                  <dt className="garage__statIcon">
                    <StatIcon />
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

      <div className="garage__row" role="tablist" aria-label="Pilih robot">
        {garage.map((u, n) => (
          <button
            key={u.id}
            type="button"
            role="tab"
            aria-selected={n === i}
            className="garage__slot"
            onClick={() => setI(n)}
            title={u.name}
          >
            <Image src={u.src} alt="" width={120} height={120} sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
