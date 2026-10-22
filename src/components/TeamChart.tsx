import Image from "next/image";
import Reveal from "./Reveal";
import { branches, leader, type Person } from "@/data/team";

/** First letter of the first and last word. One photo is still missing, and
    an initials disc reads better there than a stock silhouette. */
function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : ""))
    .toUpperCase();
}

const SIZES = { lead: 132, head: 104, staff: 84 } as const;

function Member({
  person,
  rank,
}: {
  person: Person;
  rank: keyof typeof SIZES;
}) {
  const size = SIZES[rank];

  return (
    <article className={`orgCard orgCard--${rank}`}>
      <div className="orgCard__disc" style={{ width: size, height: size }}>
        {person.photo ? (
          <Image
            src={`/images/team/${person.photo}.webp`}
            alt={`Potret ${person.name}`}
            width={size}
            height={size}
            sizes={`${size}px`}
          />
        ) : (
          <span className="orgCard__initials mono" aria-hidden="true">
            {initials(person.name)}
          </span>
        )}
      </div>
      <p className="orgCard__role mono accent">{person.role}</p>
      <h3 className="orgCard__name">{person.name}</h3>
    </article>
  );
}

export default function TeamChart() {
  return (
    <div className="org">
      <Reveal className="org__apex" variant="scale">
        <Member person={leader} rank="lead" />
      </Reveal>

      {branches.map((branch, b) => (
        <section className="orgBranch" key={branch.manager.name}>
          <Reveal className="orgBranch__manager" variant="down">
            <Member person={branch.manager} rank="head" />
          </Reveal>

          <div className="orgBranch__divisions">
            {branch.divisions.map((division, d) => (
              <Reveal
                as="div"
                className="orgDiv"
                key={division.name}
                delay={d * 90}
                variant={b % 2 === 0 ? "left" : "right"}
              >
                <h2 className="orgDiv__name mono">{division.name}</h2>
                <Member person={division.head} rank="head" />

                {division.staff.length > 0 && (
                  <ol className="orgDiv__staff">
                    {division.staff.map((person) => (
                      <li key={person.name}>
                        <Member person={person} rank="staff" />
                      </li>
                    ))}
                  </ol>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
