import request from "supertest";
import { app } from "../../../../app";

describe("Test create user controller", () => {
  it("Should be able create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({ name: "Kainan", email: "Kainan@sherew.com", password: "test" })

    expect(response.status).toEqual(201);
  })
})
