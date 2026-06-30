import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readdirSync } from 'fs';
import { join } from 'path';

const BASE = 'https://thepulsepaper.com';

function publicHtmlPages(subdir) {
  try {
    return readdirSync(join('./public', subdir))
      .filter(f => f.endsWith('.html'))
      .map(f => `${BASE}/${subdir}/${f}`);
  } catch { return []; }
}

// IMPORTANT: 'site' must match your real domain for correct canonical URLs,
// sitemap generation, and social-share meta tags. Change if the domain ever changes.
export default defineConfig({
  site: BASE,
  integrations: [
    sitemap({
      customPages: [
        ...publicHtmlPages('editions'),
        ...publicHtmlPages('specials'),
        ...publicHtmlPages('signals'),
      ],
    }),
    mdx(),
  ],
  // Static output: every page is pre-rendered to plain HTML at build time.
  // This is what makes the site free to host on GitHub Pages and fast for SEO.
  output: 'static',
  build: {
    // Produces /editions/04-gold-fed-rupee/index.html so the URL has no .html suffix.
    format: 'directory',
  },
});
