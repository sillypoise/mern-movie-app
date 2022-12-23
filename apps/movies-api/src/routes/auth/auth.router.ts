import express from "express";
import { requireUserSession } from "../../middleware/session.middleware";
import {
    httpLogin,
    httpLoginPOST,
    httpSession,
    httpSignUp,
    httpSignUpPOST,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.get("/sign-up", httpSignUp);
authRouter.post("/sign-up", httpSignUpPOST);
authRouter.get("/login", httpLogin);
authRouter.post("/login", httpLoginPOST);
authRouter.get("/session", httpSession);
authRouter.get("/secret", requireUserSession, (_req, res) =>
    res.json("secret info!")
);

export { authRouter };
