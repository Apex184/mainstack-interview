import request from "supertest";
import { dbConnect } from "@/config";
import { app } from "@/app";
import mongoose from "mongoose";
import { User } from "@/models";
import { UserLogin } from "@/controller";

app.post("/login", UserLogin);

describe("UserLogin", () => {
  beforeAll(async () => {
    dbConnect();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should login a user", async () => {
    const newUser = {
      email: "john@example.com",
      password: "password123",
    };
    const reponse = await request(app).post("/login").send(newUser).expect(200);

    expect(reponse.body.success).toBe(true);
    expect(reponse.body.message).toBe("Successfully logged in");
    expect(reponse.body).toHaveProperty("signature");
  }, 15000);
});
