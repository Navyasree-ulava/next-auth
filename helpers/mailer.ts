import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto"; // for raw token

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    // ✅ generate raw token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // ✅ hash it using bcrypt
    const hashedToken = await bcrypt.hash(rawToken, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const url = `${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "reset-password"
    }?token=${rawToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify Your Account"
          : "Reset Your Password",
      html: `
        <p>Click the link below to ${
          emailType === "VERIFY"
            ? "verify your account"
            : "reset your password"
        }:</p>
        <a href="${url}">${url}</a>
      `,
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log("Email sent:", mailresponse);

    return mailresponse;

  } catch (error: any) {
    throw new Error("Failed to send email: " + error.message);
  }
}