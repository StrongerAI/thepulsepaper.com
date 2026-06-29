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
  lastUpdated: "29 June 2026, 4:00 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "178,415", changePct: "-0.64%", direction: "down", spark: [171725.29, 173962.81, 170600.2, 171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26] },
    { name: "Brent", value: "$73.07", changePct: "+1.50%", direction: "up", spark: [76.47, 76.33, 76.38, 75.77, 75.79, 75.79, 75.59, 74.66, 74.57, 73.37, 73.47, 74.04, 74.09, 73.96, 73.19, 73.33, 73.18, 73.11, 73.22, 73.34, 72.49, 72.62, 72.51, 72.71, 72.46, 72.63, 73.37, 72.71, 72.97, 72.94, 73.42, 73.18, 74.0, 74.27, 74.96, 75.03, 75.24, 75.73, 75.6, 75.0, 75.06, 75.17, 75.39, 74.83, 74.38, 74.22, 74.08, 74.55, 74.16, 73.46, 72.86, 72.65, 73.05, 73.47, 72.73, 72.81, 72.67, 72.4, 72.65, 72.64, 72.44, 72.8, 73.4, 72.6, 73.25, 73.03, 73.12, 73.19, 73.22, 73.29, 73.21, 72.72, 73.16, 72.73, 73.3, 73.72, 73.08] },
    { name: "Dubai Platts", value: "$79.52", changePct: "-22.9%", direction: "down", spark: [] },
    { name: "Gold", value: "$4,049", changePct: "-0.73%", direction: "down", spark: [4080.6, 4093.1, 4103.9, 4091.5, 4093.3, 4081.8, 4072.3, 4063.2, 4004.0, 4054.9, 4025.0, 4019.5, 4023.4, 3989.8, 3998.1, 4004.9, 4016.4, 4012.0, 4026.6, 4007.3, 3992.2, 3998.7, 4012.4, 4011.8, 4001.6, 3992.7, 4003.5, 4004.9, 4003.4, 3999.5, 3995.3, 4028.2, 4017.5, 4027.6, 4057.5, 4044.0, 4050.2, 4050.4, 4041.6, 4041.6, 4041.4, 4030.2, 4035.1, 4035.9, 4006.0, 4018.6, 4026.8, 4023.2, 4047.2, 4046.4, 4046.1, 4062.8, 4069.8, 4061.0, 4074.0, 4088.7, 4095.7, 4106.3, 4099.9, 4089.6, 4082.2, 4086.2, 4096.3, 4080.8, 4076.7, 4083.9, 4075.8, 4080.8, 4083.2, 4065.7, 4069.0, 4077.0, 4076.3, 4060.9, 4045.8, 4049.1] },
    { name: "USD/PKR", value: "278.04", changePct: "Flat", direction: "flat", spark: [277.93, 277.93, 277.9, 278.08, 278.05, 278.08, 278.02, 278.02, 278.02, 278.02, 278.02, 278.08, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 278.08, 277.89, 278.04, 278.04, 277.87, 277.89, 277.89, 278.04, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 278.05, 277.78, 277.78, 277.7, 277.61, 277.61, 277.61, 277.61, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.87, 277.87, 277.9, 277.9, 277.97, 277.97, 278.04] },
    { name: "S&P 500", value: "7,354", changePct: "Flat", direction: "flat", spark: [7495.25, 7472.26, 7476.54, 7475.81, 7479.85, 7462.87, 7475.46, 7417.41, 7373.18, 7402.1, 7403.65, 7382.2, 7378.27, 7365.92, 7393.15, 7424.61, 7409.55, 7350.28, 7371.24, 7348.06, 7359.9, 7382.93, 7369.73, 7370.2, 7360.66, 7386.58, 7352.54, 7357.17, 7361.98, 7374.04, 7361.52, 7375.14, 7355.99, 7349.41, 7337.81] },
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
    { date: "29 Jun", value: 73.07 },
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
    { date: "29 Jun", value: 4048.8 },
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
    { date: "29 Jun", value: 432000 },
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
    { date: "29 Jun", value: 278.04 },
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
      { name: "Brent crude", prev: "$71.99", current: "$73.07", change: "+1.50%", direction: "up" },
      { name: "WTI crude", prev: "$69.23", current: "$69.90", change: "+0.97%", direction: "up" },
      { name: "Dubai Platts", prev: "$103.15", current: "$79.52", change: "-22.9%", direction: "down" },
      { name: "Gold", prev: "$4,079", current: "$4,049", change: "-0.73%", direction: "down" },
      { name: "Silver", prev: "$59.22", current: "$58.15", change: "-1.81%", direction: "down" },
      { name: "Natural Gas", prev: "$3.23", current: "$3.26", change: "+0.80%", direction: "up" },
      { name: "USD / PKR", prev: "278.00", current: "277.70", change: "-0.11%", direction: "down" },
      { name: "EUR / USD", prev: "1.1480", current: "1.1395", change: "-0.74%", direction: "down" },
      { name: "S&P 500", prev: "7,501", current: "7,354", change: "-1.95%", direction: "down" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 434,500", current: "Rs 432,000", change: "-0.6%", direction: "down" },
      { name: "Silver (tola)", prev: "Rs 6,780", current: "Rs 6,774", change: "-0.1%", direction: "down" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The standout story this week is the dramatic fall in petrol prices, with MS dropping from Rs 373.78 to Rs 299.50, a reduction of Rs 74.28 per litre. This is a direct transmission of the steep decline in international crude benchmarks, with Brent falling nearly 10% week-over-week from $80.59 to $72.60 and WTI down 10.72% to $69.23. For Pakistan, cheaper fuel feeds through quickly into transport costs, CPI, and the energy import bill, all of which matter enormously for the SBP's rate path. Watch whether the SPI, currently flat at 14.47% year-on-year, begins to soften in coming weeks as this fuel price relief works through the basket.",
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
    commentary: "The KSE-100 closed at 179,571, adding 1,878 points or 1.06% on the day and ending the week 0.36% higher from 178,923. Breadth was constructive, with the KSE-30, KMI-30, and All Share indices all gaining between 0.76% and 1.00%, suggesting the rally was not concentrated in a handful of names. Consumer stocks were the session's top sectoral performers, with the ACI index rising 1.72%, likely reflecting optimism around the petrol price cut and its downstream effect on household purchasing power. The JS Momentum index's 1.34% gain is worth tracking as a leading indicator of whether this rally has legs into the next session.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$73.07", unit: "/bbl", open: "73.60", high: "73.97", low: "72.58" },
      { name: "WTI Crude Oil", value: "$69.90", unit: "/bbl", open: "70.50", high: "70.97", low: "69.32" },
      { name: "Natural Gas", value: "$3.2570", unit: "/MMBtu", open: "3.2810", high: "3.3130", low: "3.2380" },
      { name: "Gold", value: "$4,049", unit: "/oz", open: "4,101", high: "4,103", low: "4,038" },
      { name: "Silver", value: "$58.15", unit: "/oz", open: "59.30", high: "59.92", low: "57.84" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Crude oil took a severe hit this week, with Brent settling at $71.99 per barrel and WTI at $69.23, representing weekly declines of roughly 10% and 11% respectively. Dubai Platts, the benchmark most relevant to Pakistan's actual procurement, fell a striking 22.9% from $103.15 to $79.52, which should translate into a meaningful reduction in the country's petroleum import bill in the weeks ahead. Gold pulled back 1.18% over the week from $4,145 to $4,096, though it held above $4,079 intraday, suggesting underlying safe-haven demand remains firm. Natural gas edged up 2.53% to $3.28 per MMBtu, a modest move but one to monitor given Pakistan's LNG import exposure and its effect on power generation costs.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "51,876", open: "51,804", range: "51,615 – 52,130", region: "Americas" },
      { name: "Nasdaq", close: "25,298", open: "25,105", range: "25,015 – 25,491", region: "Americas" },
      { name: "S&P 500", close: "7,354", open: "7,313", range: "7,294 – 7,393", region: "Americas" },
      { name: "CAC 40", close: "8,357", open: "8,379", range: "8,341 – 8,379", region: "Europe" },
      { name: "DAX", close: "24,687", open: "24,724", range: "24,646 – 24,762", region: "Europe" },
      { name: "FTSE 100", close: "10,489", open: "10,508", range: "10,473 – 10,521", region: "Europe" },
      { name: "Stoxx 600", close: "635.52", open: "636.09", range: "634.48 – 636.84", region: "Europe" },
      { name: "Hang Seng", close: "23,027", open: "22,828", range: "22,784 – 23,183", region: "Asia" },
      { name: "KOSPI", close: "8,395", open: "8,334", range: "8,128 – 8,526", region: "Asia" },
      { name: "Nikkei 225", close: "69,468", open: "69,610", range: "67,998 – 69,610", region: "Asia" },
      { name: "Sensex", close: "76,728", open: "77,055", range: "76,622 – 77,253", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,074", open: "4,027", range: "3,993 – 4,075", region: "Asia" },
      { name: "EUR / USD", close: "1.1408", open: "1.1390", range: "1.1383 – 1.1418", region: "Currencies" },
      { name: "GBP / USD", close: "1.3224", open: "1.3206", range: "1.3192 – 1.3228", region: "Currencies" },
      { name: "USD / CNY", close: "6.7827", open: "6.7897", range: "6.7786 – 6.8042", region: "Currencies" },
      { name: "USD / PKR", close: "278.04", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Global equity markets had a mixed to negative week, with the S&P 500 declining 1.95% from 7,501 to 7,354 while European and Asian indices showed varied performance across Frankfurt, Paris, London, and Hong Kong. The euro softened 0.79% against the dollar, moving from 1.1480 to 1.1390, reflecting ongoing divergence in growth expectations between the US and Europe. For Pakistan, the USD/PKR rate held essentially flat at 277.92 throughout the week, providing a degree of stability that aids business planning and keeps import cost calculations predictable in the near term. Any renewed dollar strengthening driven by US macro surprises would quickly test that stability, so the Federal Reserve's next policy signals deserve close attention from Pakistani importers and the SBP alike.",
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
