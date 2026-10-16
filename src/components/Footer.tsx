import AsciiRobot from "./AsciiRobot";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer onDark" id="contact">
      <div className="shell">
        <section className="ctaPanel">
          <div className="ctaPanel__text">
            <h2 className="ctaPanel__title">Dukung Andromeda ke KSTI 2026</h2>
            <p className="ctaPanel__sub">
              Paket kemitraan, jadwal uji, dan dokumentasi robot dibahas
              langsung dengan divisi sponsorship.
            </p>
            <div className="hero__actions">
              <a className="cta cta--solid" href={`mailto:${site.email}`}>
                Kirim email
              </a>
              <a
                className="cta"
                href={`https://wa.me/${site.phoneHref}`}
              >
                WhatsApp tim
              </a>
            </div>
          </div>
          <div className="ctaPanel__art" aria-hidden="true">
            <AsciiRobot />
          </div>
        </section>
      </div>

      <div className="footer__inner shell">
        <div className="footer__brand">
          <p className="footer__mark">{site.wordmark}</p>
          <p className="footer__affiliation mono">{site.affiliation}</p>

          <dl className="footer__contact">
            <div>
              <dt className="footer__heading mono accent">Email</dt>
              <dd>
                <a className="inlineLink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="footer__heading mono accent">WhatsApp</dt>
              <dd>
                <a
                  className="inlineLink mono"
                  href={`https://wa.me/${site.phoneHref}`}
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="footer__heading mono accent">Platform</dt>
              <dd className="mono">{site.platform}</dd>
            </div>
          </dl>
        </div>

        <div className="footer__cols">
          <nav className="footer__col" aria-label="Navigasi footer">
            <p className="footer__heading mono accent">Sections</p>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__heading mono accent">Headquarters</p>
            <address className="footer__address">
              {site.hq.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>

          <div className="footer__col">
            <p className="footer__heading mono accent">Social</p>
            <ul className="footer__list">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a className="footer__link" href={social.href}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__base shell mono">
        <span>
          &copy; {new Date().getFullYear()} {site.wordmark}. {site.tagline}
        </span>
      </div>
    </footer>
  );
}
