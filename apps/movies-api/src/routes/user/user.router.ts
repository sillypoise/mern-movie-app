import express, { Request, Response } from "express";
import { httpCreateUser } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/create", httpCreateUser);
userRouter.get("/login", async (req: Request, res: Response) => {
    // console.log(req.headers.cookie);

    let session = await getSession(req.headers.cookie);

    console.log(session.get("123"));

    session.set("123", "321");
    res.append("Set-Cookie", await commitSession(session));
    return res.json("login route");
});

export { userRouter };
