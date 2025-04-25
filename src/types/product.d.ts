import { z } from "zod";
import { ProductValidation } from "../api/product/product.validation";
import { Types } from "mongoose";

export type IProduct = z.infer<typeof ProductValidation.CREATE>;
export type IProductResponse = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Types.ObjectId[] | string[];
  brand: Types.ObjectId | string;
  banner?: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type IProductQuery = {
  limit?: number;
  page?: number;
  search?: string;
};
