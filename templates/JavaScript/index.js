import express from "express";
import appError from "./utils/appError.js";
import globalErrorHandlerMiddleware from "./middlewares/globalErrorHandler.middleware.js";
import route from "./routes/route.js";

const app = express();

app.use(express.json());

app.use("/", route);

app.use((_req, _res, next) => {
  next(new appError(404, "Resource Not Found"));
});

app.use(globalErrorHandlerMiddleware);

export default app;
