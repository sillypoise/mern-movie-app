import { mdb } from "../services/db/db";
import { IUserSchema } from "../services/db/dbSchema";

async function pgMongo() {
    try {
        await mdb.connect();
        const db = mdb.db("movie_app");
        const userTable = db.collection<IUserSchema>("user");
        const res = await userTable.findOne({
            name: "testnam",
        });
        if (!res) return { error: "couldn't find user" };
        return res;
    } catch (err) {
        console.log(err);
    } finally {
        await mdb.close();
    }
}

export { pgMongo };
