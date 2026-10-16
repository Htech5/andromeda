# PRD --- Andromeda

## Website Tim KRSRI \| Next.js + Vercel

**Versi dokumen:** 1.1\
**Status:** Spesifikasi MVP\
**Nama proyek:** Andromeda\
**Platform:** Website single-page\
**Framework:** Next.js + TypeScript\
**Deployment:** Vercel

------------------------------------------------------------------------

## 1. Ringkasan Produk

Andromeda adalah website satu halaman untuk memperkenalkan tim dan robot
KRSRI. Identitas visualnya berpusat pada robot berkaki untuk misi
*search and rescue*, dengan ASCII art sebagai elemen utama pada hero
section, ilustrasi vektor teknis, tipografi kuat, dan animasi yang
halus.

Website harus terasa teknis, presisi, dan modern tanpa terlihat seperti
dashboard SaaS. Desain tidak boleh bergantung pada kumpulan card.
Prioritas implementasi adalah performa, ukuran bundle yang kecil,
aksesibilitas, dan pengalaman visual yang terasa premium.

### Tujuan utama

-   Menampilkan robot dan identitas Andromeda dengan kuat sejak layar
    pertama.
-   Menjelaskan misi, arsitektur robot, pencapaian, tim, sponsor, dan
    media partner.
-   Memberikan pengalaman responsif dengan animasi halus yang
    terinspirasi dari situs e-commerce/editorial premium seperti
    Shopify, tanpa meniru situs tertentu.
-   Menjaga website tetap ringan, mudah dipelihara, dan mudah di-deploy
    ke Vercel.

### Batasan eksplisit

-   **Tidak ada CMS.**
-   **Tidak ada dashboard admin.**
-   **Tidak ada database atau backend untuk MVP.**
-   **Tidak ada section Technical Systems.**
-   Website adalah **single-page website** dengan navigasi anchor, bukan
    aplikasi multi-halaman untuk konten utama.
-   Tidak menggunakan warna selain `#FF0303`, hitam, dan putih pada UI.
-   Tidak menggunakan gradient, neon, glow, glassmorphism, atau
    card-heavy layout.

------------------------------------------------------------------------

## 2. Target Pengguna

-   Juri dan penyelenggara KRSRI.
-   Mahasiswa dan calon anggota tim.
-   Dosen, universitas, calon sponsor, dan media partner.
-   Masyarakat yang ingin mengenal robot dan aktivitas tim.

## 3. Sasaran Produk dan Indikator Keberhasilan

### Sasaran

1.  Pengunjung langsung memahami bahwa Andromeda adalah tim/proyek
    robotika KRSRI.
2.  Robot berkaki menjadi fokus visual utama.
3.  Informasi utama mudah ditemukan melalui navigasi satu halaman.
4.  Halaman terasa halus saat digulir, tetapi tetap cepat dan hemat
    sumber daya.

### Indikator keberhasilan

-   Seluruh navigasi anchor menuju section yang benar.
-   Tampilan berfungsi pada mobile, tablet, dan desktop.
-   Tidak ada error JavaScript yang tidak tertangani pada console.
-   Tidak ada gambar yang menyebabkan layout bergeser secara signifikan.
-   Target Lighthouse Performance ≥ 90 pada kondisi pengujian yang
    wajar.
-   Animasi tetap dapat digunakan pada perangkat dengan kemampuan rendah
    dan menghormati `prefers-reduced-motion`.
-   Seluruh konten memakai palet warna yang ditentukan.

------------------------------------------------------------------------

## 4. Design Direction

### 4.1 Kata kunci visual

-   Industrial robotics
-   Legged search-and-rescue robot
-   Technical blueprint
-   Editorial typography
-   Monospace terminal
-   Vector engineering
-   Solid colors
-   Precise motion

Hasil akhir harus terasa seperti identitas tim rekayasa robotika, bukan
template organisasi mahasiswa atau dashboard SaaS.

