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
  lastUpdated: "23 June 2026, 3:47 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "177,693", changePct: "-0.44%", direction: "down" },
    { name: "Brent", value: "$77.90", changePct: "Flat", direction: "flat" },
    { name: "Dubai Platts", value: "$103.15", changePct: "Flat", direction: "flat" },
    { name: "Gold", value: "$4,145", changePct: "-0.88%", direction: "down" },
    { name: "USD/PKR", value: "278.02", changePct: "Flat", direction: "flat" },
    { name: "S&P 500", value: "7,473", changePct: "-0.37%", direction: "down" },
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
    { date: "23 Jun", value: 177693 },
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
    { date: "23 Jun", value: 77.9 },
    // -- /AUTO:brent-history --
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "178,923", current: "177,693", change: "-0.69%", direction: "down" },
      { name: "Brent crude", prev: "$80.59", current: "$77.90", change: "-3.34%", direction: "down" },
      { name: "WTI crude", prev: "$77.54", current: "$73.88", change: "-4.72%", direction: "down" },
      { name: "Dubai Platts", prev: "$110", current: "$103.15", change: "-6.2%", direction: "down" },
      { name: "Gold", prev: "$4,145", current: "$4,145", change: "Flat", direction: "flat" },
      { name: "Silver", prev: "$66.25", current: "$62.40", change: "-5.82%", direction: "down" },
      { name: "Natural Gas", prev: "$3.20", current: "$3.26", change: "+1.84%", direction: "up" },
      { name: "USD / PKR", prev: "278.00", current: "278.02", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1480", current: "1.1406", change: "-0.64%", direction: "down" },
      { name: "S&P 500", prev: "7,501", current: "7,473", change: "-0.37%", direction: "down" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 448,000", current: "Rs 442,000", change: "-1.3%", direction: "down" },
      { name: "Silver (tola)", prev: "Rs 6,780", current: "Rs 6,774", change: "-0.1%", direction: "down" },
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
      { name: "KSE-100", value: "177,693", change: "-779 (-0.44%)", high: "", low: "", direction: "down" },
      { name: "KSE-30", value: "53,023", change: "-177 (-0.33%)", high: "", low: "", direction: "down" },
      { name: "KMI-30", value: "254,789", change: "-208 (-0.08%)", high: "", low: "", direction: "down" },
      { name: "All Share", value: "107,527", change: "-223 (-0.21%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "47,967", change: "-592 (-1.22%)", high: "", low: "", direction: "down" },
      { name: "OGTI (Oil & Gas)", value: "36,834", change: "+218 (+0.60%)", high: "", low: "", direction: "up" },
      { name: "ACI (Consumer)", value: "24,046", change: "+16 (+0.07%)", high: "", low: "", direction: "up" },
      { name: "JSGBKTI", value: "73,017", change: "-845 (-1.14%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "69,937", change: "-16 (-0.02%)", direction: "down" },
      { name: "PSX Div 20", value: "82,248", change: "-366 (-0.44%)", direction: "down" },
      { name: "Meezan Pak (MZNPI)", value: "31,360", change: "+4 (+0.01%)", direction: "up" },
      { name: "MII-30 (Islamic)", value: "23,236", change: "-12 (-0.05%)", direction: "down" },
      { name: "NIT Gateway", value: "46,854", change: "-250 (-0.53%)", direction: "down" },
      { name: "NBP Growth", value: "51,044", change: "-196 (-0.38%)", direction: "down" },
      { name: "JS Momentum", value: "42,693", change: "+148 (+0.35%)", direction: "up" },
    // -- /AUTO:psx-thematic --
    ],
    commentary: "All 18 indices closed green, but the leadership is telling. Consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led; banks (BKTI +0.50%) and oil and gas (OGTI +0.12%) lagged. Consumer outperforming makes sense if cheaper fuel is feeding through to margins. Banks lagging despite a tight SBP rate suggests the market is pricing the budget risk (windfall taxes, sector exposure to government securities). KSE-100 is now within 1% of an all-time high. The 175,000 level is the technical zone where the broader rally either confirms with volume or rolls over into profit-taking.",
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$77.90", unit: "/bbl", open: "78.06", high: "78.34", low: "76.44" },
      { name: "WTI Crude Oil", value: "$73.88", unit: "/bbl", open: "74.14", high: "74.45", low: "72.48" },
      { name: "Natural Gas", value: "$3.2570", unit: "/MMBtu", open: "3.2650", high: "3.3100", low: "3.2460" },
      { name: "Gold", value: "$4,145", unit: "/oz", open: "4,211", high: "4,216", low: "4,108" },
      { name: "Silver", value: "$62.40", unit: "/oz", open: "65.21", high: "65.32", low: "61.85" },
    // -- /AUTO:commodities-rows --
    ],
    commentary: "Brent at $92 is $17 below the $109 peak three weeks ago. The fear premium has bled out of crude. But Dubai Platts at $103.15 is what Pakistan actually pays, and the $11 gap to Brent means the import bill has eased less than the headline crash suggests. Gold and silver moving up while equities rally is unusual: typically they trade inversely. The signal is that institutional money is hedging the rally, not buying into it. Natural gas easing is consistent with the broader energy de-escalation. Dubai Platts is sourced manually pending a reliable free feed.",
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,713", open: "51,555", range: "51,555 – 51,888", region: "Americas" },
      { name: "Nasdaq", close: "26,167", open: "26,483", range: "26,125 – 26,561", region: "Americas" },
      { name: "S&P 500", close: "7,473", open: "7,500", range: "7,460 – 7,530", region: "Americas" },
      { name: "CAC 40", close: "8,345", open: "8,332", range: "8,305 – 8,358", region: "Europe" },
      { name: "DAX", close: "24,871", open: "24,836", range: "24,729 – 24,914", region: "Europe" },
      { name: "FTSE 100", close: "10,405", open: "10,438", range: "10,332 – 10,443", region: "Europe" },
      { name: "Stoxx 600", close: "633.84", open: "636.36", range: "630.81 – 636.36", region: "Europe" },
      { name: "Hang Seng", close: "23,336", open: "23,800", range: "23,252 – 23,826", region: "Asia" },
      { name: "KOSPI", close: "8,204", open: "9,084", range: "8,204 – 9,175", region: "Asia" },
      { name: "Nikkei 225", close: "69,788", open: "72,404", range: "69,788 – 72,618", region: "Asia" },
      { name: "Sensex", close: "76,201", open: "77,086", range: "76,083 – 77,195", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,106", open: "4,154", range: "4,086 – 4,175", region: "Asia" },
      { name: "EUR / USD", close: "1.1406", open: "1.1431", range: "1.1406 – 1.1442", region: "Currencies" },
      { name: "GBP / USD", close: "1.3218", open: "1.3255", range: "1.3213 – 1.3255", region: "Currencies" },
      { name: "USD / CNY", close: "6.7834", open: "6.7671", range: "6.7616 – 6.7867", region: "Currencies" },
      { name: "USD / PKR", close: "278.02", open: "", range: "SBP interbank", region: "Currencies", muted: true },
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
