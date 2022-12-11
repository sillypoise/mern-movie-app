import dotenv from "dotenv";
import { createServer } from "http";
import { app } from "./app";
// import { dbConnect } from "./services/db";

dotenv.config();

const PORT = process.env["PORT"] || 8000;

const server = createServer(app);

function startServer() {
    // anything you want to do before the server starts
    // await dbConnect();
    // 'await' loading data from other API's into our DB
    server.listen(PORT, () =>
        console.log(`🚀 Up and running at port: ${PORT}`)
    );
}

startServer();
