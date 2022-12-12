import express from "express";
import { mongoRouter } from "./mongo/mongo.router";
// import { barRouter } from "./bar/bar.router";
import { userRouter } from "./user/user.router";

const api = express.Router();

// * DEVELOPMENT PURPOSES
api.use("/mongo", mongoRouter);

api.use("/user", userRouter);
// api.use("/bar", barRouter);

export { api };
