import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import PixelCard from "./PixelCard";
import {
  benefits,
  budget,
  budgetTotal,
  rupiah,
  tiers,
} from "@/data/sponsorship";
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
    <section className="section" id="sponsorship">
      <div className="pricingBand onDark">
        <svg className="pricingBand__deco pricingBand__deco--ring" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="180" />
          <circle cx="200" cy="200" r="130" />
        </svg>
        <svg className="pricingBand__deco pricingBand__deco--circuit" viewBox="0 0 300 300" aria-hidden="true">
          <path d="M0 60 H120 L150 90 V200 L180 230 H300" />
          <circle cx="150" cy="90" r="4" />
          <circle cx="180" cy="230" r="4" />
        </svg>

        <div className="shell">
          <SectionHead title="Sponsorship" />

          <Reveal variant="tilt">
            <div className="pricingBand__head">
              <p className="pricingBand__eyebrow mono accent">Divisi Sponsorship</p>
              <h3 className="pricingBand__headline">
                Jadikan nama perusahaan Anda melesat bersama robot juara nasional
              </h3>
              <p className="pricingBand__sub">
                Setiap rupiah langsung menjadi komponen robot, seragam tim, dan
                tiket keberangkatan ke KSTI 2026 — bukan sekadar logo di baliho.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60} variant="scale">
            <div className="pricingBand__cta">
              <a className="cta cta--solid" href={`https://wa.me/${site.phoneHref}`}>
                WhatsApp tim
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
                    colors={["#ff6a5e", "#ff3b33", "#7a1510"]}
                    glowColor="#ff3b33"
                    gap={7}
                    pixelSize={2}
                    speed={28}
                    opacity={i === top ? 0.55 : 0.35}
                    fade={0.65}
                    trigger="hover"
                    radius={20}
                    clickPulse
                    intro
                    introDelay={i * 90}
                  >
                    {i === top && <span className="tierCard__badge mono">Paling populer</span>}
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
        </div>
      </div>

      <div className="shell">
        <Reveal delay={75}>
          <details className="matrixDetails">
            <summary className="mono accent">Lihat detail lengkap benefit</summary>
            <div className="matrixWrap">
              <table className="matrix">
                <caption className="srOnly">Benefit sponsorship per paket</caption>
                <thead>
                  <tr>
                    <th scope="col">Benefit</th>
                    {tiers.map((tier, i) => (
                      <th
                        scope="col"
                        key={tier.name}
                        data-top={i === top ? "true" : undefined}
                      >
                        <span className="matrix__tier">{tier.name}</span>
                        <span className="matrix__price mono">{tier.price}</span>
                        <span className="matrix__count mono">
                          {included(i)} / {benefits.length} benefit
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {benefits.map((benefit) => (
                    <tr key={benefit.label}>
                      <th scope="row">{benefit.label}</th>
                      {benefit.tiers.map((has, i) => (
                        <td key={tiers[i].name} data-top={i === top ? "true" : undefined}>
                          <span
                            className={has ? "matrix__yes" : "matrix__no"}
                            aria-hidden="true"
                          />
                          <span className="srOnly">
                            {has ? "Termasuk" : "Tidak termasuk"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Reveal>

        <Reveal delay={90}>
          <div className="budget">
            <div className="budget__head">
              <h3 className="budget__title">Rencana anggaran</h3>
              <p className="budget__total mono">
                Total <span className="accent">{rupiah(budgetTotal)}</span>
              </p>
            </div>

            <dl className="budget__list">
              {budget.map((item) => {
                const share = item.amount / budgetTotal;
                return (
                  <div className="budget__row" key={item.label}>
                    <dt className="budget__label">{item.label}</dt>
                    <dd className="budget__bar">
                      {/* Width is data, not decoration: the share of the total. */}
                      <span style={{ width: `${(share * 100).toFixed(1)}%` }} />
                    </dd>
                    <dd className="budget__amount mono">{rupiah(item.amount)}</dd>
                    <dd className="budget__share mono">
                      {Math.round(share * 100)}%
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
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
