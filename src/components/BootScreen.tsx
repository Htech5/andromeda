"use client";

import { useEffect, useState } from "react";
import HeroAscii from "./HeroAscii";
import { robot } from "@/data/robot";

const MIN_MS = 1100;
const FADE_MS = 500;
/** A stalled asset must not leave the overlay sitting on top of the page. */
const MAX_MS = 4500;

/**
 * First-paint overlay: the robot charges left to right through the wind while
 * the page finishes loading, then it fades out for good.
 *
 * Rendered for everyone, but CSS keeps it hidden unless the `js` class is on
 * <html> — without JS nothing would ever take it back down.
 */
export default function BootScreen() {
  const [state, setState] = useState<"run" | "leaving" | "gone">("run");

  useEffect(() => {
    const started = performance.now();
    let leave = 0;
    let remove = 0;

    let settled = false;

    // `load` and the cap can both fire; only the first one counts.
    const finish = () => {
      if (settled) return;
      settled = true;
      const waited = performance.now() - started;
      leave = window.setTimeout(() => {
        setState("leaving");
        remove = window.setTimeout(() => setState("gone"), FADE_MS);
      }, Math.max(0, MIN_MS - waited));
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(cap);
      clearTimeout(leave);
      clearTimeout(remove);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div
      className={`boot${state === "leaving" ? " boot--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman"
    >
      <div className="boot__wind" aria-hidden="true" />
      <div className="boot__runner">
        <HeroAscii />
      </div>
      <p className="boot__label mono">
        <span className="accent">//</span> MEMUAT {robot.model}
      </p>
    </div>
  );
}
