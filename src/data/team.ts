export const stats = [
  { value: 26, suffix: "", label: "Anggota" },
  { value: 10, suffix: "+", label: "Tahun berkarya" },
  { value: 5, suffix: "+", label: "Penghargaan" },
  { value: 20, suffix: "+", label: "Inovasi karya" },
] as const;

export type Person = {
  name: string;
  role: string;
  /** Slug under /images/team. Missing means the card falls back to initials. */
  photo?: string;
};

export type Division = {
  name: string;
  head: Person;
  staff: Person[];
};

export type Branch = {
  manager: Person;
  divisions: Division[];
};

export const leader: Person = {
  name: "Aqyal Ghana Zein",
  role: "Team Leader",
  photo: "aqyal-ghana-zein",
};

export const branches: Branch[] = [
  {
    manager: { name: "Aftito Nur Faturohim", role: "Engineering Manager" },
    divisions: [
      {
        name: "Programming",
        head: {
          name: "Damaraudia",
          role: "Head of Programming",
          photo: "damaraudia",
        },
        staff: [
          {
            name: "Hafid Indra Pramana",
            role: "Staff",
            photo: "hafid-indra-pramana",
          },
          {
            name: "Ahya Rochim Aminudin",
            role: "Staff",
            photo: "ahya-rochim-aminudin",
          },
          {
            name: "Fadly Nabil Liantama",
            role: "Staff",
            photo: "fadly-nabil-liantama",
          },
        ],
      },
      {
        name: "Mekanik",
        head: {
          name: "Arya Faiz Daulla",
          role: "Head of Mechanical",
          photo: "arya-faiz-daulla",
        },
        staff: [
          {
            name: "Hisyam Abdul Hanif",
            role: "Staff",
            photo: "hisyam-abdul-hanif",
          },
          {
            name: "Valentino Rio Ferdinand",
            role: "Staff",
            photo: "valentino-rio-ferdinand",
          },
        ],
      },
      {
        name: "Elektrik",
        head: {
          name: "Danu Rahmat Alfiyan",
          role: "Head of Electrical",
          photo: "danu-rahmat-alfiyan",
        },
        staff: [
          {
            name: "Muhammad Rifky Guntur Syahputra",
            role: "Staff",
            photo: "muhammad-rifky-guntur-syahputra",
          },
          { name: "Andrian Maulana", role: "Staff", photo: "andrian-maulana" },
          {
            name: "Ganda Rejeki Sitompul",
            role: "Staff",
            photo: "ganda-rejeki-sitompul",
          },
          {
            name: "Ismail Arief At Thoriq",
            role: "Staff",
            photo: "ismail-arief-at-thoriq",
          },
          { name: "Muhammad Aria Pratama", role: "Staff" },
        ],
      },
    ],
  },
  {
    manager: {
      name: "Nur Azizah",
      role: "Operations Manager",
      photo: "nur-azizah",
    },
    divisions: [
      {
        name: "Media",
        head: {
          name: "Muhammad Najamuddin",
          role: "Head of Media",
          photo: "muhammad-najamuddin",
        },
        staff: [
          {
            name: "Habib Mukhlis Triatmojo",
            role: "Website Developer",
            photo: "habib-mukhlis-triatmojo",
          },
          {
            name: "Ghifar Ihsan Rinaldi",
            role: "Staff",
            photo: "ghifar-ihsan-rinaldi",
          },
          {
            name: "Aun Nurofiq Fuadi",
            role: "Staff",
            photo: "aun-nurofiq-fuadi",
          },
          {
            name: "Saffanah Rahmah Sheehan",
            role: "Staff",
            photo: "saffanah-rahmah-sheehan",
          },
        ],
      },
      {
        name: "Sekretariat",
        head: {
          name: "Ina Ria Kamilah",
          role: "Sekretaris Bendahara",
          photo: "ina-ria-kamilah",
        },
        staff: [],
      },
      {
        name: "Sponsorship",
        head: {
          name: "Rara Wiri Tanaya",
          role: "Head of Sponsorship",
          photo: "rara-wiri-tanaya",
        },
        staff: [
          {
            name: "Kenno Galang Dharma Manikaira",
            role: "Staff",
            photo: "kenno-galang-dharma-manikaira",
          },
          {
            name: "Adha Naifah Khairunnisa",
            role: "Staff",
            photo: "adha-naifah-khairunnisa",
          },
          { name: "Endra Maulana", role: "Staff" },
        ],
      },
    ],
  },
];
