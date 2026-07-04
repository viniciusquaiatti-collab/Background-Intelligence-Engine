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
    const response = await request(app.server).get("/health").expect(200);

    expect(response.body).toEqual({
      status: "ok",
      service: "background-intelligence-engine",
      uptime: expect.any(Number),
      timestamp: expect.any(String),
    });
  });
});
