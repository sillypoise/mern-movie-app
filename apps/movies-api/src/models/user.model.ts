import { mdb } from "../services/db/db";
import {
    IUserWithPasswordSchema,
    userSchema,
    type IUserSchema,
} from "../services/db/dbSchema";

async function createUser(user: IUserWithPasswordSchema) {
    try {
        await mdb.connect();
        const db = mdb.db("movie_app");
        const userTable = db.collection<IUserWithPasswordSchema>("user");
        const res = await userTable
            .insertOne({
                name: user.name,
                email: user.email,
                password: user.password,
            })
            .catch((err) => console.log(err));
        if (res) {
            console.log(`user inserted with _id:${res.insertedId} `); // eslint-disable-line
        }
    } catch (err) {
        console.dir(err);
    } finally {
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
