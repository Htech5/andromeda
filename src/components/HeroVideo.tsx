"use client";

import { useEffect, useRef } from "react";

/**
 * The hero backdrop: a montage of trial footage, every cut tracked and
 * cropped to the robot. Built by scripts/make_montage.py from the raw clips,
 * which is also where the cut list and the crop tightness live.
 *
 * No `autoplay` attribute. Playback is decided here instead, so a visitor who
 * asked for reduced motion gets the poster frame and nothing moving, and the
 * decode stops the moment the hero scrolls away. Without JS the poster stands
 * on its own.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new IntersectionObserver(([entry]) => {
      // A rejected play() is normal here: a tab can be backgrounded before the
      // first frame is ready, and the next scroll back in simply tries again.
      if (entry.isIntersecting) void el.play().catch(() => {});
      else el.pause();
    });
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="hero__video"
      poster="/hero-poster.jpg"
      preload="metadata"
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/hero-montage.mp4" type="video/mp4" />
    </video>
  );
}
