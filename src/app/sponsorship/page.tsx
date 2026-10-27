import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sponsorship from "@/components/Sponsorship";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Paket kemitraan — ${site.wordmark}`,
  description:
    "Tier sponsorship, benefit per paket, dan rencana anggaran tim Andromeda untuk KSTI 2026.",
};

export default function SponsorshipPage() {
  return (
    <>
      <Navbar />
      <main className="subpage subpage--sponsorship">
        <Sponsorship />
      </main>
      <Footer />
    </>
  );
}
