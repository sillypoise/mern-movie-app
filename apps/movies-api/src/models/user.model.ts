import { mdb } from "../services/db";
import type { IUser } from "../services/dbSchema";

const db = [1, 2, 3, 4, 5];

function getAllFoo() {
    const fooValues = { ...db };
    return fooValues;
}

async function createUser() {
    try {
        await mdb.connect();
        const db = mdb.db("user");
        const user = db.collection<IUser>("user");
        const res = await user
            .insertOne({
                name: "sillypoise",
                email: "me@example.com",
                password: "supahsecret",
            })
            .catch((err) => console.log(err));
        console.log(`user inserted with _id:${res.insertedId} `);
    } catch (err) {
        console.dir(err);
    } finally {
        await mdb.close();
    }
}

export { getAllFoo, createUser };