### 4.2 Palet warna wajib

  -----------------------------------------------------------------------
  Token                   Nilai                   Penggunaan
  ----------------------- ----------------------- -----------------------
  `--color-red`           `#FF0303`               Aksen utama, CTA, garis
                                                  penting, label, detail
                                                  ASCII

  `--color-black`         `#080808`               Latar utama gelap

  `--color-white`         `#FFFFFF`               Teks terang, bidang
                                                  alternatif, ilustrasi
  -----------------------------------------------------------------------

Gunakan hanya merah, hitam, dan putih untuk elemen UI. Foto robot boleh
diolah menjadi monokrom. Jangan memperkenalkan abu-abu, biru, hijau,
kuning, ungu, atau warna aksen lain.

### 4.3 Aturan visual

-   Tidak ada gradient, neon, glow, glassmorphism, atau shadow
    dekoratif.
-   Hindari rounded card dan grid berisi card.
-   Gunakan garis solid, nomor section, grid teknis, pembatas
    horizontal, ruang kosong, dan layout editorial.
-   Border radius kecil atau nol.
-   Ilustrasi utama menggunakan SVG atau grafis vektor.
-   Ikon memakai SVG monokrom dengan stroke konsisten.
-   Animasi harus mendukung hierarki informasi, bukan menjadi dekorasi
    berlebihan.
-   Gunakan ruang kosong agar tampilan tidak terasa padat.

### 4.4 Tipografi

-   **Display/headline:** Space Grotesk atau font sans-serif geometris
    sejenis.
-   **Body:** Inter atau sans-serif sistem.
-   **Technical/ASCII:** JetBrains Mono atau monospace sistem.

Utamakan font lokal/sistem atau subset font yang dibutuhkan untuk
mengurangi request dan ukuran unduhan. Jika memakai font eksternal,
gunakan `next/font` agar font dioptimalkan saat build.

------------------------------------------------------------------------

## 5. Struktur Single Page

Urutan section yang direkomendasikan:

1.  Navbar
2.  Hero / ASCII Robot
3.  Mission Profile
4.  Robot Architecture
5.  Achievements
6.  Team & Development
7.  Sponsors
8.  Media Partners
9.  Footer / Contact

Navigasi utama menggunakan anchor seperti `#mission`, `#robot`,
`#achievements`, `#team`, `#sponsors`, dan `#media-partners`. Tidak ada
routing halaman terpisah untuk section tersebut.

### 5.1 Navbar

**Tujuan:** Memudahkan pengunjung menjelajahi website tanpa mengambil
terlalu banyak ruang.

Persyaratan: - Wordmark `ANDROMEDA` di kiri. - Navigasi anchor di kanan
untuk desktop. - Menu mobile sederhana dengan tombol yang dapat diakses
keyboard. - Navbar dapat menjadi solid/sticky setelah pengguna menggulir
jika implementasinya tetap ringan. - CTA opsional:
`EXPLORE THE ROBOT`. - Jangan memakai backdrop blur atau efek glass.

### 5.2 Hero --- ASCII Robot

**Prioritas visual tertinggi.**

Konten: - Label kecil: `KRSRI / ROBOTICS TEAM`. - Headline utama:
`ANDROMEDA`. - Tagline contoh: `INTELLIGENCE IN MOTION`. - ASCII art
robot berkaki di tengah. - CTA: `EXPLORE THE ROBOT` dan `OUR MISSION`. -
Label teknis pendek seperti `LEGGED SAR PLATFORM` jika sesuai.

Persyaratan desain: - ASCII robot harus menjadi pusat visual hero dan
berukuran dominan. - ASCII dibuat dari karakter teks nyata, bukan gambar
bitmap yang menyerupai teks. - Gunakan `<pre>` dengan font monospace,
`white-space: pre`, dan line-height yang sesuai. - Karakter utama putih;
aksen merah dapat diterapkan pada detail terpilih melalui beberapa span
atau baris yang terkontrol. - Bentuk harus menggambarkan robot berkaki
dengan badan, sendi, kaki, dan sensor. - Hindari terlalu banyak panel
status atau dekorasi yang bersaing dengan robot. - Pada layar kecil,
ukuran font diturunkan secara responsif; cegah overflow horizontal
halaman. - Jika ASCII terlalu lebar, izinkan area ASCII digulir
horizontal tanpa menyebabkan seluruh halaman bergeser. - Animasi masuk
boleh menampilkan ASCII secara bertahap, tetapi harus singkat dan tidak
menunda konten utama. - Sediakan tampilan langsung tanpa animasi untuk
`prefers-reduced-motion`.

