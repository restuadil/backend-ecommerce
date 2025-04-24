import { NextFunction, Request, Response } from "express";
import { BrandService } from "./brand.service";
import { SuccessResponse } from "../../utils/response";
import { Types } from "mongoose";
export const BrandController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await BrandService.get(req.query);
      SuccessResponse(res, "Brand fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await BrandService.getById(
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "Brand fetched successfully", response);
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await BrandService.create(req.body);
      SuccessResponse(res, "Brand created successfully", response, 201);
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await BrandService.update(
        req.body,
        req.params.id as unknown as Types.ObjectId
      );
      SuccessResponse(res, "Brand updated successfully", response);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await BrandService.delete(
        req.params.id as unknown as Types.ObjectId
      );
    } catch (error) {
      next(error);
    }
  },
};
