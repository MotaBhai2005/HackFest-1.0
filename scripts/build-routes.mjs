import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Base URL for production deployment (override with SITE_URL env var if provided)
const BASE_URL = (process.env.SITE_URL || 'https://hackfest.outrb.tech').replace(/\/$/, '');
const TODAY = new Date().toISOString().split('T')[0];

const rootHtml = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

// Ensure root index.html has canonical link
const rootCanonical = `  <link rel="canonical" href="${BASE_URL}/" />\n</head>`;
if (!rootHtml.includes('rel="canonical"')) {
  await writeFile(
    new URL('../dist/index.html', import.meta.url),
    rootHtml.replace('</head>', rootCanonical),
    'utf8'
  );
}

const routes = {
  events: {
    title: 'Competitions',
    description: 'Every event at HACKFEST 2026 — from HackOUTR hackathon editions to flagship competitions, fun events, and hands-on workshops.',
    priority: '0.9',
    changefreq: 'daily',
    breadcrumbs: [
      { name: 'HACKFEST 2026', path: '/' },
      { name: 'Competitions', path: '/events' },
    ],
  },
  'fun-events': {
    title: 'Fun Events',
    description: 'Strategy, speed, construction, and a little mystery. Explore the other side of HACKFEST across three festival days.',
    priority: '0.8',
    changefreq: 'daily',
    breadcrumbs: [
      { name: 'HACKFEST 2026', path: '/' },
      { name: 'Fun Events', path: '/fun-events' },
    ],
  },
  workshops: {
    title: 'Workshops',
    description: 'Explore practical aerospace and electronics through workshops built around hands-on learning.',
    priority: '0.8',
    changefreq: 'daily',
    breadcrumbs: [
      { name: 'HACKFEST 2026', path: '/' },
      { name: 'Workshops', path: '/workshops' },
    ],
  },
  'events/hackoutr-software': {
    title: 'HackOUTR Software Edition',
    description: 'The 36-Hour Software Hackathon is an intensive innovation marathon featuring diverse problem statements at HACKFEST 2026.',
    priority: '0.95',
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'HACKFEST 2026', path: '/' },
      { name: 'Events', path: '/events' },
      { name: 'HackOUTR', path: '/events#hackoutr' },
      { name: 'HackOUTR Software Edition', path: '/events/hackoutr-software' },
    ],
  },
  'events/hackoutr-hardware': {
    title: 'HackOUTR Hardware Edition',
    description: 'Connect circuits, code, and physical prototyping to engineer real-world hardware solutions at HACKFEST 2026.',
    priority: '0.95',
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'HACKFEST 2026', path: '/' },
      { name: 'Events', path: '/events' },
      { name: 'HackOUTR', path: '/events#hackoutr' },
      { name: 'HackOUTR Hardware Edition', path: '/events/hackoutr-hardware' },
    ],
  },
};

// Generate static routes with canonical links and JSON-LD BreadcrumbList schemas
for (const [routePath, config] of Object.entries(routes)) {
  const directory = new URL(`../dist/${routePath}/`, import.meta.url);
  await mkdir(directory, { recursive: true });

  const canonicalUrl = `${BASE_URL}/${routePath}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: config.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.path.startsWith('http') ? crumb.path : `${BASE_URL}${crumb.path}`,
    })),
  };

  const seoTags = [
    `  <link rel="canonical" href="${canonicalUrl}" />`,
    `  <script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`,
    '</head>',
  ].join('\n');

  let routeHtml = rootHtml
    .replace(/<title>.*?<\/title>/, `<title>${config.title} — HACKFEST 2026 | OUTR</title>`)
    .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${config.title} — HACKFEST 2026 | OUTR" />`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${config.description.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${config.title} — HACKFEST 2026 | OUTR" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${config.description.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${config.title} — HACKFEST 2026 | OUTR" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${config.description.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    .replace('</head>', seoTags);

  await writeFile(new URL('index.html', directory), routeHtml, 'utf8');
}

console.log('Static routes generated:', Object.keys(routes).map(r => `/${r}`).join(', '));

// Generate sitemap.xml
const sitemapUrls = [
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  ...Object.entries(routes).map(([routePath, config]) => ({
    loc: `${BASE_URL}/${routePath}`,
    priority: config.priority,
    changefreq: config.changefreq,
  })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemapXml, 'utf8');
console.log('Sitemap generated: /sitemap.xml');
