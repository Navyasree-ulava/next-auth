import connectToDatabase from "../../../../db/db";
import User from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function POST(request: NextRequest) {
    try {    
        const reqBody = await request.json();
        const { email, password } = reqBody;
        if(!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // check if user exists

        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        // check and compare password

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        const tokenData = {
            id:existingUser._id,
            email: existingUser.email,
        }

       const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn:"1d"});

       const response = NextResponse.json({
        message: "Login successful",
        success: true,
       })

       response.cookies.set("token", token, {
        httpOnly: true,
       })

       return response;

    } catch (error: any) {
        
    }
}