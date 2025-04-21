import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import { SuccessResponse } from "../../utils/response";
import { Types } from "mongoose";
export const CategoryController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await CategoryService.get(req.query);
      SuccessResponse(res, "Category fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await CategoryService.getById(
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "Category fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await CategoryService.create(req.body);
      SuccessResponse(res, "Category created successfully", response, 201);
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await CategoryService.update(
        req.body,
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "Category updated successfully", response);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await CategoryService.delete(
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "Category deleted successfully", response);
    } catch (error) {
      next(error);
    }
  },
};
