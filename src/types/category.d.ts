import { z } from "zod";
import { CategoryValidation } from "../api/category/category.validation";

export type ICategory = z.infer<typeof CategoryValidation.CREATE>;

export type ICategoryResponse = {
  _id: Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ICategoryQuery = {
  limit?: number;
  page?: number;
  search?: string;
};
