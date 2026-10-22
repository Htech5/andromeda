import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import TeamChart from "@/components/TeamChart";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Struktur tim — ${site.wordmark}`,
  description:
    "Susunan pengurus tim Andromeda Robotis Universitas Diponegoro untuk KSTI 2026: leader, manajer, kepala divisi, dan staf.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      {/* Dark the whole way: the chart sits between a black nav and a black
          footer, and a light band between them would read as a seam. */}
      <main className="subpage onDark">
        <section className="section shell" id="team">
          <SectionHead title="Struktur tim" />
          <Reveal variant="tilt">
            <p className="lede lede--bar">
              Dua puluh enam anggota lintas fakultas, dibagi ke lima divisi
              teknis dan operasional. Satu leader memegang arah program, dua
              manajer memegang jalurnya.
            </p>
          </Reveal>
          <TeamChart />
        </section>
      </main>
      <Footer />
    </>
  );
}
