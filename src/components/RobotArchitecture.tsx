import SectionHead from "./SectionHead";
import RobotGarage from "./RobotGarage";
import { robot } from "@/data/robot";

/** "Andromeda" / "Garage" split so the accent lands on the word that sells
   the section, same two-tone move the rest of the page's headings use. */
function GarageTitle() {
  const [first, ...rest] = robot.model.split(" ");
  return (
    <>
      {first} <span className="sectionTitle__accent">{rest.join(" ")}</span>
    </>
  );
}

export default function RobotArchitecture() {
  return (
    <section className="section section--garage" id="robot">
      <div className="shell">
        <SectionHead title={<GarageTitle />} />
        <RobotGarage />
      </div>
    </section>
  );
}
