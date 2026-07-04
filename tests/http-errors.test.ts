import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildApp } from "../src/app";

const app = buildApp();

app.get("/boom", async () => {
  throw new Error("Unexpected failure");
});

describe("HTTP error handling", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns standardized not found errors", async () => {
    const response = await request(app.server).get("/missing-route").expect(404);

    expect(response.body).toEqual({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
      meta: {
        requestId: expect.any(String),
        correlationId: expect.any(String),
        timestamp: expect.any(String),
      },
    });
  });

  it("returns standardized internal errors", async () => {
    const response = await request(app.server).get("/boom").expect(500);

    expect(response.body).toEqual({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      },
      meta: {
        requestId: expect.any(String),
        correlationId: expect.any(String),
        timestamp: expect.any(String),
      },
    });
  });
});
