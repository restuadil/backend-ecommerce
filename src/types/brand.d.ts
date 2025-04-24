import { z } from "zod";
import { BrandValidation } from "../api/brand/brand.validation";
import { Types } from "mongoose";

export type IBrand = z.infer<typeof BrandValidation.CREATE>;

export type IBrandResponse = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  banner: string;
  logo: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IBrandQuery = {
  search?: string;
  page?: number;
  limit?: number;
};
