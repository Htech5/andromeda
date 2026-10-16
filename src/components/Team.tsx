import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { divisions, focus, stats } from "@/data/team";

export default function Team() {
  return (
    <section className="section shell" id="team">
      <SectionHead index="05 / TIM" title="Dua bidang, lima divisi" />

      <Reveal>
        <dl className="statsRow">
          {stats.map((item) => (
            <div className="statsRow__cell" key={item.label}>
              <dt className="statsRow__value mono">{item.value}</dt>
              <dd className="statsRow__label mono">{item.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="teamGrid teamGrid--two">
        {divisions.map((division, i) => (
          <Reveal key={division.field} delay={i * 80}>
            <div>
              <h3 className="teamGrid__division mono accent">
                {division.field}
              </h3>
              <p className="teamGrid__body">{division.body}</p>
              <ul className="teamGrid__members">
                {division.units.map((unit) => (
                  <li className="teamGrid__member" key={unit.name}>
                    <span>{unit.name}</span>
                    <span className="teamGrid__role mono">{unit.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal delay={160}>
          <div>
            <h3 className="teamGrid__division mono accent">Fokus</h3>
            <dl className="defList defList--tight">
              {focus.map((item) => (
                <div className="defList__row" key={item.label}>
                  <dt className="defList__term">{item.label}</dt>
                  <dd className="defList__desc">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
