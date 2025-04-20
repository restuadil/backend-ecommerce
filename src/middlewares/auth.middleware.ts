import { NextFunction, Response } from "express";
import { IAuthRequest } from "../types/auth";
import { ResponseError } from "../utils/response.error";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers?.authorization;
    if (!authorization) throw ResponseError.UNAUTHORIZED("Unauthorized");

    const [prefix, token] = authorization?.split(" ");

    if (!(prefix === "Bearer" && token))
      throw ResponseError.UNAUTHORIZED("Unauthorized");

    const user = verifyToken(token);
    if (!user) throw ResponseError.UNAUTHORIZED("Unauthorized");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
