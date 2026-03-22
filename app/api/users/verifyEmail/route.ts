import connectToDatabase from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // ✅ get users with valid expiry
    const users = await User.find({
      verifyTokenExpiry: { $gt: Date.now() },
    });

    let validUser = null;

    // ✅ compare token using bcrypt
    for (const user of users) {
      const isMatch = await bcrypt.compare(token, user.verifyToken);
      if (isMatch) {
        validUser = user;
        break;
      }
    }

    if (!validUser) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // ✅ update user
    validUser.isVerified = true;
    validUser.verifyToken = undefined;
    validUser.verifyTokenExpiry = undefined;

    await validUser.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}