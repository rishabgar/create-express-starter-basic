import { Response, Request, NextFunction } from "express";
import appError from "./appError";

const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error: any) {
      next(
        new appError(
          error.status || 500,
          error.message || "Internal server error"
        )
      );
    }
  };
};

export default asyncHandler;
