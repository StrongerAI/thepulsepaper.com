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
  lastUpdated: "23 June 2026, 12:32 AM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "178,472", changePct: "-0.25%", direction: "down" },
    { name: "Brent", value: "$78.20", changePct: "-2.07%", direction: "down" },
    { name: "Dubai Platts", value: "$103.15", changePct: "Flat", direction: "flat" },
    { name: "Gold", value: "$4,206", changePct: "-0.42%", direction: "down" },
    { name: "USD/PKR", value: "277.93", changePct: "Flat", direction: "flat" },
    { name: "S&P 500", value: "7,468", changePct: "-0.43%", direction: "down" },
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
    { date: "23 Jun", value: 178472 },
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
    { date: "23 Jun", value: 78.2 },
    // -- /AUTO:brent-history --
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "178,923", current: "178,472", change: "-0.25%", direction: "down" },
      { name: "Brent crude", prev: "$80.59", current: "$78.20", change: "-2.97%", direction: "down" },
      { name: "WTI crude", prev: "$77.54", current: "$74.21", change: "-4.29%", direction: "down" },
      { name: "Dubai Platts", prev: "$110", current: "$103.15", change: "-6.2%", direction: "down" },
      { name: "Gold", prev: "$4,145", current: "$4,206", change: "+1.47%", direction: "up" },
      { name: "Silver", prev: "$66.25", current: "$65.41", change: "-1.28%", direction: "down" },
      { name: "Natural Gas", prev: "$3.20", current: "$3.28", change: "+2.50%", direction: "up" },
      { name: "USD / PKR", prev: "278.05", current: "278.00", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1577", current: "1.1480", change: "-0.84%", direction: "down" },
      { name: "S&P 500", prev: "7,501", current: "7,468", change: "-0.44%", direction: "down" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 448,000", current: "Rs 448,000", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,774", current: "Rs 6,774", change: "Flat", direction: "flat" },
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
      { name: "KSE-100", value: "178,472", change: "-451 (-0.25%)", high: "", low: "", direction: "down" },
      { name: "KSE-30", value: "53,200", change: "-109 (-0.20%)", high: "", low: "", direction: "down" },
      { name: "KMI-30", value: "254,997", change: "-196 (-0.08%)", high: "", low: "", direction: "down" },
      { name: "All Share", value: "107,750", change: "-100 (-0.09%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "48,559", change: "-281 (-0.58%)", high: "", low: "", direction: "down" },
      { name: "OGTI (Oil & Gas)", value: "36,616", change: "+166 (+0.45%)", high: "", low: "", direction: "up" },
      { name: "ACI (Consumer)", value: "24,031", change: "+51 (+0.21%)", high: "", low: "", direction: "up" },
      { name: "JSGBKTI", value: "73,863", change: "-482 (-0.65%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "69,954", change: "-2 (-0.00%)", direction: "down" },
      { name: "PSX Div 20", value: "82,614", change: "-258 (-0.31%)", direction: "down" },
      { name: "Meezan Pak (MZNPI)", value: "31,356", change: "-19 (-0.06%)", direction: "down" },
      { name: "MII-30 (Islamic)", value: "23,248", change: "-4 (-0.02%)", direction: "down" },
      { name: "NIT Gateway", value: "47,104", change: "-131 (-0.28%)", direction: "down" },
      { name: "NBP Growth", value: "51,240", change: "-83 (-0.16%)", direction: "down" },
      { name: "JS Momentum", value: "42,545", change: "-16 (-0.04%)", direction: "down" },
    // -- /AUTO:psx-thematic --
    ],
    commentary: "All 18 indices closed green, but the leadership is telling. Consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led; banks (BKTI +0.50%) and oil and gas (OGTI +0.12%) lagged. Consumer outperforming makes sense if cheaper fuel is feeding through to margins. Banks lagging despite a tight SBP rate suggests the market is pricing the budget risk (windfall taxes, sector exposure to government securities). KSE-100 is now within 1% of an all-time high. The 175,000 level is the technical zone where the broader rally either confirms with volume or rolls over into profit-taking.",
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$78.20", unit: "/bbl", open: "82.21", high: "82.38", low: "77.27" },
      { name: "WTI Crude Oil", value: "$74.21", unit: "/bbl", open: "78.00", high: "78.14", low: "73.24" },
      { name: "Natural Gas", value: "$3.2780", unit: "/MMBtu", open: "3.2800", high: "3.3350", low: "3.1830" },
      { name: "Gold", value: "$4,206", unit: "/oz", open: "4,164", high: "4,238", low: "4,139" },
      { name: "Silver", value: "$65.41", unit: "/oz", open: "63.85", high: "67.23", low: "63.35" },
    // -- /AUTO:commodities-rows --
    ],
    commentary: "Brent at $92 is $17 below the $109 peak three weeks ago. The fear premium has bled out of crude. But Dubai Platts at $103.15 is what Pakistan actually pays, and the $11 gap to Brent means the import bill has eased less than the headline crash suggests. Gold and silver moving up while equities rally is unusual: typically they trade inversely. The signal is that institutional money is hedging the rally, not buying into it. Natural gas easing is consistent with the broader energy de-escalation. Dubai Platts is sourced manually pending a reliable free feed.",
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,631", open: "51,555", range: "51,555 – 51,888", region: "Americas" },
      { name: "Nasdaq", close: "26,172", open: "26,483", range: "26,151 – 26,561", region: "Americas" },
      { name: "S&P 500", close: "7,468", open: "7,500", range: "7,461 – 7,530", region: "Americas" },
      { name: "CAC 40", close: "8,400", open: "8,434", range: "8,353 – 8,436", region: "Europe" },
      { name: "DAX", close: "25,140", open: "25,036", range: "24,896 – 25,176", region: "Europe" },
      { name: "FTSE 100", close: "10,438", open: "10,364", range: "10,347 – 10,443", region: "Europe" },
      { name: "Stoxx 600", close: "639.27", open: "635.85", range: "634.03 – 639.94", region: "Europe" },
      { name: "Hang Seng", close: "23,925", open: "24,145", range: "23,750 – 24,163", region: "Asia" },
      { name: "KOSPI", close: "9,052", open: "9,289", range: "8,832 – 9,386", region: "Asia" },
      { name: "Nikkei 225", close: "71,250", open: "71,551", range: "70,518 – 71,953", region: "Asia" },
      { name: "Sensex", close: "76,803", open: "76,853", range: "76,470 – 76,902", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,090", open: "4,094", range: "4,080 – 4,117", region: "Asia" },
      { name: "EUR / USD", close: "1.1423", open: "1.1457", range: "1.1423 – 1.1476", region: "Currencies" },
      { name: "GBP / USD", close: "1.3244", open: "1.3234", range: "1.3183 – 1.3273", region: "Currencies" },
      { name: "USD / CNY", close: "6.7671", open: "6.7647", range: "6.7590 – 6.7788", region: "Currencies" },
      { name: "USD / PKR", close: "277.93", open: "", range: "SBP interbank", region: "Currencies", muted: true },
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
