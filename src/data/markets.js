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
  lastUpdated: "1 July 2026, 11:00 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "184,050", changePct: "+2.08%", direction: "up", spark: [171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26, 178414.79, 180301.7, 184050.1] },
    { name: "Brent", value: "$71.24", changePct: "-2.30%", direction: "down", spark: [74.08, 74.55, 74.16, 73.46, 72.86, 72.65, 73.05, 73.47, 72.73, 72.81, 72.67, 72.4, 72.65, 72.64, 72.44, 72.8, 73.4, 72.6, 73.25, 73.03, 73.12, 73.19, 73.22, 73.29, 73.21, 72.72, 73.16, 72.73, 73.3, 73.72, 73.04, 73.15, 73.24, 73.29, 73.66, 73.8, 73.97, 74.04, 73.68, 73.75, 73.64, 73.56, 73.51, 73.51, 73.56, 73.89, 73.59, 73.49, 73.33, 73.41, 73.48, 73.69, 74.24, 73.95, 74.42, 74.22, 74.26, 73.94, 73.37, 73.35, 73.16, 73.36, 73.42, 73.37, 73.35, 73.48, 73.51, 73.2, 73.24, 73.24, 73.19, 73.04, 73.09, 72.92, 71.75, 72.18, 72.31, 72.3, 71.85, 72.16, 71.28, 71.19, 71.31, 71.24] },
    { name: "Dubai Platts", value: "$79.52", changePct: "-22.9%", direction: "down", spark: [] },
    { name: "Gold", value: "$4,086", changePct: "+1.56%", direction: "up", spark: [4026.8, 4023.2, 4047.2, 4046.4, 4046.1, 4062.8, 4069.8, 4061.0, 4074.0, 4088.7, 4095.7, 4106.3, 4099.9, 4089.6, 4082.2, 4086.2, 4096.3, 4080.8, 4076.7, 4083.9, 4075.8, 4080.8, 4083.2, 4065.7, 4069.0, 4077.0, 4076.3, 4060.9, 4045.8, 4051.1, 4053.3, 4057.8, 4046.4, 4039.5, 4041.5, 4038.4, 4035.3, 4027.8, 4030.4, 4030.5, 4028.4, 4029.4, 4001.3, 3982.7, 3975.8, 3983.8, 3999.2, 3991.1, 4043.5, 4046.3, 4029.0, 4038.0, 4043.9, 4047.5, 4023.9, 4043.9, 4052.0, 4044.2, 4040.3, 4045.5, 4043.6, 4030.2, 4021.8, 4026.4, 4018.9, 4010.2, 3990.8, 3991.9, 3992.9, 3989.2, 3986.6, 3985.0, 3988.7, 3987.7, 3997.9, 4011.9, 4044.0, 4036.8, 4104.2, 4107.9, 4095.1, 4085.0, 4085.1] },
    { name: "USD/PKR", value: "278.00", changePct: "Flat", direction: "flat", spark: [277.92, 277.92, 278.05, 277.78, 277.78, 277.7, 277.61, 277.61, 277.61, 277.61, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.87, 277.87, 277.9, 277.9, 277.97, 277.97, 278.04, 277.92, 277.92, 277.92, 277.92, 277.8, 277.92, 278.07, 277.93, 277.69, 277.9, 277.72, 277.73, 277.73, 277.73, 277.92, 277.92, 277.92, 277.92, 277.92, 278.0, 278.0, 277.69, 277.72, 277.93, 277.92, 277.92, 277.92, 277.92, 277.88, 278.0] },
    { name: "S&P 500", value: "7,502", changePct: "Flat", direction: "flat", spark: [7382.93, 7369.73, 7370.2, 7360.66, 7386.58, 7352.54, 7357.17, 7361.98, 7374.04, 7361.52, 7375.14, 7355.99, 7349.41, 7337.81, 7390.62, 7406.85, 7412.32, 7430.68, 7430.54, 7437.76, 7439.26, 7472.21, 7480.84, 7491.12, 7493.2, 7495.77, 7502.52, 7496.31, 7496.12, 7520.64, 7517.08, 7506.71, 7502.17] },
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
    { date: "1 Jul", value: 184050 },
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
    { date: "1 Jul", value: 71.24 },
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
    { date: "1 Jul", value: 4085.6 },
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
    { date: "1 Jul", value: 431600 },
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
    { date: "1 Jul", value: 278.0 },
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
      { name: "KSE-100", prev: "179,571", current: "184,050", change: "+2.49%", direction: "up" },
      { name: "Brent crude", prev: "$71.99", current: "$71.24", change: "-1.04%", direction: "down" },
      { name: "WTI crude", prev: "$69.23", current: "$68.19", change: "-1.50%", direction: "down" },
      { name: "Dubai Platts", prev: "$103.15", current: "$79.52", change: "-22.9%", direction: "down" },
      { name: "Gold", prev: "$4,079", current: "$4,085", change: "+0.16%", direction: "up" },
      { name: "Silver", prev: "$59.22", current: "$60.49", change: "+2.15%", direction: "up" },
      { name: "Natural Gas", prev: "$3.23", current: "$3.21", change: "-0.53%", direction: "down" },
      { name: "USD / PKR", prev: "277.70", current: "278.00", change: "+0.11%", direction: "up" },
      { name: "EUR / USD", prev: "1.1395", current: "1.1384", change: "-0.09%", direction: "down" },
      { name: "S&P 500", prev: "7,354", current: "7,502", change: "+2.01%", direction: "up" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 431,600", current: "Rs 431,600", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,774", current: "Rs 6,774", change: "Flat", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The headline number that will dominate conversations in Islamabad and Karachi this week is the motor spirit price cut of Rs 74.28 per litre, bringing petrol down to Rs 299.50. That is a meaningful reduction in transport costs that feeds directly into consumer budgets and logistics expenses for businesses across the supply chain. Brent crude slipped a further 1.04 percent week-on-week to $71.24 per barrel, giving the government room to pass on relief without squeezing the petroleum levy. The SPI inflation reading held flat at 14.47 percent year-on-year, so watch whether this fuel price cut finally pulls that weekly basket measure lower in the coming print.",
    // -- /AUTO:commentary-wow --
  },

  // -- PSX indices, grouped, with commentary --
  // headline, sector, thematic rows auto-managed by pull_markets.py (scraped from dps.psx.com.pk)
  psx: {
    headline: [
      // -- AUTO:psx-headline --
      { name: "KSE-100", value: "184,050", change: "+3,748 (+2.08%)", high: "", low: "", direction: "up" },
      { name: "KSE-30", value: "54,944", change: "+1,228 (+2.29%)", high: "", low: "", direction: "up" },
      { name: "KMI-30", value: "260,635", change: "+3,307 (+1.29%)", high: "", low: "", direction: "up" },
      { name: "All Share", value: "110,790", change: "+1,851 (+1.70%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-headline --
    ],
    sector: [
      // -- AUTO:psx-sector --
      { name: "BKTI (Banks)", value: "51,624", change: "+2,958 (+6.08%)", high: "", low: "", direction: "up" },
      { name: "OGTI (Oil & Gas)", value: "36,943", change: "+44 (+0.12%)", high: "", low: "", direction: "up" },
      { name: "ACI (Consumer)", value: "24,640", change: "+203 (+0.83%)", high: "", low: "", direction: "up" },
      { name: "JSGBKTI", value: "77,564", change: "+4,215 (+5.75%)", high: "", low: "", direction: "up" },
    // -- /AUTO:psx-sector --
    ],
    thematic: [
      // -- AUTO:psx-thematic --
      { name: "KMI All Share", value: "71,378", change: "+594 (+0.84%)", direction: "up" },
      { name: "PSX Div 20", value: "84,649", change: "+1,816 (+2.19%)", direction: "up" },
      { name: "Meezan Pak (MZNPI)", value: "32,194", change: "+432 (+1.36%)", direction: "up" },
      { name: "MII-30 (Islamic)", value: "23,815", change: "+253 (+1.08%)", direction: "up" },
      { name: "NIT Gateway", value: "48,954", change: "+1,252 (+2.62%)", direction: "up" },
      { name: "NBP Growth", value: "52,797", change: "+1,118 (+2.16%)", direction: "up" },
      { name: "JS Momentum", value: "43,744", change: "+597 (+1.38%)", direction: "up" },
    // -- /AUTO:psx-thematic --
    ],
    // -- AUTO:commentary-psx --
    commentary: "The KSE-100 added 3,748 points in the session to close at 184,050, extending its weekly gain to 2.49 percent, and the breadth was convincingly broad with the All Share index also rising 1.70 percent. The standout story was the banking sector: the BKTI index surged 6.08 percent and the JSGBKTI composite jumped 5.75 percent, signalling that institutional money is rotating heavily into financials, possibly in anticipation of an accelerated monetary easing cycle as inflation softens. The KSE-30 outperformed the wider market with a 2.29 percent gain, confirming that large-cap liquidity is driving this rally rather than speculative small-cap activity. Watch the next State Bank policy decision closely, because another rate cut would provide fresh fundamental justification for these bank valuations.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$71.24", unit: "/bbl", open: "73.38", high: "73.52", low: "71.07" },
      { name: "WTI Crude Oil", value: "$68.18", unit: "/bbl", open: "69.98", high: "70.19", low: "68.03" },
      { name: "Natural Gas", value: "$3.2140", unit: "/MMBtu", open: "3.2560", high: "3.2710", low: "3.1950" },
      { name: "Gold", value: "$4,086", unit: "/oz", open: "4,025", high: "4,131", low: "3,973" },
      { name: "Silver", value: "$60.49", unit: "/oz", open: "59.25", high: "61.54", low: "57.56" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Brent crude touched a session low of $71.07 before settling at $71.24, and WTI followed a similar pattern, closing at $68.18 after opening near $70. For Pakistan, which prices its fuel imports largely off the Dubai Platts benchmark, the week-on-week collapse in Dubai Platts from $103.15 to $79.52, a drop of 22.9 percent, is the most consequential data point on the commodities page this week and will directly compress the import bill. Gold climbed to $4,086 per ounce intraday, though the local 24K tola price held flat at Rs 431,600, reflecting the offsetting effect of a stable rupee. Silver's 2.15 percent weekly gain to $60.49 is worth monitoring given Pakistan's growing solar panel imports, where silver is a key input cost.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "52,431", open: "52,231", range: "52,027 – 52,743", region: "Americas" },
      { name: "Nasdaq", close: "26,148", open: "26,040", range: "25,954 – 26,238", region: "Americas" },
      { name: "S&P 500", close: "7,502", open: "7,479", range: "7,450 – 7,522", region: "Americas" },
      { name: "CAC 40", close: "8,337", open: "8,392", range: "8,317 – 8,392", region: "Europe" },
      { name: "DAX", close: "25,040", open: "25,029", range: "24,887 – 25,096", region: "Europe" },
      { name: "FTSE 100", close: "10,478", open: "10,498", range: "10,429 – 10,508", region: "Europe" },
      { name: "Stoxx 600", close: "639.31", open: "641.59", range: "637.20 – 641.61", region: "Europe" },
      { name: "Hang Seng", close: "22,881", open: "23,008", range: "22,685 – 23,087", region: "Asia" },
      { name: "KOSPI", close: "8,476", open: "8,417", range: "8,221 – 8,668", region: "Asia" },
      { name: "Nikkei 225", close: "70,062", open: "70,086", range: "69,302 – 70,667", region: "Asia" },
      { name: "Sensex", close: "76,923", open: "76,545", range: "76,538 – 77,110", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,094", open: "4,058", range: "4,052 – 4,097", region: "Asia" },
      { name: "EUR / USD", close: "1.1384", open: "1.1427", range: "1.1366 – 1.1429", region: "Currencies" },
      { name: "GBP / USD", close: "1.3278", open: "1.3262", range: "1.3221 – 1.3292", region: "Currencies" },
      { name: "USD / CNY", close: "6.7786", open: "6.7783", range: "6.7765 – 6.7967", region: "Currencies" },
      { name: "USD / PKR", close: "278.00", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Global equity markets closed the week on a constructive note, with the S&P 500 gaining 2.01 percent to 7,502 and European bourses also firm, the DAX reaching 25,040 and the FTSE 100 closing at 10,478. Asian markets presented a mixed picture; the Nikkei 225 at 70,062 and the Hang Seng at 22,881 reflect divergent monetary and trade conditions across the region. On currencies, the EUR/USD slipped marginally to 1.1384 and GBP/USD held at 1.3278, while the USD/CNY at 6.7786 suggests Beijing is keeping the yuan relatively steady, a factor relevant to Pakistan given the volume of Chinese machinery and CPEC-related imports priced in renminbi. The USD/PKR rate moved only 0.11 percent to 278.00, and a continuation of that stability, combined with softer oil prices, would give the State Bank additional confidence to keep easing monetary policy.",
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
