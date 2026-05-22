import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  // Real editions are standalone HTML in /public/editions/. Listed manually here
  // so they appear in the feed alongside articles. Add a line per new edition.
  const editions = [
    { title: 'No. 02 — The Week Ahead (17 May 2026)', description: "Pakistan's REER hits a 7.5-year high; Brent rises 8.1% to $109.26.", pubDate: new Date('2026-05-17'), link: '/editions/2026-05-17.html' },
    { title: 'No. 01 — The Week Ahead (10 May 2026)', description: 'Three concurrent disruptions: Hormuz week 11, a fourth fuel hike, SBP at 11.5%.', pubDate: new Date('2026-05-10'), link: '/editions/2026-05-10.html' },
  ];

  const items = [
    ...editions,
    ...articles.map((a) => ({
      title: a.data.title,
      description: a.data.summary,
      pubDate: a.data.date,
      link: `/articles/${a.slug}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'The Pulse Paper',
    description: "Independent analysis of Pakistan's economy, markets, and supply chains.",
    site: context.site,
    items,
  });
}
