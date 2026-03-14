// SEOHead.jsx — drop this into any page to set title, meta, og tags, and schema
// One component, controls all SEO per page. Change tokens.js → updates sitewide.
import { useEffect } from 'react';

const SITE = 'Larry Castleberry';
const BASE_URL = 'https://www.larrycastleberry.com';
const DEFAULT_IMG = `${BASE_URL}/images/pro.jpg`;

export default function SEOHead({
  title,
  description,
  image = DEFAULT_IMG,
  url,
  schema,
}) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Master Storyteller, Author & Voice Actor | Detroit, MI`;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  useEffect(() => {
    // ── Title ──
    document.title = fullTitle;

    // ── Helper: set or create meta tag ──
    const setMeta = (selector, attr, val) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [a, v] = attr;
        el.setAttribute(a, v);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    // ── Standard meta ──
    setMeta('meta[name="description"]',       ['name','description'],       description);

    // ── Open Graph ──
    setMeta('meta[property="og:title"]',      ['property','og:title'],      fullTitle);
    setMeta('meta[property="og:description"]',['property','og:description'],description);
    setMeta('meta[property="og:image"]',      ['property','og:image'],      image);
    setMeta('meta[property="og:url"]',        ['property','og:url'],        fullUrl);
    setMeta('meta[property="og:type"]',       ['property','og:type'],       'website');
    setMeta('meta[property="og:site_name"]',  ['property','og:site_name'],  SITE);

    // ── Twitter Card ──
    setMeta('meta[name="twitter:card"]',        ['name','twitter:card'],        'summary_large_image');
    setMeta('meta[name="twitter:title"]',       ['name','twitter:title'],       fullTitle);
    setMeta('meta[name="twitter:description"]', ['name','twitter:description'], description);
    setMeta('meta[name="twitter:image"]',       ['name','twitter:image'],       image);

    // ── Canonical ──
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // ── Schema ──
    if (schema) {
      let s = document.getElementById('page-schema');
      if (!s) { s = document.createElement('script'); s.id = 'page-schema'; s.type = 'application/ld+json'; document.head.appendChild(s); }
      s.textContent = JSON.stringify(schema);
    }

    return () => {
      document.getElementById('page-schema')?.remove();
    };
  }, [fullTitle, description, image, fullUrl, schema]);

  return null;
}
