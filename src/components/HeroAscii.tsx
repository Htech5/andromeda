"use client";

import { useEffect, useRef } from "react";
import { asciiRobot } from "@/data/asciiRobot";

const GRID = asciiRobot.join("\n");
/** Server and first client paint must match, so the seed is deterministic. */
const SEED = GRID.replace(/[0-9]/g, (d) => (Number(d) >= 5 ? "1" : "0"));
const SEED_ZERO = SEED.replace(/1/g, " ");
const SEED_ONE = SEED.replace(/0/g, " ");

export default function HeroAscii() {
  const zeroRef = useRef<HTMLPreElement>(null);
  const oneRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const zeroEl = zeroRef.current;
    const oneEl = oneRef.current;
    if (!zeroEl || !oneEl) return;

    const chars = GRID.split("");
    const cells: number[] = [];
    const weight: number[] = [];
    chars.forEach((ch, i) => {
      const n = ch.charCodeAt(0) - 48;
      if (n >= 0 && n <= 9) {
        cells.push(i);
        weight.push(n / 9);
      }
    });

    // The two layers stack, so each digit lives in exactly one of them: ones in
    // red on top, zeros in white underneath.
    const zeros = chars.slice();
    const ones = chars.slice();

    // Brighter cells land on 1 more often, so the shading survives the flicker.
    const roll = (i: number) => {
      const at = cells[i];
      const one = Math.random() < 0.12 + 0.76 * weight[i];
      chars[at] = one ? "1" : "0";
      zeros[at] = one ? " " : "0";
      ones[at] = one ? "1" : " ";
    };

    const paint = () => {
      zeroEl.textContent = zeros.join("");
      oneEl.textContent = ones.join("");
    };

    for (let i = 0; i < cells.length; i++) roll(i);
    paint();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const batch = Math.max(6, Math.round(cells.length * 0.05));
    let timer = 0;

    // Flip a slice per tick, then two DOM writes: no React re-render.
    const step = () => {
      for (let k = 0; k < batch; k++) roll((Math.random() * cells.length) | 0);
      paint();
      timer = window.setTimeout(step, 110);
    };

    timer = window.setTimeout(step, 110);
    return () => clearTimeout(timer);
  }, []);

  return (
    <figure className="ascii ascii--bin">
      <pre ref={zeroRef} className="ascii__art ascii__art--bin" aria-hidden="true">
        {SEED_ZERO}
      </pre>
      <pre
        ref={oneRef}
        className="ascii__art ascii__art--bin ascii__art--one"
        aria-hidden="true"
      >
        {SEED_ONE}
      </pre>
      <figcaption className="srOnly">
        Siluet ASCII robot berkaki enam M31 Enterprise, disusun dari angka biner
        yang terus berubah.
      </figcaption>
    </figure>
  );
}
