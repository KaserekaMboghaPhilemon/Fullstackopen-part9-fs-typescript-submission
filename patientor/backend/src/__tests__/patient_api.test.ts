import { describe, expect, it } from "vitest";
import supertest from "supertest";
import app from "../index.ts";

const api = supertest(app);

describe("Patientor API", () => {
  it("GET /api/ping returns pong", async () => {
    const response = await api.get("/api/ping");

    expect(response.status).toBe(200);
    expect(response.text).toBe("pong");
  });

  it("GET /api/diagnoses returns all diagnoses", async () => {
    const response = await api.get("/api/diagnoses");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/patients returns non-sensitive patient data", async () => {
    const response = await api.get("/api/patients");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const firstPatient = response.body[0];
    expect(firstPatient.id).toBeTruthy();
    expect(firstPatient.name).toBeTruthy();
    expect(firstPatient.dateOfBirth).toBeTruthy();
    expect(firstPatient.gender).toBeTruthy();
    expect(firstPatient.occupation).toBeTruthy();
    expect(firstPatient.ssn).toBeUndefined();
  });

  it("GET /api/patients/:id returns a patient when found", async () => {
    const listResponse = await api.get("/api/patients");
    const patientId = listResponse.body[0].id;

    const response = await api.get(`/api/patients/${patientId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(patientId);
    expect(Array.isArray(response.body.entries)).toBe(true);
  });

  it("GET /api/patients/:id returns 404 for missing patient", async () => {
    const response = await api.get("/api/patients/non-existent-patient-id");

    expect(response.status).toBe(404);
  });

  it("POST /api/patients creates a patient with valid payload", async () => {
    const validPatient = {
      name: "Alice Example",
      dateOfBirth: "1990-01-01",
      ssn: "010190-123A",
      gender: "female",
      occupation: "Software Engineer",
    };

    const response = await api
      .post("/api/patients")
      .send(validPatient)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBe(validPatient.name);
    expect(response.body.dateOfBirth).toBe(validPatient.dateOfBirth);
    expect(response.body.gender).toBe(validPatient.gender);
    expect(response.body.occupation).toBe(validPatient.occupation);
    expect(Array.isArray(response.body.entries)).toBe(true);
  });

  it("POST /api/patients rejects invalid payloads", async () => {
    const invalidCases = [
      {},
      { name: "Alice" },
      { name: "Alice", dateOfBirth: "1990-01-01" },
      { name: "Alice", dateOfBirth: "1990-01-01", ssn: "010190-123A" },
      {
        name: "Alice",
        dateOfBirth: "1990-01-01",
        ssn: "010190-123A",
        gender: "female",
      },
      {
        name: "Alice",
        dateOfBirth: "INVALID_DATE",
        ssn: "010190-123A",
        gender: "female",
        occupation: "Engineer",
      },
      {
        name: "Alice",
        dateOfBirth: "1990-01-01",
        ssn: "010190-123A",
        gender: "wrong",
        occupation: "Engineer",
      },
    ];

    for (const invalidPayload of invalidCases) {
      const response = await api
        .post("/api/patients")
        .send(invalidPayload)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
    }
  });
});
