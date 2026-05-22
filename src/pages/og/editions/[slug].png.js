import { editionsList } from '../../../data/editions.js';
import { renderCard } from '../../../lib/og.js';

export async function getStaticPaths() {
  return editionsList.map((e) => ({
    params: { slug: e.slug },
    props: { no: e.no, title: e.title },
  }));
}

export async function GET({ props }) {
  const png = await renderCard({
    kicker: `Edition No. ${props.no}`,
    title: props.title,
    footer: 'thepulsepaper.com · The weekly brief',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
