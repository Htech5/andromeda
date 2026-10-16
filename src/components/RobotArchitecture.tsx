import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { subsystems } from "@/data/robot";

export default function RobotArchitecture() {
  return (
    <section className="section shell" id="robot">
      <SectionHead index="03 / ROBOT ARCHITECTURE" title="Structure of the platform" />

      <div className="editorial editorial--wide">
        <Reveal>
          <svg
            className="blueprint"
            viewBox="0 0 900 560"
            role="img"
            aria-label="Diagram teknis robot berkaki Andromeda dengan label chassis, kaki, aktuator, sensor, komputer kontrol, serta daya dan komunikasi"
          >
            <g className="blueprint__grid" stroke="var(--hairline)" strokeWidth="1">
              <path d="M0 140h900M0 280h900M0 420h900M180 0v560M360 0v560M540 0v560M720 0v560" />
            </g>

            <g className="draw" fill="none" stroke="currentColor" strokeWidth="2">
              {/* chassis */}
              <rect x="330" y="200" width="250" height="90" />
              {/* sensor mast */}
              <path d="M455 200v-40" />
              <rect x="415" y="128" width="80" height="32" />
              {/* legs: hip, thigh, shank, foot */}
              <path d="M360 290v40l-45 60v50M400 290v40l45 60v50" />
              <path d="M510 290v40l-45 60v50M550 290v40l45 60v50" />
              <path d="M290 440h50M420 440h50M440 440h50M570 440h50" />
              {/* power + comms box */}
              <rect x="360" y="215" width="80" height="60" />
            </g>

            <g className="draw blueprint__accent" fill="none" stroke="var(--color-red)" strokeWidth="2">
              <circle cx="455" cy="144" r="7" />
              <circle cx="360" cy="290" r="8" />
              <circle cx="400" cy="290" r="8" />
              <circle cx="510" cy="290" r="8" />
              <circle cx="550" cy="290" r="8" />
              <rect x="470" y="225" width="90" height="40" />
            </g>

            <g className="blueprint__leader" stroke="var(--color-red)" strokeWidth="1" fill="none">
              <path d="M495 144h170M580 245h85M580 290h110M465 390h210M315 390H150M290 440H150" />
            </g>

            <g className="blueprint__label" fill="currentColor">
              <text x="675" y="140">SENSOR</text>
              <text x="675" y="241">COMPUTE</text>
              <text x="700" y="286">CHASSIS</text>
              <text x="685" y="386">JOINT</text>
              <text x="150" y="386" textAnchor="end">ACTUATOR</text>
              <text x="150" y="436" textAnchor="end">FOOT</text>
            </g>
          </svg>
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
