"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavIcon from "./NavIcon";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [pill, setPill] = useState(false);
  const [active, setActive] = useState("");
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

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const targets = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((node): node is Element => node !== null);
    if (targets.length === 0) return;

    // A thin band across the middle of the viewport: whatever crosses it is
    // the section being read, so the dock marks exactly one tab.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
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
            <a href="#sponsorship" className="nav__cta mono">
              Jadi sponsor
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile dock. Icons only, parked above the home indicator. */}
      <nav className="dock onDark" aria-label="Navigasi bagian">
        <ul className="dock__list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="dock__item"
                aria-current={active === link.href ? "true" : undefined}
              >
                <NavIcon name={link.icon} />
                <span className="dock__label mono">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
