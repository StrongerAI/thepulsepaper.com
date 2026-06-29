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
  lastUpdated: "29 June 2026, 9:00 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "178,415", changePct: "-0.64%", direction: "down", spark: [173962.81, 170600.2, 171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26, 178414.79] },
    { name: "Brent", value: "$73.80", changePct: "+2.51%", direction: "up", spark: [76.47, 76.33, 76.38, 75.77, 75.79, 75.79, 75.59, 74.66, 74.57, 73.37, 73.47, 74.04, 74.09, 73.96, 73.19, 73.33, 73.18, 73.11, 73.22, 73.34, 72.49, 72.62, 72.51, 72.71, 72.46, 72.63, 73.37, 72.71, 72.97, 72.94, 73.42, 73.18, 74.0, 74.27, 74.96, 75.03, 75.24, 75.73, 75.6, 75.0, 75.06, 75.17, 75.39, 74.83, 74.38, 74.22, 74.08, 74.55, 74.16, 73.46, 72.86, 72.65, 73.05, 73.47, 72.73, 72.81, 72.67, 72.4, 72.65, 72.64, 72.44, 72.8, 73.4, 72.6, 73.25, 73.03, 73.12, 73.19, 73.22, 73.29, 73.21, 72.72, 73.16, 72.73, 73.3, 73.72, 73.04, 73.15, 73.24, 73.29, 73.66, 73.8] },
    { name: "Dubai Platts", value: "$79.52", changePct: "-22.9%", direction: "down", spark: [] },
    { name: "Gold", value: "$4,041", changePct: "-0.93%", direction: "down", spark: [4080.6, 4093.1, 4103.9, 4091.5, 4093.3, 4081.8, 4072.3, 4063.2, 4004.0, 4054.9, 4025.0, 4019.5, 4023.4, 3989.8, 3998.1, 4004.9, 4016.4, 4012.0, 4026.6, 4007.3, 3992.2, 3998.7, 4012.4, 4011.8, 4001.6, 3992.7, 4003.5, 4004.9, 4003.4, 3999.5, 3995.3, 4028.2, 4017.5, 4027.6, 4057.5, 4044.0, 4050.2, 4050.4, 4041.6, 4041.6, 4041.4, 4030.2, 4035.1, 4035.9, 4006.0, 4018.6, 4026.8, 4023.2, 4047.2, 4046.4, 4046.1, 4062.8, 4069.8, 4061.0, 4074.0, 4088.7, 4095.7, 4106.3, 4099.9, 4089.6, 4082.2, 4086.2, 4096.3, 4080.8, 4076.7, 4083.9, 4075.8, 4080.8, 4083.2, 4065.7, 4069.0, 4077.0, 4076.3, 4060.9, 4045.8, 4051.1, 4053.3, 4057.8, 4046.4, 4039.5, 4040.7] },
    { name: "USD/PKR", value: "277.92", changePct: "Flat", direction: "flat", spark: [277.93, 277.93, 277.9, 278.08, 278.05, 278.08, 278.02, 278.02, 278.02, 278.02, 278.02, 278.08, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 278.08, 277.89, 278.04, 278.04, 277.87, 277.89, 277.89, 278.04, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 278.05, 277.78, 277.78, 277.7, 277.61, 277.61, 277.61, 277.61, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.87, 277.87, 277.9, 277.9, 277.97, 277.97, 278.04, 277.92, 277.92, 277.92] },
    { name: "S&P 500", value: "7,415", changePct: "+0.84%", direction: "up", spark: [7417.41, 7373.18, 7402.1, 7403.65, 7382.2, 7378.27, 7365.92, 7393.15, 7424.61, 7409.55, 7350.28, 7371.24, 7348.06, 7359.9, 7382.93, 7369.73, 7370.2, 7360.66, 7386.58, 7352.54, 7357.17, 7361.98, 7374.04, 7361.52, 7375.14, 7355.99, 7349.41, 7337.81, 7390.62, 7406.85, 7415.55] },
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
    { date: "28 Jun", value: 179571 },
    { date: "29 Jun", value: 178415 },
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
    { date: "28 Jun", value: 71.99 },
    { date: "29 Jun", value: 73.8 },
    // -- /AUTO:brent-history --
  ],
  goldHistory: [
    // -- AUTO:gold-history --
    { date: "5 Jan", value: 4490.3 },
    { date: "12 Jan", value: 4588.4 },
    { date: "19 Jan", value: 4976.2 },
    { date: "26 Jan", value: 4713.9 },
    { date: "2 Feb", value: 4951.2 },
    { date: "9 Feb", value: 5022.0 },
    { date: "16 Feb", value: 5059.3 },
    { date: "23 Feb", value: 5230.5 },
    { date: "2 Mar", value: 5146.1 },
    { date: "9 Mar", value: 5052.5 },
    { date: "16 Mar", value: 4570.4 },
    { date: "23 Mar", value: 4492.0 },
    { date: "30 Mar", value: 4651.5 },
    { date: "6 Apr", value: 4761.9 },
    { date: "13 Apr", value: 4857.6 },
    { date: "20 Apr", value: 4722.3 },
    { date: "27 Apr", value: 4629.9 },
    { date: "4 May", value: 4720.4 },
    { date: "11 May", value: 4555.8 },
    { date: "18 May", value: 4521.0 },
    { date: "25 May", value: 4560.5 },
    { date: "1 Jun", value: 4337.1 },
    { date: "8 Jun", value: 4215.0 },
    { date: "15 Jun", value: 4145.3 },
    { date: "22 Jun", value: 4015.1 },
    { date: "28 Jun", value: 4078.7 },
    { date: "29 Jun", value: 4040.7 },
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
    { date: "28 Jun", value: 434500 },
    { date: "29 Jun", value: 431500 },
    // -- /AUTO:gold-local-history --
  ],
  pkrHistory: [
    // -- AUTO:pkr-history --
    { date: "5 Jan", value: 279.75 },
    { date: "12 Jan", value: 278.83 },
    { date: "19 Jan", value: 276.29 },
    { date: "26 Jan", value: 279.9 },
    { date: "2 Feb", value: 277.46 },
    { date: "9 Feb", value: 279.35 },
    { date: "16 Feb", value: 277.5 },
    { date: "23 Feb", value: 277.69 },
    { date: "2 Mar", value: 279.0 },
    { date: "9 Mar", value: 279.0 },
    { date: "16 Mar", value: 278.9 },
    { date: "23 Mar", value: 279.0 },
    { date: "30 Mar", value: 278.75 },
    { date: "6 Apr", value: 277.14 },
    { date: "13 Apr", value: 278.65 },
    { date: "20 Apr", value: 276.95 },
    { date: "27 Apr", value: 277.37 },
    { date: "4 May", value: 278.4 },
    { date: "11 May", value: 278.3 },
    { date: "18 May", value: 277.11 },
    { date: "25 May", value: 278.25 },
    { date: "1 Jun", value: 276.84 },
    { date: "8 Jun", value: 278.05 },
    { date: "15 Jun", value: 278.0 },
    { date: "22 Jun", value: 277.92 },
    { date: "28 Jun", value: 277.92 },
    { date: "29 Jun", value: 277.92 },
    // -- /AUTO:pkr-history --
  ],

  // -- Manual chart data (updated with each edition) --
  // CPI: PBS monthly YoY%. SPI: PBS weekly YoY% (month-end reading).
  // Sources: tradingeconomics.com/pakistan/inflation-cpi, pbs.gov.pk
  cpiSpiHistory: [
    { date: "Jan 25", cpi: 2.4, spi: 2.2 },
    { date: "Feb 25", cpi: 1.8, spi: 1.6 },
    { date: "Mar 25", cpi: 0.7, spi: 0.5 },
    { date: "Apr 25", cpi: 0.3, spi: 0.8 },
    { date: "May 25", cpi: 3.5, spi: 4.2 },
    { date: "Jun 25", cpi: 3.2, spi: 3.8 },
    { date: "Jul 25", cpi: 4.1, spi: 5.0 },
    { date: "Aug 25", cpi: 3.0, spi: 3.6 },
    { date: "Sep 25", cpi: 5.6, spi: 6.4 },
    { date: "Oct 25", cpi: 6.2, spi: 7.0 },
    { date: "Nov 25", cpi: 5.8, spi: 6.5 },
    { date: "Dec 25", cpi: 5.6, spi: 6.2 },
    { date: "Jan 26", cpi: 5.8, spi: 7.9 },
    { date: "Feb 26", cpi: 7.0, spi: 8.2 },
    { date: "Mar 26", cpi: 7.3, spi: 9.4 },
    { date: "Apr 26", cpi: 10.9, spi: 12.8 },
    { date: "May 26", cpi: 11.7, spi: 14.47 },
  ],
  // Source: SBP MPC press releases, tradingeconomics.com/pakistan/interest-rate
  sbpRateHistory: [
    { date: "Jun 24", rate: 20.5 },
    { date: "Jul 24", rate: 19.5 },
    { date: "Sep 24", rate: 17.5 },
    { date: "Nov 24", rate: 15.0 },
    { date: "Dec 24", rate: 13.0 },
    { date: "Jan 25", rate: 12.0 },
    { date: "Jun 25", rate: 11.0 },
    { date: "Jul 25", rate: 11.0 },
    { date: "Dec 25", rate: 10.5 },
    { date: "Jan 26", rate: 10.5 },
    { date: "Mar 26", rate: 10.5 },
    { date: "Apr 26", rate: 11.5 },
    { date: "Jun 26", rate: 11.5 },
  ],

  // -- Week-over-week comparison table + its commentary --
  // Auto-rows (all except KSE-100, Dubai Platts, Petrol, SPI) managed by pull_markets.py
  weekOverWeek: {
    rows: [
      // -- AUTO:wow-rows --
      { name: "KSE-100", prev: "179,571", current: "178,415", change: "-0.64%", direction: "down" },
      { name: "Brent crude", prev: "$71.99", current: "$73.80", change: "+2.51%", direction: "up" },
      { name: "WTI crude", prev: "$69.23", current: "$70.58", change: "+1.95%", direction: "up" },
      { name: "Dubai Platts", prev: "$103.15", current: "$79.52", change: "-22.9%", direction: "down" },
      { name: "Gold", prev: "$4,079", current: "$4,041", change: "-0.93%", direction: "down" },
      { name: "Silver", prev: "$59.22", current: "$58.51", change: "-1.19%", direction: "down" },
      { name: "Natural Gas", prev: "$3.23", current: "$3.18", change: "-1.52%", direction: "down" },
      { name: "USD / PKR", prev: "278.00", current: "277.70", change: "-0.11%", direction: "down" },
      { name: "EUR / USD", prev: "1.1480", current: "1.1395", change: "-0.74%", direction: "down" },
      { name: "S&P 500", prev: "7,354", current: "7,416", change: "+0.84%", direction: "up" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 431,500", current: "Rs 431,500", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,774", current: "Rs 6,774", change: "Flat", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The headline number every Pakistani household will feel this week is the petrol price, which fell from Rs 373.78 to Rs 299.50, a drop of Rs 74.28 in a single review cycle. That is a dramatic relief for transport costs and a meaningful input cost reduction for small businesses running on fuel. Brent crude rising 2.51 percent to $73.80 and WTI gaining 1.95 percent to $70.58 complicate the picture for future pricing reviews, so the current pump-price relief may be shorter-lived than consumers hope. The SPI holding flat at 14.47 percent year-on-year signals that broader price pressures have not yet transmitted downward, and the next SPI reading will tell us whether the fuel cut is finally feeding through to the weekly basket.",
    // -- /AUTO:commentary-wow --
  },

  // -- PSX indices, grouped, with commentary --
  // headline, sector, thematic rows auto-managed by pull_markets.py (scraped from dps.psx.com.pk)
  psx: {
    headline: [
      // -- AUTO:psx-headline --
      { name: "KSE-100", value: "178,415", change: "-1,156 (-0.64%)", high: "", low: "", direction: "down" },
      { name: "KSE-30", value: "53,113", change: "-436 (-0.81%)", high: "", low: "", direction: "down" },
      { name: "KMI-30", value: "254,200", change: "-2,525 (-0.98%)", high: "", low: "", direction: "down" },
      { name: "All Share", value: "107,980", change: "-621 (-0.57%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "48,336", change: "-289 (-0.60%)", high: "", low: "", direction: "down" },
      { name: "OGTI (Oil & Gas)", value: "36,756", change: "-424 (-1.14%)", high: "", low: "", direction: "down" },
      { name: "ACI (Consumer)", value: "24,294", change: "-165 (-0.67%)", high: "", low: "", direction: "down" },
      { name: "JSGBKTI", value: "73,019", change: "-662 (-0.90%)", high: "", low: "", direction: "down" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "70,176", change: "-444 (-0.63%)", direction: "down" },
      { name: "PSX Div 20", value: "82,267", change: "-527 (-0.64%)", direction: "down" },
      { name: "Meezan Pak (MZNPI)", value: "31,331", change: "-282 (-0.89%)", direction: "down" },
      { name: "MII-30 (Islamic)", value: "23,266", change: "-195 (-0.83%)", direction: "down" },
      { name: "NIT Gateway", value: "47,018", change: "-341 (-0.72%)", direction: "down" },
      { name: "NBP Growth", value: "51,106", change: "-436 (-0.85%)", direction: "down" },
      { name: "JS Momentum", value: "42,774", change: "-491 (-1.13%)", direction: "down" },
    // -- /AUTO:psx-thematic --
    ],
    // -- AUTO:commentary-psx --
    commentary: "The KSE-100 shed 1,156 points this week, closing at 178,415, a decline of 0.64 percent that was broad-based across every index and sector tracked. The KMI-30 was the weakest headline gauge, falling 0.98 percent, while the Oil and Gas sector index dropped 1.14 percent, likely reflecting profit-taking after the sharp domestic petrol price cut raised questions about downstream margins. Banks fell 0.60 percent and consumer stocks slid 0.67 percent, suggesting the market is waiting for corporate earnings guidance rather than reacting to macro relief. The key signal to monitor is whether the sharp reduction in fuel costs translates into stronger consumer spending data that supports a re-rating of consumer sector stocks in the coming weeks.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$73.80", unit: "/bbl", open: "73.60", high: "73.97", low: "72.58" },
      { name: "WTI Crude Oil", value: "$70.58", unit: "/bbl", open: "70.50", high: "70.97", low: "69.32" },
      { name: "Natural Gas", value: "$3.1820", unit: "/MMBtu", open: "3.2810", high: "3.3130", low: "3.1710" },
      { name: "Gold", value: "$4,041", unit: "/oz", open: "4,101", high: "4,103", low: "4,012" },
      { name: "Silver", value: "$58.51", unit: "/oz", open: "59.30", high: "59.92", low: "57.84" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Brent crude's 2.51 percent weekly gain to $73.80 per barrel is a flag for Pakistan's energy import planners, as any sustained move above the mid-seventies will begin widening the import bill at a time when the current account is under careful watch. WTI settled at $70.58, maintaining its usual discount to Brent, while natural gas slipped 1.52 percent to $3.18 per MMBtu, offering modest relief for LNG procurement discussions. Gold retreated 0.93 percent to $4,041 per ounce and silver fell 1.19 percent to $58.51, yet domestic gold prices held flat at Rs 431,500 per tola, reflecting the stabilising rupee rather than any local demand shift. Watch whether Brent consolidates above $73 or pulls back, as that threshold will shape the next fortnightly petroleum pricing decision by the government.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "52,114", open: "51,995", range: "51,950 – 52,312", region: "Americas" },
      { name: "Nasdaq", close: "25,662", open: "25,502", range: "25,290 – 25,697", region: "Americas" },
      { name: "S&P 500", close: "7,415", open: "7,392", range: "7,349 – 7,428", region: "Americas" },
      { name: "CAC 40", close: "8,367", open: "8,379", range: "8,341 – 8,392", region: "Europe" },
      { name: "DAX", close: "24,627", open: "24,724", range: "24,557 – 24,762", region: "Europe" },
      { name: "FTSE 100", close: "10,484", open: "10,508", range: "10,472 – 10,521", region: "Europe" },
      { name: "Stoxx 600", close: "636.11", open: "636.09", range: "634.05 – 637.54", region: "Europe" },
      { name: "Hang Seng", close: "22,672", open: "22,952", range: "22,518 – 22,962", region: "Asia" },
      { name: "KOSPI", close: "8,411", open: "8,813", range: "8,127 – 8,862", region: "Asia" },
      { name: "Nikkei 225", close: "69,361", open: "71,588", range: "68,640 – 71,786", region: "Asia" },
      { name: "Sensex", close: "76,728", open: "77,055", range: "76,622 – 77,253", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,027", open: "4,099", range: "4,008 – 4,100", region: "Asia" },
      { name: "EUR / USD", close: "1.1427", open: "1.1390", range: "1.1383 – 1.1429", region: "Currencies" },
      { name: "GBP / USD", close: "1.3254", open: "1.3206", range: "1.3192 – 1.3254", region: "Currencies" },
      { name: "USD / CNY", close: "6.7855", open: "6.7897", range: "6.7786 – 6.8042", region: "Currencies" },
      { name: "USD / PKR", close: "277.92", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Global equity markets delivered a split verdict this week: the S&P 500 gained 0.84 percent to close at 7,415, supported by positive sentiment in the Americas, while the EUR/USD slipped 0.74 percent week-over-week, settling around 1.1395 to 1.1427 across the period. A softer euro relative to the dollar has indirect relevance for Pakistan because it affects the competitiveness of European export markets where Pakistani textile exporters compete. The rupee held remarkably steady, moving just 0.11 percent to close near 277.92 against the dollar, which supports business planning for importers pricing contracts over the next quarter. The signal to watch is the dollar's broader trajectory: if dollar strength continues to pressure the euro and other emerging market currencies, the State Bank's task of maintaining exchange rate stability will require closer attention to reserve adequacy.",
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
