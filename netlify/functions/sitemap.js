// Netlify edge function — serves /sitemap.xml dynamically
// Covers: static pages, service pages, all 11 geo pages, blog posts from Supabase
import { createClient } from '@supabase/supabase-js';

const BASE = 'https://www.larrycastleberry.com';

// ── Static pages ─────────────────────────────────────────
const STATIC = [
  { path: '/',            priority: '1.0', freq: 'weekly'  },
  { path: '/about',       priority: '0.8', freq: 'monthly' },
  { path: '/shop',        priority: '0.8', freq: 'weekly'  },
  { path: '/blog',        priority: '0.8', freq: 'daily'   },
  { path: '/contact',     priority: '0.9', freq: 'monthly' },
  { path: '/book-online', priority: '1.0', freq: 'monthly' },
];

// ── Service pages ─────────────────────────────────────────
const SERVICES = ['storytelling', 'narration', 'voice-overs'];

// ── Geo pages ─────────────────────────────────────────────
const GEO = [
  'detroit-storyteller',
  'lansing-storyteller',
  'bay-city-storyteller',
  'ann-arbor-storyteller',
  'corporate-storyteller',
  'metro-detroit-storyteller',
  'southfield-storyteller',
  'dearborn-storyteller',
  'oakland-county-storyteller',
  'macomb-county-storyteller',
  'michigan-library-storyteller',
  'michigan-school-assembly',
];

const today = new Date().toISOString().split('T')[0];

function urlTag(path, priority, freq, lastmod = today) {
  return `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default async (req) => {
  // Pull blog posts from Supabase if env vars are set
  let blogUrls = '';
  const sbUrl  = process.env.VITE_SUPABASE_URL;
  const sbKey  = process.env.VITE_SUPABASE_ANON_KEY;
  if (sbUrl && sbKey) {
    try {
      const sb = createClient(sbUrl, sbKey);
      const { data } = await sb
        .from('blog_posts')
        .select('slug, created_at')
        .eq('published', true);
      if (data?.length) {
        blogUrls = data.map(p =>
          urlTag('/blog/' + p.slug, '0.7', 'monthly', p.created_at?.split('T')[0])
        ).join('\n');
      }
    } catch (_) {}
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC.map(s => urlTag(s.path, s.priority, s.freq)).join('\n')}
${SERVICES.map(s => urlTag('/' + s, '0.8', 'monthly')).join('\n')}
${GEO.map(g => urlTag('/' + g, '0.9', 'monthly')).join('\n')}
${blogUrls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const config = { path: '/sitemap.xml' };
