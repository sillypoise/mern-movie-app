import { NextFunction, Request, Response } from "express";
import { commitSession, getSession } from "../services/sessions";

function createUserSession(userId: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        let session = await getSession();
        session.set("userId", userId);
        res.append("Set-Cookie", await commitSession(session));
        next();
    };
}

async function requireUserSession(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const session = await getSession(req.headers.cookie);
    const userSession = session.get("userId");
    if (!userSession) {
        return res.redirect("/health");
    }
    next();
}

export { createUserSession, requireUserSession };
