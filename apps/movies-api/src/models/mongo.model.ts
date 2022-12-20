import { mdb, db } from "../services/db";

async function pgMongo() {
    try {
        // const user = db.test.create({
        //     data: {
        //         name: "joey",
        //         last_name: "rosas",
        //     },
        // });
        // await mdb.connect();
        // const db = mdb.db("movie_app");
        // const userTable = db.collection<IUserSchema>("user");
        // const res = await userTable.findOne({
        //     name: "testnam",
        // });
        // if (!res) return { error: "couldn't find user" };
        // return res;
        // return user;
    } catch (err) {
        console.log(err);
    } finally {
        await mdb.close();
    }
}

export { pgMongo };
