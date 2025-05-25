import { Request, Response } from "express";

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    statusCode: 404,
    message: "Route not found",
    data: null,
  });
};
