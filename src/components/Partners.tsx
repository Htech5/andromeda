import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { mediaPartners, sponsors } from "@/data/partners";
import { site } from "@/data/site";

const groups = [
  { label: "Sponsors", items: sponsors },
  { label: "Media Partners", items: mediaPartners },
];

export default function Partners() {
  const filled = groups.filter((group) => group.items.length > 0);

  return (
    <section className="section shell" id="partners">
      <SectionHead title="Didukung oleh" />

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
              <p className="partners__label mono">
                <span className="accent">/</span> {group.label}
              </p>
              <ul className="partners__wall">
                {group.items.map((partner, i) => (
                  <Reveal as="li" key={partner.name} delay={i * 50}>
                    <div className="partners__cell">
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
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
