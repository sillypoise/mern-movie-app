import express from "express";
import { httpGetFoo } from "./foo.controller";

const fooRouter = express.Router();

fooRouter.get("/", httpGetFoo);

export { fooRouter };
