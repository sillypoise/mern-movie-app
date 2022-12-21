import { NextFunction, Request, Response } from "express";
import { getSession } from "../services/sessions";

async function createUserSession(userId: string, redirectTo: string) {
    return (req: Request, res: Response, next: NextFunction) {
    let session = await getSession();
    session.set("userId", userId)
    next()
} 
}
