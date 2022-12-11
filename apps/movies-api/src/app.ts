import express, { Request, Response } from "express";
import { api } from "./routes/api";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json("Congrats");
});

app.use("/v1", api);

export { app };
