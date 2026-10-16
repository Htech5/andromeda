import { existsSync } from "node:fs";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { mediaPartners, sponsors } from "@/data/partners";
import { site } from "@/data/site";

/** Server-side: a logo path only counts once the file is actually in /public,
    so a missing file falls back to the name instead of a broken image. */
const hasLogo = (logo?: string) => !!logo && existsSync(`public${logo}`);

const groups = [
  { label: "Sponsors", items: sponsors },
  { label: "Media Partners", items: mediaPartners },
];

export default function Partners() {
  const filled = groups.filter((group) => group.items.length > 0);

  return (
    <section className="section shell" id="sponsorship">
      <SectionHead title="Our sponsor" />

      {filled.length === 0 ? (
        <Reveal>
          <p className="lede">
            Belum ada sponsor atau media partner yang dikonfirmasi. Ajuan
            dukungan dan kerja sama publikasi dapat dikirim ke{" "}
            <a className="inlineLink" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </Reveal>
      ) : (
        <div className="partners">
          {filled.map((group) => (
            <div className="partners__group" key={group.label}>
              {/* One group needs no label: the section heading already says it. */}
              {filled.length > 1 && (
                <p className="partners__label mono">
                  <span className="accent">/</span> {group.label}
                </p>
              )}
              <ul className="partners__wall">
                {group.items.map((partner, i) => (
                  <Reveal as="li" key={partner.name} delay={i * 50}>
                    <div className="partners__cell">
                      {hasLogo(partner.logo) ? (
                        <Image
                          src={partner.logo!}
                          alt={partner.name}
                          width={320}
                          height={120}
                          className="partners__logo"
                        />
                      ) : (
                        <span className="partners__name">{partner.name}</span>
                      )}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
