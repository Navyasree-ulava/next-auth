"use client";

import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [username, setUsername] = useState("");


  async function getUserId() {
    try {
        const response = await fetch("/api/users/me");
        const data = await response.json();
        setUsername(data.user.username);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  }

  useEffect(() => {
    getUserId();
  }, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🔵 Subtle Glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🧊 Glass Card */}
      <div className="relative z-10 w-[380px] p-8 rounded-2xl 
      bg-white/5 backdrop-blur-2xl border border-white/10 
      shadow-[0_0_60px_rgba(0,0,0,0.7)] text-center">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          Welcome 👋
        </h1>

        <p className="text-gray-400 mb-6 text-sm">
          Manage your account and explore your profile
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">

          <button
            onClick={() => router.push("/getUserDetails")}
            className="p-3 rounded-lg font-medium text-white 
            bg-gradient-to-r from-indigo-500 to-cyan-500 
            hover:opacity-90 transition shadow-lg"
          >
            View Profile Details
          </button>

          <button
            onClick={() => router.push("/logout")}
            className="p-3 rounded-lg font-medium text-white 
            bg-white/10 border border-white/20 
            hover:bg-white/20 transition"
          >
            Log Out
          </button>

          <button
            onClick={() => router.push(`/profile/${username}`)}
            className="p-3 rounded-lg font-medium text-white 
            bg-white/10 border border-white/20 
            hover:bg-white/20 transition"
          >
            Click Me
          </button>

        </div>
      </div>
    </div>
  );
}