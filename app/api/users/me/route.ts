import getTokenData from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";
import connectToDatabase from "../../../../db/db";

connectToDatabase();

export async function GET(request: NextRequest) {
    try {
        
        const userId = await getTokenData(request);
        const user = await User.findById(userId).select("-password");

        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });

        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}