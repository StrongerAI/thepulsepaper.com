import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const editions = await getCollection('editions', ({ data }) => !data.draft);
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  const items = [
    ...editions.map((e) => ({
      title: `No. ${String(e.data.number).padStart(2, '0')} — ${e.data.title}`,
      description: e.data.summary,
      pubDate: e.data.date,
      link: `/editions/${e.slug}/`,
    })),
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
