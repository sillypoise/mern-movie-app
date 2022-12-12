import request from "supertest";
import { describe, test, expect } from "vitest";
import { app } from "../../app";

const BASE_USER_URL = "/v1/user";

describe("POST /user/create", () => {
    const URI = BASE_USER_URL + "/create";

    describe("given a correct username, email and password", () => {
        test("should respond with a 200 status code", async () => {
            const res = await request(app).post(`${URI}`).send({
                name: "testname",
                email: "test@example.com",
                password: "testpassword",
            });
            expect(res.statusCode).toEqual(201);
        });
    });
});
