import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const MONGO_URI = process.env["DATABASE_URL"];

if (typeof MONGO_URI !== "string") throw Error("Invalid database URI");

const mdb = new MongoClient(MONGO_URI);
const db = new PrismaClient();

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

export { dbConnect, mdb, db };
