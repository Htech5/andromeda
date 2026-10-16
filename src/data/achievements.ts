export type Achievement = {
  year: string;
  event: string;
  result: string;
  note: string;
};

/**
 * PLACEHOLDER — isi hanya dengan hasil resmi yang terverifikasi.
 * Jangan menambahkan penghargaan atau peringkat yang belum dikonfirmasi.
 */
export const achievements: Achievement[] = [
  {
    year: "20XX",
    event: "PLACEHOLDER — nama kompetisi / kegiatan",
    result: "PLACEHOLDER — hasil atau penghargaan",
    note: "Ganti entri ini dengan dokumentasi resmi tim.",
  },
  {
    year: "20XX",
    event: "PLACEHOLDER — milestone pengembangan",
    result: "PLACEHOLDER — capaian teknis",
    note: "Catat tanggal, lingkup uji, dan hasil yang terukur.",
  },
];
