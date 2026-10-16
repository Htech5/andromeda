export type Phase = {
  date: string;
  title: string;
};

/** KSTI 2026, kategori Search and Rescue. Sumber: proposal sponsorship. */
export const competition = {
  name: "KSTI 2026",
  longName: "Kontes Sains dan Teknologi Indonesia 2026",
  host: "Kemdiktisaintek bersama Institut Teknologi Sepuluh Nopember",
  category: "Robotics Competition — Search and Rescue",
  venue: "Surabaya",
  arena: "360 × 120 cm",
  missions: 5,
  timeLimit: "5 menit",
} as const;

export const arenaRules = [
  {
    label: "Otonom penuh",
    body: "Tanpa kendali operator. Robot bergerak sendiri dari Home menuju Finish.",
  },
  {
    label: "Medan bertingkat",
    body: "Jalur simulasi pascabencana dengan jalan miring dan anak tangga.",
  },
  {
    label: "Lima misi",
    body: "Robot memilah korban asli dari dummy, lalu mengevakuasi ke Safety Zone yang sesuai.",
  },
  {
    label: "Posisi acak",
    body: "Letak korban diacak tiap pertandingan, jadi rute tidak bisa dihafal.",
  },
];

export const phases: Phase[] = [
  { date: "3 Okt 2026", title: "Rapat dan persiapan awal perlombaan" },
  { date: "4–25 Okt 2026", title: "Pengembangan robot dan persiapan arena" },
  { date: "26 Okt–8 Nov 2026", title: "Trial and error" },
  { date: "8 Nov 2026", title: "Technical meeting dan fiksasi robot" },
  { date: "9 Nov 2026", title: "Persiapan dan pengiriman logistik" },
  { date: "10 Nov 2026", title: "Keberangkatan tim ke Surabaya" },
  { date: "11 Nov 2026", title: "Persiapan lomba dan pengecekan robot" },
  { date: "12 Nov 2026", title: "Hari pelaksanaan lomba" },
  { date: "13 Nov 2026", title: "Awarding" },
];
