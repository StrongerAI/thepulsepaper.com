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
  lastUpdated: "30 June 2026, 4:00 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "180,302", changePct: "+1.06%", direction: "up", spark: [173962.81, 170600.2, 171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26, 178414.79] },
    { name: "Brent", value: "$73.93", changePct: "+1.07%", direction: "up", spark: [72.71, 72.46, 72.63, 73.37, 72.71, 72.97, 72.94, 73.42, 73.18, 74.0, 74.27, 74.96, 75.03, 75.24, 75.73, 75.6, 75.0, 75.06, 75.17, 75.39, 74.83, 74.38, 74.22, 74.08, 74.55, 74.16, 73.46, 72.86, 72.65, 73.05, 73.47, 72.73, 72.81, 72.67, 72.4, 72.65, 72.64, 72.44, 72.8, 73.4, 72.6, 73.25, 73.03, 73.12, 73.19, 73.22, 73.29, 73.21, 72.72, 73.16, 72.73, 73.3, 73.72, 73.04, 73.15, 73.24, 73.29, 73.66, 73.8, 73.97, 74.04, 73.68, 73.75, 73.64, 73.56, 73.51, 73.51, 73.56, 73.89, 73.59, 73.49, 73.33, 73.41, 73.48, 73.69, 74.24, 73.93] },
    { name: "Dubai Platts", value: "$79.52", changePct: "-22.9%", direction: "down", spark: [] },
    { name: "Gold", value: "$4,043", changePct: "+0.52%", direction: "up", spark: [4011.8, 4001.6, 3992.7, 4003.5, 4004.9, 4003.4, 3999.5, 3995.3, 4028.2, 4017.5, 4027.6, 4057.5, 4044.0, 4050.2, 4050.4, 4041.6, 4041.6, 4041.4, 4030.2, 4035.1, 4035.9, 4006.0, 4018.6, 4026.8, 4023.2, 4047.2, 4046.4, 4046.1, 4062.8, 4069.8, 4061.0, 4074.0, 4088.7, 4095.7, 4106.3, 4099.9, 4089.6, 4082.2, 4086.2, 4096.3, 4080.8, 4076.7, 4083.9, 4075.8, 4080.8, 4083.2, 4065.7, 4069.0, 4077.0, 4076.3, 4060.9, 4045.8, 4051.1, 4053.3, 4057.8, 4046.4, 4039.5, 4041.5, 4038.4, 4035.3, 4027.8, 4030.4, 4030.5, 4028.4, 4029.4, 4001.3, 3982.7, 3975.8, 3983.8, 3999.2, 3991.1, 4043.5, 4046.3, 4029.0, 4038.0, 4043.3] },
    { name: "USD/PKR", value: "277.73", changePct: "Flat", direction: "flat", spark: [277.93, 277.93, 277.93, 278.08, 277.89, 278.04, 278.04, 277.87, 277.89, 277.89, 278.04, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 278.05, 277.78, 277.78, 277.7, 277.61, 277.61, 277.61, 277.61, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.92, 277.7, 277.87, 277.87, 277.9, 277.9, 277.97, 277.97, 278.04, 277.92, 277.92, 277.92, 277.92, 277.8, 277.92, 278.07, 277.93, 277.69, 277.9, 277.72, 277.73, 277.73, 277.73] },
    { name: "S&P 500", value: "7,440", changePct: "+1.18%", direction: "up", spark: [7417.41, 7373.18, 7402.1, 7403.65, 7382.2, 7378.27, 7365.92, 7393.15, 7424.61, 7409.55, 7350.28, 7371.24, 7348.06, 7359.9, 7382.93, 7369.73, 7370.2, 7360.66, 7386.58, 7352.54, 7357.17, 7361.98, 7374.04, 7361.52, 7375.14, 7355.99, 7349.41, 7337.81, 7390.62, 7406.85, 7412.32, 7430.68, 7430.54, 7437.76, 7439.26] },
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
    { date: "30 Jun", value: 73.93 },
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
    { date: "30 Jun", value: 4043.4 },
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
    { date: "30 Jun", value: 277.73 },
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
      { name: "Brent crude", prev: "$71.99", current: "$73.93", change: "+2.69%", direction: "up" },
      { name: "WTI crude", prev: "$69.23", current: "$70.67", change: "+2.08%", direction: "up" },
      { name: "Dubai Platts", prev: "$103.15", current: "$79.52", change: "-22.9%", direction: "down" },
      { name: "Gold", prev: "$4,079", current: "$4,044", change: "-0.86%", direction: "down" },
      { name: "Silver", prev: "$59.22", current: "$59.47", change: "+0.44%", direction: "up" },
      { name: "Natural Gas", prev: "$3.23", current: "$3.23", change: "-0.06%", direction: "down" },
      { name: "USD / PKR", prev: "277.70", current: "277.73", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1395", current: "1.1405", change: "+0.09%", direction: "up" },
      { name: "S&P 500", prev: "7,354", current: "7,440", change: "+1.18%", direction: "up" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 431,500", current: "Rs 431,500", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,780", current: "Rs 6,780", change: "Flat", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The week's most eye-catching domestic development is the sharp reduction in petrol prices, with MS dropping from Rs 373.78 to Rs 299.50, a cut of Rs 74.28 per litre. That magnitude of relief will feed directly into transport costs and secondary inflation, and the SPI holding flat at 14.47 percent year-on-year suggests broader price pressures have not yet unwound. The rupee edged marginally stronger, moving from 278.00 to 277.70 against the dollar, which provides a thin cushion on the import bill. Watch whether the petrol price cut triggers a visible dip in the SPI reading over the coming fortnightly cycle.",
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
    commentary: "The KSE-100 slipped 1,156 points over the week to close at 178,415, a decline of 0.64 percent, with broader selling pressure visible across all headline indices. The KMI-30 was the hardest hit among the major benchmarks, falling 0.98 percent, while the Oil and Gas sector index dropped 1.14 percent, likely reflecting the domestic petrol price revision compressing refining and marketing margins. Banks lost 0.60 percent and the consumer sector shed 0.67 percent, suggesting the retreat was broad rather than sector-specific. The JS Momentum index falling 1.13 percent signals that high-beta positioning is being trimmed, so watch for whether institutional flows return once the macro picture on interest rates becomes clearer.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$73.93", unit: "/bbl", open: "73.65", high: "74.38", low: "73.06" },
      { name: "WTI Crude Oil", value: "$70.67", unit: "/bbl", open: "70.43", high: "71.18", low: "69.75" },
      { name: "Natural Gas", value: "$3.2290", unit: "/MMBtu", open: "3.1710", high: "3.2380", low: "3.1590" },
      { name: "Gold", value: "$4,043", unit: "/oz", open: "4,032", high: "4,052", low: "3,955" },
      { name: "Silver", value: "$59.46", unit: "/oz", open: "58.77", high: "60.08", low: "57.06" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Brent crude gained 2.89 percent over the week to close at 74.07 dollars per barrel, while WTI rose 2.47 percent to 70.94 dollars, a moderate tightening that will complicate Pakistan's import bill planning heading into the next pricing cycle. The Dubai Platts figure, which is the more relevant benchmark for Pakistan's crude basket, posted a striking decline of 22.9 percent from 103.15 to 79.52 dollars, a divergence from Brent that warrants scrutiny and may reflect data or methodology differences rather than a clean market move. Gold pulled back 1.06 percent to 4,036 dollars per ounce while silver slipped 0.92 percent to 58.67 dollars, easing some pressure on local jewellery demand. Natural gas softened to 3.19 dollars per MMBtu, and the direction of that benchmark will matter for Pakistan's LNG procurement costs in the months ahead.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "52,183", open: "51,995", range: "51,950 – 52,312", region: "Americas" },
      { name: "Nasdaq", close: "25,820", open: "25,502", range: "25,290 – 25,834", region: "Americas" },
      { name: "S&P 500", close: "7,440", open: "7,392", range: "7,349 – 7,444", region: "Americas" },
      { name: "CAC 40", close: "8,413", open: "8,378", range: "8,372 – 8,419", region: "Europe" },
      { name: "DAX", close: "24,972", open: "24,815", range: "24,795 – 24,985", region: "Europe" },
      { name: "FTSE 100", close: "10,601", open: "10,484", range: "10,484 – 10,602", region: "Europe" },
      { name: "Stoxx 600", close: "643.04", open: "638.28", range: "638.28 – 643.20", region: "Europe" },
      { name: "Hang Seng", close: "22,881", open: "23,008", range: "22,685 – 23,087", region: "Asia" },
      { name: "KOSPI", close: "8,476", open: "8,417", range: "8,221 – 8,668", region: "Asia" },
      { name: "Nikkei 225", close: "70,062", open: "70,086", range: "69,302 – 70,667", region: "Asia" },
      { name: "Sensex", close: "76,479", open: "77,006", range: "76,329 – 77,037", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,094", open: "4,058", range: "4,052 – 4,097", region: "Asia" },
      { name: "EUR / USD", close: "1.1405", open: "1.1430", range: "1.1387 – 1.1430", region: "Currencies" },
      { name: "GBP / USD", close: "1.3236", open: "1.3258", range: "1.3222 – 1.3262", region: "Currencies" },
      { name: "USD / CNY", close: "6.7737", open: "6.7868", range: "6.7702 – 6.7926", region: "Currencies" },
      { name: "USD / PKR", close: "277.73", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Global equities delivered a constructive week, with the S&P 500 rising 1.09 percent to 7,434 and the Dow Jones closing at 52,258, signalling that risk appetite in developed markets remains firm despite ongoing macro uncertainty. Asian markets showed considerable divergence, with the Nikkei 225 closing at 69,361 and the Hang Seng at 22,672, reflecting differing domestic growth narratives across the region. On currencies, the EUR/USD slipped 0.74 percent from 1.1480 to 1.1395, while the rupee held remarkably stable at 277.92 against the dollar, providing a degree of predictability for importers pricing contracts. The relative calm in USD/PKR is a positive signal for the State Bank's reserve management, but any renewed dollar strength globally would quickly test that stability.",
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
