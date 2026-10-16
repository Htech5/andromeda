"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) =>
      setPill(!entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="navSentinel" aria-hidden="true" />

      <header className={`nav onDark ${pill ? "nav--pill" : ""}`}>
        <div className="nav__inner shell">
          <a href="#top" className="nav__mark">
            <Image
              src="/wordmark.png"
              alt={site.wordmark}
              width={332}
              height={72}
              priority
            />
          </a>

          <nav className="nav__links" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav__link mono">
                {link.label}
              </a>
            ))}
            <a href="#robot" className="nav__cta mono">
              Explore the robot
            </a>
          </nav>

          <button
            type="button"
            className="nav__toggle mono"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <nav
          id="mobile-nav"
          className="nav__mobile"
          aria-label="Navigasi mobile"
          hidden={!open}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav__mobileLink"
              onClick={() => setOpen(false)}
            >
              <span className="mono accent">/</span> {link.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
