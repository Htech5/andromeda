export type Subsystem = {
  id: string;
  label: string;
  body: string;
};

/** M31 Enterprise 2026/2027. Sumber: proposal sponsorship, halaman spesifikasi robot. */
export const robot = {
  model: "M31 ENTERPRISE",
  generation: "2026 / 2027 MODEL",
  dimensions: "± 30 × 30 × 30 cm",
  weight: "± 3,7 kg",
} as const;

export const subsystems: Subsystem[] = [
  {
    id: "vision",
    label: "Edge Vision",
    body: "Instance segmentation YOLOv11 berjalan langsung di robot untuk membedakan korban asli dari dummy.",
  },
  {
    id: "compute",
    label: "Komputasi",
    body: "Jetson Orin Nano Super menangani inferensi dan pemetaan; dua STM32H7 menjalankan kendali gerak real-time.",
  },
  {
    id: "sensing",
    label: "Sensor Fusion",
    body: "RealSense D455 memberi kedalaman dan citra, VL53L7CX menambah pembacaan jarak multi-zona.",
  },
  {
    id: "actuation",
    label: "Aktuator",
    body: "Sendi kaki memakai DYNAMIXEL seri XC, XL, AX, dan MX dari ROBOTIS.",
  },
  {
    id: "chassis",
    label: "Rangka",
    body: "Dimensi ringkas 30 cm kubik, bobot 3,7 kg, dioptimalkan untuk gerak dan fleksibilitas di arena.",
  },
  {
    id: "autonomy",
    label: "Otonomi",
    body: "Arsitektur pengenalan objek, pemetaan, dan kendali berbasis sensor fusion tanpa kendali operator.",
  },
];
