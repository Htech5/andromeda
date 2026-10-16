import Image from "next/image";
import NavIcon from "./NavIcon";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer onDark" id="contact">
      <div className="footer__inner shell">
        <div className="footer__brand">
          <Image
            className="footer__mark"
            src="/wordmark.png"
            alt={site.wordmark}
            width={332}
            height={72}
          />
          <p className="footer__affiliation mono">{site.affiliation}</p>

          <dl className="footer__contact">
            <div>
              <dt className="footer__heading mono accent">Platform</dt>
              <dd className="mono">{site.platform}</dd>
            </div>
            <div>
              <dt className="footer__heading mono accent">Berdiri</dt>
              <dd className="mono">{site.founded}</dd>
            </div>
          </dl>

          <div className="footer__actions">
            <a className="cta cta--solid" href="/sponsorship">
              Support us
            </a>
            <a className="cta" href={site.proposal} download>
              Unduh proposal
              <span className="cta__meta mono">PDF · 13 MB</span>
            </a>
          </div>
        </div>

        <div className="footer__cols">
          <nav className="footer__col" aria-label="Navigasi footer">
            <p className="footer__heading mono accent">Sections</p>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {/* Absolute so the links also work from sub-pages. */}
                  <a className="footer__link" href={`/${link.href}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--map">
            <p className="footer__heading mono accent">Headquarters</p>
            <iframe
              className="footer__map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                site.mapQuery,
              )}&output=embed`}
              title={`Peta ${site.hq[0]}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Icons only, centred right above the copyright rule. The label stays
          for screen readers and tooltips. */}
      <ul className="footer__socials shell">
        {site.socials.map((social) => (
          <li key={social.label}>
            <a
              className="footer__social"
              href={social.href}
              aria-label={social.label}
              title={social.label}
            >
              <NavIcon name={social.icon} className="footer__glyph" />
            </a>
          </li>
        ))}
      </ul>

      <div className="footer__base shell mono">
        <span>
          &copy; {new Date().getFullYear()} {site.wordmark}. {site.tagline}
        </span>
      </div>
    </footer>
  );
}
