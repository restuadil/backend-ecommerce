import { FilterQuery, Types } from "mongoose";
import { IBrand, IBrandQuery, IBrandResponse } from "../../types/brand";
import { IPageAble, IPagination } from "../../types/pagination";
import { Validation } from "../../utils/validation";
import { BrandValidation } from "./brand.validation";
import BrandModel from "../../model/brand.model";
import { ResponseError } from "../../utils/response.error";
import { Pagination } from "../../utils/pagination";
export const BrandService = {
  get: async (query?: IBrandQuery): Promise<IPageAble<IBrandResponse>> => {
    const validatedQuery = Validation.validate(
      BrandValidation.QUERY,
      query
    ) as Required<IBrandQuery>;

    const { search, page, limit } = validatedQuery;
    const filter: FilterQuery<IBrand> = {};

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
      BrandModel.find(filter)
        .select("_id name description banner logo")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      BrandModel.countDocuments(filter),
    ]);

    if (response.length === 0) throw ResponseError.NOT_FOUND("Brand not found");

    const pagination: IPagination = Pagination(total, page, limit);
    return { response, pagination };
  },
  getById: async (id: Types.ObjectId): Promise<IBrandResponse> => {
    const response = await BrandModel.findById(id);
    if (!response) throw ResponseError.NOT_FOUND("Brand not found");
    return response;
  },
  create: async (request: IBrand): Promise<IBrandResponse> => {
    const validatedRequest = Validation.validate(
      BrandValidation.CREATE,
      request
    ) as Required<IBrand>;
    const existingBrand = await BrandModel.findOne({
      name: validatedRequest.name,
    });
    if (existingBrand) throw ResponseError.BAD_REQUEST("Brand already exists");
    return BrandModel.create(validatedRequest);
  },
  update: async (
    request: IBrand,
    id: Types.ObjectId
  ): Promise<IBrandResponse> => {
    const validatedRequest = Validation.validate(
      BrandValidation.UPDATE,
      request
    ) as Required<IBrand>;

    const existingBrand = await BrandModel.findOne({
      name: validatedRequest.name,
    });
    if (existingBrand) throw ResponseError.BAD_REQUEST("Brand already exists");

    const response = await BrandModel.findByIdAndUpdate(id, validatedRequest, {
      new: true,
    });
    if (!response) throw ResponseError.NOT_FOUND("Brand not found");
    return response;
  },
  delete: async (id: Types.ObjectId) => {
    const response = await BrandModel.findByIdAndDelete(id);
    if (!response) throw ResponseError.NOT_FOUND("Brand not found");
    return response;
  },
};
