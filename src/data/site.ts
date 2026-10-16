export const site = {
  name: "Andromeda",
  wordmark: "ANDROMEDA",
  tagline: "INTELLIGENCE IN MOTION",
  kicker: "KRSRI / ROBOTICS TEAM",
  platform: "LEGGED SAR PLATFORM",
  description:
    "Andromeda membangun robot berkaki untuk misi search and rescue pada Kontes Robot SAR Indonesia (KRSRI).",
  url: "https://andromeda.vercel.app",
  // PLACEHOLDER: ganti dengan kontak resmi tim.
  email: "tim.andromeda@example.ac.id",
  affiliation: "PLACEHOLDER — Nama universitas / unit kegiatan resmi",
  hq: [
    "PLACEHOLDER — Gedung / laboratorium",
    "PLACEHOLDER — Jalan dan nomor",
    "PLACEHOLDER — Kota, kode pos",
  ],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;

export const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Robot", href: "#robot" },
  { label: "Achievements", href: "#achievements" },
  { label: "Partners", href: "#partners" },
] as const;
