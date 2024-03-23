import request from "supertest";
import { dbConnect } from "@/config";
import { app } from "@/app";
import mongoose from "mongoose";
import { User } from "@/models";
import { UserSignUp, UserLogin } from "@/controller";

app.post("/signup", UserSignUp);

describe("UserSignUp", () => {
  beforeAll(async () => {
    dbConnect();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should create a new user and send an OTP", async () => {
    const newUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      phoneNumber: "1234567890",
      otp_expiry: new Date(),
      salt: "saltthsshsbsss",
      otp: "123456",
    };

    const response = await request(app)
      .post("/signup")
      .send(newUser)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain(
      "Your account has been created successfully.An otp code has been sent to your email address.",
    );
    expect(response.body).toHaveProperty("signature");

    const user = await User.findOne({ email: newUser.email });
    expect(user).not.toBeNull();
    expect(user?.firstName).toBe(newUser.firstName);
    expect(user?.lastName).toBe(newUser.lastName);
    expect(user?.email).toBe(newUser.email);
    expect(user?.phoneNumber).toBe(newUser.phoneNumber);
    expect(user?.otp).not.toBeNull();
    expect(user?.otp_expiry).not.toBeNull();
  }, 15000);

  it("should return 400 if email already exists", async () => {
    const existingUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      phoneNumber: "1234567890",
      otp_expiry: new Date(),
      salt: "saltthsshsbsss",
      otp: "123456",
    };

    await User.create(existingUser);

    const response = await request(app)
      .post("/signup")
      .send(existingUser)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email already exists");
  }, 15000);
});

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
      email: "johndoe@gmail.com",
      password: "secured",
    };
    const reponse = await request(app).post("/login").send(newUser).expect(200);

    expect(reponse.body.success).toBe(true);
    expect(reponse.body.message).toBe("Successfully logged in");
    expect(reponse.body).toHaveProperty("signature");
  }, 10000);
});
