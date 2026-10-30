import request from "supertest";
import { test, expect } from "@jest/globals";
import app from "../src/app.js";

test("GET /api/tasks without token should return 401", async () => {
  const response = await request(app)
    .get("/api/tasks");

  expect(response.status).toBe(401);
});