import express from "express";
import { httpGetFoo, httpCreateUser } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/", httpGetFoo);
userRouter.post("/create", httpCreateUser);

export { userRouter };
