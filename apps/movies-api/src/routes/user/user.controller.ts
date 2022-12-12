import { hash } from "argon2";
import type { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../models/user.model";
import { userWithPasswordSchema } from "../../services/db/dbSchema";

async function httpCreateUser(req: Request, res: Response) {
    try {
        const userBody = userWithPasswordSchema.parse(req.body);
        const userExists = await getUserByEmail(userBody.email);
        if (Object.prototype.hasOwnProperty.call(userExists, "email")) {
            return res.status(400).json("user already exists");
        }
        // TODO: extract hash into separate hashing function, maybe into model
        const hashedPassword = await hash(userBody.password);
        await createUser({ ...userBody, password: hashedPassword });
        return res.status(201).json("user created");
    } catch (err) {
        console.dir(err);
        return res.status(400).json("error creating user");
    }
}

export { httpCreateUser };
