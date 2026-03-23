"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white">

      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-150px] right-[-150px]" />

      <div className="relative z-10 w-[90%] max-w-4xl p-10 rounded-3xl 
      bg-black/40 backdrop-blur-2xl border border-white/20 
      shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Build Smarter. Ship Faster.
        </h1>

        <p className="text-gray-300 mb-8 text-lg">
          A modern platform to manage users, authentication, and workflows with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 rounded-xl font-medium 
            bg-gradient-to-r from-indigo-500 to-cyan-500 
            hover:opacity-90 transition shadow-lg"
          >
            Log In
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 rounded-xl font-medium 
            border border-white/30 hover:bg-white/10 
            transition shadow-lg"
          >
            Sign Up
          </button>

        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            🔐 Secure Authentication
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            ⚡ Fast Performance
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            🎨 Clean UI/UX
          </div>
        </div>

      </div>

      {/* 👇 Footer */}
      <p className="absolute bottom-4 text-gray-500 text-xs">
        © 2026 Your App. All rights reserved.
      </p>

    </div>
  );
}