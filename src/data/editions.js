// EDITIONS LIST — single source of truth for the standalone HTML editions
// served from /public/editions/. Used by the archive, homepage, RSS, and the
// per-edition share-card generator.
//
// To publish a new edition each week:
//   1. Drop your exported HTML into  public/editions/  (e.g. 2026-05-24.html)
//   2. Add one entry to the TOP of this list (newest first).

export const editionsList = [
{
   no: '05',
   slug: '2026-06-08',
   date: '07 June 2026',
   dateShort: '07 Jun',
   pubDate: '2026-06-08',
   access: 'free',
   title: 'The budget arrives Tuesday. What to expect before it lands.',
   summary: "Finance Minister Aurangzeb will present it to the National Assembly on Tuesday, following the Economic Survey expected on June 9. The number that will matter most when it lands is not the headline outlay. It is the gap between the revenue target and what FBR actually collected in FY26: roughly Rs 11.23 trillion through eleven months, requiring a near-impossible June sprint to close.",
  },  
  {
   no: '04',
   slug: '2026-05-31',
   date: '31 May 2026',
   dateShort: '31 May',
   pubDate: '2026-05-31',
   access: 'free',
   title: 'The ceasefire trade: priced in, not signed.',
   summary: "Oil crashed 11% on a US-Iran MOU framework that remains unsigned and unsigned by Tehran. The government delivered three fuel cuts, launched a strategic petroleum reserve framework, and opened a budget session against a backdrop of a Rs 864 billion FBR shortfall. The relief and the risk this week come from the same event on different timelines.",
  },
  {    
    no: '03',
    slug: '2026-05-24',
    date: '24 May 2026',
    dateShort: '24 May',
    pubDate: '2026-05-24',
    access: 'free',
    title: 'The imported crisis recedes, the homemade one arrives',
    summary: "The oil war-premium is unwinding — Brent eased toward $104 and fuel was cut a second straight week — but the relief is matched by a squeeze on money: global borrowing costs at a two-decade high, a record-expensive backdrop for the FY27 budget and Pakistan's new Panda bond.",
  },
  {
    no: '02',
    slug: '2026-05-17',
    date: '17 May 2026',
    dateShort: '17 May',
    pubDate: '2026-05-17',
    access: 'free',
    title: 'The rupee holds, but the real exchange rate flashes red',
    summary: "The rupee looks stable at 279, but Pakistan's REER has hit a 7.5-year high of 105.17. Brent rose 8.1% to $109.26 as the escalation scenario from Edition 01 materialised, and the IEA warns the market stays undersupplied through October.",
  },
  {
    no: '01',
    slug: '2026-05-10',
    date: '10 May 2026',
    dateShort: '10 May',
    pubDate: '2026-05-10',
    access: 'free',
    title: 'Three disruptions at once: Hormuz, fuel, and a rate shock',
    summary: 'Pakistan enters the week facing three concurrent disruptions — the Strait of Hormuz closure entering week 11, a fourth fuel-price hike since March, and an SBP rate at 11.5% after a 100bps move. Brent swung $19 intra-week.',
  },
];
