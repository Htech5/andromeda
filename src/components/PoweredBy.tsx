import { existsSync } from "node:fs";
import Image from "next/image";
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
 * wants, in the same percentage units. Already placed seats are passed in,
 * otherwise the two groups would be scattered blind to each other.
 *
 * Sampling is over the box with the middle punched out, not around a ring.
 * A ring wide enough to clear the centre runs past the left and right bounds,
 * and every rejected point there pushes the survivors to the top and bottom:
 * the field ends up clustered in the corners with holes at either side.
 */
function scatter(
  n: number,
  seed: number,
  hole: number,
  pad: number,
  taken: Seat[] = [],
): Seat[] {
  let s = seed >>> 0;
  const rnd = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32;
  const out: Seat[] = [];

  for (let i = 0; i < n; i++) {
    for (let tries = 0; tries < 900; tries++) {
      // Clearance relaxes the longer a seat goes unplaced, but only so far:
      // past about a quarter the plates start touching, and seatAll below is
      // the proper place to give ground when a field is genuinely crowded.
      const give = 1 - Math.min(tries / 900, 0.22);
      // Bounds hold back half of the widest plate a mark can wear, and clear
      // the nav pill along the top.
      const x = 15 + rnd() * 70;
      const y = 17 + rnd() * 69;
      // The hole the mark button sits in.
      const dx = (x - 50) / hole;
      const dy = (y - 50) / (hole * 0.92);
      if (dx * dx + dy * dy < 1) continue;
      // y counts double: the plates are wider than they are tall
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

/**
 * Seats everyone, or gives up clearance until it can. scatter() drops whoever
 * it cannot place, and a sponsor silently missing from the wall is a worse
 * outcome than a tight field, so `pad` is an ambition here and not a promise.
 * This is what keeps the wall correct when partners are added later.
 */
function seatAll(
  n: number,
  seed: number,
  hole: number,
  pad: number,
  taken: Seat[] = [],
): Seat[] {
  for (let p = pad; p > 6; p -= 2) {
    const out = scatter(n, seed, hole, p, taken);
    if (out.length === n) return out;
  }
  return scatter(n, seed, hole, 6, taken);
}

// Backers sit nearer the core and ride bigger; past sponsors drift out to the
// edge of the field. Both carry the same clearance ambition and settle for
// whatever actually fits.
const nearSeats = seatAll(poweredBy.length, 20260119, 26, 30);
const farSeats = seatAll(sponsors.length, 7781, 26, 26, nearSeats);

const TOTAL = poweredBy.length + sponsors.length;

/**
 * The slice of the pinned scroll a mark arrives on. `contain 0%` to
 * `contain 100%` is exactly the stretch where the section is taller than the
 * viewport and the pin is stuck, so steps laid out across it line up with the
 * scrolling. Windows run wider than one step on purpose: marks overlap
 * slightly on the way in, which reads as a field filling up rather than a
 * slideshow.
 */
const SEQ_END = 80;

function range(order: number) {
  const step = SEQ_END / TOTAL;
  const start = order * step;
  return `contain ${start.toFixed(2)}% contain ${(start + step * 1.7).toFixed(2)}%`;
}

function style(
  seat: Seat,
  min: number,
  span: number,
  order: number,
  scale = 1,
) {
  return {
    "--x": seat.x,
    "--y": seat.y,
    "--h": `${((min + seat.z * span) * scale).toFixed(2)}vmin`,
    "--range": range(order),
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
    <section className="sky onDark" id="sponsorship" aria-label="Powered by">
      {/* Everything that is seen lives in the pin; the section around it is
          only the scroll track the marks are timed against. */}
      <div className="sky__pin">
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
                style={style(seat, 7.4, 2.4, i, partner.scale)}
              >
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
                style={style(seat, 6.4, 1.8, poweredBy.length + i, partner.scale)}
              >
                <Logo partner={partner} className="sky__logo" />
              </div>
            );
          })}

          <a className="sky__join" href="/sponsorship">
            <span className="sky__joinWord">Join</span>
            <span className="sky__joinWord sky__joinWord--accent">Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
