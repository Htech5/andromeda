import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Capability from "@/components/Capability";
import RobotArchitecture from "@/components/RobotArchitecture";
import StatsRow from "@/components/StatsRow";
import TeamFaces from "@/components/TeamFaces";
import Achievements from "@/components/Achievements";
import PoweredBy from "@/components/PoweredBy";
import Footer from "@/components/Footer";
import NavIcon from "@/components/NavIcon";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import { poweredBy, sponsors } from "@/data/partners";

export default function Page() {
  // One orbit section holds both walls; empty, it is just dead space.
  const hasPartners = poweredBy.length > 0 || sponsors.length > 0;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capability />
        <RobotArchitecture />
        <section className="section section--stats shell" id="team">
          <SectionHead title="Tim" />
          <Reveal variant="tilt">
            <p className="lede lede--bar">
              Dua puluh enam anggota lintas fakultas, satu leader, dua manajer,
              lima divisi. Mereka yang merakit, memprogram, dan menurunkan M31
              ke arena.
            </p>
          </Reveal>
          <StatsRow />
          <TeamFaces />
          <Reveal variant="right">
            <Link className="teamLink" href="/team">
              Lihat struktur tim
              <span className="teamLink__arrow">
                <NavIcon name="arrow" className="teamLink__glyph" />
              </span>
            </Link>
          </Reveal>
        </section>
        <Achievements />
        {hasPartners && <PoweredBy />}
      </main>
      <Footer />
    </>
  );
}
