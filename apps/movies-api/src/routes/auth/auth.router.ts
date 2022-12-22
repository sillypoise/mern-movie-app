import express from "express";
import { requireUserSession } from "../../middleware/session.middleware";
import { httpLogin, httpSignUp } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", httpSignUp);
authRouter.get("/login", (req, res) => res.json("please login"));
authRouter.post("/login", httpLogin);
authRouter.get("/secret", requireUserSession, (req, res) =>
    res.json("secret info!")
);

export { authRouter };
