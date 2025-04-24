import { z } from "zod";

export const UserValidation = {
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
