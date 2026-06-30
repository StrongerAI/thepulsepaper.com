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
  lastUpdated: "30 June 2026, 10:58 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "180,302", changePct: "+1.06%", direction: "up", spark: [170600.2, 171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26, 178414.79, 180301.7] },
    { name: "Brent", value: "$73.15", changePct: "Flat", direction: "flat", spark: [72.71, 72.46, 72.63, 73.37, 72.71, 72.97, 72.94, 73.42, 73.18, 74.0, 74.27, 74.96, 75.03, 75.24, 75.73, 75.6, 75.0, 75.06, 75.17, 75.39, 74.83, 74.38, 74.22, 74.08, 74.55, 74.16, 73.46, 72.86, 72.65, 73.05, 73.47, 72.73, 72.81, 72.67, 72.4, 72.65, 72.64, 72.44, 72.8, 73.4, 72.6, 73.25, 73.03, 73.12, 73.19, 73.22, 73.29, 73.21, 72.72, 73.16, 72.73, 73.3, 73.72, 73.04, 73.15, 73.24, 73.29, 73.66, 73.8, 73.97, 74.04, 73.68, 73.75, 73.64, 73.56, 73.51, 73.51, 73.56, 73.89, 73.59, 73.49, 73.33, 73.41, 73.48, 73.69, 74.24, 73.95, 74.42, 74.22, 74.26, 73.94, 73.37, 73.35, 73.16] },
    { name: "Dubai Platts", value: "$79.52", changePct: "-22.9%", direction: "down", spark: [] },
    { name: "Gold", value: "$4,044", changePct: "+0.55%", direction: "up", spark: [4011.8, 4001.6, 3992.7, 4003.5, 4004.9, 4003.4, 3999.5, 3995.3, 4028.2, 4017.5, 4027.6, 4057.5, 4044.0, 4050.2, 4050.4, 4041.6, 4041.6, 4041.4, 4030.2, 4035.1, 4035.9, 4006.0, 4018.6, 4026.8, 4023.2, 4047.2, 4046.4, 4046.1, 4062.8, 4069.8, 4061.0, 4074.0, 4088.7, 4095.7, 4106.3, 4099.9, 4089.6, 4082.2, 4086.2, 4096.3, 4080.8, 4076.7, 4083.9, 4075.8, 4080.8, 4083.2, 4065.7, 4069.0, 4077.0, 4076.3, 4060.9, 4045.8, 4051.1, 4053.3, 4057.8, 4046.4, 4039.5, 4041.5, 4038.4, 4035.3, 4027.8, 4030.4, 4030.5, 4028.4, 4029.4, 4001.3, 3982.7, 3975.8, 3983.8, 3999.2, 3991.1, 4043.5, 4046.3, 4029.0, 4038.0, 4043.9, 4047.5, 4023.9, 4043.9, 4052.0, 4044.2, 4040.3, 4044.7] },
    { name: "USD/PKR", value: "277.92", changePct: "+0.07%", direction: "up", spark: [277.93, 277.93, 277.93, 278.08, 277.89, 278.04, 278.04, 277.87, 277.89, 277.89, 278.04, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 278.05, 277.78, 277.78, 277.7, 277.61, 277.61, 277.61, 277.61, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.87, 277.87, 277.9, 277.9, 277.97, 277.97, 278.04, 277.92, 277.92, 277.92, 277.92, 277.8, 277.92, 278.07, 277.93, 277.69, 277.9, 277.72, 277.73, 277.73, 277.73, 277.92] },
    { name: "S&P 500", value: "7,493", changePct: "+0.70%", direction: "up", spark: [7393.15, 7424.61, 7409.55, 7350.28, 7371.24, 7348.06, 7359.9, 7382.93, 7369.73, 7370.2, 7360.66, 7386.58, 7352.54, 7357.17, 7361.98, 7374.04, 7361.52, 7375.14, 7355.99, 7349.41, 7337.81, 7390.62, 7406.85, 7412.32, 7430.68, 7430.54, 7437.76, 7439.26, 7472.21, 7480.84, 7491.12, 7493.2, 7492.43] },
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
    { date: "30 Jun", value: 180302 },
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
    { date: "30 Jun", value: 73.15 },
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
    { date: "30 Jun", value: 4044.5 },
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
    { date: "30 Jun", value: 431500 },
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
    { date: "30 Jun", value: 277.92 },
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
      { name: "KSE-100", prev: "179,571", current: "180,302", change: "+0.41%", direction: "up" },
      { name: "Brent crude", prev: "$71.99", current: "$73.16", change: "+1.63%", direction: "up" },
      { name: "WTI crude", prev: "$69.23", current: "$69.72", change: "+0.71%", direction: "up" },
      { name: "Dubai Platts", prev: "$103.15", current: "$79.52", change: "-22.9%", direction: "down" },
      { name: "Gold", prev: "$4,079", current: "$4,045", change: "-0.83%", direction: "down" },
      { name: "Silver", prev: "$59.22", current: "$60.01", change: "+1.35%", direction: "up" },
      { name: "Natural Gas", prev: "$3.23", current: "$3.29", change: "+1.89%", direction: "up" },
      { name: "USD / PKR", prev: "277.70", current: "277.92", change: "+0.08%", direction: "up" },
      { name: "EUR / USD", prev: "1.1395", current: "1.1425", change: "+0.26%", direction: "up" },
      { name: "S&P 500", prev: "7,354", current: "7,492", change: "+1.88%", direction: "up" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 431,500", current: "Rs 431,500", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,780", current: "Rs 6,780", change: "Flat", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The most striking data point in this week's macro table is the Rs 74.28 per litre cut in petrol prices, with MS dropping from Rs 373.78 to Rs 299.50, a move that will directly ease transport and logistics costs across the supply chain. Brent crude edged up 1.63% week-over-week to $73.16, so the relief is coming from policy and exchange rate positioning rather than a collapse in global oil benchmarks. The rupee held remarkably steady, moving just 0.08% to Rs 277.92, which limits any imported inflation pressure for now. Watch whether this petrol price reduction feeds into the SPI reading, which held flat at 14.47% year-on-year this week, as a meaningful pass-through could shift that number meaningfully lower in the coming fortnights.",
    // -- /AUTO:commentary-wow --
  },

  // -- PSX indices, grouped, with commentary --
  // headline, sector, thematic rows auto-managed by pull_markets.py (scraped from dps.psx.com.pk)
  psx: {
    headline: [
      // -- AUTO:psx-headline --
      { name: "KSE-100", value: "180,302", change: "+1,887 (+1.06%)", high: "", low: "", direction: "up" },
      { name: "KSE-30", value: "53,716", change: "+603 (+1.14%)", high: "", low: "", direction: "up" },
      { name: "KMI-30", value: "257,327", change: "+3,127 (+1.23%)", high: "", low: "", direction: "up" },
      { name: "All Share", value: "108,939", change: "+959 (+0.89%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "48,666", change: "+330 (+0.68%)", high: "", low: "", direction: "up" },
      { name: "OGTI (Oil & Gas)", value: "36,899", change: "+143 (+0.39%)", high: "", low: "", direction: "up" },
      { name: "ACI (Consumer)", value: "24,437", change: "+143 (+0.59%)", high: "", low: "", direction: "up" },
      { name: "JSGBKTI", value: "73,348", change: "+329 (+0.45%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "70,784", change: "+608 (+0.87%)", direction: "up" },
      { name: "PSX Div 20", value: "82,833", change: "+567 (+0.69%)", direction: "up" },
      { name: "Meezan Pak (MZNPI)", value: "31,762", change: "+431 (+1.38%)", direction: "up" },
      { name: "MII-30 (Islamic)", value: "23,561", change: "+295 (+1.27%)", direction: "up" },
      { name: "NIT Gateway", value: "47,702", change: "+684 (+1.45%)", direction: "up" },
      { name: "NBP Growth", value: "51,679", change: "+573 (+1.12%)", direction: "up" },
      { name: "JS Momentum", value: "43,147", change: "+373 (+0.87%)", direction: "up" },
    // -- /AUTO:psx-thematic --
    ],
    // -- AUTO:commentary-psx --
    commentary: "The KSE-100 added 1,887 points on the day to close at 180,302, extending the weekly gain to 0.41%, and the broader market confirmed the rally's health with the All Share index rising 0.89%. Islamic indices outperformed the mainstream benchmarks, with the Meezan Pakistan Index up 1.38% and the MII-30 gaining 1.27%, reflecting strong retail and institutional interest in Shariah-compliant counters. The NIT Gateway index led all thematic trackers at 1.45%, signalling that defensive, income-oriented portfolios are attracting flows. With the petrol price cut improving consumer sentiment and the rupee stable, the next catalyst to watch is the State Bank of Pakistan's upcoming monetary policy decision and whether further rate easing continues to pull fixed-income money toward equities.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$73.15", unit: "/bbl", open: "73.65", high: "74.84", low: "73.04" },
      { name: "WTI Crude Oil", value: "$69.72", unit: "/bbl", open: "70.43", high: "71.60", low: "69.57" },
      { name: "Natural Gas", value: "$3.2930", unit: "/MMBtu", open: "3.1710", high: "3.3280", low: "3.1590" },
      { name: "Gold", value: "$4,044", unit: "/oz", open: "4,032", high: "4,078", low: "3,955" },
      { name: "Silver", value: "$59.99", unit: "/oz", open: "58.77", high: "60.91", low: "57.06" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Brent crude closed at $73.15 per barrel, essentially flat on the day after touching a session high of $74.84, while WTI settled at $69.72 following a weekly gain of 0.71%. The Dubai Platts figure is the anomaly worth flagging: at $79.52 it represents a 22.9% week-over-week drop, and since Pakistan's crude import pricing is benchmarked closer to Dubai grades, this swing, if sustained, could meaningfully reduce the country's import bill in the near term. Gold pulled back 0.83% over the week to $4,045 per ounce, though domestic gold prices held flat at Rs 431,500 per tola, suggesting the rupee's stability absorbed the global softness. Natural gas rose 1.89% to $3.29 per MMBtu, a number to monitor as LNG spot procurement costs for Pakistan's power sector remain sensitive to even modest moves in global gas benchmarks.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "52,335", open: "52,168", range: "52,033 – 52,387", region: "Americas" },
      { name: "Nasdaq", close: "26,165", open: "25,824", range: "25,808 – 26,194", region: "Americas" },
      { name: "S&P 500", close: "7,493", open: "7,441", range: "7,438 – 7,500", region: "Americas" },
      { name: "CAC 40", close: "8,404", open: "8,378", range: "8,363 – 8,421", region: "Europe" },
      { name: "DAX", close: "24,996", open: "24,815", range: "24,795 – 25,024", region: "Europe" },
      { name: "FTSE 100", close: "10,497", open: "10,484", range: "10,484 – 10,613", region: "Europe" },
      { name: "Stoxx 600", close: "641.73", open: "638.28", range: "638.28 – 643.55", region: "Europe" },
      { name: "Hang Seng", close: "23,027", open: "22,828", range: "22,784 – 23,183", region: "Asia" },
      { name: "KOSPI", close: "8,395", open: "8,395", range: "8,395 – 8,395", region: "Asia" },
      { name: "Nikkei 225", close: "69,468", open: "69,610", range: "67,998 – 69,610", region: "Asia" },
      { name: "Sensex", close: "76,479", open: "77,006", range: "76,329 – 77,037", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,074", open: "4,027", range: "3,993 – 4,075", region: "Asia" },
      { name: "EUR / USD", close: "1.1425", open: "1.1430", range: "1.1387 – 1.1436", region: "Currencies" },
      { name: "GBP / USD", close: "1.3256", open: "1.3258", range: "1.3214 – 1.3276", region: "Currencies" },
      { name: "USD / CNY", close: "6.7752", open: "6.7868", range: "6.7702 – 6.7926", region: "Currencies" },
      { name: "USD / PKR", close: "277.92", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Global equity markets delivered a strong week, with the S&P 500 gaining 1.88% to reach 7,493 and the Dow Jones closing at 52,335, reflecting renewed risk appetite that typically encourages portfolio inflows into frontier and emerging markets including Pakistan. European indices also held firm, with the DAX at 24,996 and the FTSE 100 at 10,497, suggesting the global growth narrative is not deteriorating sharply. On currencies, the euro strengthened slightly to 1.1425 against the dollar and the yuan sits at 6.7752 per dollar, both of which influence the competitiveness of Pakistan's textile exports priced in dollar terms against regional peers. The pound at 1.3256 is worth watching for Pakistani remittance flows from the UK corridor, which remain a critical pillar of foreign exchange reserves.",
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
