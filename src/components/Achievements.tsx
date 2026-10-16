import Reveal from "./Reveal";
import RoadStrip from "./RoadStrip";
import SectionHead from "./SectionHead";
import { achievements } from "@/data/achievements";

export default function Achievements() {
  return (
    <section className="section shell" id="achievements">
      <SectionHead title="Achievement" />

      {achievements.length === 0 ? (
        <Reveal>
          <p className="lede">
            Belum ada capaian resmi yang dipublikasikan. Bagian ini diisi setelah
            dokumentasi tim tersedia.
          </p>
        </Reveal>
      ) : (
        <RoadStrip items={[...achievements]} />
      )}
    </section>
  );
}
