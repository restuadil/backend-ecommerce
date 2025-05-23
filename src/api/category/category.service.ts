import { FilterQuery, Types } from "mongoose";
import CategoryModel from "../../model/category.model";
import {
  ICategory,
  ICategoryQuery,
  ICategoryResponse,
} from "../../types/category";
import { IPageAble, IPagination } from "../../types/pagination";
import { Pagination } from "../../utils/pagination";
import { ResponseError } from "../../utils/response.error";
import { Validation } from "../../utils/validation";
import { CategoryValidation } from "./category.validation";

export const CategoryService = {
  get: async (
    query?: ICategoryQuery
  ): Promise<IPageAble<ICategoryResponse>> => {
    const validatedQuery = Validation.validate(
      CategoryValidation.QUERY,
      query
    ) as Required<ICategoryQuery>;

    const { search, page, limit } = validatedQuery;
    const filter: FilterQuery<ICategory> = {};

    if (search) {
      Object.assign(filter, {
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
          {
            description: { $regex: search, $options: "i" },
          },
        ],
      });
    }

    const [response, total] = await Promise.all([
      CategoryModel.find(filter)
        .select("_id name description icon")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      CategoryModel.countDocuments(filter),
    ]);
    if (response.length === 0)
      throw ResponseError.NOT_FOUND("Category not found");

    const pagination: IPagination = Pagination(total, page, limit);

    return { response, pagination };
  },
  getById: async (id: Types.ObjectId): Promise<ICategoryResponse> => {
    const response = await CategoryModel.findById(id);
    if (!response) throw ResponseError.NOT_FOUND("Category not found");
    return response;
  },
  create: async (request: ICategory): Promise<ICategoryResponse> => {
    const validatedRequest = Validation.validate(
      CategoryValidation.CREATE,
      request
    ) as Required<ICategory>;
    const existingCategory = await CategoryModel.findOne({
      name: validatedRequest.name,
    });
    if (existingCategory)
      throw ResponseError.BAD_REQUEST("Category already exists");

    return CategoryModel.create(validatedRequest);
  },
  update: async (
    request: ICategory,
    id: Types.ObjectId
  ): Promise<ICategoryResponse> => {
    const validatedRequest = Validation.validate(
      CategoryValidation.UPDATE,
      request
    ) as Required<ICategory>;

    const existingCategory = await CategoryModel.findOne({
      name: validatedRequest.name,
    });
    if (existingCategory)
      throw ResponseError.BAD_REQUEST("Category already exists");

    const response = await CategoryModel.findByIdAndUpdate(
      id,
      validatedRequest,
      {
        new: true,
      }
    );

    if (!response) throw ResponseError.NOT_FOUND("Category not found");

    return response;
  },
  delete: async (id: Types.ObjectId): Promise<ICategoryResponse> => {
    const response = await CategoryModel.findByIdAndDelete(id);
    if (!response) throw ResponseError.NOT_FOUND("Category not found");
    return response;
  },
};
