import { defineCollection, z } from 'astro:content';

// EDITIONS — the numbered weekly + special briefs. The product. Gated after preview.
const editions = defineCollection({
  type: 'content',
  schema: z.object({
    number: z.number(),                 // 4  -> displayed as "No. 04"
    title: z.string(),
    summary: z.string(),                // exec-summary text + meta description
    date: z.coerce.date(),
    weekOf: z.string().optional(),      // e.g. "Week of 18-24 May 2026"
    ticker: z.array(z.string()).default([]),  // scrolling data strip items
    kind: z.enum(['weekly', 'special']).default('weekly'),
    // 'gated' = free preview then paywall (default for the product).
    // 'free'  = the occasional fully-open sample edition.
    access: z.enum(['gated', 'free']).default('gated'),
    draft: z.boolean().default(false),
  }),
});

// ARTICLES — free standalone pieces. The funnel. What you link from X. Always free.
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { editions, articles };
