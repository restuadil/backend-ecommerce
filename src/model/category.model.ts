import mongoose from "mongoose";
import { ICategory } from "../types/category";

const schema = mongoose.Schema;

const CateogrySchema = new schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

CateogrySchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const CategoryModel = mongoose.model("categories", CateogrySchema);

export default CategoryModel;
