export type Partner = {
  name: string;
  /** Taruh file di /public/logos/... lalu isi path di sini. */
  logo?: string;
  href?: string;
};

/**
 * Kosongkan array jika belum ada kemitraan resmi.
 * Section akan otomatis menampilkan teks kontak, bukan logo palsu.
 */
export const sponsors: Partner[] = [
  {
    name: "ROBOTIS",
    logo: "/logos/sponsors/robotis.png",
    href: "https://www.robotis.com",
  },
  {
    name: "Mango Technology Engineering",
    logo: "/logos/sponsors/mango-technology-engineering.png",
  },
  {
    name: "Polymaker",
    logo: "/logos/sponsors/polymaker.png",
    href: "https://polymaker.com",
  },
  {
    name: "EasyEDA",
    logo: "/logos/sponsors/easyeda.svg",
    href: "https://easyeda.com",
  },
  {
    name: "JLCPCB",
    logo: "/logos/sponsors/jlcpcb.webp",
    href: "https://jlcpcb.com",
  },
  {
    name: "MikroElektronika",
    logo: "/logos/sponsors/mikroelektronika.png",
    href: "https://www.mikroe.com",
  },
];

export const mediaPartners: Partner[] = [];
