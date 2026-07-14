import { useEffect } from "react";
import { SITE_URL } from "@/lib/business";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export const Seo = ({ title, description, path = "", jsonLd, image }) => {
  useEffect(() => {
    const canonical = `${SITE_URL}${path || "/"}`;
    if (title) document.title = title;
    if (description) upsertMeta("name", "description", description);
    upsertCanonical(canonical);

    // Open Graph / Twitter
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonical);
    if (image) upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    // JSON-LD structured data (page specific)
    const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    const nodes = blocks.map((b) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo", "page");
      s.text = JSON.stringify(b);
      document.head.appendChild(s);
      return s;
    });
    window.scrollTo(0, 0);
    return () => nodes.forEach((n) => n.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, JSON.stringify(jsonLd)]);

  return null;
};

export default Seo;
