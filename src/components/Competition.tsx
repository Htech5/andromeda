import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { arenaRules, competition, phases } from "@/data/competition";

export default function Competition() {
  return (
    <section className="section shell" id="competition">
      <SectionHead index="04 / KOMPETISI" title="Lima misi, lima menit" />

      <div className="editorial editorial--split">
        <div className="stack">
          <Reveal delay={60}>
            <p className="lede lede--bar">
              {competition.longName} digelar {competition.host}. Andromeda turun
              di {competition.category}, membawa legged robot hasil
              pengembangan tim ke arena {competition.venue}.
            </p>
          </Reveal>
          <Reveal delay={110}>
            <dl className="factRow">
              <div>
                <dt className="mono accent">Arena</dt>
                <dd className="mono">{competition.arena}</dd>
              </div>
              <div>
                <dt className="mono accent">Misi</dt>
                <dd className="mono">{competition.missions}</dd>
              </div>
              <div>
                <dt className="mono accent">Batas waktu</dt>
                <dd className="mono">{competition.timeLimit}</dd>
              </div>
              <div>
                <dt className="mono accent">Kendali</dt>
                <dd className="mono">Otonom</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <dl className="defList">
            {arenaRules.map((item) => (
              <div className="defList__row" key={item.label}>
                <dt className="defList__term">{item.label}</dt>
                <dd className="defList__desc">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <ol className="phases">
        {phases.map((phase, i) => (
          <Reveal as="li" key={phase.date} delay={i * 40}>
            <div className="phases__item">
              <span className="phases__step mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="phases__title">{phase.title}</h3>
              <p className="phases__body mono">{phase.date}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
