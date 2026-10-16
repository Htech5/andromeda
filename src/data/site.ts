export const site = {
  name: "Andromeda",
  wordmark: "ANDROMEDA",
  tagline: "ONE OF GREATEST SAR ROBOTIC",
  kicker: "KSTI 2026 / SEARCH & RESCUE",
  platform: "M31 ENTERPRISE — LEGGED SAR",
  description:
    "Andromeda Robotis Universitas Diponegoro membangun legged robot otonom M31 Enterprise untuk kategori Search and Rescue KSTI 2026.",
  url: "https://andromeda.vercel.app",
  email: "undip.ews.andromeda@gmail.com",
  phone: "+62 895-6201-31429",
  phoneHref: "62895620131429",
  proposal: "/proposal-sponsorship-andromeda-2026.pdf",
  affiliation: "URDC — Universitas Diponegoro",
  founded: 2011,
  hq: [
    "Student Center Universitas Diponegoro",
    "Jl. Prof. Soedarto, Tembalang",
    "Kota Semarang, Jawa Tengah 50275",
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://instagram.com/andromedaundip",
      icon: "instagram",
    },
    {
      label: "TikTok",
      href: "https://tiktok.com/@andromedaundip",
      icon: "tiktok",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/62895620131429",
      icon: "whatsapp",
    },
    {
      label: "Email",
      href: "mailto:undip.ews.andromeda@gmail.com",
      icon: "mail",
    },
  ],
  /** Google embed needs no API key; the query is the HQ address itself. */
  mapQuery: "Student Center Universitas Diponegoro, Tembalang, Semarang",
} as const;

export const navLinks = [
  { label: "Robot", href: "#robot", icon: "robot" },
  { label: "Tim", href: "#team", icon: "team" },
  { label: "Achievement", href: "#achievements", icon: "award" },
  { label: "Sponsorship", href: "#sponsorship", icon: "deal" },
] as const;
