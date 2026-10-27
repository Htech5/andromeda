import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import PixelCard from "./PixelCard";
import NavIcon from "./NavIcon";
import { benefits, tiers } from "@/data/sponsorship";
import { site } from "@/data/site";

const included = (i: number) =>
  benefits.filter((benefit) => benefit.tiers[i]).length;

const waHref = (tierName: string, price: string) =>
  `https://wa.me/${site.phoneHref}?text=${encodeURIComponent(
    `Halo, saya tertarik paket sponsorship ${tierName} (${price}).`,
  )}`;

export default function Sponsorship() {
  const top = tiers.length - 1;

  return (
    <section className="section pricingBand onDark" id="sponsorship">
      <svg className="pricingBand__deco pricingBand__deco--ring" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="180" />
        <circle cx="200" cy="200" r="130" />
      </svg>
      <svg className="pricingBand__deco pricingBand__deco--circuit" viewBox="0 0 300 300" aria-hidden="true">
        <path d="M0 60 H120 L150 90 V200 L180 230 H300" />
        <circle cx="150" cy="90" r="4" />
        <circle cx="180" cy="230" r="4" />
      </svg>
      <svg className="pricingBand__deco pricingBand__deco--circuit2" viewBox="0 0 260 260" aria-hidden="true">
        <path d="M260 0 V70 L210 120 H90 L50 160 V260" />
        <circle cx="210" cy="120" r="4" />
        <circle cx="50" cy="160" r="4" />
      </svg>
      <svg className="pricingBand__deco pricingBand__deco--circuit3" viewBox="0 0 220 220" aria-hidden="true">
        <path d="M0 110 H60 L90 80 H160 L190 110 V220" />
        <circle cx="90" cy="80" r="3.5" />
        <circle cx="190" cy="110" r="3.5" />
      </svg>
      <svg className="pricingBand__deco pricingBand__deco--circuit4" viewBox="0 0 240 240" aria-hidden="true">
        <path d="M0 0 V50 L40 90 H140 L170 60 V0" />
        <circle cx="40" cy="90" r="4" />
        <circle cx="170" cy="60" r="4" />
      </svg>
      <svg className="pricingBand__deco pricingBand__deco--circuit5" viewBox="0 0 260 260" aria-hidden="true">
        <path d="M260 260 V190 L220 150 H120 L90 180 V260" />
        <circle cx="220" cy="150" r="4" />
        <circle cx="90" cy="180" r="4" />
      </svg>

      <div className="shell">
        <SectionHead title="Sponsorship" />

        <Reveal variant="tilt">
          <div className="pricingBand__head">
            <h3 className="pricingBand__headline">
              Jadikan nama perusahaan Anda melesat bersama robot juara nasional
            </h3>
            <p className="pricingBand__sub">
              Logo Anda ikut bertanding — terpasang di robot, seragam tim, dan
              setiap laporan progres yang kami publikasikan sepanjang jalan ke
              KSTI 2026. Eksposur yang terus bekerja, bukan logo yang cuma
              numpang sekali di baliho.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60} variant="scale">
          <div className="pricingBand__cta">
            <a className="cta--whatsapp" href={`https://wa.me/${site.phoneHref}`}>
              <NavIcon name="whatsapp" className="pricingBand__ctaGlyph" />
              WhatsApp Tim Sponsorship
            </a>
          </div>
        </Reveal>

        <Reveal delay={90} variant="rise">
          <ul className="tierCards">
            {tiers.map((tier, i) => (
              <li key={tier.name}>
                <PixelCard
                  className={`tierCard${i === top ? " tierCard--top" : ""}`}
                  theme="dark"
                  colors={
                    i === top
                      ? ["#d9b36c", "#3f8f6c", "#1b3a2d"]
                      : ["#ffb199", "#ff3b33"]
                  }
                  glowColor={i === top ? "#c9a35a" : "#ff3b33"}
                  shape={i === top ? "diamond" : "square"}
                  gap={i === top ? 9 : 8}
                  pixelSize={2}
                  speed={i === top ? 20 : 26}
                  opacity={i === top ? 0.4 : 0.3}
                  fade={0.65}
                  trigger="hover"
                  radius={20}
                  clickPulse
                  intro
                  introDelay={i * 90}
                  style={
                    {
                      "--pixel-card-surface": i === top
                        ? "linear-gradient(180deg, #16231d 0%, #0d1512 100%)"
                        : "linear-gradient(180deg, #1c110f 0%, #110a09 100%)",
                      "--pixel-card-edge": i === top
                        ? "rgba(201, 163, 90, 0.22)"
                        : "rgba(255, 255, 255, 0.07)",
                    } as React.CSSProperties
                  }
                >
                  {i === top && <span className="tierCard__badge mono">Paling eksklusif</span>}
                  <p className="tierCard__name">{tier.name}</p>
                  <p className="tierCard__price">
                    {tier.price}
                    <span className="tierCard__cycle">/ musim</span>
                  </p>
                  <p className="tierCard__count mono">
                    {included(i)} dari {benefits.length} benefit
                  </p>
                  <ul className="tierCard__list">
                    {benefits
                      .filter((benefit) => benefit.tiers[i])
                      .map((benefit) => (
                        <li key={benefit.label}>{benefit.label}</li>
                      ))}
                  </ul>
                  <a
                    className={`cta ${i === top ? "cta--solid" : ""}`.trim()}
                    href={waHref(tier.name, tier.price)}
                  >
                    Pilih paket
                  </a>
                </PixelCard>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} variant="scale">
          <p className="noteLine mono">
            Harga dan benefit dapat menyesuaikan hasil diskusi.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