### 5.3 Mission Profile

**Tujuan:** Menjelaskan misi dan masalah yang ingin diselesaikan.

Konten: - Heading contoh: `BUILT FOR THE UNREACHABLE`. - Ringkasan misi
robot SAR. - Tantangan seperti medan tidak rata, area berbahaya,
mobilitas, dan kebutuhan observasi. - Ilustrasi vektor medan atau siluet
robot. - Layout editorial dua kolom pada desktop dan satu kolom pada
mobile.

Jangan menyatakan kemampuan otonom, pemetaan, deteksi korban, atau
fungsi penyelamatan sebagai fakta kecuali benar-benar sudah dikembangkan
dan diuji.

### 5.4 Robot Architecture

**Tujuan:** Menunjukkan struktur fisik dan subsistem robot melalui
ilustrasi teknis.

Konten yang dapat ditampilkan jika sesuai dengan robot asli: - Struktur
badan robot. - Kaki, sendi, aktuator, dan mekanisme gerak. - Sensor dan
perangkat persepsi. - Komputer kontrol dan driver. - Sistem daya dan
komunikasi.

Persyaratan: - Gunakan ilustrasi SVG/vektor, bukan kumpulan card. -
Tambahkan garis penunjuk dan label komponen. - Jika interaktif, pengguna
dapat memilih bagian untuk membuka deskripsi singkat melalui teks inline
atau popover sederhana. - Interaksi tidak boleh membutuhkan backend. -
Pada mobile, gunakan ilustrasi dan daftar komponen yang tersusun
vertikal.

### 5.5 Achievements

**Tujuan:** Menampilkan prestasi, capaian kompetisi, milestone, dan
pengakuan tim.

Konten: - Nama kompetisi atau kegiatan. - Tahun. - Hasil atau
penghargaan. - Keterangan singkat. - Foto atau dokumentasi opsional.

Desain: - Gunakan timeline, daftar editorial, atau susunan tipografi
besar. - Nomor/tahun dapat menjadi elemen visual utama. - Gunakan garis
merah solid untuk menandai pencapaian. - Jangan membuat setiap
pencapaian menjadi card. - Jika belum ada data resmi, gunakan
placeholder yang jelas untuk diganti; jangan mengarang penghargaan atau
peringkat.

### 5.6 Team & Development

**Tujuan:** Memperkenalkan orang dan proses pengembangan di balik robot.

Konten: - Nama anggota dan peran/divisi. - Foto anggota atau foto
kegiatan jika tersedia. - Tahapan pengembangan: desain, perakitan,
integrasi, pengujian, dan iterasi. - Deskripsi singkat kontribusi tim.

Desain: - Gunakan daftar nama, grid editorial tanpa card, atau baris per
divisi. - Foto dapat diproses monokrom. - Jangan menambahkan anggota,
jabatan, atau riwayat yang belum dikonfirmasi. - Jika jumlah anggota
banyak, gunakan kelompok divisi dengan heading dan daftar sederhana.

### 5.7 Sponsors

**Tujuan:** Memberi pengakuan kepada organisasi atau perusahaan yang
mendukung tim.

Persyaratan: - Heading contoh: `SUPPORTED BY`. - Logo sponsor dalam
bentuk SVG atau PNG dengan latar transparan bila tersedia. - Logo
ditampilkan dengan ruang kosong yang cukup dan ukuran visual yang
seimbang. - Gunakan bidang hitam atau putih solid sesuai komposisi,
tanpa membuat logo sulit dibaca. - Jangan recolor logo sponsor jika
pedoman merek melarangnya; logo resmi merupakan aset pihak ketiga dan
dapat memiliki warna merek sendiri. Jika aturan warna eksklusif berlaku
mutlak untuk seluruh halaman, tampilkan logo sponsor dalam versi
monokrom yang telah diizinkan. - Jika belum ada sponsor, jangan
tampilkan logo palsu. Section dapat disembunyikan sampai datanya
tersedia atau menggunakan teks kontak sponsor yang tidak mengklaim
adanya kemitraan.

