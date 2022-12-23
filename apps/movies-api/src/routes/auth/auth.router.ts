import express from "express";
import { requireUserSession } from "../../middleware/session.middleware";
import {
    httpLogin,
    httpLoginPOST,
    httpSession,
    httpSignUp,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", httpSignUp);
authRouter.get("/login", httpLoginPOST);
authRouter.post("/login", httpLogin);
authRouter.get("/session", httpSession);
authRouter.get("/secret", requireUserSession, (_req, res) =>
    res.json("secret info!")
);

export { authRouter };
