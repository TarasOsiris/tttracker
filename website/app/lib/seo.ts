import type { MetaDescriptor } from "react-router";
import { APP_NAME, SITE_URL } from "~/content/site";

export function seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): MetaDescriptor[] {
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/og-image.png`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
