import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/product";

const schema = mongoose.Schema;

const ProductSchema = new schema<IProduct>(
  {
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: [
      { type: Schema.Types.ObjectId, ref: "categories", required: true },
    ],
    brand: { type: Schema.Types.ObjectId, ref: "brand", required: true },
    banner: { type: Schema.Types.String, required: true },
    images: { type: [Schema.Types.String], required: true },
  },
  { timestamps: true }
);

ProductSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const ProductModel = mongoose.model<IProduct>("products", ProductSchema);

export default ProductModel;
