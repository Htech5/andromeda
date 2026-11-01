import Image from "next/image";
import Reveal from "./Reveal";
import { branches, leader, stats, type Person } from "@/data/team";

import "./TeamRoster.css";

/**
 * The roster as an arcade character-select screen.
 *
 * Three things are borrowed and one is not. The layout is borrowed: a run of
 * division sections that alternate sides, each led by its coordinator with the
 * crew laid out beneath. The arcade chrome is borrowed from a cabinet select
 * screen — a HUD across the top, stage numbers per division, hard-edged frames
 * that sit on a block shadow. The red-on-black comic treatment is the team's
 * own palette, pushed into halftone and a chromatic split on hover.
 *
 * What is not borrowed is the portraits. Pixelating a photograph of a real
 * person to sell a retro idea makes the person the joke, so the frames, the
 * type and the HUD carry the era and the faces stay sharp.
 */

/** First letter of the first and last word. Two members have no photograph
    yet, and an initials plate reads better there than a stock silhouette. */
function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : ""))
    .toUpperCase();
}

/** Box width per tier. The window, type and side panel all scale off it. */
const SIZES = { player: 236, manager: 196, lead: 196, crew: 152 } as const;

type Rank = keyof typeof SIZES;

/** What the HUD calls each tier. The real job title still prints under the
    name; this is the cabinet's word for it, not a replacement. */
const RANK_LABEL: Record<Rank, string> = {
  player: "Player 01",
  manager: "Manager",
  lead: "Div Lead",
  crew: "Crew",
};

function Card({
  person,
  rank,
  no,
}: {
  person: Person;
  rank: Rank;
  no: number;
}) {
  const size = SIZES[rank];
  // The leader and the managers sit above the division sections, so their
  // names are second-level headings; everyone inside a division sits under
  // that division's own h2. Without this the outline jumps h1 to h3.
  const Name = rank === "player" || rank === "manager" ? "h2" : "h3";

  return (
    <article
      className={`fbox fbox--${rank}`}
      style={{ "--fb-w": `${size}px` } as React.CSSProperties}
    >
      {/* The turned solid. Only this element is in 3D; everything inside is
          flat on one of its two faces. */}
      <div className="fbox__solid">
        <div className="fbox__face">
          <div className="fbox__header">
            <span className="fbox__brand">Andromeda</span>
            <span className="fbox__rank">{RANK_LABEL[rank]}</span>
          </div>

          <div className="fbox__window">
            {person.photo ? (
              <Image
                className="fbox__photo"
                src={`/images/team/${person.photo}.webp`}
                alt={`Potret ${person.name}`}
                width={size}
                height={size}
                sizes={`${size}px`}
              />
            ) : (
              <span className="fbox__initials" aria-hidden="true">
                {initials(person.name)}
              </span>
            )}
            {/* Comic halftone, cabinet scanlines, then the blister's own
                reflection across the front. All decorative. */}
            <span className="fbox__halftone" aria-hidden="true" />
            <span className="fbox__scan" aria-hidden="true" />
            <span className="fbox__sheen" aria-hidden="true" />
          </div>

          <div className="fbox__foot">
            <Name className="fbox__name">{person.name}</Name>
            <p className="fbox__role">{person.role}</p>
            {/* The member's place in the roster of 26, which is what the HUD
                counts. A real number, not packaging dressing. */}
            <span className="fbox__no" aria-hidden="true">
              {String(no).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Printed spine. Nothing here carries meaning, so none of it is
            text a screen reader has to wade through. */}
        <div className="fbox__side" aria-hidden="true">
          <span className="fbox__spine">Andromeda</span>
          <span className="fbox__specs" />
          <span className="fbox__code" />
        </div>
      </div>
    </article>
  );
}

/** Stage number per division, continuing across branches: 1-1, 1-2, … 2-1. */
function stage(branch: number, division: number) {
  return `${branch + 1}-${division + 1}`;
}

export default function TeamRoster() {
  const members = stats.find((s) => s.label === "Anggota")?.value ?? 0;
  const divisions = branches.reduce((n, b) => n + b.divisions.length, 0);

  // One running number across the whole roster, assigned in reading order, so
  // the figure number on each box means the same thing as the HUD's count.
  let n = 0;
  const next = () => (n += 1);

  return (
    <div className="roster">
      {/* Cabinet status line. A <dl> because each cell is a label and its
          value, which is what the markup should say however it is drawn. */}
      <dl className="hud" aria-label="Ringkasan tim">
        <div className="hud__cell">
          <dt>Anggota</dt>
          <dd>{String(members).padStart(2, "0")}</dd>
        </div>
        <div className="hud__cell">
          <dt>Divisi</dt>
          <dd>{String(divisions).padStart(2, "0")}</dd>
        </div>
        <div className="hud__cell">
          <dt>Season</dt>
          <dd>2026</dd>
        </div>
      </dl>

      <Reveal className="roster__player" variant="scale">
        <Card person={leader} rank="player" no={next()} />
      </Reveal>

      {branches.map((branch, b) => (
        <section className="branch" key={branch.manager.name}>
          <Reveal className="branch__manager" variant="down">
            <Card person={branch.manager} rank="manager" no={next()} />
          </Reveal>

          {branch.divisions.map((division, d) => (
            <Reveal
              as="section"
              key={division.name}
              className={`world${(b + d) % 2 === 1 ? " world--flip" : ""}`}
              delay={d * 80}
              variant={(b + d) % 2 === 1 ? "right" : "left"}
            >
              <header className="world__head">
                <span className="world__stage">Stage {stage(b, d)}</span>
                <h2 className="world__name">{division.name}</h2>
              </header>

              <div className="world__lead">
                <Card person={division.head} rank="lead" no={next()} />
              </div>

              {division.staff.length > 0 && (
                <ol className="world__crew">
                  {division.staff.map((person) => (
                    <li key={person.name}>
                      <Card person={person} rank="crew" no={next()} />
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>
          ))}
        </section>
      ))}
    </div>
  );
}
