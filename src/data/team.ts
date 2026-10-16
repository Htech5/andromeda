export const stats = [
  { value: "25+", label: "Anggota" },
  { value: "10+", label: "Tahun berkarya" },
  { value: "5+", label: "Penghargaan" },
  { value: "20+", label: "Inovasi karya" },
] as const;

export const divisions = [
  {
    field: "Teknis",
    body: "Merancang dan mengembangkan robot SAR lewat tiga divisi.",
    units: [
      { name: "Mekanik", role: "Struktur dan mekanisme gerak" },
      { name: "Elektrik", role: "Kelistrikan, catu daya, sensor, aktuator" },
      { name: "Program", role: "Kendali, algoritma, pengolahan citra" },
    ],
  },
  {
    field: "Non-Teknis",
    body: "Menopang publikasi, pendanaan, dan citra tim.",
    units: [
      { name: "Media", role: "Media sosial, dokumentasi, konten" },
      { name: "Sponsorship", role: "Proposal kemitraan dan relasi mitra" },
    ],
  },
] as const;

export const focus = [
  {
    label: "Edukasi",
    body: "Andromeda Robotis UNDIP Workshop membuka materi robotika otonom divisi elektrik, mekanik, dan program bagi mahasiswa Undip.",
  },
  {
    label: "Kompetisi",
    body: "Selain KSTI dan lomba internasional, tim rutin turun di Sumobot, Line Follower, dan Transporter sebagai jalur bimbingan staf baru.",
  },
];
