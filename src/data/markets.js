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
  lastUpdated: "24 June 2026, 6:24 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "179,571", changePct: "+1.06%", direction: "up", spark: [171725.29, 173962.81, 170600.2, 171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26] },
    { name: "Brent", value: "$74.07", changePct: "-3.91%", direction: "down", spark: [77.78, 77.74, 77.85, 78.05, 77.71, 77.72, 78.51, 78.61, 78.44, 77.08, 77.08, 77.68, 78.12, 78.31, 79.47, 79.61, 79.44, 79.24, 79.11, 79.05, 79.54, 79.52, 79.17, 80.59, 81.6, 80.8, 79.48, 79.07, 79.4, 79.13, 79.01, 79.1, 79.56, 79.14, 79.31, 79.25, 78.96, 78.56, 77.87, 78.06, 77.47, 77.74, 77.41, 78.04, 78.27, 80.59, 78.25, 78.17, 78.16, 77.87, 77.87, 77.53, 77.54, 76.95, 76.84, 77.03, 77.41, 77.53, 77.9, 77.76, 77.2, 76.67, 76.81, 76.9, 76.83, 76.87, 77.24, 77.05, 76.88, 76.78, 76.54, 76.74, 76.48, 76.06, 76.33, 76.47, 76.33, 76.38, 75.77, 75.79, 75.79, 75.59, 74.66, 74.57, 74.07] },
    { name: "Dubai Platts", value: "$103.15", changePct: "Flat", direction: "flat", spark: [] },
    { name: "Gold", value: "$3,991", changePct: "-3.36%", direction: "down", spark: [4336.0, 4328.0, 4326.6, 4308.4, 4285.9, 4287.7, 4273.9, 4260.6, 4265.1, 4275.5, 4271.7, 4245.5, 4238.7, 4249.5, 4237.7, 4236.2, 4227.9, 4225.9, 4206.8, 4209.0, 4202.6, 4193.9, 4167.5, 4172.8, 4157.0, 4218.1, 4208.1, 4205.7, 4189.6, 4199.4, 4211.3, 4215.4, 4208.5, 4215.7, 4226.2, 4222.7, 4225.3, 4211.4, 4218.5, 4216.7, 4201.0, 4208.5, 4201.4, 4209.1, 4209.4, 4172.9, 4207.8, 4205.5, 4210.7, 4179.3, 4164.9, 4162.2, 4135.6, 4138.9, 4132.4, 4116.0, 4122.6, 4140.1, 4137.7, 4141.1, 4131.0, 4154.1, 4147.5, 4156.7, 4151.9, 4145.9, 4135.6, 4129.6, 4129.0, 4121.2, 4116.6, 4114.7, 4106.5, 4078.3, 4079.9, 4080.6, 4093.1, 4103.9, 4091.5, 4093.3, 4081.8, 4072.3, 4063.2, 4004.0, 3988.4] },
    { name: "USD/PKR", value: "277.92", changePct: "Flat", direction: "flat", spark: [277.98, 277.98, 277.98, 278.09, 278.09, 278.09, 278.0, 277.78, 277.78, 277.78, 277.8, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 278.0, 278.2, 278.08, 278.04, 278.0, 278.02, 278.02, 278.02, 277.98, 277.98, 277.98, 277.98, 278.0, 277.98, 277.7, 278.08, 278.08, 278.09, 277.89, 277.89, 277.89, 278.09, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.9, 278.08, 278.05, 278.08, 278.02, 278.02, 278.02, 278.02, 278.02, 278.08, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 278.08, 277.89, 278.04, 278.04, 277.87, 277.89, 277.89, 278.04, 277.92] },
    { name: "S&P 500", value: "7,365", changePct: "-1.44%", direction: "down", spark: [7541.81, 7536.66, 7544.07, 7532.48, 7531.81, 7522.17, 7512.99, 7527.8, 7510.64, 7518.97, 7507.22, 7473.42, 7431.97, 7421.76, 7482.17, 7482.77, 7496.19, 7505.53, 7494.93, 7489.88, 7497.86, 7495.25, 7472.26, 7476.54, 7475.81, 7479.85, 7462.87, 7475.46, 7417.41, 7373.18, 7402.1, 7403.65, 7382.2, 7378.27, 7365.92] },
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
    { date: "24 Jun", value: 179571 },
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
    { date: "24 Jun", value: 74.07 },
    // -- /AUTO:brent-history --
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "178,923", current: "179,571", change: "+0.36%", direction: "up" },
      { name: "Brent crude", prev: "$80.59", current: "$74.07", change: "-8.09%", direction: "down" },
      { name: "WTI crude", prev: "$77.54", current: "$70.53", change: "-9.04%", direction: "down" },
      { name: "Dubai Platts", prev: "$110", current: "$103.15", change: "-6.2%", direction: "down" },
      { name: "Gold", prev: "$4,145", current: "$3,988", change: "-3.79%", direction: "down" },
      { name: "Silver", prev: "$66.25", current: "$58.51", change: "-11.69%", direction: "down" },
      { name: "Natural Gas", prev: "$3.20", current: "$3.21", change: "+0.41%", direction: "up" },
      { name: "USD / PKR", prev: "278.00", current: "277.92", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1480", current: "1.1334", change: "-1.27%", direction: "down" },
      { name: "S&P 500", prev: "7,501", current: "7,365", change: "-1.80%", direction: "down" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 436,500", current: "Rs 434,500", change: "-0.5%", direction: "down" },
      { name: "Silver (tola)", prev: "Rs 6,774", current: "Rs 6,774", change: "Flat", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The big move this week is oil. Brent off 11.5% and Dubai Platts off 6.2% on the reported US-Iran ceasefire framework. The smaller Platts drop is the part that matters for Pakistan: the import bill eased less than the headlines suggest. Petrol cut Rs 22 in response, the third consecutive cut. Everything else moves in the second order: KSE rallied with oil, gold and silver pushed higher on safe-haven flows even as the equity rally suggests the opposite story, and the rupee held flat because SBP is intervening to keep it flat. Watch the gold-equity divergence: somebody is wrong.",
    // -- /AUTO:commentary-wow --
  },

  // -- PSX indices, grouped, with commentary --
  // headline, sector, thematic rows auto-managed by pull_markets.py (scraped from dps.psx.com.pk)
  psx: {
    headline: [
      // -- AUTO:psx-headline --
      { name: "KSE-100", value: "179,571", change: "+1,878 (+1.06%)", high: "", low: "", direction: "up" },
      { name: "KSE-30", value: "53,548", change: "+526 (+0.99%)", high: "", low: "", direction: "up" },
      { name: "KMI-30", value: "256,726", change: "+1,936 (+0.76%)", high: "", low: "", direction: "up" },
      { name: "All Share", value: "108,601", change: "+1,074 (+1.00%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "48,625", change: "+658 (+1.37%)", high: "", low: "", direction: "up" },
      { name: "OGTI (Oil & Gas)", value: "37,180", change: "+346 (+0.94%)", high: "", low: "", direction: "up" },
      { name: "ACI (Consumer)", value: "24,459", change: "+412 (+1.72%)", high: "", low: "", direction: "up" },
      { name: "JSGBKTI", value: "73,682", change: "+664 (+0.91%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "70,621", change: "+684 (+0.98%)", direction: "up" },
      { name: "PSX Div 20", value: "82,793", change: "+546 (+0.66%)", direction: "up" },
      { name: "Meezan Pak (MZNPI)", value: "31,613", change: "+253 (+0.81%)", direction: "up" },
      { name: "MII-30 (Islamic)", value: "23,462", change: "+226 (+0.97%)", direction: "up" },
      { name: "NIT Gateway", value: "47,360", change: "+506 (+1.08%)", direction: "up" },
      { name: "NBP Growth", value: "51,542", change: "+498 (+0.98%)", direction: "up" },
      { name: "JS Momentum", value: "43,265", change: "+572 (+1.34%)", direction: "up" },
    // -- /AUTO:psx-thematic --
    ],
    // -- AUTO:commentary-psx --
    commentary: "All 18 indices closed green, but the leadership is telling. Consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led; banks (BKTI +0.50%) and oil and gas (OGTI +0.12%) lagged. Consumer outperforming makes sense if cheaper fuel is feeding through to margins. Banks lagging despite a tight SBP rate suggests the market is pricing the budget risk (windfall taxes, sector exposure to government securities). KSE-100 is now within 1% of an all-time high. The 175,000 level is the technical zone where the broader rally either confirms with volume or rolls over into profit-taking.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$74.07", unit: "/bbl", open: "77.00", high: "77.00", low: "73.87" },
      { name: "WTI Crude Oil", value: "$70.49", unit: "/bbl", open: "73.13", high: "73.18", low: "70.36" },
      { name: "Natural Gas", value: "$3.2110", unit: "/MMBtu", open: "3.2000", high: "3.2540", low: "3.1770" },
      { name: "Gold", value: "$3,991", unit: "/oz", open: "4,130", high: "4,132", low: "3,982" },
      { name: "Silver", value: "$58.57", unit: "/oz", open: "61.63", high: "62.44", low: "58.09" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Brent at $92 is $17 below the $109 peak three weeks ago. The fear premium has bled out of crude. But Dubai Platts at $103.15 is what Pakistan actually pays, and the $11 gap to Brent means the import bill has eased less than the headline crash suggests. Gold and silver moving up while equities rally is unusual: typically they trade inversely. The signal is that institutional money is hedging the rally, not buying into it. Natural gas easing is consistent with the broader energy de-escalation. Dubai Platts is sourced manually pending a reliable free feed.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,667", open: "51,736", range: "51,302 – 51,873", region: "Americas" },
      { name: "Nasdaq", close: "25,587", open: "25,550", range: "25,513 – 25,883", region: "Americas" },
      { name: "S&P 500", close: "7,365", open: "7,367", range: "7,348 – 7,424", region: "Americas" },
      { name: "CAC 40", close: "8,376", open: "8,354", range: "8,335 – 8,381", region: "Europe" },
      { name: "DAX", close: "24,630", open: "24,791", range: "24,606 – 24,801", region: "Europe" },
      { name: "FTSE 100", close: "10,432", open: "10,429", range: "10,407 – 10,448", region: "Europe" },
      { name: "Stoxx 600", close: "634.23", open: "634.90", range: "633.05 – 635.35", region: "Europe" },
      { name: "Hang Seng", close: "23,412", open: "23,421", range: "23,249 – 23,566", region: "Asia" },
      { name: "KOSPI", close: "8,471", open: "8,357", range: "8,081 – 8,578", region: "Asia" },
      { name: "Nikkei 225", close: "69,175", open: "69,615", range: "68,461 – 70,219", region: "Asia" },
      { name: "Sensex", close: "76,991", open: "76,230", range: "76,122 – 77,190", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,111", open: "4,090", range: "4,075 – 4,117", region: "Asia" },
      { name: "EUR / USD", close: "1.1334", open: "1.1388", range: "1.1329 – 1.1390", region: "Currencies" },
      { name: "GBP / USD", close: "1.3154", open: "1.3203", range: "1.3144 – 1.3209", region: "Currencies" },
      { name: "USD / CNY", close: "6.8002", open: "6.7895", range: "6.7757 – 6.8104", region: "Currencies" },
      { name: "USD / PKR", close: "277.92", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Asia rallied with the ceasefire trade: Nikkei, Hang Seng and Sensex all firmed on softer oil. China is the exception: Shanghai is the slowest mover, consistent with the manufacturing PMI stalling at 50.0 in May. Europe is at multi-year highs across FTSE, DAX, and the broad Stoxx 600 as Bund yields stabilise. The dollar is weakening (EUR/USD at 1.1642, GBP/USD at 1.3520), which is the standard pattern when oil falls because the petrodollar bid eases. For Pakistan, the weaker dollar is a marginal positive on rupee terms, but it is dwarfed by the fact SBP is managing USD/PKR flat at 278.55.",
    // -- /AUTO:commentary-international --
  },

  // -- Latest edition callout (manual, updated weekly when a new edition publishes) --
  latestEdition: {
    number: "06",
    title: "The relief arrived. The structure did not change.",
    summary: "Oil crashed on the US-Iran ceasefire framework. Petrol below Rs 300. But CPI 11.7%, SBP held at 11.50%, FBR Rs 868B short, and T-bills at 12.99% say the structure did not move.",
    url: "/editions/2026-06-22.html",
  },
};
