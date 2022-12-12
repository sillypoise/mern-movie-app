import type { Request, Response } from "express";
import { createUser } from "../../models/user.model";
import { userSchema } from "../../services/db/dbSchema";

async function httpCreateUser(req: Request, res: Response) {
    try {
        const userBody = userSchema.parse(req.body);
        await createUser(userBody);
        return res.status(200).json("user created");
    } catch (err) {
        console.dir(err);
        return res.status(400).json("error creating user");
    }
}

export { httpCreateUser };
