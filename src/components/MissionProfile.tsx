import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const challenges = [
  {
    label: "Medan tidak rata",
    body: "Puing, tangga, dan permukaan miring menghentikan robot beroda.",
  },
  {
    label: "Area berbahaya",
    body: "Ruang yang berisiko bagi manusia perlu diperiksa dari jarak aman.",
  },
  {
    label: "Mobilitas",
    body: "Kaki memberi pijakan terpisah sehingga rute sempit tetap terlewati.",
  },
  {
    label: "Observasi",
    body: "Operator butuh gambaran kondisi ruangan sebelum masuk.",
  },
];

export default function MissionProfile() {
  return (
    <section className="section shell" id="mission">
      <SectionHead index="02 / MISSION PROFILE" title="Built for the unreachable" />

      <div className="editorial editorial--split">
        <div className="stack">
          <Reveal delay={60}>
            <p className="lede lede--bar">
              Andromeda adalah robot berkaki yang dikembangkan untuk skenario
              search and rescue KRSRI. Fokus pengembangan kami adalah mobilitas
              di medan rusak dan kemampuan mengirim gambaran situasi kepada
              operator.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede">
              Kemampuan otonom penuh, pemetaan, dan deteksi korban belum
              dinyatakan sebagai fitur. Setiap klaim baru ditulis di halaman ini
              setelah diuji dan dicatat oleh tim.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <dl className="defList">
            {challenges.map((item) => (
              <div className="defList__row" key={item.label}>
                <dt className="defList__term">{item.label}</dt>
                <dd className="defList__desc">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <svg
          className="terrain"
          viewBox="0 0 1200 200"
          role="img"
          aria-label="Ilustrasi profil medan tidak rata dengan siluet robot berkaki"
        >
          <path
            d="M0 170h120l40-30h90l60 40h110l70-70h130l50 50h120l60-25h110l50 35h190"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <g stroke="var(--color-red)" strokeWidth="2" fill="none">
            <rect x="536" y="58" width="70" height="26" />
            <path d="M548 84v22l-10 14M594 84v22l10 14" />
            <path d="M571 58V44" />
            <circle cx="571" cy="38" r="5" />
          </g>
          <g stroke="var(--hairline)" strokeWidth="1">
            <path d="M0 40h1200M0 100h1200M0 160h1200" />
          </g>
        </svg>
      </Reveal>
    </section>
  );
}
