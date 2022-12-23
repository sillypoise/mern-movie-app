import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { hash } from "argon2";
import type { Request, Response } from "express";
import {
    createUserSession,
    hasUserSession,
} from "../../middleware/session.middleware";
import {
    createUser,
    getPasswordByEmail,
    getUserByEmail,
} from "../../models/user.model";
import { validatePassword } from "../../services/argon2/argon2";
import {
    userLoginSchema,
    userWithPasswordSchema,
} from "../../services/db/dbSchema";

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

async function httpLoginPOST(req: Request, res: Response) {
    const hasSesssion = await hasUserSession(req);
    if (hasSesssion) return res.json({ message: "logged in" });
    return res.status(200).json({ message: "not logged in" });
}

async function httpLogin(req: Request, res: Response) {
    try {
        const loginBody = userLoginSchema.parse(req.body);
        const userExists = await getUserByEmail(loginBody.email);
        if (userExists instanceof PrismaClientKnownRequestError) {
            throw new Error(userExists.name);
        }

        const dbHash = await getPasswordByEmail(loginBody.email);
        if (dbHash instanceof PrismaClientKnownRequestError) {
            throw new Error();
        }

        const validPassword = await validatePassword(
            dbHash.password,
            loginBody.password
        );

        if (!validPassword) {
            throw new Error();
        }

        const userId = dbHash.userId;

        return createUserSession(userId, req, res);
    } catch (err) {
        if (err instanceof Error) {
            console.dir(err);
            return res.status(400).json({
                message: "error logging in",
            });
        }
    }
}

export { httpSignUp, httpLogin, httpLoginPOST };
