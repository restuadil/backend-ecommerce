import { Types } from "mongoose";

export type IUser = {
  id: Types.ObjectId;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  __v: string;
  createdAt?: Date;
  updatedAt?: Date;
};
