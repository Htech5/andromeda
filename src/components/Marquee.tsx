import { site } from "@/data/site";

const PHRASE = `${site.wordmark} — KRSRI LEGGED SAR TEAM`;

/** Kinetic strip under the hero. CSS-only, transform-driven, pauses for reduced motion. */
export default function Marquee() {
  const run = Array.from({ length: 4 }, (_, i) => (
    <span className="marquee__item mono" key={i}>
      {PHRASE}
      <span className="accent marquee__star">*</span>
    </span>
  ));

  return (
    <div className="marquee onDark" aria-hidden="true">
      <div className="marquee__track">
        {run}
        {run}
      </div>
    </div>
  );
}
