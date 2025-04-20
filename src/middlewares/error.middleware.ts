import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../utils/response.error";
import { logger } from "../config/logger";
import { errorResponse } from "../utils/response";

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  logger.error(error);

  if (error instanceof ZodError) {
    const hasUnrecognizedKeys = error.issues.some(
      (issue) => issue.code === "unrecognized_keys"
    );

    if (hasUnrecognizedKeys) {
      errorResponse(
        res,
        "Invalid query parameters: Unrecognized keys are not allowed.",
        400
      );
      return;
    }

    const errorMessages = error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    errorResponse(res, `Validation Error: ${errorMessages.join("; ")}`, 400);
    return;
  }

  if (error instanceof ResponseError) {
    errorResponse(res, error.message, error.statusCode);
    return;
  }

  if (error instanceof Error) {
    errorResponse(res, error.message, 500);
    return;
  }

  errorResponse(res, "Internal Server Error", 500);
};