### 5.8 Media Partners

**Tujuan:** Menampilkan media partner resmi dan mendukung visibilitas
kerja sama publikasi.

Persyaratan: - Heading contoh: `MEDIA PARTNERS`. - Daftar logo atau nama
media partner yang telah dikonfirmasi. - Gunakan layout logo horizontal
yang responsif atau daftar editorial. - Jangan membuat logo atau
mengklaim kerja sama yang belum disepakati. - Jika belum ada media
partner, section dapat disembunyikan sampai data tersedia.

### 5.9 Footer / Contact

Konten: - Wordmark Andromeda. - Identitas tim dan afiliasi resmi. -
Email dan tautan media sosial. - Tautan anchor penting. - Copyright.

Desain: - Latar hitam solid. - Garis merah solid sebagai pemisah. - Teks
putih dan aksen merah. - Tidak ada panel atau card tambahan.

------------------------------------------------------------------------

## 6. Motion & Interaction

Animasi boleh terasa halus dan premium seperti pengalaman
e-commerce/editorial modern, tetapi implementasinya harus ringan dan
tidak meniru aset atau desain spesifik milik situs lain.

### Animasi yang direkomendasikan

1.  **Hero reveal:** judul dan ASCII muncul dengan opacity/transform
    sederhana.
2.  **ASCII typing/reveal:** karakter atau baris muncul berurutan dengan
    durasi singkat; jangan membuat pengunjung menunggu lama.
3.  **Scroll reveal:** section muncul ketika memasuki viewport.
4.  **Image reveal:** ilustrasi robot muncul melalui clipping sederhana
    atau transform.
5.  **Line drawing:** garis SVG digambar secara singkat saat section
    robot terlihat.
6.  **Hover feedback:** CTA, tautan, dan label memiliki perubahan warna
    atau underline yang jelas.
7.  **Navbar state:** navbar berubah menjadi latar solid setelah
    melewati hero, jika tidak menambah kompleksitas berlebihan.

### Batasan performa animasi

-   Prioritaskan `transform` dan `opacity`.
-   Hindari animasi layout yang mengubah `width`, `height`, `top`, atau
    `left` secara terus-menerus.
-   Hindari parallax berat, canvas 3D, WebGL, video background, dan
    animasi partikel.
-   Jangan memasang library animasi besar hanya untuk fade-in sederhana.
-   Gunakan CSS transitions/keyframes untuk animasi dasar.
-   Gunakan `IntersectionObserver` hanya jika diperlukan dan lepaskan
    observer ketika tidak digunakan.
-   Hormati `prefers-reduced-motion: reduce`.
-   Animasi tidak boleh menghalangi interaksi atau menyebabkan layout
    shift.
-   Jangan animasikan semua elemen sekaligus; pilih elemen yang
    memperkuat hierarki.

------------------------------------------------------------------------

## 7. Functional Requirements

  ID      Requirement                                      Prioritas
  ------- ------------------------------------------------ ------------------------------
  FR-01   Navbar anchor ke section utama                   P0
  FR-02   Hero dengan ASCII robot responsif                P0
  FR-03   Mission Profile                                  P0
  FR-04   Robot Architecture dengan visual vektor          P0
  FR-05   Achievements berbentuk timeline/list editorial   P0
  FR-06   Team & Development                               P0
  FR-07   Sponsors section                                 P0
  FR-08   Media Partners section                           P0
  FR-09   Footer dan tautan kontak                         P0
  FR-10   Layout mobile, tablet, dan desktop               P0
  FR-11   Metadata SEO dan Open Graph                      P0
  FR-12   Animasi ringan dan reduced-motion support        P0
  FR-13   CMS                                              **Tidak termasuk**
  FR-14   Dashboard admin                                  **Tidak termasuk**
  FR-15   Database/backend                                 **Tidak termasuk untuk MVP**
  FR-16   Section Technical Systems terpisah               **Dihapus**

Konten statis disimpan di file TypeScript/TSX lokal, misalnya
`src/data/achievements.ts`, `src/data/team.ts`, dan
`src/data/partners.ts`.

