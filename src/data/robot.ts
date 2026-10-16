export type Subsystem = {
  id: string;
  label: string;
  body: string;
};

/** Deskripsi struktural saja. Jangan mengklaim kemampuan yang belum diuji. */
export const subsystems: Subsystem[] = [
  {
    id: "chassis",
    label: "Chassis",
    body: "Rangka utama yang menahan beban dan menyatukan titik pasang kaki.",
  },
  {
    id: "legs",
    label: "Kaki & Sendi",
    body: "Konfigurasi berkaki dengan sendi bertingkat untuk melewati permukaan tidak rata.",
  },
  {
    id: "actuation",
    label: "Aktuator",
    body: "Penggerak sendi beserta mekanisme transmisi gerak.",
  },
  {
    id: "sensing",
    label: "Sensor",
    body: "Perangkat persepsi untuk observasi lingkungan dan umpan balik gerak.",
  },
  {
    id: "compute",
    label: "Komputer Kontrol",
    body: "Unit kontrol dan driver yang menjalankan logika gerak robot.",
  },
  {
    id: "power",
    label: "Daya & Komunikasi",
    body: "Sumber daya, distribusi tegangan, dan kanal komunikasi operator.",
  },
];
