import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
            // return userSchema.parse(res);
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

export { createUser, getUserByEmail };
