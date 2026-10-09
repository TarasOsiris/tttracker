import { links, SITE_URL, socials } from "~/content/site";

/** schema.org people and organizations, shared so every page names the same author and publisher. */

/** The developer, who writes the site and the blog; /about is his page. */
export const authorSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/about#taras`,
  name: "Taras Leskiv",
  url: `${SITE_URL}/about`,
  sameAs: [socials.x, socials.threads],
};

/** The studio named in the footer copyright, which publishes the apps and the site. */
export const publisherSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#publisher`,
  name: "Nineva Studios",
  url: links.studio,
  email: links.email,
};
