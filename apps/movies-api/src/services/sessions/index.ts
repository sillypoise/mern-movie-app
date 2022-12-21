import { createCookieSessionStorage } from "@remix-run/node";

const COOKIE_SECRET = process.env["COOKIE_SECRET"];

if (!COOKIE_SECRET)
    throw new Error("Yo need to set a COOKIE_SECRET environment variable");

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        cookie: {
            name: "zesh",
            secrets: [COOKIE_SECRET],
            sameSite: "lax",
        },
    });

export { getSession, commitSession, destroySession };
