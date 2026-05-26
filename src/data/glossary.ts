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
  wti: {
    label: 'WTI (West Texas Intermediate)',
    def: 'The main US crude oil benchmark. It typically trades a few dollars below Brent and signals US market conditions, while Brent and Dubai matter more for what Pakistan pays.',
  },
  spi: {
    label: 'SPI (Sensitive Price Indicator)',
    def: 'A weekly Pakistani inflation gauge tracking the prices of essential items like food, fuel and utilities. It moves faster than CPI and shows what households feel first.',
  },
  'primary-surplus': {
    label: 'Primary Surplus',
    def: 'The government budget balance excluding interest payments on existing debt. A primary surplus means the state takes in more than it spends before debt servicing. It is the IMF\'s binding fiscal target for Pakistan under the current programme.',
  },
  'primary-deficit': {
    label: 'Primary Deficit',
    def: 'The opposite of a primary surplus: the government spends more than it collects, even before counting interest on debt. It signals the underlying budget is not self-sustaining.',
  },
  fbr: {
    label: 'FBR (Federal Board of Revenue)',
    def: 'Pakistan\'s tax-collection authority. Its annual revenue target is one of the most-watched numbers in the budget, and a recurring source of IMF tension when collection falls short.',
  },
  'policy-rate': {
    label: 'SBP Policy Rate',
    def: 'The benchmark interest rate set by the State Bank of Pakistan. Raising it makes borrowing costlier to cool inflation; cutting it supports growth. It anchors lending rates across the economy.',
  },
  'basis-points': {
    label: 'Basis Points (bps)',
    def: 'A unit for measuring interest-rate changes. One basis point is 0.01 percent, so a 100bps move means a one-percentage-point change (for example, a rate rising from 10.5 to 11.5 percent).',
  },
  'panda-bond': {
    label: 'Panda Bond',
    def: 'A bond issued inside China\'s domestic market and denominated in Chinese yuan. For Pakistan, a debut Panda bond is a way to raise capital outside the expensive US-dollar market.',
  },
  'sovereign-bond': {
    label: 'Sovereign Bond',
    def: 'Debt issued by a national government to borrow money from investors. The interest rate it must offer reflects how risky lenders consider that country.',
  },
  yield: {
    label: 'Bond Yield',
    def: 'The effective return an investor earns on a bond. Yields rise when bond prices fall, so rising yields signal that borrowing is getting more expensive for the issuer.',
  },
  'petroleum-levy': {
    label: 'Petroleum Levy',
    def: 'A per-litre charge the government adds to fuel prices. It is a major revenue source, which is why pump prices can stay high even when global crude falls: the levy reclaims part of the relief.',
  },
  ogra: {
    label: 'OGRA (Oil and Gas Regulatory Authority)',
    def: 'Pakistan\'s regulator for the oil and gas sector. It recommends the fuel price adjustments the government implements, usually on a fortnightly basis.',
  },
  bisp: {
    label: 'BISP (Benazir Income Support Programme)',
    def: 'Pakistan\'s main social safety-net programme, providing cash transfers to low-income families. It is often expanded to cushion the poorest households against fiscal tightening.',
  },
  'sales-tax-mrp': {
    label: 'Sales Tax at MRP',
    def: 'Charging sales tax on a product\'s printed maximum retail price rather than its lower ex-factory value. It raises the effective tax on consumer goods and squeezes manufacturer margins.',
  },
  pmi: {
    label: 'PMI (Purchasing Managers\' Index)',
    def: 'A survey-based gauge of business activity in manufacturing or services. A reading above 50 signals expansion; below 50 signals contraction.',
  },
  'import-cover': {
    label: 'Import Cover',
    def: 'How many months of imports a country\'s foreign reserves can pay for. A common measure of external resilience: below three months is considered a danger zone.',
  },
  'imf-tranche': {
    label: 'IMF Tranche',
    def: 'A scheduled instalment of an IMF loan, released only after the country meets agreed conditions. Each disbursement also helps unlock other external financing.',
  },
};
