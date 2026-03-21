import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
        message: "Logout successful",
        success: true,
    })

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0), // Set expiration to past date to delete cookie
    })

    return response;

    } catch (error: any) {

        return NextResponse.json({ message: error.message, success: false }, { status: 500 });

    }
}