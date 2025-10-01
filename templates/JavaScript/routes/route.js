import { Router } from "express";
import { indexController } from "../controllers/index.js";

const route = Router();

route.get("/", indexController);

export default route;
