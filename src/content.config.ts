import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    excerpt: z.string().optional().default(''),
    date: z.string().optional().default(''),
  }),
});

export const collections = { notes };
