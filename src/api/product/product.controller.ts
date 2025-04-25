import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import { SuccessResponse } from "../../utils/response";
import { Types } from "mongoose";
export const ProductController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await ProductService.get(req.query);
      SuccessResponse(res, "Product fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await ProductService.getById(
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "Product fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await ProductService.create(req.body);
      SuccessResponse(res, "Product created successfully", response, 201);
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await ProductService.update(
        req.params.id as unknown as Types.ObjectId,
        req.body
      );
      SuccessResponse(res, "Product updated successfully", response);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await ProductService.delete(
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "Product deleted successfully", response);
    } catch (error) {
      next(error);
    }
  },
};
