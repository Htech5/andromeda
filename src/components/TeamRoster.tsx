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

const SIZES = { player: 190, manager: 150, lead: 150, crew: 116 } as const;

type Rank = keyof typeof SIZES;

/** What the HUD calls each tier. The real job title still prints under the
    name; this is the cabinet's word for it, not a replacement. */
const RANK_LABEL: Record<Rank, string> = {
  player: "Player 01",
  manager: "Manager",
  lead: "Div Lead",
  crew: "Crew",
};

function Card({ person, rank }: { person: Person; rank: Rank }) {
  const size = SIZES[rank];
  // The leader and the managers sit above the division sections, so their
  // names are second-level headings; everyone inside a division sits under
  // that division's own h2. Without this the outline jumps h1 to h3.
  const Name = rank === "player" || rank === "manager" ? "h2" : "h3";

  return (
    <article className={`pcard pcard--${rank}`}>
      <div className="pcard__frame" style={{ "--pc-size": `${size}px` } as React.CSSProperties}>
        {person.photo ? (
          <Image
            className="pcard__photo"
            src={`/images/team/${person.photo}.webp`}
            alt={`Potret ${person.name}`}
            width={size}
            height={size}
            sizes={`${size}px`}
          />
        ) : (
          <span className="pcard__initials" aria-hidden="true">
            {initials(person.name)}
          </span>
        )}
        {/* Comic halftone over the portrait, then the cabinet's scanlines over
            everything. Both decorative, both out of the accessibility tree. */}
        <span className="pcard__halftone" aria-hidden="true" />
        <span className="pcard__scan" aria-hidden="true" />
      </div>

      <div className="pcard__meta">
        <p className="pcard__rank">{RANK_LABEL[rank]}</p>
        <Name className="pcard__name">{person.name}</Name>
        <p className="pcard__role">{person.role}</p>
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
        <Card person={leader} rank="player" />
      </Reveal>

      {branches.map((branch, b) => (
        <section className="branch" key={branch.manager.name}>
          <Reveal className="branch__manager" variant="down">
            <Card person={branch.manager} rank="manager" />
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
                <Card person={division.head} rank="lead" />
              </div>

              {division.staff.length > 0 && (
                <ol className="world__crew">
                  {division.staff.map((person) => (
                    <li key={person.name}>
                      <Card person={person} rank="crew" />
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
