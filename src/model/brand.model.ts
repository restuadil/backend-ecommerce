import mongoose from "mongoose";
import { IBrand } from "../types/brand";

const schema = mongoose.Schema;

const BrandSchema = new schema<IBrand>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String, required: true },
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

BrandSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const BrandModel = mongoose.model("brand", BrandSchema);

export default BrandModel;
