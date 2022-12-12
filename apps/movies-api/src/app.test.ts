import request from "supertest";
import { describe, test, expect } from "vitest";
import { app } from "./app";

describe("POST /health", () => {
    describe("health check", () => {
        test("should respond Healthy!", async () => {
            const res = await request(app).get("/health");
            expect(res.body).toEqual("Healthy!");
        });
        test("should respond with 200 status", async () => {
            const res = await request(app).get("/health");
            expect(res.statusCode).toEqual(200);
        });
    });
});
