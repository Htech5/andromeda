"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { branches, leader, socials, stats, type Person } from "@/data/team";

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
const SIZES = { player: 236, manager: 196, lead: 220, crew: 152 } as const;

type Rank = keyof typeof SIZES;

/* Brand marks, drawn rather than imported: two glyphs do not justify an icon
   package, and these are the only two the page needs. */
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.2 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.05-3.32-2.05 0-2.37 1.58-2.37 3.21V21h-4V9Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

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

  const social = socials[person.name];
  const hasLinks = Boolean(social?.linkedin || social?.instagram);
  const [flipped, setFlipped] = useState(false);

  return (
    <article
      className={`fbox fbox--${rank}${flipped ? " fbox--flipped" : ""}`}
      style={{ "--fb-w": `${size}px` } as React.CSSProperties}
    >
      {/* The turned solid. Only this element is in 3D; everything inside is
          flat on one of its two faces. */}
      <div className="fbox__solid">
        {/* The hidden face keeps its layout but leaves the tab order and the
            accessibility tree, so turning the box is a real state change and
            not two faces stacked on top of each other. */}
        <div className="fbox__face" inert={flipped}>
          <div className="fbox__header">
            <span className="fbox__brand">Andromeda</span>
          </div>

          <div className="fbox__window">
            {/* The rank is a sticker on the blister, not a second item in the
                brand band: the band is too narrow to hold both at a size
                either can be read at. */}
            <span className="fbox__rank">{RANK_LABEL[rank]}</span>
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
            {/* The member's place in the roster, which is what the HUD
                counts. A real number, not packaging dressing. */}
            <span className="fbox__no" aria-hidden="true">
              {String(no).padStart(2, "0")}
            </span>
          </div>

          {/* Either panel is the handle that turns the box, so a second click
              puts it back. A member with nothing to link to keeps a box that
              does not turn, rather than one that turns to an empty back. */}
          {hasLinks && (
            <button
              type="button"
              className="fbox__turn"
              aria-label={`Lihat kontak ${person.name}`}
              onClick={() => setFlipped(true)}
            />
          )}
        </div>

        {hasLinks && (
          <div className="fbox__back" inert={!flipped}>
            <button
              type="button"
              className="fbox__turn"
              aria-label={`Tutup kontak ${person.name}`}
              onClick={() => setFlipped(false)}
            />

            {/* The same brand band and barcode as the front, so the turned
                box still reads as one object rather than a bare panel. */}
            <div className="fbox__header">
              <span className="fbox__brand">Andromeda</span>
            </div>

            <div className="fbox__contact">
              <p className="fbox__backname">{person.name}</p>

              <ul className="fbox__links">
                {social?.linkedin && (
                  <li>
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`LinkedIn ${person.name}`}
                    >
                      <LinkedInMark />
                    </a>
                  </li>
                )}
                {social?.instagram && (
                  <li>
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Instagram ${person.name}`}
                    >
                      <InstagramMark />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <span className="fbox__code" aria-hidden="true" />
          </div>
        )}

        {/* Printed spine. Nothing here carries meaning, so none of it is
            text a screen reader has to wade through. */}
        {/* The far wall. Hidden behind the front panel until the box is
            turned over, and then it is what gives the back its thickness. */}
        <span className="fbox__flank" aria-hidden="true" />

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

      {/* Both managers read as one tier under the leader, so they sit in one
          row rather than each heading its own branch far down the page. */}
      <Reveal className="roster__managers" variant="down">
        {branches.map((branch) => (
          <Card
            key={branch.manager.name}
            person={branch.manager}
            rank="manager"
            no={next()}
          />
        ))}
      </Reveal>

      {branches.map((branch, b) => (
        <section className="branch" key={branch.manager.name}>
          {branch.divisions.map((division, d) => (
            <Reveal
              as="section"
              key={division.name}
              className="world"
              delay={d * 80}
              /* Divisions still enter from alternating sides; only the layout
                 stopped mirroring. */
              variant={(b + d) % 2 === 1 ? "right" : "left"}
            >
              <header className="world__head">
                <span className="world__stage">Stage {stage(b, d)}</span>
                <h2 className="world__name">{division.name}</h2>
              </header>

              {/* One row per division: half the crew, the lead, the rest.
                  The lead stays first in the DOM so the roster numbers keep
                  counting the division head first; CSS `order` does the
                  placing. Wings are not forced to equal widths — an uneven
                  crew leaves the lead off the centre line by half a box,
                  which reads better than wrapping the larger wing. */}
              <ol className="world__members">
                <li className="world__member world__member--lead">
                  <Card person={division.head} rank="lead" no={next()} />
                </li>
                {division.staff.map((person, i) => (
                  <li
                    key={person.name}
                    className={`world__member world__member--${
                      i < Math.floor(division.staff.length / 2)
                        ? "left"
                        : "right"
                    }`}
                  >
                    <Card person={person} rank="crew" no={next()} />
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </section>
      ))}
    </div>
  );
}
