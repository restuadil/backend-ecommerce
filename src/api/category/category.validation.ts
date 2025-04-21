import { z } from "zod";

export const CategoryValidation = {
  CREATE: z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(2).max(100),
    icon: z.string(),
  }),
  UPDATE: z.object({
    name: z.string().min(2).max(100).optional(),
    icon: z.string().optional(),
  }),
  QUERY: z
    .object({
      search: z.string().optional(),
      page: z.preprocess((val) => {
        if (val === "" || val === undefined) return undefined;
        return Number(val);
      }, z.number().int().positive().default(1)),

      limit: z.preprocess((val) => {
        if (val === "" || val === undefined) return undefined;
        return Number(val);
      }, z.number().int().positive().max(100).default(20)),
    })
    .strict(),
};
