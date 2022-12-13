import type { Request, Response, NextFunction } from "express";
import { userWithPasswordSchema } from "../services/db/dbSchema";

function credentialsValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const credentials = userWithPasswordSchema.parse(req.body);
        next();
        return credentials;
    } catch (err) {
        console.dir(err);
    }
}

export { credentialsValidation };
