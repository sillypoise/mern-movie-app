import dotenv from "dotenv";
import { createServer } from "http";
import { app } from "./app";
import { dbConnect, mdb } from "./services/db/db";

dotenv.config();

const PORT = process.env["PORT"] || 8000;

const server = createServer(app);

async function startServer() {
    // anything you want to do before the server starts
    await dbConnect(mdb);
    // 'await' loading data from other API's into our DB
    server.listen(PORT, () =>
        console.log(`🚀 Up and running at port: ${PORT}`)
    );
}

startServer().catch((err) => console.log(err));
