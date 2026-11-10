import SectionHead from "./SectionHead";
import RobotGarage from "./RobotGarage";
import { robot } from "@/data/robot";

export default function RobotArchitecture() {
  return (
    <section className="section shell" id="robot">
      <SectionHead title={robot.model} />
      <RobotGarage />
    </section>
  );
}
