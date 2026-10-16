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
export const sponsors: Partner[] = [];

export const mediaPartners: Partner[] = [];
