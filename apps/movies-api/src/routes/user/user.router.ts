import express, { Request, Response } from "express";
import { httpCreateUser } from "./user.controller";
import {
    createUserSession,
    requireUserSession,
} from "../../middleware/session.middleware";
import { getSession } from "../../services/sessions";

const userRouter = express.Router();

userRouter.post("/create", httpCreateUser);
userRouter.get(
    "/login",
    createUserSession("123"),
    async (req: Request, res: Response) => {
        const session = await getSession(req.headers.cookie);
        console.log(session.get("userId"));

        // console.log(req.headers.cookie);

        // let session = await getSession(req.headers.cookie);

        // console.log(session.get("123"));

        // session.set("123", "321");
        // res.append("Set-Cookie", await commitSession(session));
        return res.json("login route");
    }
);
userRouter.get("/test", requireUserSession, (req, res) => {
    return res.json("sup dude");
});

export { userRouter };
