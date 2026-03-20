import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";    

export default async function UserProfile({ params }: any) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            Welcome to your profile, user {id}!
        </div>
    );
}