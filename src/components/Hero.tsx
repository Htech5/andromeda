import AsciiRobot from "./AsciiRobot";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero onDark" id="top">
      <div className="hero__inner shell">
        <div className="hero__text">
          <p className="mono hero__kicker">
            <span className="accent">[</span> {site.kicker}{" "}
            <span className="accent">]</span>
          </p>
          <h1 className="hero__title">{site.wordmark}</h1>
          <p className="mono hero__tagline">{site.tagline}</p>
          <div className="hero__actions">
            <a className="cta cta--solid" href="#robot">
              Explore the robot
            </a>
            <a className="cta" href="#mission">
              Our mission
            </a>
          </div>
        </div>

        <AsciiRobot />
      </div>

      <div className="hero__meta shell mono">
        <span>01 / LEGGED PLATFORM</span>
        <span aria-hidden="true" className="hero__rule" />
        <span>KRSRI — SEARCH &amp; RESCUE</span>
      </div>
    </section>
  );
}
