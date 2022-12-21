import express, { Request, Response } from "express";
import { httpCreateUser } from "./user.controller";
import {
    createUserSession,
    requireUserSession,
} from "../../middleware/session.middleware";
import { getSession } from "../../services/sessions";

const userRouter = express.Router();

userRouter.post("/create", httpCreateUser);
userRouter.get("/login", async (req: Request, res: Response) => {
    return res.json("login route");
});

export { userRouter };
