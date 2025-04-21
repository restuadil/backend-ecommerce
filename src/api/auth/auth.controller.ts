import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { SuccessResponse } from "../../utils/response";
import { IAuthRequest } from "../../types/auth";
import { logger } from "../../config/logger";
export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Register request: ${JSON.stringify(req.body)}`);
      const response = await AuthService.register(req.body);
      return SuccessResponse(res, "User created successfully", response, 201);
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Login request: ${JSON.stringify(req.body)}`);
      const response = await AuthService.login(req.body);
      return SuccessResponse(res, "User logged in successfully", response);
    } catch (error) {
      next(error);
    }
  },
  profile: async (req: IAuthRequest, res: Response, next: NextFunction) => {
    logger.info(`Profile request`);
    const response = await AuthService.profile(req.user?.id);
    SuccessResponse(res, "Profile fetched successfully", response);
  },
};
