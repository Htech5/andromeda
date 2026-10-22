import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { robot } from "@/data/robot";

type Shot = { src: string; alt: string };

const capabilities: {
  kicker: string;
  title: string;
  body: string;
  shots: Shot[];
  facts: [string, string][];
}[] = [
  {
    kicker: "01 — Arena",
    title: "Arena bertingkat, bukan lintasan datar",
    body:
      "Lintasan KSTI menggabungkan zona rintangan berpermukaan tidak rata, zona penyelamatan tempat korban diambil, dan zona kendali sebagai titik acuan robot. Di antara Start dan Finish ada anak tangga, bidang miring, dan hamparan kerikil yang menghentikan robot beroda. Posisi korban diacak tiap pertandingan, jadi rute tidak bisa dihafal dari babak sebelumnya.",
    shots: [
      {
        src: "/images/mission-medan.webp",
        alt: "Robot M31 dilihat dari atas, dikelilingi hamparan puing dan kerikil, tiga batu di antaranya ditandai merah",
      },
    ],
    facts: [
      ["R", "Zona rintangan"],
      ["SZ", "Zona penyelamatan"],
      ["K", "Zona kendali"],
      ["5 menit", "Batas satu misi"],
    ],
  },
  {
    kicker: "02 — Deteksi objek",
    title: "Memilah korban asli dari dummy",
    body:
      "Instance segmentation YOLOv11 berjalan langsung di robot, bukan di laptop operator, sehingga keputusan diambil tanpa menunggu kiriman data. Tiap objek di arena diperiksa lebih dulu: korban asli diangkat dan dibawa ke Safety Zone, dummy dilewati. RealSense D455 memberi kedalaman dan citra, VL53L7CX menambah pembacaan jarak multi-zona.",
    shots: [
      {
        src: "/images/mission-korban.webp",
        alt: "Robot M31 menghadap dua sosok korban, satu ditandai merah sebagai korban asli",
      },
    ],
    facts: [
      ["YOLOv11", "Instance segmentation"],
      ["D455", "Kedalaman dan citra"],
      ["VL53L7CX", "Jarak multi-zona"],
    ],
  },
  {
    kicker: "03 — Rancang presisi",
    title: "Enam kaki, tiga puluh sentimeter kubik",
    body:
      "Rangka ringkas 30 cm kubik dengan bobot 3,7 kg: cukup kecil untuk masuk celah sempit, cukup kuat untuk membawa korban keluar. Enam kaki memberi pijakan yang berdiri sendiri, jadi satu kaki kehilangan tumpuan tidak menjatuhkan robot. Sendi memakai DYNAMIXEL seri XC, XL, AX, dan MX; seluruh rute Home sampai Finish berjalan tanpa kendali dari luar arena.",
    shots: [
      {
        src: "/images/mission-otonom.webp",
        alt: "Robot M31 tampak depan dengan busur pemindaian memancar dari kepala sensornya",
      },
    ],
    facts: [
      [robot.dimensions, "Dimensi rangka"],
      [robot.weight, "Bobot"],
      ["Orin Nano", "Inferensi dan pemetaan"],
      ["2 × STM32H7", "Kendali gerak"],
    ],
  },
];

export default function Capability() {
  return (
    <section className="section shell" id="capability">
      <SectionHead title="Our Capability" />

      <ol className="caps">
        {capabilities.map((cap, i) => (
          <Reveal as="li" key={cap.kicker} delay={i * 70}>
            <article className="caps__item">
              <div className="caps__shot">
                {cap.shots.map((shot) => (
                  <div className="caps__frame" key={shot.src}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 860px) 48vw, 92vw"
                    />
                  </div>
                ))}
              </div>

              <div className="caps__copy">
                <div>
                  <p className="caps__kicker mono accent">{cap.kicker}</p>
                  <h3 className="caps__title">{cap.title}</h3>
                  <p className="caps__body">{cap.body}</p>
                </div>

                <dl className="caps__facts">
                  {cap.facts.map(([term, gloss]) => (
                    <div className="caps__fact" key={term}>
                      <dt className="mono">{term}</dt>
                      <dd>{gloss}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
