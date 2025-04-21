import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../utils/response.error";
import { logger } from "../config/logger";
import { ErrorResponse } from "../utils/response";
import mongoose from "mongoose";

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  logger.error(error);

  if (error instanceof ZodError) {
    const hasUnrecognizedKeys = error.issues.some(
      (issue) => issue.code === "unrecognized_keys"
    );

    if (hasUnrecognizedKeys) {
      ErrorResponse(
        res,
        "Invalid query parameters: Unrecognized keys are not allowed.",
        400
      );
      return;
    }

    const errorMessages = error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    ErrorResponse(res, `Validation Error: ${errorMessages.join("; ")}`, 400);
    return;
  }

  if (error instanceof ResponseError) {
    ErrorResponse(res, error.message, error.statusCode);
    return;
  }
  if (error instanceof mongoose.Error.CastError) {
    ErrorResponse(res, "Invalid ID format", 400);
    return;
  }
  if (error instanceof Error) {
    ErrorResponse(res, error.message, 500);
    return;
  }

  ErrorResponse(res, "Internal Server Error", 500);
};
