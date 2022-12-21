import express from "express";
import { mongoRouter } from "./mongo/mongo.router";
// import { barRouter } from "./bar/bar.router";
import { authRouter } from "./auth/auth.router";

const api = express.Router();

// * DEVELOPMENT PURPOSES
api.use("/mongo", mongoRouter);

api.use("/auth", authRouter);
// api.use("/bar", barRouter);

export { api };
