import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const baseArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  pinned: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: baseArticleSchema,
});

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.{md,mdx}" }),
  schema: baseArticleSchema,
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    status: z.enum(["计划中", "进行中", "已完成"]),
    tech: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const site = defineCollection({
  loader: glob({ base: "./src/content/site", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    page: z.literal("home"),
    badge: z.string(),
    title: z.string(),
    description: z.string(),
    subtitle: z.string(),
    intro: z.string(),
    primaryAction: z.object({
      label: z.string(),
      href: z.string(),
    }),
    secondaryAction: z.object({
      label: z.string(),
      href: z.string(),
    }),
    statusTitle: z.string(),
    statusItems: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, notes, projects, site };
