import { FilterQuery, Types } from "mongoose";
import { IPageAble, IPagination } from "../../types/pagination";
import { IProduct, IProductQuery, IProductResponse } from "../../types/product";
import { Validation } from "../../utils/validation";
import { ProductValidation } from "./product.validation";
import ProductModel from "../../model/product.model";
import { ResponseError } from "../../utils/response.error";
import { Pagination } from "../../utils/pagination";

export const ProductService = {
  get: async (query?: IProductQuery): Promise<IPageAble<IProductResponse>> => {
    const validatedQuery = Validation.validate(
      ProductValidation.QUERY,
      query
    ) as Required<IProductQuery>;

    const { search, page, limit } = validatedQuery;
    const filter: FilterQuery<IProduct> = {};

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
      ProductModel.find(filter)
        .select("_id name description price quantity category images brand")
        .populate({
          path: "category brand",
          select: "name",
        })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      ProductModel.countDocuments(filter),
    ]);

    if (response.length === 0)
      throw ResponseError.NOT_FOUND("Product not found");

    const pagination: IPagination = Pagination(total, page, limit);
    return { response, pagination };
  },
  getById: async (id: Types.ObjectId): Promise<IProductResponse> => {
    const response = await ProductModel.findById(id)
      .populate({
        path: "category brand",
        select: "name",
      })
      .exec();
    if (!response) throw ResponseError.NOT_FOUND("Product not found");
    return response;
  },
  create: async (request: IProduct): Promise<IProductResponse> => {
    const validatedRequest = Validation.validate(
      ProductValidation.CREATE,
      request
    ) as unknown as Required<IProduct>;

    const existingProduct = await ProductModel.findOne({
      name: validatedRequest.name,
    });
    if (existingProduct)
      throw ResponseError.BAD_REQUEST("Product already exists");
    return ProductModel.create(validatedRequest);
  },
  update: async (
    id: Types.ObjectId,
    request: IProduct
  ): Promise<IProductResponse> => {
    const validatedRequest = Validation.validate(
      ProductValidation.UPDATE,
      request
    ) as Required<IProduct>;
    const existingProduct = await ProductModel.findOne({
      name: validatedRequest.name,
    });

    if (existingProduct)
      throw ResponseError.BAD_REQUEST("Product already exists");

    const response = await ProductModel.findByIdAndUpdate(
      id,
      validatedRequest,
      {
        new: true,
      }
    );
    if (!response) throw ResponseError.NOT_FOUND("Product not found");
    return response;
  },
  delete: async (id: Types.ObjectId): Promise<IProductResponse> => {
    const response = await ProductModel.findByIdAndDelete(id);
    if (!response) throw ResponseError.NOT_FOUND("Product not found");
    return response;
  },
};
