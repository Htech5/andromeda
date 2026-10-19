import { existsSync } from "node:fs";
import Image from "next/image";
import Reveal from "./Reveal";
import { poweredBy, sponsors, type Partner } from "@/data/partners";

/** A logo path only counts once the file is actually in /public. */
const hasLogo = (logo?: string) => !!logo && existsSync(`public${logo}`);
const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type Seat = { x: number; y: number; z: number; pad: number };

/**
 * Deterministic scatter. Same seed, same sky on every render, so the server
 * HTML never disagrees with itself and the layout is stable between deploys.
 * Positions are percentages of the section box; `pad` is the clearance a seat
 * wants, in the same percentage units, so big marks keep more room than small
 * ones. Already placed seats are passed in, otherwise the two groups would be
 * scattered blind to each other and overlap.
 */
function scatter(
  n: number,
  seed: number,
  rMin: number,
  rMax: number,
  pad: number,
  taken: Seat[] = [],
): Seat[] {
  let s = seed >>> 0;
  const rnd = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32;
  const out: Seat[] = [];

  for (let i = 0; i < n; i++) {
    for (let tries = 0; tries < 900; tries++) {
      // Clearance relaxes the longer a seat goes unplaced, so a crowded field
      // still seats everyone instead of dropping the last few.
      const give = 1 - Math.min(tries / 900, 0.45);
      const angle = rnd() * Math.PI * 2;
      // sqrt keeps the draw area-uniform instead of crowding the inner edge
      const r = rMin + (rMax - rMin) * Math.sqrt(rnd());
      const x = 50 + Math.cos(angle) * r;
      const y = 50 + Math.sin(angle) * r * 0.82;
      // Tighter than it looks: a seat is a point, but the mark hung on it is
      // up to 30vmin wide, so the bounds have to hold back half of that. The
      // top edge also clears the nav pill and the fade band under it.
      if (x < 15 || x > 85 || y < 17 || y > 86) continue;
      // y counts double: the seats are wider than they are tall
      const clash = [...taken, ...out].some(
        (q) => Math.hypot(q.x - x, (q.y - y) * 1.9) < ((q.pad + pad) / 2) * give,
      );
      if (clash) continue;
      out.push({ x, y, z: rnd(), pad });
      break;
    }
  }
  return out;
}

// Backers sit nearer the core and ride bigger; past sponsors drift out to the
// faint edge of the field, small and dim, like the further stars.
const nearSeats = scatter(poweredBy.length, 20260119, 29, 43, 27);
const farSeats = scatter(sponsors.length, 7781, 37, 53, 20, nearSeats);

function style(seat: Seat, min: number, span: number, fade: number) {
  return {
    "--x": seat.x,
    "--y": seat.y,
    "--h": `${(min + seat.z * span).toFixed(2)}vmin`,
    "--o": (fade + seat.z * 0.2).toFixed(2),
  } as React.CSSProperties;
}

function Logo({ partner, className }: { partner: Partner; className: string }) {
  return hasLogo(partner.logo) ? (
    <Image
      src={partner.logo!}
      alt={partner.name}
      width={440}
      height={180}
      className={className}
    />
  ) : (
    <span className="partners__name">{partner.name}</span>
  );
}

export default function PoweredBy() {
  return (
    <section
      className="sky onDark"
      id="sponsorship"
      aria-label="Powered by"
    >
      <Image
        src="/andromeda.webp"
        alt=""
        width={1600}
        height={1600}
        className="sky__core"
        sizes="150vmin"
      />
      <div className="sky__glow" aria-hidden="true" />

      <div className="sky__field">
        {poweredBy.map((partner, i) => {
          const seat = nearSeats[i];
          if (!seat) return null;
          const id = `powered-${slug(partner.name)}`;
          return (
            <div
              className="sky__seat sky__seat--near"
              key={partner.name}
              style={style(seat, 6.4, 3.4, 0.8)}
            >
              <Reveal delay={i * 90}>
                {/* Native popover: top layer, Esc and click-outside for free,
                    no client component and no dialog script. */}
                <button
                  type="button"
                  className="powered__trigger"
                  popoverTarget={id}
                  aria-label={`Profil singkat ${partner.name}`}
                >
                  <Logo partner={partner} className="sky__logo" />
                </button>

                <div id={id} popover="auto" className="powered__card">
                  <p className="powered__cardLabel mono">
                    <span className="accent">/</span> Powered by
                  </p>
                  <h3 className="powered__cardTitle">{partner.name}</h3>
                  <p className="powered__cardBody">{partner.about}</p>
                  <div className="powered__cardFoot">
                    {partner.href && (
                      <a
                        className="inlineLink"
                        href={partner.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Situs resmi
                      </a>
                    )}
                    <button
                      type="button"
                      className="powered__close mono"
                      popoverTarget={id}
                      popoverTargetAction="hide"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          );
        })}

        {sponsors.map((partner, i) => {
          const seat = farSeats[i];
          if (!seat) return null;
          return (
            <div
              className="sky__seat sky__seat--far"
              key={partner.name}
              style={style(seat, 4.2, 2.2, 0.45)}
            >
              <Reveal delay={450 + i * 50}>
                <Logo partner={partner} className="sky__logo" />
              </Reveal>
            </div>
          );
        })}

        <Reveal className="sky__center" delay={140}>
          <p className="sky__label">
            <span className="accent">/</span> Powered by
          </p>
          <a className="sky__join" href="/sponsorship">
            Join Us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
