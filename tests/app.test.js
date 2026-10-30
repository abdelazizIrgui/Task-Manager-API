import request from "supertest";
import { expect, test } from "@jest/globals";
import app from "../src/app.js";

test("GET /api/health should return 200", async () => {
  const response = await request(app)
    .get("/api/health");

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("API is working");
});