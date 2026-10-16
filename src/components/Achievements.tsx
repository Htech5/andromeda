import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { achievements } from "@/data/achievements";

export default function Achievements() {
  return (
    <section className="section shell" id="achievements">
      <SectionHead index="04 / ACHIEVEMENTS" title="Record of work" />

      {achievements.length === 0 ? (
        <Reveal>
          <p className="lede">
            Belum ada capaian resmi yang dipublikasikan. Bagian ini diisi setelah
            dokumentasi tim tersedia.
          </p>
        </Reveal>
      ) : (
        <ol className="timeline">
          {achievements.map((item, i) => (
            <Reveal as="li" key={`${item.year}-${i}`} delay={i * 80}>
              <article className="timeline__row">
                <p className="timeline__year">{item.year}</p>
                <div className="timeline__body">
                  <h3 className="timeline__event">{item.event}</h3>
                  <p className="timeline__result mono accent">{item.result}</p>
                  <p className="timeline__note">{item.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      )}
    </section>
  );
}
