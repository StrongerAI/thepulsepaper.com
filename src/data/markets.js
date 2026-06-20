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
  lastUpdated: "20 June 2026, 12:54 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "178,923", changePct: "-1.36%", direction: "down" },
    { name: "Brent", value: "$80.59", changePct: "+0.93%", direction: "up" },
    { name: "Dubai Platts", value: "$103.15", changePct: "Flat", direction: "flat" },
    { name: "Gold", value: "$4,173", changePct: "-1.21%", direction: "down" },
    { name: "USD/PKR", value: "277.98", changePct: "Flat", direction: "flat" },
    { name: "S&P 500", value: "7,420", changePct: "-1.21%", direction: "down" },
    // -- /AUTO:ticker --
  ],

  // -- Historical data points for charts (append one entry per week, manually) --
  kseHistory: [
    { date: "10 May", value: 166298 },
    { date: "17 May", value: 168514 },
    { date: "24 May", value: 171725 },
    { date: "31 May", value: 173963 },
  ],
  brentHistory: [
    { date: "10 May", value: 101.00 },
    { date: "17 May", value: 109.26 },
    { date: "24 May", value: 104.00 },
    { date: "31 May", value: 92.05  },
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "171,725", current: "173,963", change: "+1.3%", direction: "up" },
      { name: "Brent crude", prev: "$87.33", current: "$80.59", change: "-7.72%", direction: "down" },
      { name: "WTI crude", prev: "$84.88", current: "$76.54", change: "-9.83%", direction: "down" },
      { name: "Dubai Platts", prev: "$110", current: "$103.15", change: "-6.2%", direction: "down" },
      { name: "Gold", prev: "$4,215", current: "$4,173", change: "-1.00%", direction: "down" },
      { name: "Silver", prev: "$67.86", current: "$64.91", change: "-4.35%", direction: "down" },
      { name: "Natural Gas", prev: "$3.12", current: "$3.20", change: "+2.50%", direction: "up" },
      { name: "USD / PKR", prev: "278.05", current: "277.98", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1577", current: "1.1469", change: "-0.93%", direction: "down" },
      { name: "S&P 500", prev: "7,431", current: "7,501", change: "+0.93%", direction: "up" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
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
      { name: "KSE-100", value: "178,923", change: "-2,475 (-1.36%)", high: "", low: "", direction: "down" },
      { name: "KSE-30", value: "53,309", change: "-790 (-1.46%)", high: "", low: "", direction: "down" },
      { name: "KMI-30", value: "255,193", change: "-3,790 (-1.46%)", high: "", low: "", direction: "down" },
      { name: "All Share", value: "107,850", change: "-1,357 (-1.24%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "48,840", change: "-594 (-1.20%)", high: "", low: "", direction: "down" },
      { name: "OGTI (Oil & Gas)", value: "36,450", change: "-694 (-1.87%)", high: "", low: "", direction: "down" },
      { name: "ACI (Consumer)", value: "23,980", change: "-329 (-1.35%)", high: "", low: "", direction: "down" },
      { name: "JSGBKTI", value: "74,345", change: "-906 (-1.20%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "69,956", change: "-930 (-1.31%)", direction: "down" },
      { name: "PSX Div 20", value: "82,872", change: "-858 (-1.02%)", direction: "down" },
      { name: "Meezan Pak (MZNPI)", value: "31,375", change: "-454 (-1.43%)", direction: "down" },
      { name: "MII-30 (Islamic)", value: "23,251", change: "-362 (-1.53%)", direction: "down" },
      { name: "NIT Gateway", value: "47,235", change: "-704 (-1.47%)", direction: "down" },
      { name: "NBP Growth", value: "51,323", change: "-805 (-1.54%)", direction: "down" },
      { name: "JS Momentum", value: "42,561", change: "-864 (-1.99%)", direction: "down" },
    // -- /AUTO:psx-thematic --
    ],
    commentary: "All 18 indices closed green, but the leadership is telling. Consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led; banks (BKTI +0.50%) and oil and gas (OGTI +0.12%) lagged. Consumer outperforming makes sense if cheaper fuel is feeding through to margins. Banks lagging despite a tight SBP rate suggests the market is pricing the budget risk (windfall taxes, sector exposure to government securities). KSE-100 is now within 1% of an all-time high. The 175,000 level is the technical zone where the broader rally either confirms with volume or rolls over into profit-taking.",
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$80.59", unit: "/bbl", open: "79.34", high: "80.82", low: "78.80" },
      { name: "WTI Crude Oil", value: "$76.54", unit: "/bbl", open: "75.40", high: "76.78", low: "74.98" },
      { name: "Natural Gas", value: "$3.1980", unit: "/MMBtu", open: "3.2160", high: "3.2530", low: "3.1830" },
      { name: "Gold", value: "$4,173", unit: "/oz", open: "4,231", high: "4,231", low: "4,139" },
      { name: "Silver", value: "$64.91", unit: "/oz", open: "65.79", high: "65.94", low: "63.35" },
    // -- /AUTO:commodities-rows --
    ],
    commentary: "Brent at $92 is $17 below the $109 peak three weeks ago. The fear premium has bled out of crude. But Dubai Platts at $103.15 is what Pakistan actually pays, and the $11 gap to Brent means the import bill has eased less than the headline crash suggests. Gold and silver moving up while equities rally is unusual: typically they trade inversely. The signal is that institutional money is hedging the rally, not buying into it. Natural gas easing is consistent with the broader energy de-escalation. Dubai Platts is sourced manually pending a reliable free feed.",
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,493", open: "51,938", range: "51,393 – 52,281", region: "Americas" },
      { name: "Nasdaq", close: "26,022", open: "26,494", range: "25,960 – 26,512", region: "Americas" },
      { name: "S&P 500", close: "7,420", open: "7,524", range: "7,403 – 7,532", region: "Americas" },
      { name: "CAC 40", close: "8,421", open: "8,474", range: "8,419 – 8,501", region: "Europe" },
      { name: "DAX", close: "24,986", open: "25,075", range: "24,952 – 25,173", region: "Europe" },
      { name: "FTSE 100", close: "10,363", open: "10,400", range: "10,353 – 10,419", region: "Europe" },
      { name: "Stoxx 600", close: "635.61", open: "637.10", range: "635.21 – 638.49", region: "Europe" },
      { name: "Hang Seng", close: "24,312", open: "24,496", range: "24,254 – 24,560", region: "Asia" },
      { name: "KOSPI", close: "9,052", open: "9,289", range: "8,832 – 9,386", region: "Asia" },
      { name: "Nikkei 225", close: "71,250", open: "71,551", range: "70,518 – 71,953", region: "Asia" },
      { name: "Sensex", close: "76,803", open: "76,853", range: "76,470 – 76,902", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,108", open: "4,074", range: "4,074 – 4,110", region: "Asia" },
      { name: "EUR / USD", close: "1.1469", open: "1.1465", range: "1.1422 – 1.1485", region: "Currencies" },
      { name: "GBP / USD", close: "1.3237", open: "1.3237", range: "1.3237 – 1.3237", region: "Currencies" },
      { name: "USD / CNY", close: "6.7681", open: "6.7681", range: "6.7675 – 6.7686", region: "Currencies" },
      { name: "USD / PKR", close: "277.98", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    commentary: "Asia rallied with the ceasefire trade: Nikkei, Hang Seng and Sensex all firmed on softer oil. China is the exception: Shanghai is the slowest mover, consistent with the manufacturing PMI stalling at 50.0 in May. Europe is at multi-year highs across FTSE, DAX, and the broad Stoxx 600 as Bund yields stabilise. The dollar is weakening (EUR/USD at 1.1642, GBP/USD at 1.3520), which is the standard pattern when oil falls because the petrodollar bid eases. For Pakistan, the weaker dollar is a marginal positive on rupee terms, but it is dwarfed by the fact SBP is managing USD/PKR flat at 278.55.",
  },

  // -- Latest edition callout (manual, updated weekly when a new edition publishes) --
  latestEdition: {
    number: "04",
    title: "The ceasefire trade, priced in, not signed",
    summary: "Full analysis across all ten sections: the oil crash, the FY27 budget with FBR Rs 864B miss, El Ni\u00f1o agricultural risk, and three global divergences to watch.",
    url: "/editions/2026-05-31.html",
  },
};
