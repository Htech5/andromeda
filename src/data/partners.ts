export type Partner = {
  name: string;
  /** Taruh file di /public/logos/... lalu isi path di sini. */
  logo?: string;
  href?: string;
  /** Powered by only: isi kartu popover saat logo diklik. */
  about?: string;
};

/**
 * Pendukung aktif musim ini. Logo di sini bisa diklik untuk membuka kartu
 * profil singkat, jadi setiap entri wajib punya `about`.
 */
export const poweredBy: Partner[] = [
  {
    name: "Pertamina",
    logo: "/logos/sponsors/pertamina.png",
    href: "https://www.pertamina.com",
    about:
      "Badan usaha milik negara di sektor energi, dari hulu minyak dan gas sampai pengolahan dan distribusi bahan bakar ke seluruh Indonesia.",
  },
  {
    // TODO: ganti nama, href, dan about begitu profil perusahaan dipastikan.
    name: "Scaffolding Partner",
    logo: "/logos/sponsors/scaffolding.png",
    about:
      "Penyedia perancah dan peralatan kerja ketinggian untuk proyek konstruksi dan industri.",
  },
];

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
    name: "Dynamixel",
    logo: "/logos/sponsors/dynamixel.png",
    href: "https://www.robotis.us/dynamixel",
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
  {
    name: "PT Rekayasa Cakrawala Resources",
    logo: "/logos/sponsors/recare.png",
  },
  {
    name: "PT Enviromate Technology International",
    logo: "/logos/sponsors/enviromate-technology-international.png",
  },
  {
    name: "PT Pertamina Gas Negara Tbk",
    logo: "/logos/sponsors/pertamina-gas-negara.png",
  },
  {
    name: "PT Katup Industri Indonesia",
    logo: "/logos/sponsors/katup-industri-indonesia.png",
  },
  {
    name: "PT Bumi Agung Perkasa Indah",
    logo: "/logos/sponsors/bumi-agung-perkasa-indah.png",
  },
  {
    name: "PT Pelabuhan Indonesia",
    logo: "/logos/sponsors/pelabuhan-indonesia.png",
  },
  {
    name: "PT Pertamina Gas",
    logo: "/logos/sponsors/pertamina-gas.png",
  },
  {
    name: "PT Perusahaan Listrik Negara",
    logo: "/logos/sponsors/pln.png",
  },
  {
    name: "PT Duraquipt Cemerlang",
    logo: "/logos/sponsors/duraquipt-cemerlang.png",
  },
  {
    name: "PT Streamwork",
    logo: "/logos/sponsors/streamwork.png",
  },
  {
    name: "PT Arkhajayanti Persada Tbk",
    logo: "/logos/sponsors/arkhajayanti-persada.png",
  },
];

export const mediaPartners: Partner[] = [];
