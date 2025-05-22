import { z } from "zod";

export const BrandValidation = {
  CREATE: z.object({
    name: z.string().min(2).max(100),
    logo: z.string(),
  }),
  UPDATE: z.object({
    name: z.string().min(2).max(100).optional(),
    logo: z.string().optional(),
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
