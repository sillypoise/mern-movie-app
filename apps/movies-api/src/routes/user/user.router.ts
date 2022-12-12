import express from "express";
import { httpCreateUser } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/create", httpCreateUser);

export { userRouter };
