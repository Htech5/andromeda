export type Tier = {
  name: string;
  price: string;
  amount: number;
};

/**
 * Matriks benefit dibaca langsung dari tabel Sponsorship Package proposal.
 * `benefits[i].tiers` sejajar urutan `tiers`.
 */
export const tiers: Tier[] = [
  { name: "Bronze", price: "Rp 2.000.000", amount: 2_000_000 },
  { name: "Silver", price: "Rp 5.000.000", amount: 5_000_000 },
  { name: "Gold", price: "Rp 8.000.000", amount: 8_000_000 },
  { name: "Diamond", price: "Rp 10.000.000", amount: 10_000_000 },
  { name: "Zamrud", price: "Rp 15.000.000", amount: 15_000_000 },
];

export const benefits: { label: string; tiers: boolean[] }[] = [
  { label: "Nama perusahaan di tim", tiers: [false, false, false, false, true] },
  { label: "Logo pada robot", tiers: [false, false, true, true, true] },
  { label: "Hak eksklusif pada research article", tiers: [false, false, false, false, true] },
  { label: "Pembuatan video konten khusus", tiers: [false, false, true, true, true] },
  { label: "Logo pada box storage & robot", tiers: [false, true, true, true, true] },
  { label: "Iklan khusus", tiers: [false, false, false, false, true] },
  { label: "Logo pada website", tiers: [true, true, true, true, true] },
  { label: "Logo pada LinkedIn", tiers: [false, true, true, true, true] },
  { label: "Logo media sosial", tiers: [true, true, true, true, true] },
  { label: "Logo pada banner suporteran tim", tiers: [false, false, true, true, true] },
  { label: "Laporan pertanggungjawaban penggunaan dana", tiers: [true, true, true, true, true] },
  { label: "Laporan hasil sponsorship", tiers: [true, true, true, true, true] },
];

export const budget = [
  { label: "Transportasi", amount: 11_500_000 },
  { label: "Akomodasi", amount: 6_000_000 },
  { label: "Konsumsi", amount: 5_900_000 },
  { label: "Arena dan pengembangan robot", amount: 950_000 },
  { label: "Pendaftaran dan administrasi", amount: 150_000 },
];

export const budgetTotal = budget.reduce((sum, item) => sum + item.amount, 0);

export const rupiah = (value: number) =>
  `Rp ${value.toLocaleString("id-ID")}`;
