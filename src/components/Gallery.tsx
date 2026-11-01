"use client";

import FlexCarousel from "./FlexCarousel";
import { gallery } from "@/data/gallery";

/**
 * The archive row above the robot section. No heading: the photographs carry
 * it, and a title here would cut the run from "Our Capability" into the robot.
 *
 * `captureWheel` is off on purpose — the page scrolls under Lenis, and letting
 * the carousel eat a vertical wheel would trap the reader inside it.
 *
 * Two settings are off for weight, not for looks. `autoplay` holds the frame
 * loop open for as long as the row is on screen; without it the carousel
 * sleeps between gestures. `dispersion` runs a twelve-tap sample per pixel
 * along the bent edge, the most expensive thing the shader does, and the bend
 * reads fine without the rainbow split.
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
        dispersion={0}
        captions={false}
        captureWheel={false}
      />
    </section>
  );
}
