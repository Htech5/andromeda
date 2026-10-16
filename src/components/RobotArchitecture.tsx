import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { robot, specs, subsystems } from "@/data/robot";

export default function RobotArchitecture() {
  return (
    <section className="section shell" id="robot">
      <SectionHead index="03 / ROBOT" title={robot.model} />

      <Reveal>
        <dl className="specGrid">
          {specs.map((spec) => (
            <div className="specGrid__cell" key={spec.group}>
              <dt className="specGrid__key mono accent">{spec.group}</dt>
              <dd className="specGrid__value mono">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="editorial editorial--wide">
        <Reveal>
          <figure className="robotShot">
            <Image
              src="/images/m31-side.webp"
              alt="Render tampak samping robot M31 Enterprise: enam kaki, badan silinder, dan lengan evakuasi"
              width={1100}
              height={1100}
              sizes="(min-width: 900px) 60vw, 90vw"
            />
            <figcaption className="mono">
              Render dari model CAD tim. {robot.dimensions} · {robot.weight}
            </figcaption>
          </figure>
        </Reveal>

        <ol className="partsList">
          {subsystems.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 70}>
              <div className="partsList__item">
                <span className="partsList__num mono accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="partsList__label">{item.label}</h3>
                <p className="partsList__body">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
