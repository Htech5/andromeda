import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
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

export default function Sponsorship() {
  const top = tiers.length - 1;

  return (
    <section className="section shell" id="sponsorship">
      <SectionHead title="Paket kemitraan" />

      <div className="prospectus">
        <Reveal variant="tilt">
          <p className="lede lede--bar">
            Identitas perusahaan ditempatkan pada robot, perlengkapan, dan media
            publikasi resmi tim. Dukungan masuk langsung ke komponen dan biaya
            keberangkatan ke KSTI 2026, Surabaya, November 2026.
          </p>
        </Reveal>

        <Reveal delay={90} variant="right">
          <div className="prospectus__contact">
            <p className="prospectus__label mono accent">Divisi Sponsorship</p>
            <a className="cta cta--solid" href={site.proposal} download>
              Unduh proposal
              <span className="cta__meta mono">PDF · 13 MB</span>
            </a>
            <a className="cta" href={`https://wa.me/${site.phoneHref}`}>
              WhatsApp tim
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={60} variant="rise">
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
    </section>
  );
}
