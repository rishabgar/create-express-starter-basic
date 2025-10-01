import appSuccess from "../utils/appSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";

export const indexController = asyncHandler(async (req, res) => {
  return res.status(200).json(new appSuccess(200, "Success"));
});
