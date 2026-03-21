"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = axios.post("/api/users/login", user);
      console.log(user);

      toast.success("Login successful!");
      router.push("/profile/123"); // Redirect to profile page (replace with actual user ID)
    } catch (error: any) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* 🔵 Subtle Glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />
      
      {/* 🧊 Glass Card */}
      <div className="relative z-10 w-[360px] p-8 rounded-2xl 
      bg-black/40 backdrop-blur-2xl border border-white/20 
      shadow-[0_0_60px_rgba(0,0,0,0.7)]">

        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Log In
        </h1>

        <div className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/10 text-white 
            placeholder-gray-300 border border-white/20 
            focus:border-cyan-400 outline-none transition"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-3 w-full rounded-lg bg-white/10 text-white 
              placeholder-gray-300 border border-white/20 
              focus:border-indigo-400 outline-none transition"
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300 text-sm hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-2 p-3 rounded-lg font-medium text-white 
            bg-gradient-to-r from-indigo-500 to-cyan-500 
            hover:opacity-90 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Link */}
          <Link
            href="/signup"
            className="text-center text-gray-300 text-sm hover:text-white transition"
          >
            Don’t have an account?{" "}
            <span className="text-indigo-300 hover:underline">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}