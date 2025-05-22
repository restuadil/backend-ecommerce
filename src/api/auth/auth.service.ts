import { Types } from "mongoose";
import UserModel from "../../model/user.model";
import {
  IRegisterRequest,
  ILoginRequest,
  IRegisterResponse,
  IResponseLogin,
} from "../../types/auth";
import { encrypt } from "../../utils/encryption";
import { generateToken } from "../../utils/jwt";
import { ResponseError } from "../../utils/response.error";
import { Validation } from "../../utils/validation";
import { AuthValidation } from "./auth.validation";

export const AuthService = {
  register: async (request: IRegisterRequest): Promise<IRegisterResponse> => {
    const validatedRequest = Validation.validate(
      AuthValidation.REGISTER,
      request
    ) as Required<IRegisterRequest>;

    const existingEmailOrUsername = await UserModel.findOne({
      $or: [
        { email: validatedRequest.email },
        { username: validatedRequest.username },
      ],
    });
    if (existingEmailOrUsername) {
      throw ResponseError.BAD_REQUEST("Email or username already exists");
    }
    return UserModel.create({
      fullName: validatedRequest.fullName,
      username: validatedRequest.username,
      email: validatedRequest.email,
      password: validatedRequest.password,
    });
  },

  login: async (request: ILoginRequest): Promise<IResponseLogin> => {
    const validatedRequest = Validation.validate(
      AuthValidation.LOGIN,
      request
    ) as Required<ILoginRequest>;

    const user = await UserModel.findOne({
      $or: [
        { email: validatedRequest.identifier },
        { username: validatedRequest.identifier },
      ],
    });
    if (!user) throw ResponseError.BAD_REQUEST("User not found");

    const validatePassword: boolean =
      encrypt(validatedRequest.password) === user.password;
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
  profile: async (id: Types.ObjectId): Promise<IRegisterResponse> => {
    const result = await UserModel.findById(id);
    if (!result) throw ResponseError.BAD_REQUEST("User not found");
    return result;
  },
  resetPassword: async (
    id: Types.ObjectId,
    password: string
  ): Promise<IRegisterResponse> => {
    const user = await UserModel.findById(id);
    if (!user) throw ResponseError.BAD_REQUEST("User not found");

    if (encrypt(user.password) !== password) {
      throw ResponseError.BAD_REQUEST("Password is not valid");
    }
    const updatedPassword = await UserModel.findByIdAndUpdate(
      id,
      { password: encrypt(password) },
      { new: true }
    );
    if (!updatedPassword) throw ResponseError.BAD_REQUEST("User not found");

    return updatedPassword;
  },
};
