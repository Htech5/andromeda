import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Navbar from "@/components/Navbar";
import TeamDecor from "@/components/TeamDecor";
import Footer from "@/components/Footer";
import TeamRoster from "@/components/TeamRoster";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

/** Declared here rather than in the root layout so the face is only fetched
 *  and preloaded on this route. It is the cabinet's voice; no other page
 *  speaks it. */
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-pixel",
});

const description =
  "Susunan pengurus tim Andromeda Robotis Universitas Diponegoro untuk KSTI 2026: leader, manajer, kepala divisi, dan staf.";

export const metadata: Metadata = {
  title: "Struktur tim",
  description,
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `${site.url}/team`,
    siteName: site.wordmark,
    title: `Struktur tim — ${site.wordmark}`,
    description,
  },
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      {/* Dark the whole way: the roster sits between a black nav and a black
          footer, and a light band between them would read as a seam. */}
      <main className={`subpage subpage--team onDark ${pixel.variable}`}>
        <TeamDecor />
        <section className="section shell" id="team">
          {/* h1, not the shared SectionHead: this page had no h1 at all, and
              the page title is the one heading that should be it. The two
              words are separate lines, and the whitespace between the spans is
              load-bearing — without it the accessible name runs together. */}
          <Reveal variant="scale">
            <h1 className="atitle">
              <span className="atitle__line">Struktur</span>{" "}
              <span className="atitle__line">Tim</span>
            </h1>
          </Reveal>

          <TeamRoster />
        </section>
      </main>
      <Footer />
    </>
  );
}
