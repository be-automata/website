import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    caseSlug: z.string(),
    lang: z.enum(['es', 'en']),
    title: z.string(),
    tagline: z.string(),
    stack: z.array(z.string()),
    license: z.string(),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
