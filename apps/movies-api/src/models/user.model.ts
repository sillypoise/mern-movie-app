import { ClientSession } from "mongodb";
import { mdb } from "../services/db/db";
import {
    IPasswordSchema,
    IUserWithPasswordSchema,
    userSchema,
    type IUserSchema,
} from "../services/db/dbSchema";

async function createUser(user: IUserWithPasswordSchema) {
    let session: ClientSession | null = null;
    try {
        await mdb.connect();
        session = mdb.startSession();
        await session.withTransaction(async () => {
            const userTable = mdb
                .db("movie_app")
                .collection<IUserSchema>("user");
            const passwordTable = mdb
                .db("movie_app")
                .collection<IPasswordSchema>("password");

            const resUser = await userTable.insertOne({
                name: "Test",
                email: "test@example.com",
                verified: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            if (resUser) {
                console.log(`user inserted with _id:${resUser.insertedId} `); // eslint-disable-line

                await passwordTable.insertOne({
                    userId: resUser.insertedId,
                    password: user.password,
                });
            }
        });
    } catch (err) {
        console.dir(err);
    } finally {
        if (session) await session.endSession();
        await mdb.close();
    }
}

async function getUserByEmail(email: IUserWithPasswordSchema["password"]) {
    try {
        await mdb.connect();
        const db = mdb.db("movie_app");
        const userTable = db.collection<IUserSchema>("user");
        const res = await userTable.findOne({
            email,
        });
        if (!res) return { error: "couldn't find user" };
        const user = userSchema.parse(res);
        return user;
    } catch (err) {
        console.dir(err);
        return { error: err };
    } finally {
        await mdb.close();
    }
}

export { createUser, getUserByEmail };
