// src/utils/response.ts

import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data?: unknown,
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data: data || null,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 500
): void => {
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null,
  });
};
