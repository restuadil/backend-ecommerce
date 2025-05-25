// src/utils/response.ts

import { Response } from "express";

export const SuccessResponse = (
  res: Response,
  message: string,
  data?: unknown,
  statusCode = 200
) => {
  const responseData =
    data && typeof data === "object" && "response" in data
      ? data.response
      : data;
  const pagination =
    data && typeof data === "object" && "pagination" in data
      ? data.pagination
      : undefined;

  res.status(statusCode).json({
    status: true,
    statusCode,
    message,
    data: responseData ?? null,
    pagination: pagination,
  });
};

export const ErrorResponse = (
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
