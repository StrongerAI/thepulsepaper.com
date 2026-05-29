// src/data/markets.js
// Single source of truth for the Markets page.
// Update this file after each Colab notebook run.
// The page reads from here; change the numbers, commit, and the site rebuilds.

export const marketsData = {

  // -- When this data was last refreshed --
  lastUpdated: "29 May 2026, 3:18 PM PKT",

  // -- Ticker strip: the 5 headline numbers --
  ticker: [
    { name: "KSE-100",  value: "174,030", changePct: "+1.34%", direction: "up"   },
    { name: "Brent",    value: "$87.45",  changePct: "-1.4%",  direction: "down" },
    { name: "Gold",     value: "$4,558",  changePct: "+0.7%",  direction: "up"   },
    { name: "USD/PKR",  value: "279",     changePct: "flat",   direction: "flat" },
    { name: "S&P 500",  value: "7,564",   changePct: "+0.6%",  direction: "up"   },
  ],

  // -- Historical data points for charts (append one entry per week) --
  kseHistory: [
    { date: "10 May", value: 166298 },
    { date: "17 May", value: 168514 },
    { date: "24 May", value: 171725 },
    { date: "29 May", value: 174030 },
  ],
  brentHistory: [
    { date: "10 May", value: 101.00 },
    { date: "17 May", value: 109.26 },
    { date: "24 May", value: 104.00 },
    { date: "29 May", value: 87.45  },
  ],

  // -- Week-over-week comparison table --
  weekOverWeek: [
    { name: "KSE-100",      prev: "168,514",    current: "174,030",  change: "+3.3%",  direction: "up"   },
    { name: "Brent crude",   prev: "~$104",      current: "$87.45",   change: "-15.9%", direction: "down" },
    { name: "WTI crude",     prev: "~$98",       current: "$87.45",   change: "-10.8%", direction: "down" },
    { name: "Gold",          prev: "~$4,400",    current: "$4,558",   change: "+3.6%",  direction: "up"   },
    { name: "USD / PKR",     prev: "~279",       current: "~279",     change: "Flat",   direction: "flat" },
    { name: "EUR / USD",     prev: "~1.14",      current: "1.1642",   change: "+2.1%",  direction: "up"   },
    { name: "S&P 500",       prev: "~7,400",     current: "7,564",    change: "+2.2%",  direction: "up"   },
    { name: "Petrol (MS)",   prev: "Rs 403.78",  current: "TBD",      change: "Next revision pending",  direction: "flat" },
    { name: "SPI (YoY)",     prev: "14.47%",     current: "TBD",      change: "Awaiting PBS release",   direction: "flat" },
  ],

  // -- PSX indices, grouped --
  psx: {
    headline: [
      { name: "KSE-100",    value: "174,030",  change: "+2,305 (1.34%)", high: "174,088", low: "171,545", direction: "up" },
      { name: "KSE-30",     value: "52,237",   change: "+720 (1.40%)",   high: "52,255",  low: "51,439",  direction: "up" },
      { name: "KMI-30",     value: "250,242",  change: "+3,676 (1.49%)", high: "250,295", low: "246,334", direction: "up" },
      { name: "All Share",   value: "104,308",  change: "+1,094 (1.06%)", high: "104,373", low: "103,047", direction: "up" },
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
  commodities: [
    { name: "WTI Crude Oil",  value: "$87.45",   unit: "/bbl", open: "88.69", high: "89.02", low: "86.93"  },
    { name: "Gold",           value: "$4,558",   unit: "/oz",  open: "4,527", high: "4,570", low: "4,520"  },
  ],

  // -- International exchanges --
  international: [
    { name: "S&P 500",    close: "7,563.60",  open: "7,519.80",  range: "7,508 \u2013 7,569"    },
    { name: "Dow Jones",  close: "50,669",     open: "50,661",    range: "50,314 \u2013 50,764"  },
    { name: "EUR / USD",  close: "1.1642",     open: "1.1651",    range: "1.1625 \u2013 1.1656"  },
    { name: "USD / PKR",  close: "~279",       open: "",          range: "Manual; stooq does not carry this pair", muted: true },
  ],

  // -- Editorial analysis cards --
  analysis: [
    {
      title: "PSX broad rally extends, but watch the 175,000 ceiling",
      body: "KSE-100 gained 2,305 points (+1.34%), pushing past 174,000 and extending the recovery from last week\u2019s 168,514 close. All 18 indices finished green. Banks (BKTI +0.50%) lagged the headline indices, while consumer (ACI +1.96%) and Islamic funds (MII-30 +1.81%, MZNPI +1.73%) led. The rally correlates with Brent\u2019s slide below $90 and the second straight fuel-price cut. But volume remains below the 90-day average, and the 175,000 level is a technical resistance zone. Expect profit-taking if it approaches that level without volume confirmation.",
    },
    {
      title: "Oil\u2019s war premium is gone. The supply question is not.",
      body: "WTI at $87.45 is $22 off the $109 Brent peak three weeks ago. The Iran talks are progressing, Gulf states closed ranks against escalation, and the fear premium has largely bled out. But the IEA\u2019s structural call still stands: the market is undersupplied through Q3 2026, with only a modest surplus expected in Q4. What fell is fear, not demand. Pakistan\u2019s import bill benefits at these levels, and a third consecutive fuel-price cut is plausible if the trend holds into next week\u2019s revision window. But hedging against a snap-back remains the right posture.",
    },
    {
      title: "Gold above $4,500 signals global anxiety, not Pakistani demand",
      body: "Gold touched $4,570 intraday, its highest level in the current cycle. The driver is global: G7 long yields at a two-decade high are pushing investors into hard assets, the dollar is weakening against the euro (EUR/USD at 1.1642), and central bank buying continues. For Pakistan, this means the gold import bill stays elevated, tola prices stay high domestically, and the SBP\u2019s own gold reserves mark higher. Not actionable for most readers, but worth watching as a barometer of how the world\u2019s money is positioning.",
    },
    {
      title: "The rupee\u2019s calm is borrowed, not earned",
      body: "USD/PKR holds near 279, unchanged for the fourth straight week. The stability looks reassuring on the surface, but the REER at 105.17 (flagged in Edition 02, unchanged since) signals real-terms overvaluation. The calm rests on reserves projected above $18 billion by June, built largely on borrowing and bilateral inflows rather than export earnings. If the SBP eventually allows nominal depreciation to correct the REER, import costs jump. The window to lock FX cover on import LCs is now, while the nominal rate is flat and forwards are cheap.",
    },
  ],

  // -- Latest edition callout --
  latestEdition: {
    number: "03",
    title: "The imported crisis recedes, the homemade one arrives",
    summary: "Full analysis across all ten sections, including the FY27 budget deep-dive, commodity tables, and action items.",
    url: "/editions/2026-05-24.html",
  },
};
