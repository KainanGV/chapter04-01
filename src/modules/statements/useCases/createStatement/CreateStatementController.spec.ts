import request from "supertest";
import { app } from "../../../../app";

describe("Test create statement controller", () => {
  it("Should be able create statement", async () => {
    const responseCreateUser =
      await request(app).post("/api/v1/users").send({ name: "Kainan", email: "Kainan@sherew.com", password: "test" })

    const responseAuthentication =
      await request(app).post("/api/v1/sessions").send({ email: "Kainan@sherew.com", password: "test" })

    const responseCreateStatement =
      await request(app)
        .post("/api/v1/deposit")
        .send({ amount: 134, description: "Hello World" })
        .set({ Authorization: `Bearer ${responseAuthentication.body.token}` });

    expect(responseCreateUser.status).toEqual(201);
    expect(responseAuthentication.status).toEqual(200);
    expect(responseAuthentication.body).toHaveProperty("token");
    expect(responseCreateStatement.body).toHaveProperty("id")
  })
})
