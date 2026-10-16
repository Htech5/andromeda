import HeroAscii from "./HeroAscii";
import { competition } from "@/data/competition";
import { robot } from "@/data/robot";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero onDark" id="top">
      {/* Full-bleed backdrop: sized against the hero itself, not a grid column. */}
      <div className="hero__art" aria-hidden="true">
        <HeroAscii />
      </div>

      <div className="hero__inner shell">
        <div className="hero__text">
          <h1 className="hero__title">{site.wordmark}</h1>
          <p className="mono hero__tagline">{site.tagline}</p>
          <p className="hero__lede">
            Legged robot otonom {robot.model} dari Universitas Diponegoro,
            disiapkan untuk kategori Search and Rescue {competition.name}.
          </p>
          <div className="hero__actions">
            <a className="cta cta--solid" href="#robot">
              Lihat robotnya
            </a>
            <a className="cta" href="#sponsorship">
              Jadi sponsor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
