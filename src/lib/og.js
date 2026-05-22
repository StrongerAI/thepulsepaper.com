import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const fontDir = path.join(process.cwd(), 'src/assets/fonts');
const serif = fs.readFileSync(path.join(fontDir, 'LibreBaskerville-Regular.ttf'));
const serifBold = fs.readFileSync(path.join(fontDir, 'LibreBaskerville-Bold.ttf'));
const sans = fs.readFileSync(path.join(fontDir, 'Inter-Regular.ttf'));
const sansSemi = fs.readFileSync(path.join(fontDir, 'Inter-SemiBold.ttf'));

// Brand colours (newsprint).
const PAPER = '#f5f1eb';
const INK = '#1a1a1a';
const ACCENT = '#c0392b';
const GOLD = '#C9A96E';
const MUTED = '#6b6560';

// Build the card layout as a plain JS object tree (satori's JSX-free form).
function card({ kicker, title, footer }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px', height: '630px', display: 'flex', flexDirection: 'column',
        backgroundColor: PAPER, padding: '70px 80px', justifyContent: 'space-between',
        fontFamily: 'Inter',
      },
      children: [
        // top: wordmark
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
            children: [
              { type: 'div', props: { style: { fontFamily: 'Libre Baskerville', fontSize: '34px', color: INK }, children: 'The Pulse Paper' } },
              { type: 'div', props: { style: { fontSize: '18px', letterSpacing: '3px', color: GOLD, textTransform: 'uppercase', fontWeight: 600 }, children: 'Economic Intelligence' } },
            ],
          },
        },
        // middle: kicker + headline
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column' },
            children: [
              { type: 'div', props: { style: { width: '70px', height: '5px', backgroundColor: ACCENT, marginBottom: '28px' } } },
              kicker ? { type: 'div', props: { style: { fontSize: '22px', letterSpacing: '2px', color: ACCENT, textTransform: 'uppercase', fontWeight: 600, marginBottom: '18px' }, children: kicker } } : { type: 'div', props: { children: '' } },
              { type: 'div', props: { style: { fontFamily: 'Libre Baskerville', fontWeight: 700, fontSize: title.length > 70 ? '52px' : '64px', color: INK, lineHeight: 1.12, letterSpacing: '-1px' }, children: title } },
            ],
          },
        },
        // bottom: footer line
        {
          type: 'div',
          props: {
            style: { fontSize: '24px', color: MUTED, borderTop: `1px solid #d5cec6`, paddingTop: '24px' },
            children: footer || 'thepulsepaper.com',
          },
        },
      ],
    },
  };
}

export async function renderCard({ kicker, title, footer }) {
  const svg = await satori(card({ kicker, title, footer }), {
    width: 1200, height: 630,
    fonts: [
      { name: 'Libre Baskerville', data: serif, weight: 400, style: 'normal' },
      { name: 'Libre Baskerville', data: serifBold, weight: 700, style: 'normal' },
      { name: 'Inter', data: sans, weight: 400, style: 'normal' },
      { name: 'Inter', data: sansSemi, weight: 600, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return png;
}
