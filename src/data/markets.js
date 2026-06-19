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
  lastUpdated: "19 June 2026, 10:46 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "173,963", changePct: "+1.34%", direction: "up" },
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
      { name: "EUR / USD", prev: "1.1577", current: "1.1478", change: "-0.85%", direction: "down" },
      { name: "S&P 500", prev: "7,431", current: "7,501", change: "+0.93%", direction: "up" },
      { name: "Petrol (MS)", prev: "Rs 403.78", current: "Rs 381.78", change: "-Rs 22", direction: "down" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    commentary: "The big move this week is oil. Brent off 11.5% and Dubai Platts off 6.2% on the reported US-Iran ceasefire framework. The smaller Platts drop is the part that matters for Pakistan: the import bill eased less than the headlines suggest. Petrol cut Rs 22 in response, the third consecutive cut. Everything else moves in the second order: KSE rallied with oil, gold and silver pushed higher on safe-haven flows even as the equity rally suggests the opposite story, and the rupee held flat because SBP is intervening to keep it flat. Watch the gold-equity divergence: somebody is wrong.",
  },

  // -- PSX indices, grouped, with commentary --
  // (PSX data is manual until Commit 4 brings the scraper online.)
  psx: {
    headline: [
      { name: "KSE-100",    value: "173,963",  change: "+2,305 (1.34%)", high: "174,088", low: "171,545", direction: "up" },
      { name: "KSE-30",     value: "52,237",   change: "+720 (1.40%)",   high: "52,255",  low: "51,439",  direction: "up" },
      { name: "KMI-30",     value: "250,242",  change: "+3,676 (1.49%)", high: "250,295", low: "246,334", direction: "up" },
      { name: "All Share",  value: "104,308",  change: "+1,094 (1.06%)", high: "104,373", low: "103,047", direction: "up" },
    ],
    sector: [
      { name: "BKTI (Banks)",     value: "47,534",  change: "+235 (0.50%)",  high: "47,581", low: "46,973", direction: "up" },
      { name: "OGTI (Oil & Gas)", value: "36,384",  change: "+42 (0.12%)",   high: "36,554", low: "36,100", direction: "up" },
      { name: "ACI (Consumer)",   value: "22,835",  change: "+438 (1.96%)",  high: "22,879", low: "22,503", direction: "up" },
      { name: "JSGBKTI",          value: "72,793",  change: "+359 (0.50%)",  high: "72,848", low: "72,006", direction: "up" },
    ],
    thematic: [
      { name: "KMI All Share",     value: "67,845",  change: "+803 (1.20%)",  direction: "up" },
      { name: "PSX Div 20",        value: "79,714",  change: "+794 (1.01%)",  direction: "up" },
      { name: "Meezan Pak (MZNPI)",value: "30,801",  change: "+525 (1.73%)",  direction: "up" },
      { name: "MII-30 (Islamic)",  value: "22,711",  change: "+405 (1.81%)",  direction: "up" },
      { name: "NIT Gateway",       value: "46,406",  change: "+588 (1.28%)",  direction: "up" },
      { name: "NBP Growth",        value: "50,491",  change: "+568 (1.14%)",  direction: "up" },
      { name: "JS Momentum",       value: "41,584",  change: "+221 (0.54%)",  direction: "up" },
      { name: "HBLTT Index",       value: "18,439",  change: "+26 (0.14%)",   direction: "up" },
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
      { name: "KOSPI", close: "8,864", open: "8,622", range: "8,606 – 8,872", region: "Asia" },
      { name: "Nikkei 225", close: "69,902", open: "69,006", range: "68,986 – 70,126", region: "Asia" },
      { name: "Sensex", close: "76,803", open: "76,853", range: "76,470 – 76,902", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,108", open: "4,074", range: "4,074 – 4,110", region: "Asia" },
      { name: "EUR / USD", close: "1.1478", open: "1.1465", range: "1.1422 – 1.1478", region: "Currencies" },
      { name: "GBP / USD", close: "1.3238", open: "1.3206", range: "1.3164 – 1.3240", region: "Currencies" },
      { name: "USD / CNY", close: "6.7681", open: "6.7681", range: "6.7675 – 6.7681", region: "Currencies" },
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
