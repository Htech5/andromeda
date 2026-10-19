import { existsSync } from "node:fs";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { poweredBy } from "@/data/partners";

/** Same rule as Partners: a path only counts once the file is in /public. */
const hasLogo = (logo?: string) => !!logo && existsSync(`public${logo}`);
const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function PoweredBy() {
  return (
    <section className="section section--powered shell" id="sponsorship">
      <SectionHead title="Powered by" />

      <ul className="powered__wall">
        {poweredBy.map((partner, i) => {
          const id = `powered-${slug(partner.name)}`;
          return (
            <Reveal as="li" key={partner.name} delay={i * 80}>
              {/* Native popover: top layer, Esc and click-outside for free, no
                  client component and no dialog script. */}
              <button
                type="button"
                className="powered__trigger"
                popoverTarget={id}
                aria-label={`Profil singkat ${partner.name}`}
              >
                {hasLogo(partner.logo) ? (
                  <Image
                    src={partner.logo!}
                    alt={partner.name}
                    width={420}
                    height={160}
                    className="powered__logo"
                  />
                ) : (
                  <span className="partners__name">{partner.name}</span>
                )}
              </button>

              <div id={id} popover="auto" className="powered__card">
                <p className="powered__cardLabel mono">
                  <span className="accent">/</span> Powered by
                </p>
                <h3 className="powered__cardTitle">{partner.name}</h3>
                <p className="powered__cardBody">{partner.about}</p>
                <div className="powered__cardFoot">
                  {partner.href && (
                    <a
                      className="inlineLink"
                      href={partner.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Situs resmi
                    </a>
                  )}
                  <button
                    type="button"
                    className="powered__close mono"
                    popoverTarget={id}
                    popoverTargetAction="hide"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
