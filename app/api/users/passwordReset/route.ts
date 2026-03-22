import connectToDatabase from "@/db/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { token, password, confirmPassword } = await request.json();

    if (!token || !password || !confirmPassword) {
      return NextResponse.json({ error: "Token and both password fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const users = await User.find({ forgetPasswordTokenExpiry: { $gt: Date.now() } });

    let validUser = null;

    for (const user of users) {
      const isMatch = await bcrypt.compare(token, user.forgetPasswordToken || "");
      if (isMatch) {
        validUser = user;
        break;
      }
    }

    if (!validUser) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    validUser.password = hashedPassword;
    validUser.forgetPasswordToken = undefined;
    validUser.forgetPasswordTokenExpiry = undefined;
    await validUser.save();

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
