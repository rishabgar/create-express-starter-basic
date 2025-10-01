import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import appSuccess from "../utils/appSuccess";

const indexController = asyncHandler(
  async (_req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(new appSuccess(200, "Success"));
  }
);

export default indexController;
