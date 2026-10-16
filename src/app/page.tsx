import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MissionProfile from "@/components/MissionProfile";
import RobotArchitecture from "@/components/RobotArchitecture";
import Achievements from "@/components/Achievements";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <MissionProfile />
        <RobotArchitecture />
        <Achievements />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
