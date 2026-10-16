import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MissionProfile from "@/components/MissionProfile";
import RobotArchitecture from "@/components/RobotArchitecture";
import StatsRow from "@/components/StatsRow";
import Achievements from "@/components/Achievements";
import Sponsorship from "@/components/Sponsorship";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { mediaPartners, sponsors } from "@/data/partners";

export default function Page() {
  // Partners stays hidden until a real logo exists; an empty wall is dead space.
  const hasPartners = sponsors.length > 0 || mediaPartners.length > 0;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MissionProfile />
        <RobotArchitecture />
        <section className="section shell" id="team">
          <StatsRow />
        </section>
        <Achievements />
        <Sponsorship />
        {hasPartners && <Partners />}
      </main>
      <Footer />
    </>
  );
}
