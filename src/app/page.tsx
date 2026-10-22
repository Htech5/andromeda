import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Capability from "@/components/Capability";
import RobotArchitecture from "@/components/RobotArchitecture";
import StatsRow from "@/components/StatsRow";
import Achievements from "@/components/Achievements";
import PoweredBy from "@/components/PoweredBy";
import Footer from "@/components/Footer";
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
          <StatsRow />
        </section>
        <Achievements />
        {hasPartners && <PoweredBy />}
      </main>
      <Footer />
    </>
  );
}
