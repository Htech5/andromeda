import Image from "next/image";

/**
 * Backdrop for /team: a web spun out of the board, and the robot coming down
 * on a thread of it.
 *
 * The web is drawn in PCB grammar rather than silk. Spokes are straight copper
 * runs out of the top-right corner, the strands between them sag inward the
 * way real web silk does, every crossing carries a via pad, and three traces
 * break off the web at 45 degrees and end in square pads — the angle a router
 * uses, not a spider. Read either way, which is the point.
 *
 * The hanging robot is the M31 plan view already used on the achievements
 * strip. Seen from above it has six legs around an oval body, so it needs no
 * redrawing to read as the thing on the end of a thread.
 *
 * Geometry generated once against a 400x400 box with the origin at (400, 0);
 * the numbers are baked rather than computed at runtime because nothing about
 * them changes.
 */
export default function TeamDecor() {
  return (
    <div className="teamDeco" aria-hidden="true">
      <svg
        className="teamDeco__web"
        viewBox="0 0 400 400"
        fill="none"
        preserveAspectRatio="xMaxYMin slice"
      >
        {/* Copper runs out of the corner. */}
        <g className="teamDeco__spokes">
          <path d="M400.0 0.0 L370.1 427.0 M400.0 0.0 L239.7 396.8 M400.0 0.0 L119.2 323.0 M400.0 0.0 L29.3 214.0 M400.0 0.0 L-20.1 81.7 M400.0 0.0 L-23.8 -59.6" />
        </g>

        {/* Strands, outermost first so the near ones sit over them. */}
        <g className="teamDeco__strands">
          <path d="M371.5 407.0 Q313.3 375.7 247.2 378.3 Q198.5 328.7 132.3 307.9 Q102.5 245.2 46.7 204.0 Q38.9 135.0 -0.5 77.9 Q14.6 10.1 -4.0 -56.8" />
          <path d="M377.3 325.2 Q330.7 300.2 277.9 302.3 Q239.0 262.7 186.1 246.0 Q162.3 196.0 117.7 163.0 Q111.4 107.9 80.0 62.2 Q92.0 8.1 77.2 -45.4" />
          <path d="M382.8 245.4 Q347.7 226.5 307.8 228.1 Q278.5 198.2 238.6 185.7 Q220.6 147.9 187.0 123.0 Q182.3 81.4 158.5 46.9 Q167.6 6.1 156.4 -34.2" />
          <path d="M388.3 167.6 Q364.3 154.7 337.1 155.8 Q317.0 135.4 289.8 126.8 Q277.5 101.0 254.5 84.0 Q251.3 55.6 235.1 32.1 Q241.3 4.2 233.6 -23.4" />
          <path d="M393.6 91.8 Q380.4 84.7 365.5 85.3 Q354.6 74.1 339.6 69.4 Q332.9 55.3 320.3 46.0 Q318.6 30.4 309.7 17.6 Q313.1 2.3 308.9 -12.8" />
        </g>

        {/* Traces leaving the web on the router's angle, each ending in a pad. */}
        <g className="teamDeco__stubs">
          <path d="M289.8 126.8 l-26 26 h-40 M158.5 46.9 l-26 26 h-40 M277.9 302.3 l-26 26 h-40" />
          <rect x="217" y="148.8" width="8" height="8" />
          <rect x="86" y="68.9" width="8" height="8" />
          <rect x="205" y="324.3" width="8" height="8" />
        </g>

        {/* A via at every crossing. */}
        <g className="teamDeco__vias">
          {[
            [393.6, 91.8], [365.5, 85.3], [339.6, 69.4], [320.3, 46.0], [309.7, 17.6],
            [388.3, 167.6], [337.1, 155.8], [289.8, 126.8], [254.5, 84.0], [235.1, 32.1],
            [382.8, 245.4], [307.8, 228.1], [238.6, 185.7], [187.0, 123.0], [158.5, 46.9],
            [377.3, 325.2], [277.9, 302.3], [186.1, 246.0], [117.7, 163.0], [80.0, 62.2],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" />
          ))}
        </g>
      </svg>

      {/* The drop line and what is on the end of it. The thread is a border on
          the wrapper, so it always meets the robot exactly. */}
      <div className="teamDrop">
        <div className="teamDrop__bot">
          <Image
            src="/images/m31-top.webp"
            alt=""
            width={700}
            height={583}
            sizes="(max-width: 700px) 110px, 170px"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
