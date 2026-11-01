import Link from "next/link";
import { site } from "@/data/site";

/**
 * Breadcrumb trail for the two subpages, plus the BreadcrumbList that
 * describes it.
 *
 * The visible trail is the point, not the markup. Google treats a
 * BreadcrumbList with no breadcrumb on the page as a description of something
 * that is not there, so the nav ships with the schema or neither ships.
 */
export default function Breadcrumbs({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol className="crumbs__list">
          <li className="crumbs__item">
            <Link className="crumbs__link" href="/">
              Beranda
            </Link>
          </li>
          <li className="crumbs__item">
            {/* aria-current marks the end of the trail; it is a link to the
                page you are on, so it is not offered as one. */}
            <span className="crumbs__here" aria-current="page">
              {name}
            </span>
          </li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </>
  );
}