------------------------------------------------------------------------

## 8. Technology Stack

-   **Next.js App Router** dengan TypeScript.
-   **React Server Components** secara default.
-   **CSS Modules atau global CSS** untuk kontrol desain yang presisi;
    Tailwind CSS boleh digunakan jika sudah menjadi preferensi proyek,
    tetapi jangan menambahkan keduanya secara berlebihan.
-   **SVG** untuk ilustrasi, ikon, dan diagram.
-   **CSS transitions/keyframes** untuk animasi dasar.
-   **Vercel** untuk deployment.
-   **GitHub** untuk version control dan deployment workflow.

### Aturan implementasi ringan

-   Tidak perlu database atau backend.
-   Tidak perlu CMS atau dashboard admin.
-   Tidak perlu library state management global.
-   Tidak perlu library animasi besar kecuali benar-benar dibutuhkan.
-   Hindari library ikon besar; gunakan SVG inline atau paket ikon yang
    kecil.
-   Gunakan Server Components sebagai default; tambahkan `"use client"`
    hanya untuk komponen yang benar-benar membutuhkan state, event
    browser, atau animasi berbasis observer.
-   Gunakan `next/image` untuk aset raster.
-   Gunakan `next/font` untuk font jika dibutuhkan.
-   Optimalkan ukuran gambar dan hindari memuat galeri besar sekaligus.
-   Lazy-load gambar di luar viewport.
-   Jangan lazy-load aset hero yang diperlukan untuk tampilan awal.
-   Hindari dependensi yang tidak digunakan.

------------------------------------------------------------------------

## 9. Struktur Folder yang Disarankan

``` text
andromeda/
├── public/
│   ├── images/
│   │   ├── robot/
│   │   └── team/
│   ├── logos/
│   │   ├── sponsors/
│   │   └── media-partners/
│   └── diagrams/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── AsciiRobot.tsx
│   │   ├── MissionProfile.tsx
│   │   ├── RobotArchitecture.tsx
│   │   ├── Achievements.tsx
│   │   ├── TeamDevelopment.tsx
│   │   ├── Sponsors.tsx
│   │   ├── MediaPartners.tsx
│   │   └── Footer.tsx
│   └── data/
│       ├── achievements.ts
│       ├── team.ts
│       └── partners.ts
├── package.json
├── tsconfig.json
└── README.md
```

Folder dapat disesuaikan dengan konvensi proyek yang sudah ada. Jangan
membuat komponen atau folder kosong yang tidak diperlukan.

------------------------------------------------------------------------

## 10. SEO, Accessibility, dan Responsive Design

### SEO

-   Title dan meta description yang spesifik untuk Andromeda.
-   Open Graph title, description, dan preview image.
-   Favicon.
-   Sitemap dan `robots.txt` melalui konvensi Next.js.
-   Heading terstruktur dengan urutan yang benar.
-   Gunakan teks alternatif yang menjelaskan gambar robot, tim, dan logo
    jika relevan.

### Accessibility

-   Semua tautan dan tombol dapat diakses melalui keyboard.
-   Focus state terlihat jelas menggunakan palet yang tersedia.
-   Gunakan elemen semantik (`nav`, `main`, `section`, `footer`).
-   Kontras teks harus memadai.
-   Tombol menu mobile memiliki label aksesibel dan status
    terbuka/tertutup.
-   Animasi mematuhi `prefers-reduced-motion`.
-   ASCII art diberi deskripsi aksesibel atau alternatif teks ringkas
    agar maknanya tidak hanya bergantung pada karakter visual.

### Responsive

-   **Mobile:** satu kolom, headline adaptif, ASCII font lebih kecil,
    navigasi ringkas.
-   **Tablet:** susunan editorial fleksibel, ilustrasi tetap terbaca.
-   **Desktop:** hero luas, ASCII dominan, komposisi editorial dua kolom
    pada section yang sesuai.
-   Cegah overflow horizontal pada seluruh halaman.
-   Area ASCII boleh memiliki overflow tersendiri bila diperlukan.

------------------------------------------------------------------------

## 11. Acceptance Criteria

Website siap untuk rilis MVP apabila:

