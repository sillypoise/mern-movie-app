import express, { Request, Response } from "express";
import cors from "cors";
import { api } from "./routes/api";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json("Congrats");
});

app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json("Healthy!");
});

app.use("/v1", api);

export { app };
