import type { Request, Response } from "express";
import { z } from "zod";
import { createUser, getAllFoo } from "../../models/user.model";

function httpGetFoo(_req: Request, res: Response) {
    const foo = getAllFoo();
    return res.status(200).json(foo);
}

function httpCreateUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    return res.status(200).json("hey");
    // try {
    //     await createUser();
    //     return res.status(200).json("user created");
    // } catch (err) {
    //     console.dir(err);
    //     return res.status(400).json("error creating user");
    // }
}

export { httpGetFoo, httpCreateUser };
