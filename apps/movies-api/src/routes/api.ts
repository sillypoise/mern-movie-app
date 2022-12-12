import express from "express";
// import { barRouter } from "./bar/bar.router";
import { userRouter } from "./user/user.router";

const api = express.Router();

api.use("/user", userRouter);
// api.use("/bar", barRouter);

export { api };
