"use client";

import Image from "next/image";
import { useState } from "react";
import { garage } from "@/data/robot";

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
          className="garage__arrow pixel"
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
            sizes="(min-width: 900px) 40vw, 80vw"
            priority={unit.soon}
          />
          {unit.soon && <figcaption className="garage__soon pixel">See you soon</figcaption>}
        </figure>

        <button
          type="button"
          className="garage__arrow pixel"
          onClick={() => step(1)}
          aria-label="Robot berikutnya"
        >
          ▶
        </button>
      </div>

      <div className="garage__plate pixel" aria-live="polite">
        <span className="garage__tag">{unit.tag}</span>
        <span className="garage__name">{unit.name}</span>
        {unit.era && <span className="garage__era">{unit.era}</span>}
        {unit.years && <span className="garage__years">{unit.years}</span>}
      </div>

      {unit.stats && (
        <dl className="garage__stats" aria-live="polite">
          {unit.stats.map((s) => (
            <div className="garage__stat" key={s.label}>
              <dt className="garage__statLabel pixel">{s.label}</dt>
              <dd className="garage__statBody">{s.body}</dd>
            </div>
          ))}
        </dl>
      )}

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
