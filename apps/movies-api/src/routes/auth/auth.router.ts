import express, { Request, Response } from "express";
import { httpSignUp } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", httpSignUp);
authRouter.get("/login", async (req: Request, res: Response) => {
    return res.json("login route");
});
authRouter.get("/health", (req, res) => res.json("auth alive"));

export { authRouter };
