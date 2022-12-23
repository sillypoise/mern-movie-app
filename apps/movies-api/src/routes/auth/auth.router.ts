import express from "express";
import { requireUserSession } from "../../middleware/session.middleware";
import { httpLogin, httpLoginPOST, httpSignUp } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", httpSignUp);
authRouter.get("/login", httpLoginPOST);
authRouter.post("/login", httpLogin);
authRouter.get("/secret", requireUserSession, (req, res) =>
    res.json("secret info!")
);

export { authRouter };
