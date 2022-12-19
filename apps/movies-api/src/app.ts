import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { api } from "./routes/api";

const app = express();
app.use(morgan("tiny")); //eslint-disable-line-no-eval
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
