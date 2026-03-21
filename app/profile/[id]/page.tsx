import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";    

export default async function UserProfile({ params }: any) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🌌 Subtle Glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🧊 Glass Container */}
      <div className="relative z-10 px-10 py-8 rounded-2xl 
      bg-white/5 backdrop-blur-2xl border border-white/10 
      shadow-[0_0_60px_rgba(0,0,0,0.7)] text-center">

        {/* Text */}
        <h1 className="text-xl font-medium text-white tracking-wide">
          Welcome to your profile,
        </h1>

        {/* Highlighted ID */}
        <p className="mt-2 text-2xl font-semibold bg-gradient-to-r 
        from-indigo-400 to-cyan-400 bg-clip-text text-transparent break-all">
          {id || "User"}
        </p>

      </div>
    </div>
    );
}