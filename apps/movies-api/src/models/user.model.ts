import { Password } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";
import { db } from "../services/db";
import {
    IUserSchema,
    IUserWithPasswordSchema,
    userSchema,
} from "../services/db/dbSchema";

async function createUser(user: IUserWithPasswordSchema) {
    try {
        const res = await db.user.create({
            data: {
                name: user.name,
                email: user.email,
                verified: user.verified,
                createdAt: new Date(),
                updatedAt: new Date(),
                password: {
                    create: {
                        password: user.password,
                    },
                },
            },
        });

        if (res) {
            console.log(`user inserted with _id:${res.id} `); // eslint-disable-line
            return userSchema.parse(res);
        }
    } catch (err) {
        console.dir(err);
    }
}

async function getUserByEmail(
    email: IUserWithPasswordSchema["password"]
): Promise<IUserSchema | PrismaClientKnownRequestError> {
    try {
        const res = await db.user.findFirstOrThrow({
            where: {
                email,
            },
        });

        return userSchema.parse(res);
    } catch (err) {
        return err as PrismaClientKnownRequestError;
    }
}
async function getUserById(
    userId: string
): Promise<IUserSchema | PrismaClientKnownRequestError> {
    try {
        const res = await db.user.findFirstOrThrow({
            where: {
                id: userId,
            },
        });

        return userSchema.parse(res);
    } catch (err) {
        return err as PrismaClientKnownRequestError;
    }
}

async function getPasswordByEmail(
    email: IUserWithPasswordSchema["email"]
): Promise<Password | PrismaClientKnownRequestError> {
    try {
        const res = await db.user.findFirstOrThrow({
            where: {
                email,
            },
            include: {
                password: true,
            },
        });
        return z
            .object({
                id: z.string(),
                password: z.string(),
                userId: z.string(),
            })
            .parse(res.password);
    } catch (err) {
        return err as PrismaClientKnownRequestError;
    }
}

export { createUser, getUserByEmail, getPasswordByEmail, getUserById };
