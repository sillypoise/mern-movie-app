import { NextFunction, Request, Response } from "express";
import { commitSession, getSession } from "../services/sessions";

async function createUserSession(userId: string, _req: Request, res: Response) {
    let session = await getSession();
    session.set("userId", userId);
    res.append("Set-Cookie", await commitSession(session));
    return res.status(200).json("logged in");
}

async function hasUserSession(req: Request) {
    const session = await getSession(req.headers.cookie);
    const userSession = session.get("userId");
    if (!userSession) return false;
    return true;
}

async function getUserSession(req: Request) {
    const session = await getSession(req.headers.cookie);
    const userSession = session.get("userId");
    return userSession;
}

async function requireUserSession(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const session = await getSession(req.headers.cookie);
    const userSession = session.get("userId");
    if (!userSession) {
        return res.redirect("login");
    }
    next();
}

export {
    createUserSession,
    requireUserSession,
    hasUserSession,
    getUserSession,
};
