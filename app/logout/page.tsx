"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await axios.get("/api/users/logout");

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🔵 Subtle Glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🧊 Glass Card */}
      <div className="relative z-10 w-[360px] p-8 rounded-2xl 
      bg-white/5 backdrop-blur-2xl border border-white/10 
      shadow-[0_0_60px_rgba(0,0,0,0.7)] text-center">

        <h1 className="text-2xl font-semibold text-white mb-4">
          Logout
        </h1>

        <p className="text-gray-300 mb-6">
          Are you sure you want to log out?
        </p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`w-full p-3 rounded-lg font-medium text-white 
          bg-gradient-to-r from-indigo-500 to-cyan-500 
          transition shadow-lg mb-3
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {loading ? "Logging out..." : "Log Out"}
        </button>

        {/* Cancel */}
        <Link
          href="/profile"
          className="block text-sm text-gray-400 hover:text-white transition"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}