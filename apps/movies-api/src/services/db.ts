import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const MONGO_URI = process.env["MONGO_URI"];

if (typeof MONGO_URI !== "string") throw Error("Invalid database URI");

const mdb = new MongoClient(MONGO_URI);

async function dbConnect(client: MongoClient) {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("🌱 Connected successfully to Mongo");
    } catch (err) {
        console.dir(err);
    } finally {
        await client.close();
    }
}

export { dbConnect, mdb };