-   [ ] Seluruh konten utama berada dalam satu halaman.
-   [ ] Navigasi menggunakan anchor dan berfungsi dengan benar.
-   [ ] Hero menampilkan ASCII robot berkaki sebagai fokus utama.
-   [ ] ASCII merupakan teks nyata di dalam elemen yang sesuai, bukan
    bitmap.
-   [ ] Section Mission Profile, Robot Architecture, Achievements, Team
    & Development, Sponsors, Media Partners, dan Footer tersedia.
-   [ ] Tidak ada section Technical Systems terpisah.
-   [ ] Tidak ada CMS, dashboard admin, database, atau backend dalam
    MVP.
-   [ ] Warna UI hanya menggunakan `#FF0303`, hitam, dan putih.
-   [ ] Tidak ada gradient, neon, glow, atau glassmorphism.
-   [ ] Layout tidak bergantung pada kumpulan card.
-   [ ] Animasi terasa halus tetapi tidak menghambat akses konten.
-   [ ] `prefers-reduced-motion` dihormati.
-   [ ] Tampilan mobile, tablet, dan desktop diuji.
-   [ ] Gambar dioptimalkan dan layout tidak mengalami pergeseran besar
    saat memuat.
-   [ ] Metadata SEO, favicon, sitemap, dan robots tersedia.
-   [ ] Build production berhasil dan deployment Vercel dapat diakses.
-   [ ] Tidak ada data pencapaian, anggota, sponsor, atau media partner
    yang dibuat-buat.

------------------------------------------------------------------------

## 12. Rencana Implementasi

1.  Siapkan proyek Next.js TypeScript dan struktur dasar.
2.  Definisikan design tokens, tipografi, grid, spacing, dan aturan
    responsive.
3.  Implementasikan navbar dan hero terlebih dahulu.
4.  Buat ASCII robot yang jelas dan sesuai dengan robot berkaki.
5.  Implementasikan Mission Profile dan Robot Architecture dengan
    ilustrasi vektor.
6.  Implementasikan Achievements menggunakan data statis dan timeline
    editorial.
7.  Implementasikan Team & Development.
8.  Implementasikan Sponsors dan Media Partners berdasarkan aset resmi
    yang tersedia.
9.  Tambahkan animasi ringan, hover states, dan reduced-motion fallback.
10. Tambahkan metadata, favicon, sitemap, dan robots.
11. Uji aksesibilitas, responsive behavior, performa, dan build.
12. Deploy melalui Vercel dan validasi versi production.

------------------------------------------------------------------------

## 13. Instruksi untuk Claude CLI

Gunakan dokumen ini sebagai sumber kebenaran untuk implementasi website
Andromeda.

Sebelum menulis kode: 1. Periksa struktur repository dan file yang sudah
ada. 2. Pertahankan konfigurasi proyek yang masih sesuai; jangan
mengganti konfigurasi tanpa alasan. 3. Implementasikan MVP berdasarkan
section dan acceptance criteria pada dokumen ini. 4. Jika aset resmi
robot, anggota, pencapaian, sponsor, atau media partner belum tersedia,
buat placeholder lokal yang jelas dan mudah diganti. Jangan mengarang
data faktual atau logo kemitraan. 5. Jangan menambahkan CMS, dashboard
admin, backend, database, atau section Technical Systems. 6. Jangan
menambahkan warna, gradient, neon, glow, glassmorphism, atau layout
card-heavy. 7. Prioritaskan performa dan implementasi sederhana. Hindari
dependensi besar untuk kebutuhan yang dapat dilakukan dengan CSS. 8.
Pastikan hasil akhir berjalan secara lokal dan build production
berhasil. 9. Setelah implementasi, laporkan file yang dibuat/diubah,
dependensi yang ditambahkan, perintah untuk menjalankan proyek, dan
hasil build.

## 14. Catatan Konten

Seluruh teks contoh seperti tagline, nama komponen, pencapaian, profil
anggota, dan deskripsi kemampuan robot harus ditinjau sebelum publikasi.
Gunakan data resmi tim. Jika informasi belum tersedia, pertahankan
placeholder yang mudah dikenali dan jangan menampilkannya sebagai fakta.
