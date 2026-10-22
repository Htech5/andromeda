import Image from "next/image";
import { branches, leader, type Person } from "@/data/team";

/** Every portrait on the roster, apex first, in reading order. */
const faces: Person[] = [
  leader,
  ...branches.flatMap((branch) => [
    branch.manager,
    ...branch.divisions.flatMap((division) => [
      division.head,
      ...division.staff,
    ]),
  ]),
].filter((person) => person.photo);

const SIZE = 76;

/** Two lanes drifting against each other, so the strip reads as a crowd and
    not as a queue. The split is by position, which keeps both lanes even. */
const lanes = [
  faces.filter((_, i) => i % 2 === 0),
  faces.filter((_, i) => i % 2 === 1),
];

function Lane({ people, back }: { people: Person[]; back?: boolean }) {
  // Duplicated once: the track travels exactly half its width per cycle, so
  // the seam lands on an identical face and never shows.
  const cycle = [...people, ...people];

  return (
    <div className={`faceStrip__lane${back ? " faceStrip__lane--back" : ""}`}>
      {cycle.map((person, i) => (
        <span className="face" key={`${person.name}-${i}`}>
          <Image
            src={`/images/team/${person.photo}.webp`}
            alt=""
            width={SIZE}
            height={SIZE}
            sizes={`${SIZE}px`}
          />
        </span>
      ))}
    </div>
  );
}

/** Decorative: the names and roles live on /team, and reading 48 duplicated
    portraits out loud would bury the link that follows. */
export default function TeamFaces() {
  return (
    <div className="faceStrip" aria-hidden="true">
      {lanes.map((people, i) => (
        <Lane back={i === 1} key={i} people={people} />
      ))}
    </div>
  );
}
