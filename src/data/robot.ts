/** M31 Enterprise 2026/2027. Sumber: proposal sponsorship, halaman spesifikasi robot. */
export const robot = {
  model: "Andromeda Garage",
  generation: "2026 / 2027 MODEL",
  dimensions: "± 30 × 30 × 30 cm",
  weight: "± 3,7 kg",
} as const;

export type Stat = {
  label: string;
  body: string;
  icon: string;
  /** Percent position on the unit's own photo — the mobile view draws a
     leader line from here out to the label. Eyeballed against the photo,
     not from a CAD source, so nudge freely if one lands off its part. */
  point?: { x: number; y: number };
};

/** A physical build sharing one generation slot — Perseus Ultimate's "Core
   Andro Bot" and "Fun Bot" are the same Gen 06, not two different robots. */
export type Variant = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  years?: string;
  stats?: Stat[];
};

export type Unit = {
  id: string;
  name: string;
  /** Short tag under the name, game-menu style. */
  tag: string;
  src: string;
  width: number;
  height: number;
  /** Not built yet: the stage stamps it "coming soon". */
  soon?: boolean;
  /** Era headline, e.g. "Langkah Pertama". */
  era?: string;
  years?: string;
  /** Character-sheet stat block, label + body, poster order. */
  stats?: Stat[];
  /** Picked with a small tab row in the panel; falls back to the unit's own
     src/years/stats when absent. */
  variants?: Variant[];
};

/** Garage order = generation order, oldest first. */
export const garage: Unit[] = [
  {
    id: "perseus-1-0",
    name: "Perseus 1.0",
    tag: "Gen 01",
    src: "/images/robot/perseus-1-0.png",
    width: 1118,
    height: 1200,
    era: "Langkah Pertama",
    years: "2020 - 2021",
    stats: [
      { label: "Penggerak Empat Kaki", body: "Robot menggunakan konfigurasi quadruped dengan masing-masing tiga servo untuk menggerakkan satu kaki.", icon: "quadruped", point: { x: 82, y: 75 } },
      { label: "Navigasi Dinding", body: "Sensor ultrasonik yang mengelilingi dapat membaca jarak terhadap dinding saat bergerak di arena.", icon: "sonar", point: { x: 45, y: 52 } },
      { label: "Deteksi Api", body: "Sensor UVTRON dirancang untuk menemukan nyala lilin sebagai sasaran misi pemadaman.", icon: "flame", point: { x: 46, y: 22 } },
      { label: "Pemadam Api", body: "Tabung CO2 dan aktuator pelepasnya dirancang untuk memadamkan api setelah robot mencapai sasaran.", icon: "extinguisher", point: { x: 58, y: 68 } },
    ],
  },
  {
    id: "perseus-1-1",
    name: "Perseus 1.1",
    tag: "Gen 02",
    src: "/images/robot/perseus-1-1.png",
    width: 1187,
    height: 1200,
    era: "Mulai Melihat dan Menyelamatkan",
    years: "2021 - 2022",
    stats: [
      { label: "Misi Ganda", body: "Robot dikembangkan untuk memadamkan api sekaligus memindahkan korban menuju zona aman.", icon: "dual-mission", point: { x: 20, y: 22 } },
      { label: "Pembaruan Kamera", body: "Pixy2 cam ditambahkan untuk mengenali objek berdasarkan citra untuk mencari korban.", icon: "camera", point: { x: 68, y: 22 } },
      { label: "Rangka Robot", body: "Lebih tertata dan kokoh, serta memberi ruang bagi pengembangan yang baru.", icon: "frame", point: { x: 42, y: 58 } },
    ],
  },
  {
    id: "perseus-2-0",
    name: "Perseus 2.0",
    tag: "Gen 03",
    src: "/images/robot/perseus-2-0.png",
    width: 1200,
    height: 1174,
    era: "Menjawab Tantangan Medan",
    years: "2022 - 2023",
    stats: [
      { label: "Awal Hexapod", body: "Mekanisme enam kaki dikembangkan untuk meningkatkan kestabilan saat melewati rintangan.", icon: "hexapod", point: { x: 10, y: 62 } },
      { label: "Upgrade Sensor Jarak", body: "Double ping laser kanan kiri diletakkan agar robot lebih peka terhadap posisi dinding.", icon: "laser", point: { x: 85, y: 80 } },
      { label: "Program dan Mechanical", body: "Terdapat perubahan yang lumayan signifikan karena transisi dari quadruped ke hexapod.", icon: "gear", point: { x: 48, y: 45 } },
    ],
  },
  {
    id: "perseus-3-0",
    name: "Perseus 3.0",
    tag: "Gen 04",
    src: "/images/robot/perseus-3-0.png",
    width: 1200,
    height: 1125,
    era: "Kendali yang Lebih Presisi",
    years: "2023 - 2024",
    stats: [
      { label: "Smart Actuator", body: "Penggerak kaki beralih dari servo KST ke Dynamixel AX-18A agar pergerakan lebih presisi dan terkontrol.", icon: "servo", point: { x: 56, y: 14 } },
      { label: "Dua Tipe Capit", body: "Capit aktif mengambil korban, sementara capit pasif menjadi tempat korban selama robot bergerak.", icon: "claw", point: { x: 26, y: 30 } },
      { label: "Dual Dev Board", body: "Dua STM32F4 diterapkan untuk mengelola sistem robot terstruktur dan cepat.", icon: "chip", point: { x: 72, y: 80 } },
    ],
  },
  {
    id: "perseus-ultimate",
    name: "Perseus Ultimate",
    tag: "Gen 05",
    src: "/images/robot/perseus-ultimate.png",
    width: 1123,
    height: 1200,
    variants: [
      {
        id: "core-andro-bot",
        name: "Core Andro Bot",
        src: "/images/robot/perseus-ultimate.png",
        width: 1123,
        height: 1200,
        years: "2025 - 2026",
        stats: [
          { label: "Core Andro Bot", body: "Jauh lebih ringan, tambahan mini computer (Raspberry Pi), perpaduan STM32H7 dan minimum system, serta Dynamixel X Series.", icon: "mini-pc", point: { x: 50, y: 45 } },
        ],
      },
      {
        id: "fun-bot",
        name: "Fun Bot",
        src: "/images/robot/fun-bot.png",
        width: 954,
        height: 1200,
        years: "2025",
        stats: [
          { label: "Fun Bot", body: "Robot demonstrasi yang bertujuan untuk have fun dan menghibur melalui berbagai mode gerak unik saat tampil di acara.", icon: "star", point: { x: 42, y: 40 } },
        ],
      },
    ],
  },
  { id: "m31", name: "M31 Enterprise", tag: "Gen 06 · 2026", src: "/images/m31-iso.webp", width: 930, height: 1200, soon: true },
];
