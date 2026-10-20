"use client";

import { useEffect, useRef } from "react";

/**
 * Procedural stand-in for the baked M31 photo plate. Same job as the old
 * /andromeda.webp on .sky__core, same box, same class, but the field is drawn
 * from a seeded star catalogue instead of downloaded, and it turns.
 *
 * Calibration knobs. A galaxy that reads right is a judgement call, not a
 * formula, so the dials live here and the loop below should not need touching.
 */

/** Backing store, square. Stars are soft by nature, so the upscale to 150vmin
    reads as focus falloff rather than blur, and the fill cost stays fixed no
    matter how large the section gets or how dense the screen is. */
const BACKING = 1100;
const STARS = 4200;
const ARMS = 2;
/** Minor over major axis. M31 sits near 0.22 at its 77 degree inclination;
    a little flatter than that and the arms stop being legible at this size. */
const TILT = 0.3;
/** Long axis away from horizontal, radians. */
const ROLL = -0.55;
/** Arm sweep from core to rim, radians. */
const TWIST = 5.2;
/** Arm thickness, radians, before the near-core taper. */
const SCATTER = 0.36;
/** Share of stars that ignore the arms and fill the gaps between them. */
const FIELD = 0.2;
/** Share that sits in the core bulge. */
const BULGE = 0.14;
const R_IN = 0.1;
/** Edge fade, baked into the star alphas at build so no mask or filter pass
    runs per frame. Stops match what bake_galaxy.py put into the photo. */
const FADE_IN = 0.4;
const FADE_OUT = 0.88;
/** The arm pattern as a whole, rad/s. One turn takes about nine minutes. */
const OMEGA = 0.012;
/** Epicycles: each star oscillates around its pattern seat instead of
    orbiting at its own rate. Real differential rotation shears a two-arm
    spiral into a smooth disk within a minute or two of watching; a bounded
    wobble keeps the local motion without ever winding the arms up. */
const WOB_T = 0.045;
const WOB_R = 0.014;
const FPS = 30;

const WARM = "#ffeccf";
const COOL = "#dfe8ff";

/** closest-side circle, same shape the photo plate faded on. */
const fade = (r: number) =>
  Math.min(Math.max((FADE_OUT - r) / (FADE_OUT - FADE_IN), 0), 1);

type Catalogue = {
  r: Float32Array;
  th: Float32Array;
  rate: Float32Array;
  ph: Float32Array;
  size: Float32Array;
  a: Float32Array;
  /** Index the palette switches from warm to cool, so fillStyle is set twice
      per frame rather than once per star. Bulge stars are built first. */
  cool: number;
};

function build(): Catalogue {
  // Same generator the sponsor scatter uses. One galaxy on every load, so the
  // plate is stable between deploys and the server HTML never disagrees.
  let s = 20260119 >>> 0;
  const rnd = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32;
  // Three uniforms average into a good enough bell. Box-Muller is overkill for
  // scatter nobody can measure.
  const bell = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;

  const r = new Float32Array(STARS);
  const th = new Float32Array(STARS);
  const rate = new Float32Array(STARS);
  const ph = new Float32Array(STARS);
  const size = new Float32Array(STARS);
  const a = new Float32Array(STARS);

  const cool = Math.round(STARS * BULGE);

  for (let i = 0; i < STARS; i++) {
    let rad: number;
    let ang: number;
    let bright: number;

    if (i < cool) {
      // Bulge: tight, round, no arm structure.
      rad = Math.pow(rnd(), 1.8) * 0.19;
      ang = rnd() * Math.PI * 2;
      bright = 0.3 + 0.45 * rnd();
    } else {
      // Disk falls off outward, so bias the draw toward the inner radii.
      // Stops at the fade, not at the box. Past FADE_OUT a star carries zero
      // alpha and still costs a fillRect on every frame.
      rad = R_IN + (FADE_OUT - R_IN) * Math.pow(rnd(), 0.75);
      if (rnd() < FIELD) {
        ang = rnd() * Math.PI * 2;
        bright = 0.06 + 0.14 * rnd();
      } else {
        const arm = (i % ARMS) * ((Math.PI * 2) / ARMS);
        // Arms are thin where they leave the core and fray at the rim.
        ang = arm + rad * TWIST + bell() * SCATTER * (0.35 + rad);
        bright = 0.16 + 0.34 * rnd();
      }
    }

    r[i] = rad;
    th[i] = ang;
    // Inner stars wobble faster, which is the part of differential rotation
    // the eye actually picks up.
    rate[i] = 0.22 + 0.5 / (rad + 0.18);
    ph[i] = rnd() * Math.PI * 2;
    size[i] = rnd() < 0.08 ? 2 : 1;
    a[i] = bright * fade(rad) * (1 - 0.58 * rad);
  }

  return { r, th, rate, ph, size, a, cool };
}

