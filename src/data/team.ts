export const stats = [
  { value: 24, suffix: "", label: "Anggota" },
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
    manager: {
      name: "Aftito Nur Faturohim",
      role: "Engineering Manager",
      photo: "aftito-nur-faturohim",
    },
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
          {
            name: "Muhammad Aria Pratama",
            role: "Staff",
            photo: "muhammad-aria-pratama",
          },
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
            name: "Ghifari Ihsan Rinaldi",
            role: "Staff",
            photo: "ghifari-ihsan-rinaldi",
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
          name: "Kenno Galang Dharma Manikaira",
          role: "Head of Sponsorship",
          photo: "kenno-galang-dharma-manikaira",
        },
        staff: [
          {
            name: "Endra Maulana",
            role: "Staff",
            photo: "endra-maulana",
          },
        ],
      },
    ],
  },
];

/** Public profiles, keyed by name. A member missing here, or missing one
    of the two, simply shows fewer links on the back of their box. */
export const socials: Record<
  string,
  { linkedin?: string; instagram?: string }
> = {
  "Aqyal Ghana Zein": {
    linkedin: "https://www.linkedin.com/in/aqyal-ghana-zein-5a2a71337",
    instagram: "https://www.instagram.com/eqiagz",
  },
  "Aftito Nur Faturohim": {
    linkedin: "https://www.linkedin.com/in/aftito-nur-faturohim",
    instagram: "https://www.instagram.com/aftitonf",
  },
  "Damaraudia": {
    linkedin: "https://www.linkedin.com/in/damaraudia",
    instagram: "https://www.instagram.com/rdamrs",
  },
  "Hafid Indra Pramana": {
    linkedin: "https://www.linkedin.com/in/hafid-indra-pramana-b55998316",
    instagram: "https://www.instagram.com/hainpra",
  },
  "Ahya Rochim Aminudin": {
    linkedin: "https://www.linkedin.com/in/ahya-rochim-aminudin",
    instagram: "https://www.instagram.com/ahyarochim_",
  },
  "Fadly Nabil Liantama": {
    linkedin: "https://www.linkedin.com/in/fadly-nabil-liantama-550284371",
    instagram: "https://www.instagram.com/subtlr_",
  },
  "Arya Faiz Daulla": {
    linkedin: "https://www.linkedin.com/in/arya-faiz-daulla-85a760380",
    instagram: "https://www.instagram.com/aryafaiz____",
  },
  "Hisyam Abdul Hanif": {
    linkedin: "https://www.linkedin.com/in/hisyam-abdul-hanif-984ab0380",
    instagram: "https://www.instagram.com/hisyam.a.hnf",
  },
  "Valentino Rio Ferdinand": {
    instagram: "https://www.instagram.com/dadlentt",
  },
  "Danu Rahmat Alfiyan": {
    linkedin: "https://www.linkedin.com/in/danu-rahmat-alfiyan-5350422b9",
    instagram: "https://www.instagram.com/danurahmatalfiyan_",
  },
  "Muhammad Rifky Guntur Syahputra": {
    instagram: "https://www.instagram.com/g._rifky",
  },
  "Andrian Maulana": {
    linkedin: "https://www.linkedin.com/in/andrianmaulana",
    instagram: "https://www.instagram.com/theblackestblackstar_",
  },
  "Ganda Rejeki Sitompul": {
    linkedin: "https://www.linkedin.com/in/ganda-rejeki-sitompul-b52a13317",
    instagram: "https://www.instagram.com/gandaars",
  },
  "Ismail Arief At Thoriq": {
    linkedin: "https://www.linkedin.com/in/ismail-arief-at-thoriq-33154437a",
    instagram: "https://www.instagram.com/ariefaththoriq._",
  },
  "Muhammad Aria Pratama": {
    linkedin: "https://www.linkedin.com/in/muhammad-aria-pratama-436469398",
    instagram: "https://www.instagram.com/ariaprtmaa",
  },
  "Nur Azizah": {
    linkedin: "https://www.linkedin.com/in/nur-azizah-8a638a398",
    instagram: "https://www.instagram.com/qnaz.ii",
  },
  "Muhammad Najamuddin": {
    linkedin: "https://www.linkedin.com/in/muhammad-najamuddin-894635385",
    instagram: "https://www.instagram.com/muh.najam_old",
  },
  "Habib Mukhlis Triatmojo": {
    linkedin: "https://www.linkedin.com/in/habib-mukhlis-triatmojo",
    instagram: "https://www.instagram.com/moechlist._",
  },
  "Ghifar Ihsan Rinaldi": {
    linkedin: "https://www.linkedin.com/in/ghifari-ihsan-rinaldi-92b034350",
    instagram: "https://www.instagram.com/2ghaby",
  },
  "Aun Nurofiq Fuadi": {
    linkedin: "https://www.linkedin.com/in/aunnurofiqfuadi",
    instagram: "https://www.instagram.com/nurofiqaunf",
  },
  "Saffanah Rahmah Sheehan": {
    linkedin: "https://www.linkedin.com/in/saffanahrs",
    instagram: "https://www.instagram.com/sa_rah_se",
  },
  "Ina Ria Kamilah": {
    linkedin: "https://www.linkedin.com/in/ina-ria-kamilah-95474628b",
    instagram: "https://www.instagram.com/inarqq",
  },
  "Kenno Galang Dharma Manikaira": {
    linkedin: "https://www.linkedin.com/in/kenno-galang-dharma-manikaira-88706533a",
    instagram: "https://www.instagram.com/kenno_galang",
  },
  "Endra Maulana": {
    linkedin: "https://www.linkedin.com/in/endra-maulana-5b853a290",
    instagram: "https://www.instagram.com/doughlesslekker",
  },
};
