import { Types } from "mongoose";
import { z } from "zod";

const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

export const ProductValidation = {
  CREATE: z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(2).max(100),
    price: z.number().int().positive(),
    quantity: z.number().int().positive(),
    category: z.array(objectId),
    brand: objectId,
    banner: z.string(),
    images: z.array(z.string()),
  }),
  UPDATE: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().min(2).max(100).optional(),
    price: z.number().int().positive().optional(),
    quantity: z.number().int().positive().optional(),
    category: z.array(objectId).optional(),
    brand: objectId.optional(),
    banner: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
  QUERY: z.object({
    search: z.string().optional(),
    page: z.preprocess((val) => {
      if (val === "" || val === undefined) return undefined;
      return Number(val);
    }, z.number().int().positive().default(1)),

    limit: z.preprocess((val) => {
      if (val === "" || val === undefined) return undefined;
      return Number(val);
    }, z.number().int().positive().max(100).default(20)),
  }),
};
