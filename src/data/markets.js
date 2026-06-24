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
  lastUpdated: "24 June 2026, 10:57 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "179,571", changePct: "+1.06%", direction: "up", spark: [171725.29, 173962.81, 170600.2, 171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26] },
    { name: "Brent", value: "$73.88", changePct: "-4.15%", direction: "down", spark: [77.78, 77.74, 77.85, 78.05, 77.71, 77.72, 78.51, 78.61, 78.44, 77.08, 77.08, 77.68, 78.12, 78.31, 79.47, 79.61, 79.44, 79.24, 79.11, 79.05, 79.54, 79.52, 79.17, 80.59, 81.6, 80.8, 79.48, 79.07, 79.4, 79.13, 79.01, 79.1, 79.56, 79.14, 79.31, 79.25, 78.96, 78.56, 77.87, 78.06, 77.47, 77.74, 77.41, 78.04, 78.27, 80.59, 78.25, 78.17, 78.16, 77.87, 77.87, 77.53, 77.54, 76.95, 76.84, 77.03, 77.41, 77.53, 77.9, 77.76, 77.2, 76.67, 76.81, 76.9, 76.83, 76.87, 77.24, 77.05, 76.88, 76.78, 76.54, 76.74, 76.48, 76.06, 76.33, 76.47, 76.33, 76.38, 75.77, 75.79, 75.79, 75.59, 74.66, 74.57, 73.37, 73.47, 74.04, 74.09, 73.86] },
    { name: "Dubai Platts", value: "$103.15", changePct: "Flat", direction: "flat", spark: [] },
    { name: "Gold", value: "$4,003", changePct: "-3.08%", direction: "down", spark: [4336.0, 4328.0, 4326.6, 4308.4, 4285.9, 4287.7, 4273.9, 4260.6, 4265.1, 4275.5, 4271.7, 4245.5, 4238.7, 4249.5, 4237.7, 4236.2, 4227.9, 4225.9, 4206.8, 4209.0, 4202.6, 4193.9, 4167.5, 4172.8, 4157.0, 4218.1, 4208.1, 4205.7, 4189.6, 4199.4, 4211.3, 4215.4, 4208.5, 4215.7, 4226.2, 4222.7, 4225.3, 4211.4, 4218.5, 4216.7, 4201.0, 4208.5, 4201.4, 4209.1, 4209.4, 4172.9, 4207.8, 4205.5, 4210.7, 4179.3, 4164.9, 4162.2, 4135.6, 4138.9, 4132.4, 4116.0, 4122.6, 4140.1, 4137.7, 4141.1, 4131.0, 4154.1, 4147.5, 4156.7, 4151.9, 4145.9, 4135.6, 4129.6, 4129.0, 4121.2, 4116.6, 4114.7, 4106.5, 4078.3, 4079.9, 4080.6, 4093.1, 4103.9, 4091.5, 4093.3, 4081.8, 4072.3, 4063.2, 4004.0, 4054.9, 4025.0, 4019.5, 4023.4, 4003.3] },
    { name: "USD/PKR", value: "277.92", changePct: "Flat", direction: "flat", spark: [277.98, 277.98, 277.98, 278.09, 278.09, 278.09, 278.0, 277.78, 277.78, 277.78, 277.8, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 277.98, 278.0, 278.2, 278.08, 278.04, 278.0, 278.02, 278.02, 278.02, 277.98, 277.98, 277.98, 277.98, 278.0, 277.98, 277.7, 278.08, 278.08, 278.09, 277.89, 277.89, 277.89, 278.09, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.9, 278.08, 278.05, 278.08, 278.02, 278.02, 278.02, 278.02, 278.02, 278.08, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 278.08, 277.89, 278.04, 278.04, 277.87, 277.89, 277.89, 278.04, 277.92, 277.92, 277.92, 277.92] },
    { name: "S&P 500", value: "7,354", changePct: "-0.16%", direction: "down", spark: [7527.8, 7510.64, 7518.97, 7507.22, 7473.42, 7431.97, 7421.76, 7482.17, 7482.77, 7496.19, 7505.53, 7494.93, 7489.88, 7497.86, 7495.25, 7472.26, 7476.54, 7475.81, 7479.85, 7462.87, 7475.46, 7417.41, 7373.18, 7402.1, 7403.65, 7382.2, 7378.27, 7365.92, 7393.15, 7424.61, 7409.55, 7350.28, 7353.88] },
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
    { date: "24 Jun", value: 73.88 },
    // -- /AUTO:brent-history --
  ],
  goldHistory: [
    // -- AUTO:gold-history --
    { date: "5 Jan", value: 4490.30 },
    { date: "12 Jan", value: 4588.40 },
    { date: "19 Jan", value: 4976.20 },
    { date: "26 Jan", value: 4713.90 },
    { date: "2 Feb", value: 4951.20 },
    { date: "9 Feb", value: 5022.00 },
    { date: "16 Feb", value: 5059.30 },
    { date: "23 Feb", value: 5230.50 },
    { date: "2 Mar", value: 5146.10 },
    { date: "9 Mar", value: 5052.50 },
    { date: "16 Mar", value: 4570.40 },
    { date: "23 Mar", value: 4492.00 },
    { date: "30 Mar", value: 4651.50 },
    { date: "6 Apr", value: 4761.90 },
    { date: "13 Apr", value: 4857.60 },
    { date: "20 Apr", value: 4722.30 },
    { date: "27 Apr", value: 4629.90 },
    { date: "4 May", value: 4720.40 },
    { date: "11 May", value: 4555.80 },
    { date: "18 May", value: 4521.00 },
    { date: "25 May", value: 4560.50 },
    { date: "1 Jun", value: 4337.10 },
    { date: "8 Jun", value: 4215.00 },
    { date: "15 Jun", value: 4145.30 },
    { date: "22 Jun", value: 4015.10 },
    // -- /AUTO:gold-history --
  ],
  goldLocalHistory: [
    // -- AUTO:gold-local-history --
    { date: "2 Mar", value: 539000 },
    { date: "9 Mar", value: 514500 },
    { date: "16 Mar", value: 510000 },
    { date: "23 Mar", value: 480000 },
    { date: "30 Mar", value: 492000 },
    { date: "6 Apr", value: 500000 },
    { date: "13 Apr", value: 500500 },
    { date: "20 Apr", value: 502500 },
    { date: "27 Apr", value: 486700 },
    { date: "4 May", value: 475000 },
    { date: "11 May", value: 481500 },
    { date: "18 May", value: 465000 },
    { date: "25 May", value: 470500 },
    { date: "1 Jun", value: 461500 },
    { date: "8 Jun", value: 448500 },
    { date: "15 Jun", value: 460000 },
    { date: "22 Jun", value: 445500 },
    { date: "24 Jun", value: 434500 },
    // -- /AUTO:gold-local-history --
  ],
  pkrHistory: [
    // -- AUTO:pkr-history --
    { date: "5 Jan", value: 279.75 },
    { date: "12 Jan", value: 278.83 },
    { date: "19 Jan", value: 276.29 },
    { date: "26 Jan", value: 279.90 },
    { date: "2 Feb", value: 277.46 },
    { date: "9 Feb", value: 279.35 },
    { date: "16 Feb", value: 277.50 },
    { date: "23 Feb", value: 277.69 },
    { date: "2 Mar", value: 279.00 },
    { date: "9 Mar", value: 279.00 },
    { date: "16 Mar", value: 278.90 },
    { date: "23 Mar", value: 279.00 },
    { date: "30 Mar", value: 278.75 },
    { date: "6 Apr", value: 277.14 },
    { date: "13 Apr", value: 278.65 },
    { date: "20 Apr", value: 276.95 },
    { date: "27 Apr", value: 277.37 },
    { date: "4 May", value: 278.40 },
    { date: "11 May", value: 278.30 },
    { date: "18 May", value: 277.11 },
    { date: "25 May", value: 278.25 },
    { date: "1 Jun", value: 276.84 },
    { date: "8 Jun", value: 278.05 },
    { date: "15 Jun", value: 278.00 },
    { date: "22 Jun", value: 277.92 },
    // -- /AUTO:pkr-history --
  ],

  // -- Manual chart data (updated with each edition) --
  cpiSpiHistory: [
    { date: "Jan 25", cpi: 2.4, spi: 4.1 },
    { date: "Feb 25", cpi: 1.5, spi: 2.8 },
    { date: "Mar 25", cpi: 0.7, spi: 1.9 },
    { date: "Apr 25", cpi: 0.3, spi: 2.3 },
    { date: "May 25", cpi: 3.5, spi: 5.2 },
    { date: "Jun 25", cpi: 5.2, spi: 7.5 },
    { date: "Jul 25", cpi: 6.8, spi: 8.4 },
    { date: "Aug 25", cpi: 8.3, spi: 10.1 },
    { date: "Sep 25", cpi: 7.2, spi: 9.8 },
    { date: "Oct 25", cpi: 7.6, spi: 10.2 },
    { date: "Nov 25", cpi: 8.5, spi: 11.3 },
    { date: "Dec 25", cpi: 4.1, spi: 6.9 },
    { date: "Jan 26", cpi: 2.4, spi: 7.9 },
    { date: "Feb 26", cpi: 1.5, spi: 8.2 },
    { date: "Mar 26", cpi: 3.0, spi: 9.4 },
    { date: "Apr 26", cpi: 11.3, spi: 12.8 },
    { date: "May 26", cpi: 11.7, spi: 14.47 },
  ],
  sbpRateHistory: [
    { date: "Jun 24", rate: 20.5 },
    { date: "Jul 24", rate: 19.5 },
    { date: "Sep 24", rate: 17.5 },
    { date: "Nov 24", rate: 15.0 },
    { date: "Dec 24", rate: 13.0 },
    { date: "Jan 25", rate: 12.0 },
    { date: "Apr 25", rate: 12.0 },
    { date: "Jul 25", rate: 11.0 },
    { date: "Oct 25", rate: 10.5 },
    { date: "Dec 25", rate: 10.5 },
    { date: "Feb 26", rate: 10.5 },
    { date: "Apr 26", rate: 11.5 },
    { date: "Jun 26", rate: 11.5 },
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "178,923", current: "179,571", change: "+0.36%", direction: "up" },
      { name: "Brent crude", prev: "$80.59", current: "$73.86", change: "-8.35%", direction: "down" },
      { name: "WTI crude", prev: "$77.54", current: "$70.38", change: "-9.23%", direction: "down" },
      { name: "Dubai Platts", prev: "$110", current: "$103.15", change: "-6.2%", direction: "down" },
      { name: "Gold", prev: "$4,145", current: "$4,003", change: "-3.43%", direction: "down" },
      { name: "Silver", prev: "$66.25", current: "$57.53", change: "-13.18%", direction: "down" },
      { name: "Natural Gas", prev: "$3.20", current: "$3.25", change: "+1.53%", direction: "up" },
      { name: "USD / PKR", prev: "278.00", current: "277.92", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1480", current: "1.1356", change: "-1.08%", direction: "down" },
      { name: "S&P 500", prev: "7,501", current: "7,354", change: "-1.96%", direction: "down" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 434,500", current: "Rs 434,500", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,774", current: "Rs 6,774", change: "Flat", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The headline number for Pakistani consumers this week is the petrol price, which dropped from Rs 373.78 to Rs 299.50, a cut of Rs 74.28 per litre. That relief is directly traceable to the collapse in international crude, with Brent falling 8.35% to $73.86 and Dubai Platts dropping 6.2% to $103.15 over the week. For a country that imports the bulk of its petroleum needs, a sustained slide in Dubai Platts is the most consequential variable for the monthly fuel-pricing formula and, by extension, headline CPI. The SPI held steady at 14.47% year-on-year this week, but watch whether the fuel price transmission filters into transport and food costs in the coming fortnights.",
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
    commentary: "The KSE-100 added 1,878 points on the day to close at 179,571, and on a week-over-week basis the index gained a more modest 0.36%, moving from 178,923 to 179,571. The breadth was genuinely encouraging: the KSE-30, KMI-30, and All Share index all advanced roughly in line, confirming this was not a narrow, single-sector rally. Banks led sectoral gainers, with the BKTI index up 1.37%, while Consumer stocks posted the strongest move at 1.72%, perhaps beginning to price in the relief that cheaper fuel brings to household discretionary spending. The key signal to watch is whether declining crude prices and a stable rupee give the State Bank enough comfort to consider further monetary easing, which would be a significant re-rating catalyst for equities.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$73.88", unit: "/bbl", open: "77.00", high: "77.00", low: "73.26" },
      { name: "WTI Crude Oil", value: "$70.42", unit: "/bbl", open: "73.13", high: "73.18", low: "69.63" },
      { name: "Natural Gas", value: "$3.2480", unit: "/MMBtu", open: "3.2000", high: "3.2660", low: "3.1770" },
      { name: "Gold", value: "$4,003", unit: "/oz", open: "4,130", high: "4,132", low: "3,980" },
      { name: "Silver", value: "$57.51", unit: "/oz", open: "61.63", high: "62.44", low: "57.37" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Crude oil had a brutal week: Brent dropped from $80.59 to $73.86, a fall of 8.35%, while WTI shed 9.23% to close at $70.38. Gold, which had touched $4,145, pulled back 3.43% to $4,003, and silver's decline was sharper still, falling 13.18% to $57.53. Natural gas was the lone commodity to tick higher, rising 1.53% to $3.25 per MMBtu, a number worth monitoring given Pakistan's LNG import dependency. For Pakistan's import bill, the crude collapse is unambiguously positive in the near term, though planners should watch whether OPEC-plus supply decisions reverse this move before the next pricing cycle.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,834", open: "51,661", range: "51,618 – 52,249", region: "Americas" },
      { name: "Nasdaq", close: "25,487", open: "25,579", range: "25,447 – 25,841", region: "Americas" },
      { name: "S&P 500", close: "7,354", open: "7,371", range: "7,342 – 7,428", region: "Americas" },
      { name: "CAC 40", close: "8,385", open: "8,354", range: "8,335 – 8,396", region: "Europe" },
      { name: "DAX", close: "24,740", open: "24,791", range: "24,593 – 24,801", region: "Europe" },
      { name: "FTSE 100", close: "10,462", open: "10,429", range: "10,407 – 10,469", region: "Europe" },
      { name: "Stoxx 600", close: "635.16", open: "634.90", range: "632.84 – 635.35", region: "Europe" },
      { name: "Hang Seng", close: "23,336", open: "23,800", range: "23,252 – 23,826", region: "Asia" },
      { name: "KOSPI", close: "8,204", open: "8,204", range: "8,204 – 8,204", region: "Asia" },
      { name: "Nikkei 225", close: "69,788", open: "72,404", range: "69,788 – 72,618", region: "Asia" },
      { name: "Sensex", close: "76,991", open: "76,230", range: "76,122 – 77,190", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,106", open: "4,154", range: "4,086 – 4,175", region: "Asia" },
      { name: "EUR / USD", close: "1.1356", open: "1.1388", range: "1.1329 – 1.1390", region: "Currencies" },
      { name: "GBP / USD", close: "1.3159", open: "1.3203", range: "1.3140 – 1.3209", region: "Currencies" },
      { name: "USD / CNY", close: "6.7984", open: "6.7895", range: "6.7757 – 6.8104", region: "Currencies" },
      { name: "USD / PKR", close: "277.92", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Global equities were under mild pressure this week, with the S&P 500 declining 1.96% to 7,354 and most major indices reflecting a cautious tone. European markets, including the DAX at 24,740 and the FTSE 100 at 10,462, held broadly steady, while Asian bourses presented a mixed picture with the Nikkei at 69,788 and the Hang Seng at 23,336. On currencies, the EUR/USD slipped 1.08% to 1.1356, a move that matters to Pakistani importers who price European machinery and inputs in euros. The rupee itself was effectively flat at 277.92 against the dollar, providing a stable base for business planning; the number to track next week is whether dollar strength reasserts itself, which could compress the import-bill benefits of cheaper crude.",
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
