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
  {
    name: "ROBOTIS",
    logo: "/logos/sponsors/robotis.png",
    href: "https://www.robotis.com",
    about:
      "Produsen robotika asal Korea Selatan. Lini aktuator Dynamixel dan platform TurtleBot-nya dipakai luas di riset dan kompetisi robot.",
  },
  {
    name: "EasyEDA",
    logo: "/logos/sponsors/easyeda.svg",
    href: "https://easyeda.com",
    about:
      "Perangkat desain elektronik berbasis web: skematik, tata letak PCB, dan simulasi dalam satu alur sampai siap difabrikasi.",
  },
  {
    name: "JLCPCB",
    logo: "/logos/sponsors/jlcpcb.webp",
    href: "https://jlcpcb.com",
    about:
      "Pabrik PCB dan perakitan PCBA asal Tiongkok, melayani prototipe satuan sampai produksi volume kecil dengan waktu kirim singkat.",
  },
];

/**
 * Order matters: the orbit fills its outer ring first, so the widest lockups
 * go at the top of this list and the square-ish marks at the bottom, where
 * the inner ring has less arc to give them.
 */
export const sponsors: Partner[] = [
  {
    name: "PT Arkhajayanti Persada Tbk",
    logo: "/logos/sponsors/arkhajayanti-persada.png",
  },
  { name: "PT Streamwork", logo: "/logos/sponsors/streamwork.png" },
  {
    name: "PT Pelabuhan Indonesia",
    logo: "/logos/sponsors/pelabuhan-indonesia.png",
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
    name: "MikroElektronika",
    logo: "/logos/sponsors/mikroelektronika.png",
    href: "https://www.mikroe.com",
  },
  {
    name: "PT Rekayasa Cakrawala Resources",
    logo: "/logos/sponsors/recare.png",
  },
  {
    name: "PT Bumi Agung Perkasa Indah",
    logo: "/logos/sponsors/bumi-agung-perkasa-indah.png",
  },
  {
    name: "PT Katup Industri Indonesia",
    logo: "/logos/sponsors/katup-industri-indonesia.png",
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
  { name: "PT Perusahaan Listrik Negara", logo: "/logos/sponsors/pln.png" },
  { name: "PT Pertamina Gas", logo: "/logos/sponsors/pertamina-gas.png" },
  {
    name: "PT Duraquipt Cemerlang",
    logo: "/logos/sponsors/duraquipt-cemerlang.png",
  },
  {
    name: "Dynamixel",
    logo: "/logos/sponsors/dynamixel.png",
    href: "https://www.robotis.us/dynamixel",
  },
];

export const mediaPartners: Partner[] = [];
