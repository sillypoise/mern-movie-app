import express from "express";
import { httpPgMongo } from "./mongo.controller";

const mongoRouter = express.Router();

mongoRouter.get("/", httpPgMongo);

export { mongoRouter };
