import Reveal from "./Reveal";
import RoadStrip from "./RoadStrip";
import SectionHead from "./SectionHead";
import { achievements } from "@/data/achievements";

export default function Achievements() {
  if (achievements.length === 0) {
    return (
      <section className="section shell" id="achievements">
        <SectionHead title="Achievement" />
        <Reveal>
          <p className="lede">
            Belum ada capaian resmi yang dipublikasikan. Bagian ini diisi setelah
            dokumentasi tim tersedia.
          </p>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="section shell" id="achievements">
      {/* The head rides inside the pin. The strip holds the viewport for eight
          screens of scroll, and a title left at the top of the section would
          be off screen for every one of them. */}
      <RoadStrip
        head={<SectionHead title="Achievement" />}
        items={[...achievements]}
      />
    </section>
  );
}
