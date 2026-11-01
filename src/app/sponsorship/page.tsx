import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sponsorship from "@/components/Sponsorship";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

const description =
  "Tier sponsorship, benefit per paket, dan rencana anggaran tim Andromeda untuk KSTI 2026.";

export const metadata: Metadata = {
  title: "Paket kemitraan",
  description,
  alternates: { canonical: "/sponsorship" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `${site.url}/sponsorship`,
    siteName: site.wordmark,
    title: `Paket kemitraan — ${site.wordmark}`,
    description,
  },
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
