import { Types } from "mongoose";
import UserModel from "../../model/user.model";
import {
  ILogin,
  IRegister,
  IResponseLogin,
  IResponseRegister,
} from "../../types/auth";
import { encrypt } from "../../utils/encryption";
import { generateToken } from "../../utils/jwt";
import { ResponseError } from "../../utils/response.error";
import { Validation } from "../../utils/validation";
import { AuthValidation } from "./auth.validation";

export const AuthService = {
  register: async (request: IRegister): Promise<IResponseRegister> => {
    const validateRequest = Validation.validate(
      AuthValidation.REGISTER,
      request
    ) as Required<IRegister>;

    const existingEmailOrUsername = await UserModel.findOne({
      $or: [
        { email: validateRequest.email },
        { username: validateRequest.username },
      ],
    });
    if (existingEmailOrUsername) {
      throw ResponseError.BAD_REQUEST("Email or username already exists");
    }
    return UserModel.create({
      fullName: validateRequest.fullName,
      username: validateRequest.username,
      email: validateRequest.email,
      password: validateRequest.password,
    });
  },

  login: async (request: ILogin): Promise<IResponseLogin> => {
    const validateRequest = Validation.validate(
      AuthValidation.LOGIN,
      request
    ) as Required<ILogin>;

    const user = await UserModel.findOne({
      $or: [
        { email: validateRequest.identifier },
        { username: validateRequest.identifier },
      ],
      isActive: true,
    });
    if (!user) throw ResponseError.BAD_REQUEST("User not found");

    const validatePassword: boolean =
      encrypt(validateRequest.password) === user.password;
    if (!validatePassword) throw ResponseError.BAD_REQUEST("User not found");

    const token = generateToken({
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    });
    return token;
  },
  profile: async (id: Types.ObjectId): Promise<IResponseRegister> => {
    const result = await UserModel.findById(id);
    if (!result) throw ResponseError.BAD_REQUEST("User not found");
    return result;
  },
};
