// THE GLOSSARY — single source of truth.
// Powers both the inline <Term> tap-definitions AND the /glossary page.
// To add a term: copy a line, give it a unique key (lowercase, no spaces),
// a label (how it's shown on the glossary page), and a plain-language def.
// Then in any edition or article, wrap the word: <Term k="reer">REER</Term>

export const glossary = {
  reer: {
    label: 'REER (Real Effective Exchange Rate)',
    def: "A measure of the rupee's value against a basket of trading-partner currencies, adjusted for inflation. A rising REER means the rupee is getting more expensive in real terms — good for importers, harder for exporters.",
  },
  brent: {
    label: 'Brent Crude',
    def: 'The main global benchmark price for crude oil, based on oil from the North Sea. Most international oil is priced relative to it.',
  },
  'dubai-platts': {
    label: 'Dubai Platts',
    def: 'The crude oil price benchmark for the Middle East — the one most relevant to what Pakistan actually pays, since much of its oil comes from the Gulf.',
  },
  backwardation: {
    label: 'Backwardation',
    def: 'When the current (spot) price of a commodity is higher than its future price. It usually signals tight supply or strong immediate demand.',
  },
  osp: {
    label: 'OSP (Official Selling Price)',
    def: 'The price an oil-producing country (like Saudi Arabia) officially sets for its crude to buyers in a given region. It is added on top of the benchmark.',
  },
  cpi: {
    label: 'CPI (Consumer Price Index)',
    def: 'The standard measure of inflation — how much the prices of everyday goods and services have risen over a year.',
  },
  reserves: {
    label: 'Foreign Exchange Reserves',
    def: "The foreign currency (mostly US dollars) a central bank holds. It is the country's buffer for paying for imports and servicing external debt.",
  },
  'current-account': {
    label: 'Current Account',
    def: "A country's balance of trade in goods and services plus income flows like remittances. A deficit means more money is leaving than coming in.",
  },
  remittances: {
    label: 'Remittances',
    def: 'Money sent home by citizens working abroad. For Pakistan, a major and stable source of foreign currency.',
  },
  eff: {
    label: 'EFF (Extended Fund Facility)',
    def: 'A type of multi-year IMF lending programme for countries needing to fix deeper economic imbalances, usually tied to reform conditions.',
  },
};
