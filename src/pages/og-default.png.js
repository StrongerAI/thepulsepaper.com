import { renderCard } from '../lib/og.js';

export async function GET() {
  const png = await renderCard({
    kicker: '',
    title: 'Independent economic intelligence for Pakistan',
    footer: 'thepulsepaper.com · What moved, what\u2019s developing, what to do',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
