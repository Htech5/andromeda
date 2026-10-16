export type Achievement = {
  year: string;
  event: string;
  result: string;
  note: string;
};

/** Sumber: Proposal Sponsorship Andromeda Robotis 2026, halaman "Tentang Kami". */
export const achievements: Achievement[] = [
  {
    year: "2011",
    event: "Kontes Robot SAR Indonesia",
    result: "Juara 4 Regional III",
    note: "Divisi robot pemadam api, tahun pertama tim berdiri.",
  },
  {
    year: "2014",
    event: "Kontes Robot SAR Indonesia",
    result: "Inovasi Terbaik",
    note: "Penghargaan atas pendekatan rancangan robot.",
  },
  {
    year: "2016",
    event: "Kontes Robot SAR Indonesia",
    result: "Inovasi Terbaik",
    note: "Penghargaan inovasi kedua untuk tim.",
  },
  {
    year: "2017",
    event: "Kontes Robot SAR Indonesia",
    result: "Desain Terbaik",
    note: "Penilaian pada rancangan mekanik dan tata letak sistem.",
  },
  {
    year: "2019",
    event: "Kontes Robot Pemadam",
    result: "Juara 3 Nasional",
    note: "Capaian podium nasional terakhir di divisi pemadam api.",
  },
  {
    year: "2023",
    event: "Kontes Robot SAR Indonesia",
    result: "Finalis",
    note: "Musim pertama setelah tim beralih ke legged robot SAR.",
  },
  {
    year: "2024",
    event: "Kontes Robot SAR Indonesia",
    result: "Finalis",
    note: "Basis pengembangan platform M31 Enterprise.",
  },
];
