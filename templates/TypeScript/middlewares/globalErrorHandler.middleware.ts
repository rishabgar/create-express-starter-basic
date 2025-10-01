import { ErrorRequestHandler, Request, Response } from "express";
import appError from "../utils/appError";

const globalErrorHandlerMiddleware: ErrorRequestHandler = (
  err: appError,
  _req: Request,
  res: Response
) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    data: err.data || null,
  });
};

export default globalErrorHandlerMiddleware;
