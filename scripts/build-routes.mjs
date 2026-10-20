import { mkdir, readFile, writeFile } from 'node:fs/promises';

// GitHub Pages has no SPA fallback. Emit real entry documents for direct visits
// and refreshes; each reuses Vite's existing bundled JS, CSS, and root assets.
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const routes = {
  events: 'Competitions',
  'fun-events': 'Fun Events',
  workshops: 'Workshops',
};
for (const [path, title] of Object.entries(routes)) {
  const directory = new URL(`../dist/${path}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html.replace(/<title>.*?<\/title>/, `<title>${title} — HACKFEST 2026</title>`));
}
console.log('Static routes generated: /events, /fun-events, /workshops');
