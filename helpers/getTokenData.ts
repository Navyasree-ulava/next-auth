import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "punycode";

export default async function getTokenData(request: NextRequest) {
    try {
        
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        return decodedToken.id;

    } catch (error: any) {
        throw new Error("Invalid token");
    }
}