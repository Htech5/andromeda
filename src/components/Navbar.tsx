"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Dock from "./Dock";
import NavIcon from "./NavIcon";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [pill, setPill] = useState(false);
  const [active, setActive] = useState("");
  const sentinel = useRef<HTMLDivElement>(null);
  // Sections only exist on the home page; elsewhere the links route back to it.
  const onHome = usePathname() === "/";
  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`);

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
    if (!onHome || typeof IntersectionObserver === "undefined") return;

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
  }, [onHome]);

  return (
    <>
      <div ref={sentinel} className="navSentinel" aria-hidden="true" />

      <header className={`nav onDark ${pill ? "nav--pill" : ""}`}>
        <div className="nav__inner shell">
          <Link href="/" className="nav__mark">
            <Image
              src="/wordmark.png"
              alt={site.wordmark}
              width={332}
              height={72}
              priority
            />
          </Link>

          <nav className="nav__links" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={hrefFor(link.href)}
                className="nav__link mono"
              >
                {link.label}
              </a>
            ))}
            <Link href="/sponsorship" className="nav__cta mono">
              Jadi sponsor
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile dock: React Bits Dock, pinned by its host strip. */}
      <div className="dockHost">
        <Dock
          items={navLinks.map((link) => ({
            icon: <NavIcon name={link.icon} />,
            label: link.label,
            active: active === link.href,
            className: active === link.href ? "dock-item--here" : undefined,
            onClick: () => {
              if (!onHome) {
                window.location.href = hrefFor(link.href);
                return;
              }
              document
                .querySelector(link.href)
                ?.scrollIntoView({ behavior: "smooth" });
            },
          }))}
          theme="dark"
          tiles={false}
          showLabels={false}
          baseItemSize={42}
          magnification={60}
          panelHeight={58}
          gap={14}
          distance={120}
        />
      </div>
    </>
  );
}
