"use client";

import FlexCarousel from "./FlexCarousel";
import { gallery } from "@/data/gallery";

/**
 * The archive row above the robot section. No heading: the photographs carry
 * it, and a title here would cut the run from "Our Capability" into the robot.
 *
 * `captureWheel` is off on purpose — the page scrolls under Lenis, and letting
 * the carousel eat a vertical wheel would trap the reader inside it.
 */
export default function Gallery() {
  return (
    <section className="gallery" aria-label="Dokumentasi tim Andromeda">
      <FlexCarousel
        items={gallery}
        preset="liquid"
        intro="rise"
        cardHeight={0.74}
        gap={14}
        radius={4}
        squeeze={0.2}
        autoplay
        interval={4}
        captions={false}
        captureWheel={false}
      />
    </section>
  );
}
