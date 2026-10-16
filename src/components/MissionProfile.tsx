import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const challenges = [
  {
    image: "/images/mission-medan.webp",
    alt: "Robot M31 dilihat dari atas, dikelilingi hamparan puing dan kerikil, tiga batu di antaranya ditandai merah",
    label: "Medan tidak rata",
    body: "Puing, anak tangga, dan jalan miring menghentikan robot beroda. Enam kaki memberi pijakan terpisah.",
  },
  {
    image: "/images/mission-korban.webp",
    alt: "Robot M31 menghadap dua sosok korban, satu ditandai merah sebagai korban asli",
    label: "Korban asli, bukan dummy",
    body: "Robot memilah korban asli dari dummy lebih dulu, baru mengangkat dan membawanya ke Safety Zone.",
  },
  {
    image: "/images/mission-otonom.webp",
    alt: "Robot M31 tampak depan dengan busur pemindaian memancar dari kepala sensornya",
    label: "Tanpa operator",
    body: "Seluruh rute Home sampai Finish berjalan otonom dalam 5 menit. Tidak ada kendali dari luar arena.",
  },
  {
    image: "/images/mission-rute.webp",
    alt: "Robot M31 di awal jalur bertanda, dua titik korban ditandai merah di sepanjang rute",
    label: "Rute selalu berubah",
    body: "Posisi korban diacak tiap pertandingan, jadi jalur tidak bisa dihafal dari babak sebelumnya.",
  },
];

export default function MissionProfile() {
  return (
    <section className="section shell" id="mission">
      <SectionHead title="Dibangun untuk medan rusak" />

      <ol className="missions">
        {challenges.map((item, i) => (
          <Reveal as="li" key={item.label} delay={i * 70}>
            <article className="missions__item">
              <div className="missions__shot">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1000}
                  height={750}
                  sizes="(min-width: 760px) 44vw, 90vw"
                />
              </div>
              <p className="missions__num mono accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="missions__label">{item.label}</h3>
              <p className="missions__body">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
