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
  lastUpdated: "25 June 2026, 9:29 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    // -- AUTO:ticker --
    { name: "KSE-100", value: "179,571", changePct: "+1.06%", direction: "up", spark: [171725.29, 173962.81, 170600.2, 171021.77, 170190.64, 171175.5, 170478.94, 168953.7, 170330.56, 169427.44, 169703.6, 172399.9, 177039.82, 180392.97, 180511.02, 181398.21, 178922.75, 178471.86, 177692.92, 179571.26] },
    { name: "Brent", value: "$75.00", changePct: "+1.71%", direction: "up", spark: [80.59, 81.6, 80.8, 79.48, 79.07, 79.4, 79.13, 79.01, 79.1, 79.56, 79.14, 79.31, 79.25, 78.96, 78.56, 77.87, 78.06, 77.47, 77.74, 77.41, 78.04, 78.27, 80.59, 78.25, 78.17, 78.16, 77.87, 77.87, 77.53, 77.54, 76.95, 76.84, 77.03, 77.41, 77.53, 77.9, 77.76, 77.2, 76.67, 76.81, 76.9, 76.83, 76.87, 77.24, 77.05, 76.88, 76.78, 76.54, 76.74, 76.48, 76.06, 76.33, 76.47, 76.33, 76.38, 75.77, 75.79, 75.79, 75.59, 74.66, 74.57, 73.37, 73.47, 74.04, 74.09, 73.96, 73.19, 73.33, 73.18, 73.11, 73.22, 73.34, 72.49, 72.62, 72.51, 72.71, 72.46, 72.63, 73.37, 72.71, 72.97, 72.94, 73.42, 73.18, 74.0, 74.27, 74.96, 75.02] },
    { name: "Dubai Platts", value: "$79.52", changePct: "-22.9%", direction: "down", spark: [] },
    { name: "Gold", value: "$4,058", changePct: "+1.70%", direction: "up", spark: [4172.8, 4157.0, 4218.1, 4208.1, 4205.7, 4189.6, 4199.4, 4211.3, 4215.4, 4208.5, 4215.7, 4226.2, 4222.7, 4225.3, 4211.4, 4218.5, 4216.7, 4201.0, 4208.5, 4201.4, 4209.1, 4209.4, 4172.9, 4207.8, 4205.5, 4210.7, 4179.3, 4164.9, 4162.2, 4135.6, 4138.9, 4132.4, 4116.0, 4122.6, 4140.1, 4137.7, 4141.1, 4131.0, 4154.1, 4147.5, 4156.7, 4151.9, 4145.9, 4135.6, 4129.6, 4129.0, 4121.2, 4116.6, 4114.7, 4106.5, 4078.3, 4079.9, 4080.6, 4093.1, 4103.9, 4091.5, 4093.3, 4081.8, 4072.3, 4063.2, 4004.0, 4054.9, 4025.0, 4019.5, 4023.4, 3989.8, 3998.1, 4004.9, 4016.4, 4012.0, 4026.6, 4007.3, 3992.2, 3998.7, 4012.4, 4011.8, 4001.6, 3992.7, 4003.5, 4004.9, 4003.4, 3999.5, 3995.3, 4028.2, 4017.5, 4027.6, 4057.5, 4056.9] },
    { name: "USD/PKR", value: "277.92", changePct: "Flat", direction: "flat", spark: [277.98, 278.0, 278.2, 278.08, 278.04, 278.0, 278.02, 278.02, 278.02, 277.98, 277.98, 277.98, 277.98, 278.0, 277.98, 277.7, 278.08, 278.08, 278.09, 277.89, 277.89, 277.89, 278.09, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.9, 278.08, 278.05, 278.08, 278.02, 278.02, 278.02, 278.02, 278.02, 278.08, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 277.93, 278.08, 277.89, 278.04, 278.04, 277.87, 277.89, 277.89, 278.04, 277.92, 277.92, 277.92, 277.92, 277.7, 277.92, 277.92, 277.92, 277.92, 278.05, 277.78, 277.78, 277.7, 277.61, 277.61, 277.61, 277.61, 277.92, 277.92] },
    { name: "S&P 500", value: "7,369", changePct: "+0.15%", direction: "up", spark: [7482.17, 7482.77, 7496.19, 7505.53, 7494.93, 7489.88, 7497.86, 7495.25, 7472.26, 7476.54, 7475.81, 7479.85, 7462.87, 7475.46, 7417.41, 7373.18, 7402.1, 7403.65, 7382.2, 7378.27, 7365.92, 7393.15, 7424.61, 7409.55, 7350.28, 7371.24, 7348.06, 7359.9, 7382.93, 7369.73, 7367.6] },
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
    { date: "25 Jun", value: 179571 },
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
    { date: "25 Jun", value: 75.0 },
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
    { date: "25 Jun", value: 4058.3 },
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
    { date: "25 Jun", value: 434500 },
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
    { date: "25 Jun", value: 277.92 },
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
      { name: "Brent crude", prev: "$80.59", current: "$75.02", change: "-6.91%", direction: "down" },
      { name: "WTI crude", prev: "$77.54", current: "$71.59", change: "-7.67%", direction: "down" },
      { name: "Dubai Platts", prev: "$103.15", current: "$79.52", change: "-22.9%", direction: "down" },
      { name: "Gold", prev: "$4,145", current: "$4,057", change: "-2.13%", direction: "down" },
      { name: "Silver", prev: "$66.25", current: "$58.76", change: "-11.32%", direction: "down" },
      { name: "Natural Gas", prev: "$3.20", current: "$3.30", change: "+3.16%", direction: "up" },
      { name: "USD / PKR", prev: "278.00", current: "277.92", change: "Flat", direction: "flat" },
      { name: "EUR / USD", prev: "1.1480", current: "1.1388", change: "-0.80%", direction: "down" },
      { name: "S&P 500", prev: "7,501", current: "7,368", change: "-1.77%", direction: "down" },
      { name: "Petrol (MS)", prev: "Rs 373.78", current: "Rs 299.50", change: "-Rs 74.28", direction: "down" },
      { name: "Gold 24K (tola)", prev: "Rs 434,500", current: "Rs 434,500", change: "Flat", direction: "flat" },
      { name: "Silver (tola)", prev: "Rs 6,780", current: "Rs 6,780", change: "Flat", direction: "flat" },
      { name: "SPI (YoY)", prev: "14.47%", current: "14.47%", change: "Flat", direction: "flat" },
    // -- /AUTO:wow-rows --
    ],
    // -- AUTO:commentary-wow --
    commentary: "The headline story this week is the sharp drop in global crude prices, with Brent falling 6.91% to $75.02 and Dubai Platts sliding 6.2% to $103.15, which feeds directly into Pakistan's import bill calculations and the State Bank's inflation outlook. The most visible domestic consequence is the dramatic cut in motor spirit prices, from Rs 373.78 to Rs 299.50, a reduction of Rs 74.28 per litre that will offer meaningful relief to consumers and transport operators alike. The SPI holding flat at 14.47% year-on-year suggests price pressures have not yet fully eased at the retail level, so the petrol cut could be the catalyst that nudges that number lower in coming weeks. Watch the next SPI reading closely for confirmation that the pump price reduction is filtering through to the broader consumption basket.",
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
    commentary: "The KSE-100 closed the week at 179,571, posting a weekly gain of 648 points or 0.36%, with Friday's session alone contributing a 1.06% advance that kept bullish momentum intact. Breadth was healthy across the board, with the KSE-30, All Share, and KMI All Share indices all advancing in near-lockstep, suggesting broad participation rather than a narrow rally driven by a handful of heavyweights. The consumer sector index led sectoral gains at 1.72%, which makes sense given the sharp petrol price cut announced this week; lower fuel costs lift discretionary spending expectations and compress input costs for consumer-facing businesses. Banks also outperformed at plus 1.37%, likely pricing in the view that falling inflation could give the State Bank room to cut rates further, which would re-price fixed-income portfolios and support lending margins in a declining-rate environment.",
    // -- /AUTO:commentary-psx --
  },

  // -- International commodities + commentary --
  commodities: {
    rows: [
      // -- AUTO:commodities-rows --
      { name: "Brent Crude", value: "$75.00", unit: "/bbl", open: "73.10", high: "75.15", low: "72.43" },
      { name: "WTI Crude Oil", value: "$71.59", unit: "/bbl", open: "69.95", high: "71.76", low: "68.90" },
      { name: "Natural Gas", value: "$3.2990", unit: "/MMBtu", open: "3.2630", high: "3.3530", low: "3.2180" },
      { name: "Gold", value: "$4,058", unit: "/oz", open: "4,019", high: "4,060", low: "3,976" },
      { name: "Silver", value: "$58.78", unit: "/oz", open: "57.60", high: "59.05", low: "56.40" },
    // -- /AUTO:commodities-rows --
    ],
    // -- AUTO:commentary-commodities --
    commentary: "Crude oil bore the brunt of global risk-off sentiment this week, with WTI declining a steep 7.67% to $71.59 per barrel while Brent settled at $75.00, down from $80.59 a week ago. For Pakistan, which settles the bulk of its energy imports on the Dubai Platts benchmark, the 6.2% weekly decline to $103.15 is particularly meaningful, as it reduces the foreign-exchange burden on the current account at a time when reserves need careful management. Gold pulled back 2.13% to $4,057 per ounce on the week, though the domestic tola price held flat at Rs 434,500, reflecting the near-unchanged rupee rate; silver shed a sharper 11.32% internationally but also held flat locally at Rs 6,780 per tola for the same currency reason. Natural gas bucked the trend with a 3.16% weekly rise to $3.30 per MMBtu, a figure to monitor closely given Pakistan's LNG import dependency and the ongoing strain on the circular debt position.",
    // -- /AUTO:commentary-commodities --
    footnote: "Dubai Platts and certain Pakistan-relevant commodities (CPO, HDPE, PET, SMP) are sourced manually pending reliable free data feeds.",
  },

  // -- International exchanges, grouped by region, with commentary --
  international: {
    rows: [
      // -- AUTO:international-rows --
      { name: "Dow Jones", close: "52,167", open: "52,009", range: "52,009 – 52,656", region: "Americas" },
      { name: "Nasdaq", close: "25,374", open: "25,725", range: "25,123 – 25,725", region: "Americas" },
      { name: "S&P 500", close: "7,369", open: "7,405", range: "7,324 – 7,419", region: "Americas" },
      { name: "CAC 40", close: "8,432", open: "8,389", range: "8,374 – 8,452", region: "Europe" },
      { name: "DAX", close: "24,995", open: "24,810", range: "24,762 – 25,088", region: "Europe" },
      { name: "FTSE 100", close: "10,530", open: "10,462", range: "10,415 – 10,575", region: "Europe" },
      { name: "Stoxx 600", close: "640.21", open: "635.68", range: "635.68 – 642.09", region: "Europe" },
      { name: "Hang Seng", close: "23,412", open: "23,421", range: "23,249 – 23,566", region: "Asia" },
      { name: "KOSPI", close: "8,471", open: "8,471", range: "8,471 – 8,471", region: "Asia" },
      { name: "Nikkei 225", close: "69,175", open: "69,615", range: "68,461 – 70,219", region: "Asia" },
      { name: "Sensex", close: "77,100", open: "77,391", range: "76,993 – 77,803", region: "Asia" },
      { name: "Shanghai Comp.", close: "4,111", open: "4,090", range: "4,075 – 4,117", region: "Asia" },
      { name: "EUR / USD", close: "1.1388", open: "1.1361", range: "1.1337 – 1.1391", region: "Currencies" },
      { name: "GBP / USD", close: "1.3218", open: "1.3168", range: "1.3152 – 1.3219", region: "Currencies" },
      { name: "USD / CNY", close: "6.7855", open: "6.8101", range: "6.7845 – 6.8122", region: "Currencies" },
      { name: "USD / PKR", close: "277.92", open: "", range: "SBP interbank", region: "Currencies", muted: true },
    // -- /AUTO:international-rows --
    ],
    // -- AUTO:commentary-international --
    commentary: "Global equities were mixed to soft this week, with the S&P 500 declining 1.77% to close at 7,368 while European indices showed relative resilience, the DAX holding near 24,995 and the FTSE 100 at 10,530. Asian markets presented a more varied picture, with the Nikkei 225 elevated at 69,175 and the Hang Seng at 23,412, while the Sensex at 77,100 is a benchmark Pakistani fund managers will watch for regional portfolio flow signals. On currencies, the EUR/USD slipped 0.80% to 1.1388 while the USD/CNY held at 6.7855; a firmer dollar and softer yuan together create a complex input-cost environment for Pakistani importers who source goods from China. The rupee was essentially flat at 277.92 against the dollar, which provides a stable base for business planning, but the key variable to watch is whether the current account improvement from lower oil prices is sufficient to sustain that stability through the next import cycle.",
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