export default function GalaxyCore() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const cat = build();

    if (process.env.NODE_ENV !== "production") {
      console.assert(fade(0) === 1, "core must stay fully lit");
      console.assert(fade(1) === 0, "rim must reach nothing");
      console.assert(fade(0.75) > 0 && fade(0.75) < 1, "fade must ramp, not step");
      console.assert(
        cat.a.every((v) => v >= 0 && v <= 1),
        "star alpha out of range",
      );
      const rim = Array.from(cat.r).some((v) => v > FADE_OUT);
      console.assert(!rim, "a star past the fade draws at zero alpha, pure waste");
    }

    const half = BACKING / 2;
    const cos = Math.cos(ROLL);
    const sin = Math.sin(ROLL);

    // The bulge is part of the disk, so its glow leans the way the arms do.
    // Drawn through a transform rather than as its own ellipse maths: one fill,
    // and it stays locked to TILT and ROLL when those are retuned.
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, half * 0.44);
    glow.addColorStop(0, "rgba(255, 244, 222, 0.62)");
    glow.addColorStop(0.12, "rgba(255, 232, 198, 0.3)");
    glow.addColorStop(0.34, "rgba(255, 218, 176, 0.1)");
    glow.addColorStop(0.68, "rgba(255, 210, 168, 0.016)");
    glow.addColorStop(1, "rgba(255, 210, 168, 0)");

    const draw = (t: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, BACKING, BACKING);

      ctx.globalAlpha = 1;
      ctx.translate(half, half);
      ctx.rotate(ROLL);
      ctx.scale(1, TILT * 1.9);
      ctx.fillStyle = glow;
      ctx.fillRect(-half, -half, BACKING, BACKING);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Overlapping stars add up instead of painting over each other. That is
      // what gives the arms their grain and the core its weight, with one
      // catalogue instead of a second dense one layered on top.
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = WARM;

      for (let i = 0; i < STARS; i++) {
        if (i === cat.cool) ctx.fillStyle = COOL;
        const rate = cat.rate[i];
        const ph = cat.ph[i];
        const ang = cat.th[i] + t * OMEGA + WOB_T * Math.sin(t * rate + ph);
        const rad = cat.r[i] * (1 + WOB_R * Math.cos(t * rate * 0.7 + ph));
        const x = Math.cos(ang) * rad;
        const y = Math.sin(ang) * rad * TILT;
        ctx.globalAlpha = cat.a[i] * (0.8 + 0.2 * Math.sin(t * rate * 3 + ph));
        ctx.fillRect(
          half + (x * cos - y * sin) * half,
          half + (x * sin + y * cos) * half,
          cat.size[i],
          cat.size[i],
        );
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(0);
      return;
    }

    const start = performance.now();
    let last = 0;
    let frame = 0;

    // Capped: the pattern turns once in minutes, so frames past 30fps buy
    // nothing and cost a full repaint of the field.
    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw((now - start) / 1000);
    };

    // The section runs 128dvh, so it is off screen most of the visit. Painting
    // it then is what made the old CSS version crawl on phones.
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) frame = requestAnimationFrame(step);
        else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "120px" },
    );
    seen.observe(canvas);

    draw(0);

    return () => {
      seen.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      width={BACKING}
      height={BACKING}
      className="sky__core"
      aria-hidden="true"
    />
  );
}
