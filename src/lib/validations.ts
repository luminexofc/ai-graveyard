import { z } from "zod";

export const submitClaimSchema = z.object({
  title: z.string().min(3).max(200),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  platform: z.enum(["twitter", "reddit", "linkedin", "tiktok", "other"]).default("other"),
  categoryId: z.string().uuid(),
});

export const voteSchema = z.object({
  submissionId: z.string().uuid(),
  value: z.union([z.literal(1), z.literal(-1)]),
});