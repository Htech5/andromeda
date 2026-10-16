"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const MIN_MS = 900;
const OPEN_MS = 850;
/** A stalled asset must not leave the overlay sitting on top of the page. */
const MAX_MS = 4500;

/**
 * First-paint overlay: the wordmark lands in the middle, then splits down its
 * centre and the two halves draw apart, taking the black panels with them.
 *
 * Rendered for everyone, but CSS keeps it hidden unless the `js` class is on
 * <html> — without JS nothing would ever take it back down.
 */
export default function BootScreen() {
  const [state, setState] = useState<"hold" | "opening" | "gone">("hold");

  useEffect(() => {
    const started = performance.now();
    let settled = false;
    let open = 0;
    let remove = 0;

    // `load` and the cap can both fire; only the first one counts.
    const finish = () => {
      if (settled) return;
      settled = true;
      const waited = performance.now() - started;
      open = window.setTimeout(() => {
        setState("opening");
        remove = window.setTimeout(() => setState("gone"), OPEN_MS);
      }, Math.max(0, MIN_MS - waited));
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(cap);
      clearTimeout(open);
      clearTimeout(remove);
    };
  }, []);

  if (state === "gone") return null;

  const mark = (
    <Image
      src="/wordmark.png"
      alt=""
      width={332}
      height={72}
      priority
      className="boot__mark"
    />
  );

  return (
    <div
      className={`boot${state === "opening" ? " boot--opening" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Memuat ${site.wordmark}`}
    >
      {/* Each panel holds the whole wordmark, pushed so its centre sits on the
          seam; the panel's own overflow crops it to that half. */}
      <div className="boot__half boot__half--left" aria-hidden="true">
        {mark}
      </div>
      <div className="boot__half boot__half--right" aria-hidden="true">
        {mark}
      </div>
      <span className="boot__seam" aria-hidden="true" />
    </div>
  );
}
