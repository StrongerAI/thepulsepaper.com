import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// IMPORTANT: 'site' must match your real domain for correct canonical URLs,
// sitemap generation, and social-share meta tags. Change if the domain ever changes.
export default defineConfig({
  site: 'https://thepulsepaper.com',
  integrations: [sitemap(), mdx()],
  // Static output: every page is pre-rendered to plain HTML at build time.
  // This is what makes the site free to host on GitHub Pages and fast for SEO.
  output: 'static',
  build: {
    // Produces /editions/04-gold-fed-rupee/index.html so the URL has no .html suffix.
    format: 'directory',
  },
});
