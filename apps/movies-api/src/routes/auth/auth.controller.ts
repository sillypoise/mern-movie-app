import { hash } from "argon2";
import type { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../models/user.model";
import { userWithPasswordSchema } from "../../services/db/dbSchema";

async function httpSignUp(req: Request, res: Response) {
    try {
        const userBody = userWithPasswordSchema.parse(req.body);
        const userExists = await getUserByEmail(userBody.email);
        if (Object.prototype.hasOwnProperty.call(userExists, "email")) {
            return res.status(400).json({
                message: "user already exists",
                payload: userExists,
            });
        }
        const hashedPassword = await hash(userBody.password);
        const insertedUser = await createUser({
            ...userBody,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "user succesfully created",
            payload: insertedUser,
        });
    } catch (err) {
        console.dir(err);
        return res
            .status(400)
            .json({ message: "error creating user", error: err });
    }
}

export { httpSignUp };
