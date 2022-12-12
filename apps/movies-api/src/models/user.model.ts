import { mdb } from "../services/db/db";
import { type IUserSchema } from "../services/db/dbSchema";

async function createUser(user: IUserSchema) {
    try {
        await mdb.connect();
        const db = mdb.db("movie_app");
        const userTable = db.collection<IUserSchema>("user");
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

export { createUser };
