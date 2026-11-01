import type { MetadataRoute } from "next";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";

/** Every route the site has. `lastModified` is the build time, which is as
 *  close to the truth as a static export gets.
 *
 *  The home page carries the gallery photographs as image entries. They are
 *  drawn into a WebGL canvas, never into the DOM, so a crawler has no other
 *  way to find them: the image sitemap is the documented route for exactly
 *  this case. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      images: gallery.map((item) => `${site.url}${item.src}`),
    },
    {
      url: `${site.url}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/sponsorship`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
