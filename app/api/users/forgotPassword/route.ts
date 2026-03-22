import connectToDatabase from "@/db/db";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (!existingUser) {
      // same behavior for security
      return NextResponse.json(
        { message: "If the email exists, reset instructions were sent" },
        { status: 200 }
      );
    }

    await sendEmail({ email: normalizedEmail, emailType: "RESET", userId: existingUser._id });

    return NextResponse.json(
      { message: "If the email exists, reset instructions were sent" },
      { status: 200 }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
