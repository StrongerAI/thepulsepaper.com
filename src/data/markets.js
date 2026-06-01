// src/data/markets.js
// Single source of truth for the Markets page.
// Update this file after each Colab notebook run.
// The page reads from here; change the numbers, commit, and the site rebuilds.

export const marketsData = {

  // -- When this data was last refreshed --
  lastUpdated: "31 May 2026, 5:00 PM PKT",

  // -- Ticker strip: the 6 headline numbers --
  ticker: [
    { name: "KSE-100",       value: "173,963", changePct: "+1.34%", direction: "up"   },
    { name: "Brent",         value: "$92.05",  changePct: "-11% WoW", direction: "down" },
    { name: "Dubai Platts",  value: "$103.15", changePct: "Flat",   direction: "flat" },
    { name: "Gold",          value: "$4,558",  changePct: "+0.7%",  direction: "up"   },
    { name: "USD/PKR",       value: "278.55",  changePct: "Flat",   direction: "flat" },
    { name: "S&P 500",       value: "7,564",   changePct: "+0.6%",  direction: "up"   },
  ],

  // -- Historical data points for charts (append one entry per week) --
  kseHistory: [
    { date: "10 May", value: 166298 },
    { date: "17 May", value: 168514 },
    { date: "24 May", value: 171725 },
    { date: "31 May", value: 173963 },
  ],
  brentHistory: [
    { date: "10 May", value: 101.00 },
    { date: "17 May", value: 109.26 },
    { date: "24 May", value: 104.00 },
    { date: "31 May", value: 92.05  },
  ],

  // -- Week-over-week comparison table --
  weekOverWeek: [
    { name: "KSE-100",       prev: "171,725",   current: "173,963",  change: "+1.3%",  direction: "up"   },
    { name: "Brent crude",   prev: "$104",      current: "$92.05",   change: "-11.5%", direction: "down" },
    { name: "WTI crude",     prev: "$98",       current: "$87.36",   change: "-10.8%", direction: "down" },
    { name: "Dubai Platts",  prev: "$110",      current: "$103.15",  change: "-6.2%",  direction: "down" },
    { name: "Gold",          prev: "$4,400",    current: "$4,558",   change: "+3.6%",  direction: "up"   },
    { name: "Silver",        prev: "$46.80",    current: "$48.32",   change: "+3.2%",  direction: "up"   },
    { name: "Natural Gas",   prev: "$3.55",     current: "$3.42",    change: "-3.7%",  direction: "down" },
    { name: "USD / PKR",     prev: "279.10",    current: "278.55",   change: "Flat",   direction: "flat" },
    { name: "EUR / USD",     prev: "1.1420",    current: "1.1642",   change: "+1.9%",  direction: "up"   },
    { name: "S&P 500",       prev: "7,400",     current: "7,564",    change: "+2.2%",  direction: "up"   },
    { name: "Petrol (MS)",   prev: "Rs 403.78", current: "Rs 381.78", change: "-Rs 22", direction: "down" },
    { name: "SPI (YoY)",     prev: "14.47%",    current: "14.47%",   change: "Flat",   direction: "flat" },
  ],

  // -- PSX indices, grouped --
  psx: {
    headline: [
      { name: "KSE-100",    value: "173,963",  change: "+2,305 (1.34%)", high: "174,088", low: "171,545", direction: "up" },
      { name: "KSE-30",     value: "52,237",   change: "+720 (1.40%)",   high: "52,255",  low: "51,439",  direction: "up" },
      { name: "KMI-30",     value: "250,242",  change: "+3,676 (1.49%)", high: "250,295", low: "246,334", direction: "up" },
      { name: "All Share",  value: "104,308",  change: "+1,094 (1.06%)", high: "104,373", low: "103,047", direction: "up" },
    ],
    sector: [
      { name: "BKTI (Banks)",     value: "47,534",  change: "+235 (0.50%)",  high: "47,581", low: "46,973", direction: "up" },
      { name: "OGTI (Oil & Gas)", value: "36,384",  change: "+42 (0.12%)",   high: "36,554", low: "36,100", direction: "up" },
      { name: "ACI (Consumer)",   value: "22,835",  change: "+438 (1.96%)",  high: "22,879", low: "22,503", direction: "up" },
      { name: "JSGBKTI",          value: "72,793",  change: "+359 (0.50%)",  high: "72,848", low: "72,006", direction: "up" },
    ],
    thematic: [
      { name: "KMI All Share",     value: "67,845",  change: "+803 (1.20%)",  direction: "up" },
      { name: "PSX Div 20",        value: "79,714",  change: "+794 (1.01%)",  direction: "up" },
      { name: "Meezan Pak (MZNPI)",value: "30,801",  change: "+525 (1.73%)",  direction: "up" },
      { name: "MII-30 (Islamic)",  value: "22,711",  change: "+405 (1.81%)",  direction: "up" },
      { name: "NIT Gateway",       value: "46,406",  change: "+588 (1.28%)",  direction: "up" },
      { name: "NBP Growth",        value: "50,491",  change: "+568 (1.14%)",  direction: "up" },
      { name: "JS Momentum",       value: "41,584",  change: "+221 (0.54%)",  direction: "up" },
      { name: "HBLTT Index",       value: "18,439",  change: "+26 (0.14%)",   direction: "up" },
    ],
  },

  // -- International commodities --
  // Energy first, then metals, then everything else.
  commodities: [
    { name: "Brent Crude",    value: "$92.05",   unit: "/bbl",   open: "92.80",  high: "93.20",  low: "91.40"  },
    { name: "WTI Crude Oil",  value: "$87.36",   unit: "/bbl",   open: "88.69",  high: "89.02",  low: "86.93"  },
    { name: "Dubai Platts",   value: "$103.15",  unit: "/bbl",   open: "103.40", high: "103.60", low: "102.80" },
    { name: "Natural Gas",    value: "$3.42",    unit: "/MMBtu", open: "3.38",   high: "3.48",   low: "3.36"   },
    { name: "Gold",           value: "$4,558",   unit: "/oz",    open: "4,527",  high: "4,570",  low: "4,520"  },
    { name: "Silver",         value: "$48.32",   unit: "/oz",    open: "47.95",  high: "48.60",  low: "47.80"  },
  ],

  // -- International exchanges, grouped by region for clean display --
  international: [
    // Americas
    { name: "S&P 500",        close: "7,563.60", open: "7,519.80", range: "7,508 \u2013 7,569",   region: "Americas" },
    { name: "Nasdaq",         close: "21,450",   open: "21,310",   range: "21,280 \u2013 21,475", region: "Americas" },
    { name: "Dow Jones",      close: "50,669",   open: "50,661",   range: "50,314 \u2013 50,764", region: "Americas" },
    // Europe
    { name: "FTSE 100",       close: "9,142",    open: "9,118",    range: "9,090 \u2013 9,158",   region: "Europe" },
    { name: "DAX",            close: "23,640",   open: "23,520",   range: "23,490 \u2013 23,680", region: "Europe" },
    { name: "CAC 40",         close: "8,225",    open: "8,180",    range: "8,160 \u2013 8,240",   region: "Europe" },
    { name: "Stoxx 600",      close: "562.40",   open: "560.10",   range: "559 \u2013 563",       region: "Europe" },
    // Asia
    { name: "Nikkei 225",     close: "41,820",   open: "41,650",   range: "41,580 \u2013 41,890", region: "Asia" },
    { name: "Shanghai Comp.", close: "3,485",    open: "3,478",    range: "3,468 \u2013 3,492",   region: "Asia" },
    { name: "Hang Seng",      close: "22,640",   open: "22,510",   range: "22,470 \u2013 22,720", region: "Asia" },
    { name: "Sensex",         close: "84,920",   open: "84,750",   range: "84,600 \u2013 85,050", region: "Asia" },
    { name: "KOSPI",          close: "2,840",    open: "2,832",    range: "2,825 \u2013 2,848",   region: "Asia" },
    // Currencies
    { name: "EUR / USD",      close: "1.1642",   open: "1.1651",   range: "1.1625 \u2013 1.1656", region: "Currencies" },
    { name: "GBP / USD",      close: "1.3520",   open: "1.3505",   range: "1.3490 \u2013 1.3540", region: "Currencies" },
    { name: "USD / CNY",      close: "7.1850",   open: "7.1870",   range: "7.1820 \u2013 7.1890", region: "Currencies" },
    { name: "USD / PKR",      close: "278.55",   open: "",         range: "SBP interbank",         region: "Currencies", muted: true },
  ],

  // -- Editorial analysis cards --
  analysis: [
    {
      title: "PSX broad rally extends, but watch the 175,000 ceiling",
      body: "KSE-100 gained 2,305 points (+1.34%), pushing past 173,000 and extending the recovery from last week\u2019s 171,725 close. All 18 indices finished green. Banks (BKTI +0.50%) lagged the headline indices, while consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led. The rally correlates with Brent\u2019s slide below $95 and the third straight fuel-price cut. But volume remains below the 90-day average, and the 175,000 level is a technical resistance zone. Expect profit-taking if it approaches that level without volume confirmation.",
    },
    {
      title: "Oil\u2019s war premium is gone, but Pakistan still pays Platts",
      body: "Brent at $92.05 is $17 off the $109 peak three weeks ago. The US-Iran MOU framework, Gulf de-escalation, and tentative Hormuz traffic have bled the fear premium out. But Dubai Platts is still at $103.15, an $11 gap above Brent, and Pakistan procures at Platts. The headline crash is only partially translating to the import bill. A fourth fuel-price cut is conditional on Platts following Brent down, not on Brent alone. Hedge against a snap-back if uranium-transfer terms stall.",
    },
    {
      title: "Gold above $4,500 signals global anxiety, not Pakistani demand",
      body: "Gold touched $4,570 intraday, its highest level in the current cycle. Silver at $48.32 is moving with it. The driver is global: G7 long yields at a two-decade high are pushing investors into hard assets, the dollar is weakening against the euro (EUR/USD at 1.1642), and central bank buying continues. For Pakistan, this means the gold import bill stays elevated, tola prices stay high domestically, and the SBP\u2019s own gold reserves mark higher. Not actionable for most readers, but worth watching as a barometer of how the world\u2019s money is positioning.",
    },
    {
      title: "The rupee\u2019s calm is policy-managed, not export-led",
      body: "USD/PKR holds at 278.55, essentially flat for the fourth straight week. The stability looks reassuring but the REER at 105-plus signals real-terms overvaluation. The calm rests on SBP intervention ($14.1 billion cumulative over 21 months, including $933 million of FX purchases in February) and external inflows (IMF, Panda bond) rather than export earnings. If the SBP eventually allows nominal depreciation to correct the REER, import costs jump. Evaluate FX cover on import LCs while the nominal rate is flat and forwards are cheap.",
    },
  ],

  // -- Latest edition callout --
  latestEdition: {
    number: "04",
    title: "The ceasefire trade, priced in, not signed",
    summary: "Full analysis across all ten sections: the oil crash, the FY27 budget with FBR Rs 864B miss, El Ni\u00f1o agricultural risk, and three global divergences to watch.",
    url: "/editions/2026-05-31.html",
  },
};
