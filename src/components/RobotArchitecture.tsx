import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { robot, subsystems } from "@/data/robot";

export default function RobotArchitecture() {
  return (
    <section className="section shell" id="robot">
      <SectionHead title={robot.model} />

      <div className="editorial editorial--wide">
        <Reveal>
          <figure className="robotShot">
            <Image
              src="/images/m31-iso.webp"
              alt="Render isometrik robot M31 Enterprise: enam kaki bersendi, badan silinder, dan lengan evakuasi terangkat"
              width={930}
              height={1200}
              sizes="(min-width: 900px) 60vw, 90vw"
            />
            <figcaption className="robotShot__soon mono">See you soon</figcaption>
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
