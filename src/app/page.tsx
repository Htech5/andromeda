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
        {/* The three light sections share one warm band, so the run from the
            robot to the achievements reads as a single stretch of paper
            rather than three white sections stacked. */}
        <div className="lightRun onDark">
        <RobotArchitecture />
        <section className="section section--stats shell" id="team">
          <div className="statsDeco" aria-hidden="true" />
          <TeamFaces lane={0} />
          <SectionHead title="Andromeda Team" />
          <StatsRow />
          <Reveal className="teamCta" variant="right">
            <Link className="cta cta--solid" href="/team">
              Lihat struktur tim
              <NavIcon name="arrow" className="teamCta__glyph" />
            </Link>
          </Reveal>
          <TeamFaces lane={1} />
        </section>
        <Achievements />
        </div>
        {hasPartners && <PoweredBy />}
      </main>
      <Footer />
    </>
  );
}
