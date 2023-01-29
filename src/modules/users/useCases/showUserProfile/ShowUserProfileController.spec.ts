import request from "supertest";
import { app } from "../../../../app";

describe("Test show user profile controller", () => {
  it("Should be able show data a user profile", async () => {
    const responseCreateUser =
      await request(app).post("/api/v1/users").send({ name: "Kainan", email: "Kainan@sherew.com", password: "test" })

    const responseAuthentication =
      await request(app).post("/api/v1/sessions").send({ email: "Kainan@sherew.com", password: "test" })

    const responseShowUserProfile =
      await request(app).get("/api/v1/profile").set({ Authorization: `Bearer ${responseAuthentication.body.token}` });

    expect(responseCreateUser.status).toEqual(201);
    expect(responseAuthentication.status).toEqual(200);
    expect(responseAuthentication.body).toHaveProperty("token");
    expect(responseShowUserProfile.body).toHaveProperty("id")
  })
})
