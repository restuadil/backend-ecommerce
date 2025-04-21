import { z } from "zod";
import { AuthValidation } from "../api/auth/auth.validation";
import { Request } from "express";

export type IRegisterRequest = z.infer<typeof AuthValidation.REGISTER>;
export type ILoginRequest = z.infer<typeof AuthValidation.LOGIN>;
export interface IAuthRequest extends Request {
  user?: IUserToken;
}
export type IUserToken = {
  id: Types.ObjectId;
  role: string;
  username: string;
  email: string;
  fullName: string;
};
export type IRegisterResponse = {
  _id: Types.ObjectId;
  fullName: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type IResponseLogin = string;
