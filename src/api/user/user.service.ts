import { FilterQuery, Types } from "mongoose";
import UserModel from "../../model/user.model";
import { IPageAble, IPagination } from "../../types/pagination";
import { IUser, IUserQuery, IUserResponse } from "../../types/user";
import { Validation } from "../../utils/validation";
import { UserValidation } from "./user.validaiton";
import { ResponseError } from "../../utils/response.error";
import { Pagination } from "../../utils/pagination";

export const UserService = {
  getAll: async (query?: any): Promise<IPageAble<IUserResponse>> => {
    const validatedQuery = Validation.validate(
      UserValidation.QUERY,
      query
    ) as Required<IUserQuery>;

    const { search, page, limit } = validatedQuery;
    const filter: FilterQuery<IUser> = {};

    if (search) {
      Object.assign(filter, {
        $or: [
          {
            username: { $regex: search, $options: "i" },
          },
          {
            fullName: { $regex: search, $options: "i" },
          },
          {
            email: { $regex: search, $options: "i" },
          },
        ],
      });
    }

    const [result, total] = await Promise.all([
      UserModel.find(filter)
        .select("fullName email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      UserModel.countDocuments(filter),
    ]);
    if (!result) throw ResponseError.BAD_REQUEST("User not found");

    const pagination: IPagination = Pagination(total, page, limit);

    return { response: result, pagination };
  },
  getById: async (id: Types.ObjectId): Promise<IUserResponse> => {
    const result = await UserModel.findById(id);
    if (!result) throw ResponseError.NOT_FOUND("User not found");
    return result;
  },
};
