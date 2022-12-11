import type { Request, Response } from "express";
import { getAllFoo } from "../../models/foo.model";

function httpGetFoo(_req: Request, res: Response) {
    const foo = getAllFoo();
    return res.status(200).json(foo);
}

export { httpGetFoo };
