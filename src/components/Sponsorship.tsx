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

export default function Sponsorship() {
  return (
    <section className="section shell" id="sponsorship">
      <SectionHead index="07 / SPONSORSHIP" title="Paket kemitraan" />

      <div className="editorial editorial--split">
        <Reveal delay={60}>
          <p className="lede lede--bar">
            Lewat kemitraan dan program CSR, identitas perusahaan ditempatkan
            pada robot, perlengkapan, dan media publikasi resmi tim. Dukungan
            masuk langsung ke komponen dan biaya keberangkatan ke KSTI 2026.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="budget">
            {budget.map((item) => (
              <div className="budget__row" key={item.label}>
                <dt>{item.label}</dt>
                <dd className="mono">{rupiah(item.amount)}</dd>
              </div>
            ))}
            <div className="budget__row budget__row--total">
              <dt className="mono">Total kebutuhan</dt>
              <dd className="mono accent">{rupiah(budgetTotal)}</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div className="matrixWrap">
          <table className="matrix">
            <caption className="srOnly">
              Benefit sponsorship per paket
            </caption>
            <thead>
              <tr>
                <th scope="col">Benefit</th>
                {tiers.map((tier) => (
                  <th scope="col" key={tier.name}>
                    <span className="matrix__tier">{tier.name}</span>
                    <span className="matrix__price mono">{tier.price}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit) => (
                <tr key={benefit.label}>
                  <th scope="row">{benefit.label}</th>
                  {benefit.tiers.map((included, i) => (
                    <td key={tiers[i].name}>
                      <span
                        className={
                          included ? "matrix__yes" : "matrix__no"
                        }
                        aria-hidden="true"
                      />
                      <span className="srOnly">
                        {included ? "Termasuk" : "Tidak termasuk"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <p className="noteLine mono">
          Harga dan benefit dapat menyesuaikan hasil diskusi. Ajuan kerja sama:{" "}
          <a className="inlineLink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
