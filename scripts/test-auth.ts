import mongoose from "mongoose";
import User from "../models/User";
import dbConnect from "../lib/db";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
  process.exit(1);
}

async function testAuth() {
  console.log("Starting Auth Test...");

  try {
    // 1. Connect to DB
    console.log("Connecting to DB...");
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to DB");

    // Clean up previous test user
    await User.deleteOne({ email: "test@example.com" });
    console.log("Cleaned up previous test user");

    // 2. Register User
    console.log("Testing Registration...");
    const registerRes = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        mobile: "1234567890",
        password: "password123",
      }),
    });

    const registerData = await registerRes.json();
    console.log("Register Response:", registerRes.status, registerData);

    if (registerRes.status !== 201) {
      throw new Error("Registration failed");
    }

    // 3. Login User
    console.log("Testing Login...");
    const loginRes = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const loginData = await loginRes.json();
    console.log("Login Response:", loginRes.status, loginData);

    if (loginRes.status !== 200) {
      throw new Error("Login failed");
    }

    console.log("Auth Test Passed!");
  } catch (error) {
    console.error("Auth Test Failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Note: This script is intended to be run with a tool that can execute TS or JS in the Next.js environment context,
// or simply by running the Next.js server and hitting the endpoints.
// Since we can't easily run a standalone script that shares the Next.js environment without some setup,
// we will primarily rely on hitting the running server.
// However, for this script to work as a standalone, we'd need to load env vars.
