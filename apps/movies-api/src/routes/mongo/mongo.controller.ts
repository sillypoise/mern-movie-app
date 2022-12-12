import type { Request, Response } from "express";
import { pgMongo } from "../../models/mongo.model";

async function httpPgMongo(req: Request, res: Response) {
    try {
        const user = await pgMongo();
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
}

export { httpPgMongo };
