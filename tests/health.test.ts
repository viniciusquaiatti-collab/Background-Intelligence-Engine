import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildApp } from "../src/app";

const app = buildApp();

describe("GET /health", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns service health information", async () => {
    const response = await request(app.server)
      .get("/health")
      .set("x-correlation-id", "test-correlation-id")
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        status: "ok",
        service: "background-intelligence-engine",
        uptime: expect.any(Number),
        timestamp: expect.any(String),
      },
      meta: {
        requestId: expect.any(String),
        correlationId: "test-correlation-id",
        timestamp: expect.any(String),
      },
    });

    expect(response.headers["x-request-id"]).toEqual(expect.any(String));
    expect(response.headers["x-correlation-id"]).toBe("test-correlation-id");
  });
});
