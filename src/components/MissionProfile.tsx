import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const challenges = [
  {
    label: "Medan tidak rata",
    body: "Puing, anak tangga, dan jalan miring menghentikan robot beroda.",
  },
  {
    label: "Korban palsu",
    body: "Robot harus memilah korban asli dari dummy sebelum mengevakuasi.",
  },
  {
    label: "Tanpa operator",
    body: "Seluruh rute Home sampai Finish berjalan otonom dalam 5 menit.",
  },
  {
    label: "Rute berubah",
    body: "Posisi korban diacak tiap pertandingan, jalur tidak bisa dihafal.",
  },
];

export default function MissionProfile() {
  return (
    <section className="section shell" id="mission">
      <SectionHead index="02 / PROFIL MISI" title="Dibangun untuk medan rusak" />

      <div className="editorial editorial--split">
        <div className="stack">
          <Reveal delay={60}>
            <p className="lede lede--bar">
              Andromeda Robotis berdiri pada 2011 dengan robot pemadam api. Sejak
              2022 fokus tim beralih ke robot otonom Search and Rescue dan
              Autonomous Car, dengan sasaran teknologi yang terpakai di
              keselamatan, respons darurat, dan misi kemanusiaan.
            </p>
          </Reveal>
          <Reveal delay={110}>
            <p className="lede">
              Pengembangan berjalan di bawah Undip Robotics Development Center
              (URDC) bersama dosen pembimbing, dengan integrasi kecerdasan buatan
              agar robot bekerja sepenuhnya otonom.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150}>
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

      <Reveal delay={100}>
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
