// src/data/pulse-index.js
// Pulse External-Stress Index — single source of truth.
//
// Updated monthly with each edition. Not auto-updated by cron.
// Sources: SBP (reserves, REER, CA), PBS (imports), worldgovernmentbonds.com (CDS)
//
// Methodology: 4 components, each scored 0–100, weighted average.
// Higher composite = more external stress.

export const pulseIndex = {
  name: "Pulse External-Stress Index",
  version: "1.0",

  weights: {
    importCover: 0.30,
    reer: 0.20,
    currentAccount: 0.25,
    sovereignSpread: 0.25,
  },

  readings: [
    {
      date: "Jan 2026",
      preliminary: false,
      raw: { reserves: 16.10, imports: 5.79, importCover: 2.78, reer: 103.3, ca: 121, cds: 505 },
      scores: { importCover: 47, reer: 30, currentAccount: 0, sovereignSpread: 44 },
      composite: 31,
      note: "Pre-war baseline. Reserves stable, REER near equilibrium, CA in surplus, CDS at post-recovery lows.",
    },
    {
      date: "Feb 2026",
      preliminary: true,
      raw: { reserves: 16.30, imports: 5.5, importCover: 2.96, reer: 102.5, ca: 231, cds: 500 },
      scores: { importCover: 41, reer: 25, currentAccount: 0, sovereignSpread: 43 },
      composite: 28,
      note: "Lowest reading. Import cover near 3 months, REER eased toward equilibrium, CA surplus widened. Last calm month before Hormuz.",
    },
    {
      date: "Mar 2026",
      preliminary: false,
      raw: { reserves: 16.69, imports: 4.89, importCover: 3.41, reer: 105.2, ca: 1070, cds: 577 },
      scores: { importCover: 24, reer: 42, currentAccount: 0, sovereignSpread: 54 },
      composite: 29,
      note: "Hormuz war begins. CDS spikes 77bps. But reserves held and CA posted record surplus ($1.07B) as imports compressed. REER jumped on inflation differential.",
    },
    {
      date: "Apr 2026",
      preliminary: false,
      raw: { reserves: 17.20, imports: 5.97, importCover: 2.88, reer: 105.0, ca: -324, cds: 550 },
      scores: { importCover: 44, reer: 40, currentAccount: 26, sovereignSpread: 50 },
      composite: 40,
      note: "Peak stress. CA swings to deficit as imports surge ($5.97B). Fuel prices hiked 40%. CDS still elevated. Reserves rose on IMF/bilateral inflows masking underlying pressure.",
    },
    {
      date: "May 2026",
      preliminary: true,
      raw: { reserves: 15.87, imports: 5.5, importCover: 2.89, reer: 106.15, ca: 459, cds: 480 },
      scores: { importCover: 43, reer: 49, currentAccount: 0, sovereignSpread: 41 },
      composite: 33,
      note: "Partial easing. CA returns to surplus. CDS narrows on ceasefire framework. But REER at 106.15 — overvaluation pressure is the emerging risk vector.",
    },
  ],

  forecast: {
    date: "Jun 2026",
    base: 35,
    range: [28, 45],
    rationale: "Oil collapse eases import bill. SBP targets reserves above $18B. CDS easing on ceasefire. But REER at 92-month high and SBP rate hold at 11.5% signal the structural stress has shifted from reserves to competitiveness.",
  },
};


// ─────────────────────────────────────────────────────
// PULSE INPUT-COST INDEX
// ─────────────────────────────────────────────────────
// Tracks the cost pressure Pakistani businesses face.
// Base: January 2026 = 100. Three components, all from verified sources.
// Sources: OGRA (petrol), yfinance (Brent), SBP (USD/PKR)
// Updated monthly with each edition.

export const inputCostIndex = {
  name: "Pulse Input-Cost Index",
  version: "1.0",
  base: "January 2026 = 100",

  weights: {
    fuel: 0.40,
    importedEnergy: 0.30,
    fx: 0.30,
  },

  readings: [
    {
      date: "Jan 2026",
      raw: { petrol: 253.17, brent: 68.40, pkr: 279.90, brentPkr: 19145 },
      composite: 100.0,
      note: "Baseline. Pre-war fuel prices, Brent at $68, rupee stable at 280.",
    },
    {
      date: "Feb 2026",
      raw: { petrol: 252.81, brent: 81.40, pkr: 277.69, brentPkr: 22604 },
      composite: 105.1,
      note: "Brent rises to $81 as Hormuz tensions build. Petrol unchanged. FX flat.",
    },
    {
      date: "Mar 2026",
      raw: { petrol: 321.17, brent: 101.16, pkr: 278.75, brentPkr: 28198 },
      composite: 124.8,
      note: "First major fuel hike: Rs 55/L on Mar 7. Brent crosses $100. Input costs up 25% from baseline.",
    },
    {
      date: "Apr 2026",
      raw: { petrol: 458.41, brent: 118.03, pkr: 277.37, brentPkr: 32738 },
      composite: 153.5,
      note: "Peak stress. Petrol at all-time high Rs 458. Brent at $118. Input costs 54% above baseline. Record fuel hike on Apr 3.",
    },
    {
      date: "May 2026",
      raw: { petrol: 373.78, brent: 97.81, pkr: 278.25, brentPkr: 27216 },
      composite: 131.5,
      note: "Easing begins. Three consecutive fuel cuts. Brent retreats below $100. Still 32% above baseline.",
    },
    {
      date: "Jun 2026",
      raw: { petrol: 299.78, brent: 73.05, pkr: 277.92, brentPkr: 20302 },
      composite: 109.0,
      note: "Rapid normalization. Petrol below Rs 300 for first time in conflict cycle. Brent collapses to $73 on ceasefire. Near baseline but OGRA has room for further cuts.",
    },
  ],
};
