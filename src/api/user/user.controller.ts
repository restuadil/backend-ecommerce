import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { SuccessResponse } from "../../utils/response";
import { Types } from "mongoose";
export const UserController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await UserService.getAll(req.query);
      SuccessResponse(res, "Users fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await UserService.getById(
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "User fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },
};
