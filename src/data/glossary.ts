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
  'core-inflation': {
    label: 'Core Inflation',
    def: 'Inflation stripped of volatile food and energy prices, used to see the underlying trend. Central banks watch it because it reflects price pressure they can actually influence with interest rates.',
  },
  'fiscal-policy': {
    label: 'Fiscal Policy',
    def: 'How the government uses taxation and spending to steer the economy. Tightening fiscal policy means raising taxes or cutting spending, usually to reduce a deficit.',
  },
  'monetary-policy': {
    label: 'Monetary Policy',
    def: 'How a central bank manages interest rates and money supply to control inflation and support growth. The SBP\'s policy rate is its main monetary-policy tool.',
  },
  'balance-of-payments': {
    label: 'Balance of Payments',
    def: 'The full record of a country\'s financial transactions with the rest of the world, combining trade, income, and capital flows. A balance-of-payments crisis is when a country can no longer pay for its external obligations.',
  },
  'fiscal-deficit': {
    label: 'Fiscal Deficit',
    def: 'The gap between total government spending and total revenue in a year, including interest payments. It must be financed by borrowing, which adds to the national debt.',
  },
  devaluation: {
    label: 'Devaluation vs Depreciation',
    def: 'Both mean a currency loses value. Devaluation is a deliberate official move to lower the rate; depreciation is the market pushing the currency down on its own. For the rupee, the distinction signals whether the SBP acted or simply stepped back.',
  },
  subsidy: {
    label: 'Subsidy',
    def: 'Government money used to keep the price of something (fuel, power, fertiliser, wheat) below its true cost. Cutting subsidies is a frequent IMF condition because they strain the budget.',
  },
  tariff: {
    label: 'Tariff',
    def: 'A tax on imported goods, or the regulated price of a utility like electricity or gas. Tariff adjustments on power and gas feed directly into business and household costs.',
  },
  'structural-reform': {
    label: 'Structural Reform',
    def: 'Deep changes to how an economy works, such as broadening the tax base or privatising loss-making state firms, rather than short-term fixes. The IMF presses for these because one-off measures do not last.',
  },
  spot: {
    label: 'Spot Price',
    def: 'The price to buy something for immediate delivery, right now, as opposed to a future date. Contrast with the futures price.',
  },
  futures: {
    label: 'Futures',
    def: 'A contract to buy or sell something at a fixed price on a set future date. Futures let buyers lock in costs ahead of time and are how commodity benchmarks like Brent are largely traded.',
  },
  contango: {
    label: 'Contango',
    def: 'When the future price of a commodity is higher than the current spot price, the opposite of backwardation. It usually signals comfortable supply or expectations of rising prices.',
  },
  hedging: {
    label: 'Hedging',
    def: 'Taking a financial position that offsets a risk you are already exposed to, such as locking in a future fuel or currency price to protect against an adverse move.',
  },
  'real-vs-nominal': {
    label: 'Real vs Nominal',
    def: 'Nominal values are the raw numbers; real values are adjusted for inflation. A nominal pay rise can still be a real pay cut if prices rose faster.',
  },
  benchmark: {
    label: 'Benchmark',
    def: 'A reference price or index that other prices are measured against, such as Brent for oil or the policy rate for lending. Benchmarks let markets price related things consistently.',
  },
  liquidity: {
    label: 'Liquidity',
    def: 'How easily an asset can be bought or sold, or converted to cash, without moving its price. For a country, it can also mean having enough ready funds to meet immediate obligations.',
  },
  volatility: {
    label: 'Volatility',
    def: 'How sharply and unpredictably a price moves over time. High volatility means bigger swings and more uncertainty for planning.',
  },
  'compound-interest': {
    label: 'Compound Interest',
    def: 'Interest earned not only on the original amount but also on the interest already accumulated. It is why debt and savings both grow faster over time than they first appear.',
  },
  'equity-vs-debt': {
    label: 'Equity vs Debt',
    def: 'Two ways to raise money: equity means selling ownership (shares); debt means borrowing and repaying with interest. Governments and firms weigh the cost and control trade-offs between them.',
  },
  'yield-curve': {
    label: 'Yield Curve',
    def: 'A line plotting bond yields across different maturities, from short-term to long-term. Its shape signals market expectations for growth and interest rates: an inverted curve often warns of recession.',
  },

  // --- Added from published editions and Economic Survey scorecard ---

  sbp: {
    label: 'SBP (State Bank of Pakistan)',
    def: "Pakistan's central bank. It sets the policy rate, manages foreign exchange reserves, oversees the banking system, and publishes key economic data. Every interest-rate decision and reserve figure in The Pulse Paper originates here.",
  },
  'kse-100': {
    label: 'KSE-100',
    def: "The benchmark index of the Pakistan Stock Exchange, tracking the 100 largest companies by market capitalisation. It is Pakistan's most-cited gauge of equity market sentiment and is reported in every edition.",
  },
  pib: {
    label: 'PIBs (Pakistan Investment Bonds)',
    def: "Long-term government debt securities issued by the State Bank on behalf of the government, typically with maturities of 3, 5, or 10 years. They are the main instrument through which the government borrows domestically at fixed rates.",
  },
  'tbills': {
    label: 'T-bills (Treasury Bills)',
    def: "Short-term government debt securities with maturities of 3, 6, or 12 months. They are how the government manages its immediate financing needs and benchmark short-term interest rates across the domestic economy.",
  },
  kibor: {
    label: 'KIBOR (Karachi Interbank Offered Rate)',
    def: "The rate at which Pakistani banks lend to each other overnight or at short tenors. It tracks the SBP policy rate closely and is used as the floating benchmark for most corporate loans and variable-rate financing in Pakistan.",
  },
  pso: {
    label: 'PSO (Pakistan State Oil)',
    def: "Pakistan's state-owned oil marketing company and the country's largest. It handles the bulk of refined petroleum imports, storage, and distribution — making its financial position a direct indicator of the health of the fuel supply chain.",
  },
  hormuz: {
    label: 'Strait of Hormuz',
    def: "A narrow waterway between Iran and Oman through which roughly 20 percent of the world's traded oil passes daily. Any closure or military threat there immediately moves global crude prices upward — and directly inflates Pakistan's import bill.",
  },
  'opec-plus': {
    label: 'OPEC+',
    def: "The expanded alliance of oil-producing countries, combining the original OPEC members with non-members including Russia and Kazakhstan. It controls a large share of global crude supply, and its production decisions are the primary driver of international oil prices.",
  },
  'war-risk-premium': {
    label: 'War Risk Premium',
    def: "The extra cost added to commodity or shipping prices because of active conflict or a credible threat of it near key supply routes. When tensions rise in or around oil-producing regions, war risk premiums push crude prices above what supply and demand alone would justify.",
  },
  hsd: {
    label: 'HSD (High Speed Diesel)',
    def: "The grade of diesel fuel most widely used in Pakistan for road transport, agriculture, and industry. Fortnightly HSD price changes set by OGRA flow directly into logistics costs, food prices, and farm input costs across the economy.",
  },
  rlng: {
    label: 'RLNG (Regasified LNG)',
    def: "Liquefied Natural Gas that has been imported by ship, stored, and converted back to gas for distribution through the pipeline network. RLNG is a major and expensive fuel input for Pakistan's power sector and industry, so its price is highly sensitive to global gas markets.",
  },
  spr: {
    label: 'SPR (Strategic Petroleum Reserve)',
    def: "A government-held stockpile of crude oil or refined fuel maintained as a buffer against supply disruptions or price spikes. Pakistan announced a framework for building its own SPR in 2026 to reduce vulnerability to Hormuz-related shocks.",
  },
  gdp: {
    label: 'GDP (Gross Domestic Product)',
    def: "The total value of all goods and services produced in a country in a year. The GDP growth rate — how fast this total expanded — is the headline measure of economic performance. Pakistan's GDP grew 3.7 percent in FY26, the fastest in four years.",
  },
  lsm: {
    label: 'LSM (Large Scale Manufacturing)',
    def: "An index published monthly by the Pakistan Bureau of Statistics tracking output from the country's major industrial sectors — textiles, cement, steel, food processing, autos, and others. LSM is a leading indicator of economic momentum and export capacity.",
  },
  'fiscal-year': {
    label: 'Fiscal Year (FY)',
    def: "Pakistan's fiscal year runs from 1 July to 30 June. FY26 means the year ending 30 June 2026; FY27 means the year ending 30 June 2027. The annual budget, presented to the National Assembly in June, sets revenue and spending plans for the year ahead.",
  },
  'kharif-rabi': {
    label: 'Kharif and Rabi',
    def: "Pakistan's two main agricultural seasons. Kharif runs roughly June to November and covers summer crops — rice, cotton, sugarcane, and maize. Rabi runs November to April and covers winter crops — wheat, gram, and mustard. Their output directly drives food prices, rural incomes, and the agricultural GDP reading.",
  },
  iea: {
    label: 'IEA (International Energy Agency)',
    def: "A Paris-based intergovernmental organisation that tracks and forecasts global energy supply, demand, and market conditions. Its monthly oil market reports are closely watched by traders and policymakers worldwide. The IEA's supply-deficit warnings are regularly cited in The Pulse Paper's oil analysis.",
  },
  'circular-debt': {
    label: 'Circular Debt',
    def: "The accumulation of unpaid bills between entities in Pakistan's power sector — power generators are owed by distribution companies, which are owed by the government. Each unpaid link blocks the next, creating a structural financial liability that constrains power supply and discourages investment. It is a recurring item in budget discussions and IMF negotiations.",
  },
};
