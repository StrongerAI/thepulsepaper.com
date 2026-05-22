import { getCollection } from 'astro:content';
import { renderCard } from '../../../lib/og.js';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((entry) => ({
    params: { slug: entry.slug },
    props: { title: entry.data.title },
  }));
}

export async function GET({ props }) {
  const png = await renderCard({
    kicker: 'Free Article',
    title: props.title,
    footer: 'thepulsepaper.com · Independent economic intelligence for Pakistan',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
