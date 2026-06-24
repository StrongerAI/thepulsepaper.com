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
  lastUpdated: "24 June 2026, 1:02 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "179,445", changePct: "+0.99%", direction: "up" },
    { name: "Brent", value: "$76.03", changePct: "-1.36%", direction: "down" },
    { name: "Dubai Platts", value: "$103.15", changePct: "Flat", direction: "flat" },
    { name: "Gold", value: "$4,099", changePct: "-0.75%", direction: "down" },
    { name: "USD/PKR", value: "277.87", changePct: "Flat", direction: "flat" },
    { name: "S&P 500", value: "7,365", changePct: "-1.44%", direction: "down" },
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
    { date: "24 Jun", value: 179445 },
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
    { date: "24 Jun", value: 76.03 },
    // -- /AUTO:brent-history --
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "178,923", current: "179,445", change: "+0.29%", direction: "up" },
      { name: "Brent crude", prev: "$80.59", current: "$76.03", change: "-5.66%", direction: "down" },
      { name: "WTI crude", prev: "$77.54", current: "$72.22", change: "-6.86%", direction: "down" },
      { name: "Dubai Platts", prev: "$110", current: "$103.15", change: "-6.2%", direction: "down" },
      { name: "Gold", prev: "$4,145", current: "$4,098", change: "-1.15%", direction: "down" },
      { name: "Silver", prev: "$66.25", current: "$61.85", change: "-6.65%", direction: "down" },
      { name: "Natural Gas", prev: "$3.20", current: "$3.20", change: "+0.19%", direction: "up" },
      { name: "USD / PKR", prev: "278.00", current: "277.87", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1480", current: "1.1356", change: "-1.08%", direction: "down" },
      { name: "S&P 500", prev: "7,501", current: "7,365", change: "-1.80%", direction: "down" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 440,500", current: "Rs 440,500", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,774", current: "Rs 6,780", change: "+0.1%", direction: "up" },
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
      { name: "KSE-100", value: "179,445", change: "+1,752 (+0.99%)", high: "", low: "", direction: "up" },
      { name: "KSE-30", value: "53,527", change: "+505 (+0.95%)", high: "", low: "", direction: "up" },
      { name: "KMI-30", value: "256,515", change: "+1,726 (+0.68%)", high: "", low: "", direction: "up" },
      { name: "All Share", value: "108,506", change: "+978 (+0.91%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "48,778", change: "+811 (+1.69%)", high: "", low: "", direction: "up" },
      { name: "OGTI (Oil & Gas)", value: "37,027", change: "+193 (+0.52%)", high: "", low: "", direction: "up" },
      { name: "ACI (Consumer)", value: "24,434", change: "+388 (+1.61%)", high: "", low: "", direction: "up" },
      { name: "JSGBKTI", value: "74,005", change: "+987 (+1.35%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "70,509", change: "+572 (+0.82%)", direction: "up" },
      { name: "PSX Div 20", value: "83,048", change: "+801 (+0.97%)", direction: "up" },
      { name: "Meezan Pak (MZNPI)", value: "31,572", change: "+211 (+0.67%)", direction: "up" },
      { name: "MII-30 (Islamic)", value: "23,409", change: "+173 (+0.75%)", direction: "up" },
      { name: "NIT Gateway", value: "47,332", change: "+477 (+1.02%)", direction: "up" },
      { name: "NBP Growth", value: "51,513", change: "+470 (+0.92%)", direction: "up" },
      { name: "JS Momentum", value: "43,128", change: "+436 (+1.02%)", direction: "up" },
    // -- /AUTO:psx-thematic --
    ],
    commentary: "All 18 indices closed green, but the leadership is telling. Consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led; banks (BKTI +0.50%) and oil and gas (OGTI +0.12%) lagged. Consumer outperforming makes sense if cheaper fuel is feeding through to margins. Banks lagging despite a tight SBP rate suggests the market is pricing the budget risk (windfall taxes, sector exposure to government securities). KSE-100 is now within 1% of an all-time high. The 175,000 level is the technical zone where the broader rally either confirms with volume or rolls over into profit-taking.",
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$76.03", unit: "/bbl", open: "77.00", high: "77.00", low: "75.85" },
      { name: "WTI Crude Oil", value: "$72.22", unit: "/bbl", open: "73.13", high: "73.18", low: "72.03" },
      { name: "Natural Gas", value: "$3.2040", unit: "/MMBtu", open: "3.2000", high: "3.2110", low: "3.1770" },
      { name: "Gold", value: "$4,099", unit: "/oz", open: "4,130", high: "4,132", low: "4,067" },
      { name: "Silver", value: "$61.85", unit: "/oz", open: "61.63", high: "62.44", low: "60.75" },
    // -- /AUTO:commodities-rows --
    ],
    commentary: "Brent at $92 is $17 below the $109 peak three weeks ago. The fear premium has bled out of crude. But Dubai Platts at $103.15 is what Pakistan actually pays, and the $11 gap to Brent means the import bill has eased less than the headline crash suggests. Gold and silver moving up while equities rally is unusual: typically they trade inversely. The signal is that institutional money is hedging the rally, not buying into it. Natural gas easing is consistent with the broader energy de-escalation. Dubai Platts is sourced manually pending a reliable free feed.",
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,667", open: "51,736", range: "51,302 – 51,873", region: "Americas" },
      { name: "Nasdaq", close: "25,587", open: "25,550", range: "25,513 – 25,883", region: "Americas" },
      { name: "S&P 500", close: "7,365", open: "7,367", range: "7,348 – 7,424", region: "Americas" },
      { name: "CAC 40", close: "8,352", open: "8,354", range: "8,335 – 8,370", region: "Europe" },
      { name: "DAX", close: "24,740", open: "24,791", range: "24,669 – 24,801", region: "Europe" },
      { name: "FTSE 100", close: "10,429", open: "10,429", range: "10,407 – 10,441", region: "Europe" },
      { name: "Stoxx 600", close: "634.31", open: "634.90", range: "633.05 – 635.35", region: "Europe" },
      { name: "Hang Seng", close: "23,459", open: "23,421", range: "23,249 – 23,566", region: "Asia" },
      { name: "KOSPI", close: "8,471", open: "8,357", range: "8,081 – 8,578", region: "Asia" },
      { name: "Nikkei 225", close: "69,175", open: "69,615", range: "68,461 – 70,219", region: "Asia" },
      { name: "Sensex", close: "77,019", open: "76,230", range: "76,122 – 77,024", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,111", open: "4,090", range: "4,075 – 4,117", region: "Asia" },
      { name: "EUR / USD", close: "1.1356", open: "1.1388", range: "1.1356 – 1.1390", region: "Currencies" },
      { name: "GBP / USD", close: "1.3188", open: "1.3203", range: "1.3181 – 1.3209", region: "Currencies" },
      { name: "USD / CNY", close: "6.8033", open: "6.7895", range: "6.7757 – 6.8052", region: "Currencies" },
      { name: "USD / PKR", close: "277.87", open: "", range: "SBP interbank", region: "Currencies", muted: true },
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
