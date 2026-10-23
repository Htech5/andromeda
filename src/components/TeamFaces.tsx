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

/** Two lanes drifting against each other: one opens the section, one closes
    it. The split is by position, which keeps both lanes even. */
const lanes: Person[][] = [
  faces.filter((_, i) => i % 2 === 0),
  faces.filter((_, i) => i % 2 === 1),
];

/** Decorative: the names and roles live on /team, and reading 50 duplicated
    portraits out loud would bury the link between the two lanes. */
export default function TeamFaces({ lane }: { lane: 0 | 1 }) {
  // Four copies, and the track travels exactly one copy per cycle (25%), so
  // the seam always lands on an identical face. Two copies were not enough:
  // one copy is about 1250px, so past that width the tail ran out mid-cycle
  // and the lane ended in blank page. Three copies cover 2496px, four cover
  // 3744px. ponytail: add a fifth if the site ever has to fill a wall.
  const cycle = [0, 1, 2, 3].flatMap(() => lanes[lane]);

  return (
    <div className="faceStrip" aria-hidden="true">
      <div
        className={`faceStrip__lane${lane === 1 ? " faceStrip__lane--back" : ""}`}
      >
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
    </div>
  );
}
