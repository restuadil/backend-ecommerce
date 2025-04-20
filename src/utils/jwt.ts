import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { IUserToken } from "../types/auth";

export const generateToken = (payload: IUserToken): string => {
  const token = jwt.sign(payload, env.SECRET, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string) => {
  const user = jwt.verify(token, env.SECRET) as IUserToken;
  return user;
};
