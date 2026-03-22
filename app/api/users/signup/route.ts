import connectToDatabase from "@/db/db";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // ✅ validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ normalize email (IMPORTANT)
    const normalizedEmail = email.toLowerCase();

    // ✅ check existing user
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create user
    const savedUser = await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
    });

    // ✅ send verification email
    await sendEmail({
      email: normalizedEmail,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json(
      {
        message: "User created successfully. Please verify your email.",
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Signup error:", error); // ✅ debug

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}