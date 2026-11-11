import { Fragment } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/**
 * Three capabilities, one section. Each row carries its source file's own
 * proportion through `--ratio`, so the picture column is never squeezed into
 * a shape the image was not cut for.
 */
const capabilities = [
  {
    title: "High-difficulty arena",
    body:
      "Every part of the KSTI arena is built to stop a robot. Obstacle zones of broken, uneven ground. Rescue zones where a victim has to be found and lifted out. Control zones the robot takes its bearings from, with stairs, slopes and loose gravel between start and finish. Victim positions are shuffled before every round, so no route can be memorised. We design and rehearse Andromeda against all of it, which is why none of it is met for the first time on competition day.",
    src: "/images/cap-arena.webp",
    width: 1092,
    height: 862,
    // Flattened onto the frame's own colour when it was cut, so it needs no
    // alpha channel and no fitting: it fills the frame like the photographs.
    fit: "cover" as const,
    alt: "Isometric and plan drawings of the KSTI rescue arena, with obstacle, rescue and control zones marked and a route traced between them",
  },
  {
    title: "Advanced object detection",
    body:
      "Andromeda tells a real victim from a dummy by itself. Instance segmentation runs on the robot rather than on an operator's laptop, so a decision costs a glance instead of a round trip over a radio link. Depth and ranging sensors give that vision the distance it needs to approach, lift and carry a victim to the safety zone — in dust, in poor light, and in the narrow spaces a rescue robot is sent into in the first place.",
    src: "/images/cap-detection.webp",
    width: 1000,
    height: 750,
    fit: "cover" as const,
    alt: "Camera view from the robot with orange figures in the arena, each boxed and labelled either victim or dummy",
  },
  {
    title: "Precision design",
    body:
      "Everything on this robot is designed, machined and assembled by the team: six independently driven legs, a frame narrow enough for confined spaces, and a shell that survives a full competition run. The design is revised between seasons rather than rebuilt from scratch — every joint, bracket and board carries a change the last arena asked for. That is how a student-built machine keeps getting quicker, steadier and easier to repair.",
    src: "/images/cap-design.webp",
    width: 1000,
    height: 750,
    fit: "cover" as const,
    alt: "The M31 hexapod close up, its machined shell, lit sensor ring and six servo-driven legs visible",
  },
];

/**
 * The trace between two rows. The arena plan this section opens with draws its
 * route as a line between zones; the rows borrow that line to say the three
 * capabilities are one run, not three slides. Uniform viewBox, so the geometry
 * never skews with the column width, and `pathLength` normalises the dash so
 * the draw-on needs no measuring in JS.
 */
function CapsLink({ flip }: { flip: boolean }) {
  return (
    <li
      className={`capsLink${flip ? " capsLink--flip" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 120" fill="none">
        <path
          className="capsLink__trace"
          pathLength="1"
          d="M300 0 V40 Q300 60 320 60 H880 Q900 60 900 80 V120"
        />
        <circle className="capsLink__node" cx="600" cy="60" r="3.5" />
      </svg>
    </li>
  );
}

export default function Capability() {
  return (
    <section className="section capsBand onDark" id="capability">
      <div className="shell">
      <SectionHead title="Our Capability" />

      <ol className="caps">
        {capabilities.map((cap, i) => (
          <Fragment key={cap.title}>
          {/* Connects the row above to this one, so it leaves the side the
              picture above sits on and arrives at the side this one takes. */}
          {i > 0 && <CapsLink flip={i % 2 === 0} />}
          <Reveal
            as="li"
            delay={i * 70}
            variant={i % 2 === 0 ? "left" : "right"}
            className={i % 2 === 1 ? "caps__row caps__row--flip" : "caps__row"}
          >
            <article className="caps__item">
              <div
                className="caps__shot"
                style={{ "--ratio": `${cap.width} / ${cap.height}` } as React.CSSProperties}
              >
                <div className={`caps__frame caps__frame--${cap.fit}`}>
                  <Image
                    src={cap.src}
                    alt={cap.alt}
                    fill
                    sizes="(min-width: 1040px) 46vw, 92vw"
                  />
                </div>
              </div>

              <div className="caps__copy">
                <h3 className="caps__title">{cap.title}</h3>
                <p className="caps__body">{cap.body}</p>
              </div>
            </article>
          </Reveal>
          </Fragment>
        ))}
      </ol>
      </div>
    </section>
  );
}
