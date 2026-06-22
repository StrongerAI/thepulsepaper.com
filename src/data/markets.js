// src/data/markets.js
// Single source of truth for the Markets page.
//
// Three actors update this file:
//   1. You (editor): commentary, PSX data, Dubai Platts, latest edition callout
//   2. The cron script (scripts/pull_markets.py): everything between
//      // -- AUTO:xxx --  and  // -- /AUTO:xxx -- markers
//   3. GitHub Actions: bumps lastUpdated automatically after each pull
//
// DO NOT remove the AUTO markers. The script uses them to find the
// auto-managed blocks. Anything outside them is yours to edit by hand.

export const marketsData = {

  // -- When this data was last refreshed (auto-updated by the cron) --
  lastUpdated: "22 June 2026, 11:23 AM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "179,261", changePct: "+0.19%", direction: "up" },
    { name: "Brent", value: "$78.98", changePct: "-1.09%", direction: "down" },
    { name: "Dubai Platts", value: "$103.15", changePct: "Flat", direction: "flat" },
    { name: "Gold", value: "$4,212", changePct: "-0.28%", direction: "down" },
    { name: "USD/PKR", value: "278.08", changePct: "Flat", direction: "flat" },
    { name: "S&P 500", value: "7,501", changePct: "+1.08%", direction: "up" },
    // -- /AUTO:ticker --
  ],

  // -- Historical data points for charts (auto-updated weekly by pull_markets.py) --
  kseHistory: [
    // -- AUTO:kse-history --
    { date: "2 Jan", value: 179035 },
    { date: "9 Jan", value: 184410 },
    { date: "16 Jan", value: 185099 },
    { date: "23 Jan", value: 189167 },
    { date: "30 Jan", value: 184174 },
    { date: "6 Feb", value: 184130 },
    { date: "13 Feb", value: 179604 },
    { date: "20 Feb", value: 173170 },
    { date: "27 Feb", value: 168062 },
    { date: "6 Mar", value: 157496 },
    { date: "13 Mar", value: 153866 },
    { date: "27 Mar", value: 151708 },
    { date: "3 Apr", value: 150399 },
    { date: "10 Apr", value: 167191 },
    { date: "17 Apr", value: 173939 },
    { date: "24 Apr", value: 170672 },
    { date: "8 May", value: 171116 },
    { date: "15 May", value: 165596 },
    { date: "22 May", value: 167844 },
    { date: "29 May", value: 173963 },
    { date: "5 Jun", value: 170479 },
    { date: "12 Jun", value: 172400 },
    { date: "19 Jun", value: 178923 },
    { date: "22 Jun", value: 179261 },
    // -- /AUTO:kse-history --
  ],
  brentHistory: [
    // -- AUTO:brent-history --
    { date: "2 Jan", value: 59.96 },
    { date: "9 Jan", value: 66.52 },
    { date: "16 Jan", value: 65.24 },
    { date: "23 Jan", value: 68.4 },
    { date: "30 Jan", value: 69.46 },
    { date: "6 Feb", value: 69.4 },
    { date: "13 Feb", value: 70.35 },
    { date: "20 Feb", value: 70.85 },
    { date: "27 Feb", value: 81.4 },
    { date: "6 Mar", value: 91.98 },
    { date: "13 Mar", value: 107.38 },
    { date: "20 Mar", value: 102.22 },
    { date: "27 Mar", value: 101.16 },
    { date: "3 Apr", value: 94.75 },
    { date: "10 Apr", value: 94.93 },
    { date: "17 Apr", value: 101.91 },
    { date: "24 Apr", value: 118.03 },
    { date: "30 Apr", value: 101.27 },
    { date: "8 May", value: 105.63 },
    { date: "15 May", value: 105.02 },
    { date: "22 May", value: 94.29 },
    { date: "29 May", value: 97.81 },
    { date: "5 Jun", value: 93.1 },
    { date: "12 Jun", value: 79.55 },
    { date: "19 Jun", value: 80.59 },
    { date: "22 Jun", value: 78.98 },
    // -- /AUTO:brent-history --
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "178,923", current: "179,261", change: "+0.19%", direction: "up" },
      { name: "Brent crude", prev: "$80.59", current: "$78.98", change: "-2.00%", direction: "down" },
      { name: "WTI crude", prev: "$77.54", current: "$75.22", change: "-2.99%", direction: "down" },
      { name: "Dubai Platts", prev: "$110", current: "$103.15", change: "-6.2%", direction: "down" },
      { name: "Gold", prev: "$4,145", current: "$4,213", change: "+1.63%", direction: "up" },
      { name: "Silver", prev: "$66.25", current: "$66.58", change: "+0.49%", direction: "up" },
      { name: "Natural Gas", prev: "$3.20", current: "$3.28", change: "+2.53%", direction: "up" },
      { name: "USD / PKR", prev: "278.05", current: "278.00", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1577", current: "1.1480", change: "-0.84%", direction: "down" },
      { name: "S&P 500", prev: "7,431", current: "7,501", change: "+0.93%", direction: "up" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "–", current: "Rs 445,500", change: "–", direction: "flat" },
      { name: "Silver (tola)", prev: "–", current: "Rs 6,780", change: "–", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    commentary: "The big move this week is oil. Brent off 11.5% and Dubai Platts off 6.2% on the reported US-Iran ceasefire framework. The smaller Platts drop is the part that matters for Pakistan: the import bill eased less than the headlines suggest. Petrol cut Rs 22 in response, the third consecutive cut. Everything else moves in the second order: KSE rallied with oil, gold and silver pushed higher on safe-haven flows even as the equity rally suggests the opposite story, and the rupee held flat because SBP is intervening to keep it flat. Watch the gold-equity divergence: somebody is wrong.",
  },

  // -- PSX indices, grouped, with commentary --
  // headline, sector, thematic rows auto-managed by pull_markets.py (scraped from dps.psx.com.pk)
  psx: {
    headline: [
      // -- AUTO:psx-headline --
      { name: "KSE-100", value: "179,261", change: "+339 (+0.19%)", high: "", low: "", direction: "up" },
      { name: "KSE-30", value: "53,416", change: "+107 (+0.20%)", high: "", low: "", direction: "up" },
      { name: "KMI-30", value: "255,855", change: "+662 (+0.26%)", high: "", low: "", direction: "up" },
      { name: "All Share", value: "108,126", change: "+276 (+0.26%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "48,921", change: "+81 (+0.17%)", high: "", low: "", direction: "up" },
      { name: "OGTI (Oil & Gas)", value: "36,601", change: "+151 (+0.41%)", high: "", low: "", direction: "up" },
      { name: "ACI (Consumer)", value: "24,095", change: "+115 (+0.48%)", high: "", low: "", direction: "up" },
      { name: "JSGBKTI", value: "74,382", change: "+38 (+0.05%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "70,158", change: "+202 (+0.29%)", direction: "up" },
      { name: "PSX Div 20", value: "82,979", change: "+107 (+0.13%)", direction: "up" },
      { name: "Meezan Pak (MZNPI)", value: "31,467", change: "+91 (+0.29%)", direction: "up" },
      { name: "MII-30 (Islamic)", value: "23,324", change: "+73 (+0.31%)", direction: "up" },
      { name: "NIT Gateway", value: "47,341", change: "+106 (+0.22%)", direction: "up" },
      { name: "NBP Growth", value: "51,448", change: "+125 (+0.24%)", direction: "up" },
      { name: "JS Momentum", value: "42,525", change: "-36 (-0.08%)", direction: "down" },
    // -- /AUTO:psx-thematic --
    ],
    commentary: "All 18 indices closed green, but the leadership is telling. Consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led; banks (BKTI +0.50%) and oil and gas (OGTI +0.12%) lagged. Consumer outperforming makes sense if cheaper fuel is feeding through to margins. Banks lagging despite a tight SBP rate suggests the market is pricing the budget risk (windfall taxes, sector exposure to government securities). KSE-100 is now within 1% of an all-time high. The 175,000 level is the technical zone where the broader rally either confirms with volume or rolls over into profit-taking.",
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$78.98", unit: "/bbl", open: "82.21", high: "82.38", low: "78.71" },
      { name: "WTI Crude Oil", value: "$75.20", unit: "/bbl", open: "78.00", high: "78.14", low: "74.98" },
      { name: "Natural Gas", value: "$3.2790", unit: "/MMBtu", open: "3.2800", high: "3.3030", low: "3.1830" },
      { name: "Gold", value: "$4,212", unit: "/oz", open: "4,164", high: "4,238", low: "4,139" },
      { name: "Silver", value: "$66.58", unit: "/oz", open: "63.85", high: "67.23", low: "63.35" },
    // -- /AUTO:commodities-rows --
    ],
    commentary: "Brent at $92 is $17 below the $109 peak three weeks ago. The fear premium has bled out of crude. But Dubai Platts at $103.15 is what Pakistan actually pays, and the $11 gap to Brent means the import bill has eased less than the headline crash suggests. Gold and silver moving up while equities rally is unusual: typically they trade inversely. The signal is that institutional money is hedging the rally, not buying into it. Natural gas easing is consistent with the broader energy de-escalation. Dubai Platts is sourced manually pending a reliable free feed.",
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,565", open: "51,572", range: "51,555 – 51,949", region: "Americas" },
      { name: "Nasdaq", close: "26,518", open: "26,411", range: "26,189 – 26,560", region: "Americas" },
      { name: "S&P 500", close: "7,501", open: "7,487", range: "7,468 – 7,511", region: "Americas" },
      { name: "CAC 40", close: "8,421", open: "8,474", range: "8,419 – 8,501", region: "Europe" },
      { name: "DAX", close: "24,986", open: "25,075", range: "24,952 – 25,173", region: "Europe" },
      { name: "FTSE 100", close: "10,363", open: "10,400", range: "10,353 – 10,419", region: "Europe" },
      { name: "Stoxx 600", close: "635.61", open: "637.10", range: "635.21 – 638.49", region: "Europe" },
      { name: "Hang Seng", close: "23,764", open: "23,812", range: "23,445 – 23,827", region: "Asia" },
      { name: "KOSPI", close: "9,093", open: "8,954", range: "8,901 – 9,253", region: "Asia" },
      { name: "Nikkei 225", close: "72,442", open: "71,067", range: "71,010 – 72,832", region: "Asia" },
      { name: "Sensex", close: "77,291", open: "77,161", range: "77,008 – 77,326", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,149", open: "4,094", range: "4,070 – 4,149", region: "Asia" },
      { name: "EUR / USD", close: "1.1460", open: "1.1457", range: "1.1456 – 1.1476", region: "Currencies" },
      { name: "GBP / USD", close: "1.3210", open: "1.3234", range: "1.3183 – 1.3237", region: "Currencies" },
      { name: "USD / CNY", close: "6.7739", open: "6.7647", range: "6.7590 – 6.7788", region: "Currencies" },
      { name: "USD / PKR", close: "278.08", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    commentary: "Asia rallied with the ceasefire trade: Nikkei, Hang Seng and Sensex all firmed on softer oil. China is the exception: Shanghai is the slowest mover, consistent with the manufacturing PMI stalling at 50.0 in May. Europe is at multi-year highs across FTSE, DAX, and the broad Stoxx 600 as Bund yields stabilise. The dollar is weakening (EUR/USD at 1.1642, GBP/USD at 1.3520), which is the standard pattern when oil falls because the petrodollar bid eases. For Pakistan, the weaker dollar is a marginal positive on rupee terms, but it is dwarfed by the fact SBP is managing USD/PKR flat at 278.55.",
  },

  // -- Latest edition callout (manual, updated weekly when a new edition publishes) --
  latestEdition: {
    number: "06",
    title: "The relief arrived. The structure did not change.",
    summary: "Oil crashed on the US-Iran ceasefire framework. Petrol below Rs 300. But CPI 11.7%, SBP held at 11.50%, FBR Rs 868B short, and T-bills at 12.99% say the structure did not move.",
    url: "/editions/2026-06-22.html",
  },
};
