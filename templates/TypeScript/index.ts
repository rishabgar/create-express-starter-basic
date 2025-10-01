import express, { Request, Response, NextFunction } from "express";
import appError from "./utils/appError";
import globalErrorHandlerMiddleware from "./middlewares/globalErrorHandler.middleware";
import route from "./routes/route";

const app = express();

app.use(express.json());

app.use("/", route);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new appError(404, "Resource Not Found"));
});

app.use(globalErrorHandlerMiddleware);

export default app;
