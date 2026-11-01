import { site } from "@/data/site";

/**
 * Schema.org graph for the site, emitted once from the root layout.
 *
 * Three linked nodes: the team as an organisation, the site itself, and the
 * university it belongs to. Search engines read this to answer "what is
 * Andromeda Undip" with a panel rather than a blue link, and to connect the
 * team to its Instagram and TikTok accounts instead of treating them as
 * unrelated pages.
 *
 * Every value here already appears on the rendered page. Nothing is asserted
 * that a visitor cannot also read.
 */
export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsTeam",
        "@id": `${site.url}/#team`,
        name: `${site.name} Robotis Universitas Diponegoro`,
        alternateName: ["Andromeda Undip", "EWS Andromeda", site.wordmark],
        url: site.url,
        description: site.description,
        foundingDate: String(site.founded),
        email: site.email,
        telephone: site.phone,
        sport: "Robotics competition",
        parentOrganization: { "@id": `${site.url}/#undip` },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.hq[0],
          addressLocality: "Semarang",
          addressRegion: "Jawa Tengah",
          postalCode: "50275",
          addressCountry: "ID",
        },
        sameAs: site.socials
          .filter((s) => s.href.startsWith("http") && !s.href.startsWith("https://wa.me"))
          .map((s) => s.href),
      },
      {
        "@type": "CollegeOrUniversity",
        "@id": `${site.url}/#undip`,
        name: "Universitas Diponegoro",
        url: "https://www.undip.ac.id",
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.wordmark,
        description: site.description,
        inLanguage: "id-ID",
        publisher: { "@id": `${site.url}/#team` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // The object is built here from known values, so there is nothing to
      // escape and no user input to sanitise.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
