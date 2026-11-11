"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { garage } from "@/data/robot";
import RobotStatIcon from "./RobotStatIcon";

/** Game-style unit select: one on the stage, the rest in a row below. */
export default function RobotGarage() {
  const [i, setI] = useState(garage.length - 1);
  const unit = garage[i];
  const step = (d: number) => setI((n) => (n + d + garage.length) % garage.length);

  // Same generation, two builds — Perseus Ultimate's Core Andro Bot and Fun
  // Bot share this one slot, picked with a small tab row instead of each
  // getting its own carousel stop.
  const [vi, setVi] = useState(0);
  useEffect(() => setVi(0), [i]);
  const variant = unit.variants?.[vi];
  const shot = { src: variant?.src ?? unit.src, width: variant?.width ?? unit.width, height: variant?.height ?? unit.height };
  const years = variant?.years ?? unit.years;
  const stats = variant?.stats ?? unit.stats;

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

        <figure className={`garage__shot${unit.soon ? " garage__shot--soon" : ""}`} key={`${unit.id}-${vi}`}>
          <Image
            src={shot.src}
            alt={`Robot ${variant?.name ?? unit.name}`}
            width={shot.width}
            height={shot.height}
            sizes="(min-width: 900px) 46vw, 90vw"
            priority={unit.soon}
          />
          {unit.soon && <figcaption className="garage__soon pixel">See you soon</figcaption>}
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
            </div>

            {unit.variants && (
              <div className="garage__variants pixel" role="tablist" aria-label="Pilih varian">
                {unit.variants.map((v, n) => (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={n === vi}
                    className="garage__variantTab"
                    onClick={() => setVi(n)}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            )}

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

        <button
          type="button"
          className="garage__arrow garage__arrow--next pixel"
          onClick={() => step(1)}
          aria-label="Robot berikutnya"
        >
          ▶
        </button>
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
