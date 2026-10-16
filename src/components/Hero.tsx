import HeroAscii from "./HeroAscii";
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
            Berdiri 2011 dengan robot pemadam api, sejak 2022 Andromeda beralih
            ke robot otonom Search and Rescue di bawah URDC Universitas
            Diponegoro. Pengembangan berjalan bersama dosen pembimbing, dengan
            kecerdasan buatan yang ditanam langsung di robot agar seluruh misi
            berjalan tanpa kendali operator. Sasarannya bukan berhenti di arena
            lomba, melainkan teknologi yang terpakai untuk keselamatan, respons
            darurat, dan misi kemanusiaan.
          </p>
          <div className="hero__actions">
            <a className="cta cta--solid" href="#robot">
              Lihat robotnya
            </a>
            <a className="cta" href="/sponsorship">
              Jadi sponsor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
