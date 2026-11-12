"use client";

import { useEffect, useState } from "react";
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
 *
 * Indexing these photographs is not this component's job. The carousel uploads
 * them as WebGL textures, so they never enter the DOM, and every way of
 * putting a second copy in the markup either shows through the transparent
 * canvas or hides the images from the crawler it was added for. They are
 * listed in the image sitemap instead, which is what that part of the sitemap
 * protocol is for.
 */
export default function Gallery() {
  // Rendered on the server and on the first client pass so the markup matches;
  // the check runs after, and only a device that fails it ever sees the grid.
  const [canRender, setCanRender] = useState(true);
  // liquid's lensHeight scales off container width. Desktop's band is wide
  // and short, so the lens stays near the edges; mobile's band is near
  // square, so the same lens swallows the whole card. Shrink it there.
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    if (gl) gl.getExtension("WEBGL_lose_context")?.loseContext();
    else setCanRender(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsNarrow(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!canRender) {
    return (
      <section
        className="gallery gallery--plain"
        aria-label="Dokumentasi tim Andromeda"
      >
        <ul className="gallery__grid">
          {gallery.map((item) => (
            <li key={item.src}>
              {/* Plain <img>: already sized and encoded by
                  scripts/make_gallery.py, and this path only runs on hardware
                  that could not do the carousel in the first place. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                width={1000}
                height={700}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

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
        lensHeight={isNarrow ? 0.55 : undefined}
        bend={isNarrow ? 0.18 : undefined}
      />
    </section>
  );
}
